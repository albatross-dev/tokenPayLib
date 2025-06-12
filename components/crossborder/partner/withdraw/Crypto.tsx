import React, { useEffect, useState, useContext } from "react";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import {
  api,
  AuthContext,
  sendErrorReport,
} from "../../../../../context/UserContext";
import { IoClose } from "react-icons/io5";
import TokenSelector from "../../../Forms/TokenSelector";
import { useActiveAccount } from "thirdweb/react";
import { TokensByChainId } from "../../../../utilities/crypto/currencies";
import { parseUnits } from "ethers/lib/utils";
import Image from "next/image";
import { PATHS } from "../../../../utilities/crypto/getPath";
import QuoteV2Abi from "../../../../assets/quoteV2Abi.json";
import {
  convertAnyToAnyDirect,
  uniswapAddresses,
} from "../../../../utilities/crypto/convertAnyToAny";
import numberWithZeros from "../../../../utilities/math/numberWithZeros";
import { encodePacked } from "thirdweb/utils";
import MiniLoader from "../../../UI/MiniLoader";
import { useTranslation } from "next-i18next";
import { Account } from "thirdweb/wallets";
import { SimpleToken } from "../../../../types/token.types";
import { FiatTransactionRequest } from "../../../../types/derivedPayload.types";
import { tokenPayAbstractionSimpleTransfer } from "../../../../utilities/crypto/TokenPayAbstraction";
import LoadingButton, {
  LoadingButtonStates,
} from "@/tokenPayLib/components/UI/LoadingButton";

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
  const [amountToSend, setAmountToSend] = useState<number>(amount);
  const [targetTokens, setTargetTokens] = useState<Record<
    string,
    SimpleToken
  > | null>(null);
  const [targetAddress, setTargetAddress] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedTokenBalance, setSelectedTokenBalance] = useState<
    bigint | null
  >(null);
  const [isLoading, setIsLoading] = useState<LoadingButtonStates>("normal");
  const { user } = useContext(AuthContext);
  const account = useActiveAccount();
  const [newTxHash, setNewTxHash] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loadingQuote, setLoadingQuote] = useState<boolean>(false);
  const [quote, setQuote] = useState<[bigint, bigint, boolean, bigint] | null>(
    null
  );
  const [state, setState] = useState<"transaction" | "success">("transaction");

  const { t: tCrossborder } = useTranslation("crossborder");

  useEffect(() => {
    processTargetTokens(defaultToken);
  }, []);

  useEffect(() => {
    async function fetchQuote() {
      setLoadingQuote(true);
      let contract = getContract({
        client: client,
        chain: polygon,
        address: uniswapAddresses[polygon.id].quote,
        abi: QuoteV2Abi as Array<any>,
      });

      const path =
        PATHS[polygon.id][defaultToken.id.toUpperCase()][
          (selectedToken?.id || "").toUpperCase()
        ];

      const encodedPath = encodePacked(path[0], path[1]);

      try {
        const quote = await readContract({
          contract: contract,
          method: "quoteExactInput",
          params: [
            encodedPath,
            BigInt(amount * numberWithZeros(selectedToken?.decimals || 1)),
          ],
        });
        setQuote(quote as [bigint, bigint, boolean, bigint]);
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

  const fetchTokenBalance = async (selectedToken: SimpleToken) => {
    try {
      const contract = getContract({
        client,
        chain: polygon,
        address: selectedToken.contractAddress,
        abi: selectedToken.abi,
      });

      const balance = await readContract({
        contract,
        method: "function balanceOf(address) view returns (uint256)",
        params: [account.address],
      });

      setSelectedTokenBalance(balance as bigint);
    } catch (error) {
      sendErrorReport(
        `Crypto - Withdraw - Error fetching token balance for ${selectedToken.id}`,
        error
      );
      console.error("Error fetching token balance:", error);
    }
  };

  const validateForm = (): boolean => {
    const validationErrors: FormErrors = {};

    if (differentToken && !selectedToken) {
      validationErrors.selectedToken = tCrossborder(
        "withdraw.crypto.errorSelectCrypto"
      );
    }

    if (!amountToSend || amountToSend <= 0) {
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

  function processTargetTokens(
    token: SimpleToken | null
  ): Record<string, SimpleToken> | null {
    if (!token) return null;
    let targetTokenArr = Object.keys(
      PATHS[polygon.id][token.id.toUpperCase()]
    ).map((tokenId) => {
      return [tokenId, TokensByChainId[polygon.id][tokenId]];
    });

    targetTokenArr = targetTokenArr.filter((item) => {
      return item[1] !== undefined;
    });

    let targetTokens = Object.fromEntries(targetTokenArr);
    setTargetTokens(targetTokens);
    setSelectedToken(targetTokenArr[0][1] as SimpleToken);

    return targetTokens;
  }

  const handleTransfer = async (
    token: SimpleToken,
    amount: string,
    address: string
  ): Promise<string> => {
    const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
      client,
      account as Account,
      polygon,
      BigInt(amount),
      token,
      address
    );

    return transactionHash;
  };

  const handleSend = async () => {
    if (!validateForm()) return;

    setIsLoading("processing");
    if (differentToken && selectedToken && quote) {
      try {
        await convertAnyToAnyDirect(
          defaultToken,
          amount * numberWithZeros(defaultToken?.decimals || 1),
          account as Account,
          () => {},
          (error) => {
            throw error;
          },
          polygon,
          selectedToken
        );
        const feePercentage = BigInt(4);
        const divisor = BigInt(1000);
        const sendAmount = quote[0] - (quote[0] * feePercentage) / divisor;

        let transactionHash = await handleTransfer(
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
          transactionHash: transactionHash,
          UUID: transactionHash,
          sendingWallet: account?.address || "",
          currencyDecimals: defaultToken.decimals,
          receivingWallet: targetAddress,
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
      } catch (error) {
        const errors: FormErrors = {};
        sendErrorReport(`Crypto - Withdraw - Error transfering token`, error);
        errors.conversionError = tCrossborder(
          "withdraw.crypto.errorTransaction"
        );
        setErrors(errors);
        console.error("Error transfering token", error);
        setIsLoading("error");
        return;
      }
    } else {
      let transactionHash = await handleTransfer(
        defaultToken,
        parseUnits(amount.toString(), defaultToken.decimals).toString(),
        targetAddress
      );

      let transactionData: FiatTransactionRequest = {
        partner: "crypto",
        amount: Number(amount),
        currency: defaultToken.contractAddress,
        currencyName: defaultToken.id,
        transactionHash: transactionHash,
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
    }

    setState("success");
    setIsLoading("normal");
    setIsOpen(true);
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
            <div className={`relative w-8 h-8`}>
              <Image src={defaultToken.icon} fill alt="token icon" />+
            </div>
            <div>{defaultToken.name}</div>
            <div className="flex-1"></div>
            <div className="font-bold">
              {parseFloat(amount.toString()).toLocaleString()}
            </div>
            <div>{defaultToken.name}</div>
          </div>
          <div className="">
            <div>
              <div
                onClick={() => setDifferentToken(true)}
                className="block font-medium text-gray-700 mt-4 text-uhuBlue cursor-pointer"
              >
                {tCrossborder("withdraw.crypto.changeCrypto")}
              </div>
              {differentToken && (
                <div className="border shadow-sm rounded p-4 mt-4">
                  <div className="flex justify-between">
                    <label className="block font-medium text-gray-700">
                      {tCrossborder("withdraw.crypto.selectCrypto")}
                    </label>
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
                      fetchTokenBalance(token);
                    }}
                  />
                  {errors.selectedToken && (
                    <p className="text-red-500 text-sm">
                      {errors.selectedToken}
                    </p>
                  )}
                  <div className="flex gap-2 justify-end items-center mt-2">
                    <div className="flex-1"></div>
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
              <label className="block font-medium text-gray-700 mb-1">
                {tCrossborder("withdraw.crypto.targetAddress")}
              </label>
              <input
                type="text"
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
              fullWidth={true}
              active={selectedToken && !loadingQuote}
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
