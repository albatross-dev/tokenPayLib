import React, { useEffect, useState, useContext } from "react";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { IoClose } from "react-icons/io5";
import { useActiveAccount } from "thirdweb/react";
import { parseUnits } from "ethers/lib/utils";
import Image from "next/image";
import { encodePacked } from "thirdweb/utils";
import { useTranslation } from "next-i18next";
import { Account } from "thirdweb/wallets";
import { fetchPaths } from "@/tokenPayLib/components/Modules/TokenSwapSection";
import LoadingButton, {
  LoadingButtonStates,
} from "@/tokenPayLib/components/UI/LoadingButton";
import {
  api,
  AuthContext,
  sendErrorReport,
} from "../../../../../context/UserContext";
import TokenSelector from "../../../Forms/TokenSelector";
import { TokensByChainId } from "../../../../utilities/crypto/currencies";
import { PATHS } from "../../../../utilities/crypto/getPath";
import QuoteV2Abi from "../../../../assets/quoteV2Abi.json";
import {
  convertAnyToAnyDirect,
  uniswapAddresses,
} from "../../../../utilities/crypto/convertAnyToAny";
import numberWithZeros from "../../../../utilities/math/numberWithZeros";
import MiniLoader from "../../../UI/MiniLoader";
import { SimpleToken } from "../../../../types/token.types";
import { FiatTransactionRequest } from "../../../../types/derivedPayload.types";
import { tokenPayAbstractionSimpleTransfer } from "../../../../utilities/crypto/TokenPayAbstraction";

// ----- Local helpers for robust error handling -----
const TX_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

function withTimeout<T>(promise: Promise<T>, ms: number = TX_TIMEOUT_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error("TX_TIMEOUT")), ms);
    promise
      .then((value) => {
        clearTimeout(id);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(id);
        reject(err);
      });
  });
}

function isUserRejectedError(error: any): boolean {
  const msg = (error?.shortMessage || error?.message || "").toString().toLowerCase();
  return (
    error?.code === 4001 ||
    error?.code === "ACTION_REJECTED" ||
    msg.includes("user rejected") ||
    msg.includes("rejected the request") ||
    msg.includes("denied")
  );
}

interface RawCryptoProps {
  amount: number;
  preferredStableCoin: string;
}

interface FormErrors {
  selectedToken?: string;
  amountToSend?: string;
  targetAddress?: string;
  conversionError?: string;
}

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export default function RawCrypto({
  amount,
  preferredStableCoin,
}: RawCryptoProps) {
  const [defaultToken, setDefaultToken] = useState<SimpleToken>(
    TokensByChainId[polygon.id][preferredStableCoin]
  );
  const [differentToken, setDifferentToken] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<SimpleToken | null>(null);
  const [targetTokens, setTargetTokens] = useState<Record<
    string,
    SimpleToken
  > | null>(null);
  const [targetAddress, setTargetAddress] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<LoadingButtonStates>("normal");
  const { user } = useContext(AuthContext);
  const account = useActiveAccount();
  const [loadingQuote, setLoadingQuote] = useState<boolean>(false);
  const [quote, setQuote] = useState<[bigint, bigint[], bigint[], bigint] | null>(
    null
  );
  const [state, setState] = useState<"transaction" | "success">("transaction");

  const { t: tCrossborder } = useTranslation("crossborder");

  useEffect(() => {
    setDefaultToken(TokensByChainId[polygon.id][preferredStableCoin]);
  }, [preferredStableCoin]);

  useEffect(() => {
    async function fetchQuote() {
      setLoadingQuote(true);
      const contract = getContract({
        client,
        chain: polygon,
        address: uniswapAddresses[polygon.id].quote,
        abi: QuoteV2Abi as Array<any>,
      });

      const path =
        PATHS[polygon.id][defaultToken.id.toUpperCase()][
          (selectedToken?.id || "").toUpperCase()
        ];

      const encodedPath = encodePacked(path[0], path[1]);

      console.log("fetch quote for", encodedPath, amount, BigInt(amount * numberWithZeros(selectedToken?.decimals || 1)));

      try {
        const quoteRes = await readContract({
          contract,
          method: "quoteExactInput",
          params: [
            encodedPath,
            BigInt(amount * numberWithZeros(defaultToken?.decimals || 1)),
          ],
        });
        setQuote(quoteRes as [bigint, bigint[], bigint[], bigint]);
        console.log("quote", quoteRes);
        setLoadingQuote(false);
      } catch (error) {
        console.error("Error fetching quote:", error);
        setLoadingQuote(false);
      }
    }

    if (selectedToken && differentToken) {
      fetchQuote();
    }
  }, [selectedToken, differentToken, amount, defaultToken]);

  const validateForm = (): boolean => {
    const validationErrors: FormErrors = {};

    if (differentToken && !selectedToken) {
      validationErrors.selectedToken = tCrossborder(
        "withdraw.crypto.errorSelectCrypto"
      );
    }

    if (!amount || amount <= 0) {
      validationErrors.amountToSend = tCrossborder(
        "withdraw.crypto.errorEmail"
      );
    }

    if (!targetAddress || !/^0x[a-fA-F0-9]{40}$/.test(targetAddress)) {
      validationErrors.targetAddress = tCrossborder(
        "withdraw.crypto.errorWallet"
      );
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  /**
    * Processes target tokens for a given origin token by:
    * 1. Fetching available swap paths from the backend
    * 2. Converting paths into a map of output tokens
    * 3. Updating the UI state with available target tokens
    */
  async function processTargetTokens(token: SimpleToken) {
    if (!token) return;

    setLoadingQuote(true)

    console.log("fetching paths for", token);

    const paths = await fetchPaths(token, polygon);

    console.log("paths", paths);

    const outputTokens = Object.fromEntries(
      paths.map((path) => {
        const obj: SimpleToken | null = TokensByChainId[polygon.id][path.outputToken];
        if (obj && path.outputToken) {
          return [path.outputToken, obj];
        } 
        return ["none", null];
      })
    );

    delete outputTokens.none;

    setTargetTokens(outputTokens);
  }


  useEffect(() => {
    processTargetTokens(defaultToken);
  }, [defaultToken]);

  const handleTransfer = async (
    token: SimpleToken,
    amountL: string,
    address: string
  ): Promise<string> => {
    const { transactionHash } = await withTimeout(
      tokenPayAbstractionSimpleTransfer(
        client,
        account as Account,
        polygon,
        BigInt(amountL),
        token,
        address
      )
    );

    return transactionHash;
  };

  const handleSend = async () => {
    if (!validateForm()) return;

    setIsLoading("processing");
    if (differentToken && selectedToken && quote) {
      try {
        await withTimeout(
          convertAnyToAnyDirect(
            defaultToken,
            amount * numberWithZeros(defaultToken?.decimals || 1),
            account as Account,
            () => {},
            (error) => {
              throw error;
            },
            polygon,
            selectedToken
          )
        );
        const feePercentage = BigInt(4);
        const divisor = BigInt(1000);
        const sendAmount = quote[0] - (quote[0] * feePercentage) / divisor;

        const transactionHash = await handleTransfer(
          selectedToken,
          sendAmount.toString(),
          targetAddress
        );

        const transactionData: FiatTransactionRequest = {
          vendor: user.id,
          partner: "crypto",
          amount: Number(amount),
          currency: defaultToken.contractAddress,
          currencyName: defaultToken.id,
          transactionHash,
          UUID: transactionHash,
          sendingWallet: account?.address || "",
          currencyDecimals: defaultToken.decimals,
          receivingWallet: targetAddress,
          status: "success",
          toAccountBankName: "",
          toAccountIdentifier: "",
          toNetwork: "polygon",
          fromNetwork: "polygon",
          type: "Withdraw",
          finalCurrency: selectedToken.id,
          finalamount: Number(sendAmount),
        };

        if (user.type === "vendor") {
          transactionData.vendor = user.id;
        } else {
          transactionData.consumer = user.id;
        }

        await api.post("/api/fiatTransaction", transactionData);
      } catch (error: any) {
        sendErrorReport(`Crypto - Withdraw - Error transfering token`, error);
        if (isUserRejectedError(error)) {
          setErrors((prev) => ({ ...prev, conversionError: tCrossborder("withdraw.crypto.userRejected") }));
        } else if (error?.message === "TX_TIMEOUT") {
          setErrors((prev) => ({ ...prev, conversionError: tCrossborder("withdraw.crypto.timeout") }));
        } else {
          setErrors((prev) => ({ ...prev, conversionError: tCrossborder("withdraw.crypto.errorTransaction") }));
        }
        console.error("Error transfering token", error);
        setIsLoading("error");
        return;
      }
    } else {
      try{
        const transactionHash = await handleTransfer(
          defaultToken,
          parseUnits(amount.toString(), defaultToken.decimals).toString(),
          targetAddress
        );
  
        const transactionData: FiatTransactionRequest = {
          partner: "crypto",
          amount: Number(amount),
          currency: defaultToken.contractAddress,
          currencyName: defaultToken.id,
          transactionHash,
          UUID: transactionHash,
          sendingWallet: account?.address || "",
          currencyDecimals: defaultToken.decimals,
          receivingWallet: targetAddress,
          toAccountBankName: "",
          toAccountIdentifier: "",
          toNetwork: "polygon",
          fromNetwork: "polygon",
          type: "Withdraw",
          finalCurrency: defaultToken.id,
          finalamount: amount,
        };
  
        if (user.type === "vendor") {
          transactionData.vendor = user.id;
        } else {
          transactionData.consumer = user.id;
        }
  
        await api.post("/api/fiatTransaction", transactionData);
      }catch(error: any){
        sendErrorReport(`Crypto - Withdraw - Error transfering token`, error);
        if (isUserRejectedError(error)) {
          setErrors((prev) => ({ ...prev, conversionError: tCrossborder("withdraw.crypto.userRejected") }));
        } else if (error?.message === "TX_TIMEOUT") {
          setErrors((prev) => ({ ...prev, conversionError: tCrossborder("withdraw.crypto.timeout") }));
        } else {
          setErrors((prev) => ({ ...prev, conversionError: tCrossborder("withdraw.crypto.errorTransaction") }));
        }
        console.error("Error transfering token", error);
        setIsLoading("error");
        return;
      }
     
    }

    setState("success");
    setIsLoading("normal");
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      {state === "transaction" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {tCrossborder("withdraw.crypto.sendCrypto")}
          </h2>
          <div
            className={`${
              selectedToken && differentToken && "text-gray-500 grayscale"
            } flex flex-row gap-2 items-center bg-gray-100 rounded p-4`}
          >
            <div className="relative w-8 h-8">
              <Image src={defaultToken.icon} fill alt="token icon" />+
            </div>
            <div>{defaultToken.name}</div>
            <div className="flex-1" />
            <div className="font-bold">
              {parseFloat(amount.toString()).toLocaleString()}
            </div>
            <div>{defaultToken.name}</div>
          </div>
          <div className="">
            <div>
              <button
                type="button"
                onClick={() => setDifferentToken(true)}
                className="block font-medium text-gray-700 mt-4 text-uhuBlue cursor-pointer"
              >
                {tCrossborder("withdraw.crypto.changeCrypto")}
              </button>
              {differentToken && (
                <div className="border shadow-sm rounded p-4 mt-4">
                  <div className="flex justify-between">
                    <div className="block font-medium text-gray-700">
                      {tCrossborder("withdraw.crypto.selectCrypto")}
                    </div>
                    <IoClose
                      onClick={() => setDifferentToken(false)}
                      className="w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <TokenSelector
                    type="token"
                    tokens={targetTokens}
                    selectedToken={selectedToken}
                    onSelect={(token: SimpleToken) => {
                      setSelectedToken(token);
                    }}
                  />
                  {errors.selectedToken && (
                    <p className="text-red-500 text-sm">
                      {errors.selectedToken}
                    </p>
                  )}
                  <div className="flex gap-2 justify-end items-center mt-2">
                    <div className="flex-1" />
                    {loadingQuote && (
                      <div className="">
                        <MiniLoader />
                      </div>
                    )}

                    {quote && selectedToken && (
                      <div className="text-xl font-bold flex gap-2 items-end">
                        {Number(quote[0]) /
                          numberWithZeros(selectedToken.decimals) -
                          (Number(quote[0]) /
                            numberWithZeros(selectedToken.decimals)) *
                            0.004}
                        <span className="text-base">{selectedToken.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 mb-4">
              <label htmlFor="targetAddress" className="block font-medium text-gray-700 mb-1">
                {tCrossborder("withdraw.crypto.targetAddress")}
              </label>
              <input
                type="text"
                id="targetAddress"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
              />
              {errors.targetAddress && (
                <p className="text-red-500 text-sm">{errors.targetAddress}</p>
              )}
            </div>

            {errors.conversionError && (
              <p className="text-red-500 text-sm">{errors.conversionError}</p>
            )}
            <LoadingButton
              isLoading={isLoading}
              onClick={handleSend}
              fullWidth
              active={selectedToken ? !loadingQuote : true}
            >
              {tCrossborder("withdraw.crypto.sendNow")}
            </LoadingButton>
          </div>
        </div>
      )}

      {state === "success" && (
        <div className="max-w-4xl mx-auto p-6 w-full">
          <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
            {tCrossborder("withdraw.crypto.transactionSuccess")}
          </h1>
          <p className="text-center">
            {tCrossborder("withdraw.crypto.transactionSuccessInfo")}
          </p>
        </div>
      )}
    </div>
  );
}
