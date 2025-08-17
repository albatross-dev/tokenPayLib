import React, { useEffect, useState, useContext } from "react";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import QuoteV2Abi from "@/tokenPayLib/assets/quoteV2Abi.json";
import { IoIosInformationCircle } from "react-icons/io";
import { useTranslation } from "next-i18next";
import { encodePacked } from "thirdweb/utils";
import { api, AuthContext, sendErrorReport } from "../../../../../context/UserContext";
import numberWithZeros from "../../../../utilities/math/numberWithZeros";
import { TokensByChainId } from "../../../../utilities/crypto/currencies";
import { SimpleToken } from "../../../../types/token.types";
import { convertAnyToAnyDirect, uniswapAddresses } from "../../../../utilities/crypto/convertAnyToAny";
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

export default function CryptoPartner({ amount, country, method }: CryptoPartnerProps) {
  const [defaultToken, setDefaultToken] = useState<SimpleToken>(TokensByChainId[polygon.id][method.acceptedCrypto]);
  const [selectedToken, setSelectedToken] = useState<SimpleToken | null>(null);
  const [targetAddress, setTargetAddress] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const account = useActiveAccount();
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quote, setQuote] = useState<[bigint, bigint, bigint, bigint] | null>(null);
  const [state, setState] = useState<TransactionState>("transaction");

  const { t: tCrossborder } = useTranslation("crossborder");

  useEffect(() => {
    setDefaultToken(TokensByChainId[polygon.id][method.acceptedCrypto]);
  }, [method]);

  useEffect(() => {
    async function fetchQuote() {
      setLoadingQuote(true);
      const contract = getContract({
        client,
        chain: polygon,
        address: uniswapAddresses[polygon.id].quote,
        abi: QuoteV2Abi as Array<any>,
      });

      if (!selectedToken) return;

      const path = PATHS[polygon.id][defaultToken.id.toUpperCase()][selectedToken.id.toUpperCase()];

      const encodedPath = encodePacked(path[0], path[1]);

      const quoteRes = await readContract({
        contract,
        method: "quoteExactInput",
        params: [encodedPath, BigInt(amount * numberWithZeros(selectedToken?.decimals || 1))],
      });
      setQuote(quoteRes as any);
      setLoadingQuote(false);
    }

    if (selectedToken) {
      fetchQuote();
    }
  }, [selectedToken]);

  const validateForm = (): boolean => {
    const validationErrors: ValidationErrors = {};

    if (!amount || amount <= 0) {
      validationErrors.amountToSend = tCrossborder("withdraw.partnerCrypto.errorValidAmount");
    }

    if (!targetAddress || !/^0x[a-fA-F0-9]{40}$/.test(targetAddress)) {
      validationErrors.targetAddress = tCrossborder("withdraw.partnerCrypto.errorValidEmail");
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  function processTargetTokens(token: SimpleToken | null): Record<string, SimpleToken> | null {
    if (!token) return null;
    let targetTokenArr = Object.keys(PATHS[polygon.id][token.id.toUpperCase()]).map((tokenId) => [tokenId, TokensByChainId[polygon.id][tokenId]]);

    targetTokenArr = targetTokenArr.filter((item) => item[1] !== undefined);

    const targetTokensRes = Object.fromEntries(targetTokenArr);
    setSelectedToken(targetTokenArr[0][1] as SimpleToken);

    return targetTokensRes;
  }

  useEffect(() => {
    processTargetTokens(defaultToken);
  }, []);

  const handleTransfer = async (token: SimpleToken, amountL: bigint, address: string): Promise<string> => {
    const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
      client,
      account,
      polygon,
      amountL,
      token,
      address
    );

    return transactionHash;
  };

  const handleSend = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    if (quote && selectedToken) {
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

        const transactionHash = await handleTransfer(selectedToken, sendAmount, targetAddress);

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
          targetCountry: country.countryCode,
          status: "success",
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
        sendErrorReport(`PartnerCrypto - withdraw - Error transfering token`, error);
        errors.conversionError = tCrossborder("withdraw.partnerCrypto.errorConvertCrypto");
        setErrors(errors);
        setIsLoading(false);
        return;
      }
    } else {
      const transactionHash = await handleTransfer(
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
        transactionHash,
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
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      {state === "transaction" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {getFiatInfoForStableCoin(defaultToken.name)?.id} {tCrossborder("withdraw.partnerCrypto.sendHeader")}
          </h2>
          <div className="flex flex-row gap-2 items-center bg-gray-100 rounded p-4">
            <div className="relative w-8 h-8 bg-uhuBlue flex items-center text-white font-bold justify-center rounded-full">
              {getFiatInfoForStableCoin(defaultToken.name)?.symbol}
            </div>
            <div>{getFiatInfoForStableCoin(defaultToken.name)?.id}</div>
            <div className="flex-1" />
            <div className="bg-uhuBlue text-[11px] text-white rounded px-1 text">
              via <span className="font-bold">{defaultToken.name}</span>
            </div>
            <div className="font-bold">{parseFloat(amount.toString()).toLocaleString()}</div>
            <div>{getFiatInfoForStableCoin(defaultToken.name)?.symbol}</div>
          </div>
          <div className="mt-4 text-sm text-gray-700">{tCrossborder("withdraw.partnerCrypto.walletInfo")}</div>
          <div className="mt-4 text-sm text-gray-700 flex gap-2 items-center bg-gray-100 rounded p-2">
            <IoIosInformationCircle className="text-2xl text-uhuBlue inline" />
            {tCrossborder("withdraw.partnerCrypto.receiverInfo")}
          </div>
          <div className="">
            <div className="mt-4 mb-4">
              <label className="block font-medium text-gray-700 mb-1" htmlFor="targetAddress">
                {tCrossborder("withdraw.partnerCrypto.walletAddress")}
              </label>
              <input
                id="targetAddress"
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
              />
              {errors.targetAddress && <p className="text-red-500 text-sm">{errors.targetAddress}</p>}
            </div>

            {errors.conversionError && <p className="text-red-500 text-sm">{errors.conversionError}</p>}
            <button
              type="button"
              className="w-full bg-uhuBlue text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={handleSend}
              disabled={isLoading || !selectedToken || loadingQuote}
            >
              {isLoading ? tCrossborder("withdraw.partnerCrypto.send") : tCrossborder("withdraw.partnerCrypto.sendNow")}
            </button>
          </div>
        </div>
      )}

      {state === "success" && (
        <div className="max-w-4xl mx-auto p-6 w-full">
          <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
            {tCrossborder("withdraw.partnerCrypto.transactionSuccess")}
          </h1>
          <p className="text-center">{tCrossborder("withdraw.partnerCrypto.transactionSuccessInfo")}</p>
        </div>
      )}
    </div>
  );
};
