import React, { useEffect, useState, useContext } from "react";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { parseUnits } from "ethers/lib/utils";
import QuoteV2Abi from "@/tokenPayLib/assets/quoteV2Abi.json";
import { IoIosInformationCircle } from "react-icons/io";
import { useTranslation } from "next-i18next";
import { encodePacked } from "thirdweb/utils";
import {
  api,
  AuthContext,
  sendErrorReport,
} from "../../../../../context/UserContext";
import numberWithZeros from "../../../../utilities/math/numberWithZeros";
import { TokensByChainId } from "../../../../utilities/crypto/currencies";
import { SimpleToken } from "../../../../types/token.types";
import {
  convertAnyToAnyDirect,
  uniswapAddresses,
} from "../../../../utilities/crypto/convertAnyToAny";
import { PATHS } from "../../../../utilities/crypto/getPath";
import { tokenPayAbstractionSimpleTransfer } from "../../../../utilities/crypto/TokenPayAbstraction";
import { getFiatInfoForStableCoin } from "../../../../utilities/stableCoinsMaps";
import { PaymentTypesArray, Country } from "../../../../types/payload-types";
import { FiatTransactionRequest } from "../../../../types/derivedPayload.types";

export type TransactionState = "transaction" | "success";

export interface CryptoPartnerProps {
  amount: number;
  country: Country;
  method: PaymentTypesArray[number];
}

export interface ValidationErrors {
  selectedToken?: string;
  amountToSend?: string;
  targetAddress?: string;
  conversionError?: string;
}

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

const CryptoPartner: React.FC<CryptoPartnerProps> = ({
  amount,
  country,
  method,
}) => {
  const [defaultToken, setDefaultToken] = useState<SimpleToken>(
    TokensByChainId[polygon.id][method.acceptedCrypto]
  );
  const [differentToken, setDifferentToken] = useState(false);
  const [selectedToken, setSelectedToken] = useState<SimpleToken | null>(null);
  const [amountToSend, setAmountToSend] = useState(amount);
  const [targetTokens, setTargetTokens] = useState<Record<
    string,
    SimpleToken
  > | null>(null);
  const [targetAddress, setTargetAddress] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [selectedTokenBalance, setSelectedTokenBalance] = useState<
    bigint | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const account = useActiveAccount();
  const [newTxHash, setNewTxHash] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quote, setQuote] = useState<[bigint, bigint, bigint, bigint] | null>(
    null
  );
  const [state, setState] = useState<TransactionState>("transaction");

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

      if (!selectedToken) return;

      const path =
        PATHS[polygon.id][defaultToken.id.toUpperCase()][
          selectedToken.id.toUpperCase()
        ];

      const encodedPath = encodePacked(path[0], path[1]);

      const quote = await readContract({
        contract: contract,
        method: "quoteExactInput",
        params: [
          encodedPath,
          BigInt(amount * numberWithZeros(selectedToken?.decimals || 1)),
        ],
      });
      setQuote(quote as any);
      setLoadingQuote(false);
    }

    if (selectedToken && differentToken) {
      fetchQuote();
    }
  }, [selectedToken, differentToken]);

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

      setSelectedTokenBalance(balance);
    } catch (error) {
      sendErrorReport(
        `PartnerCrypto - withdraw - Error fetching token balance for ${selectedToken.id}`,
        error
      );
      console.error("Error fetching token balance:", error);
    }
  };

  const validateForm = (): boolean => {
    const validationErrors: ValidationErrors = {};

    if (differentToken) {
      if (!selectedToken) {
        validationErrors.selectedToken = tCrossborder(
          "withdraw.partnerCrypto.errorSelectCrypto"
        );
      }
    }

    if (!amountToSend || amountToSend <= 0) {
      validationErrors.amountToSend = tCrossborder(
        "withdraw.partnerCrypto.errorValidAmount"
      );
    }

    if (!targetAddress || !/^0x[a-fA-F0-9]{40}$/.test(targetAddress)) {
      validationErrors.targetAddress = tCrossborder(
        "withdraw.partnerCrypto.errorValidEmail"
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
    amount: bigint,
    address: string
  ): Promise<string> => {
    const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
      client,
      account,
      polygon,
      amount,
      token,
      address
    );

    return transactionHash;
  };

  const handleSend = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    if (differentToken && quote && selectedToken) {
      try {
        await convertAnyToAnyDirect(
          defaultToken,
          amount * numberWithZeros(defaultToken?.decimals || 1),
          account,
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
          sendAmount,
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
          targetCountry: country.countryCode,
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
        const errors: ValidationErrors = {};
        sendErrorReport(
          `PartnerCrypto - withdraw - Error transfering token`,
          error
        );
        errors.conversionError = tCrossborder(
          "withdraw.partnerCrypto.errorConvertCrypto"
        );
        setErrors(errors);
        setIsLoading(false);
        return;
      }
    } else {
      let transactionHash = await handleTransfer(
        defaultToken,
        BigInt(amount * numberWithZeros(defaultToken?.decimals || 1)),
        targetAddress
      );

      await api.post("/api/fiatTransaction", {
        vendor: user.id,
        partner: "crypto",
        amount: Number(amount),
        currency: defaultToken.contractAddress,
        currencyName: defaultToken.id,
        transactionHash: transactionHash,
        UUID: transactionHash,
        sendingWallet: account?.address,
        currencyDecimals: defaultToken.decimals,
        receivingWallet: targetAddress,
        toAccountBankName: "",
        toAccountIdentifier: "",
        toNetwork: "polygon",
        fromNetwork: "polygon",
        type: "Withdraw",
        finalCurrency: defaultToken.id,
        finalAmount: amount,
      });
    }

    setState("success");
    setIsLoading(false);
    setIsOpen(true);
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      {state === "transaction" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {getFiatInfoForStableCoin(defaultToken.name)?.id}{" "}
            {tCrossborder("withdraw.partnerCrypto.sendHeader")}
          </h2>
          <div className="flex flex-row gap-2 items-center bg-gray-100 rounded p-4">
            <div className="relative w-8 h-8 bg-uhuBlue flex items-center text-white font-bold justify-center rounded-full">
              {getFiatInfoForStableCoin(defaultToken.name)?.symbol}
            </div>
            <div>{getFiatInfoForStableCoin(defaultToken.name)?.id}</div>
            <div className="flex-1"></div>
            <div className="bg-uhuBlue text-[11px] text-white rounded px-1 text">
              via <span className="font-bold">{defaultToken.name}</span>
            </div>
            <div className="font-bold">
              {parseFloat(amount.toString()).toLocaleString()}
            </div>
            <div>{getFiatInfoForStableCoin(defaultToken.name)?.symbol}</div>
          </div>
          <div className="mt-4 text-sm text-gray-700">
            {tCrossborder("withdraw.partnerCrypto.walletInfo")}
          </div>
          <div className="mt-4 text-sm text-gray-700 flex gap-2 items-center bg-gray-100 rounded p-2">
            <IoIosInformationCircle className="text-2xl text-blue-500 inline" />
            {tCrossborder("withdraw.partnerCrypto.receiverInfo")}
          </div>
          <div className="">
            <div className="mt-4 mb-4">
              <label className="block font-medium text-gray-700 mb-1">
                {tCrossborder("withdraw.partnerCrypto.walletAddress")}
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
            <button
              className="w-full bg-uhuBlue text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={handleSend}
              disabled={isLoading || !selectedToken || loadingQuote}
            >
              {isLoading
                ? tCrossborder("withdraw.partnerCrypto.send")
                : tCrossborder("withdraw.partnerCrypto.sendNow")}
            </button>
          </div>
        </div>
      )}

      {state === "success" && (
        <div className="max-w-4xl mx-auto p-6 w-full">
          <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
            {tCrossborder("withdraw.partnerCrypto.transactionSuccess")}
          </h1>
          <p className="text-center">
            {tCrossborder("withdraw.partnerCrypto.transactionSuccessInfo")}
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoPartner;
