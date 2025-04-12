import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MiniLoader from "../../UI/MiniLoader";
import { sendErrorReport } from "../../../../context/UserContext";
import { PaymentTypesArray } from "../../../types/payload-types";

interface BitcoinVNMetadata {
  min: number;
  max: number;
}

export interface BitcoinVNQuote {
  id: string;
  depositAmount: number;
  depositFee: number;
  depositMethod: string;
  settleAmount: number;
  settleFee: number;
  settleMethod: string;
  rate: number;
  rawRate: number;
  createdAt: string;
  expiresAt: string;
  accepted: boolean;
}

interface BitcoinVNQuoteProps {
  method: PaymentTypesArray[number];
  amount: number;
  selectedMethod: PaymentTypesArray[number] | null;
  handleSelect: (method: PaymentTypesArray[number]) => void;
}

type ComponentState = "loading" | "loading-quote" | "metadata-loaded" | "loaded" | "error";

export async function getBitcoinVNMetaData(): Promise<BitcoinVNMetadata> {
  try {
    const result = await axios.get<BitcoinVNMetadata>(
      "/api/fiatTransaction/bitcoinVN/getMetaData"
    );
    return result.data;
  } catch (error) {
    console.error("Error fetching BitcoinVN metadata:", error);
    throw error;
  }
}

export async function getBitcoinVNQuote(amount: number): Promise<BitcoinVNQuote> {
  try {
    const result = await axios.post<BitcoinVNQuote>("/api/fiatTransaction/bitcoinVN/quote", {
      depositAmount: amount,
      settleAmount: null,
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching BitcoinVN quote:", error);
    throw error;
  }
}

export default function BitcoinVNQuote({
  method,
  amount,
  selectedMethod,
  handleSelect,
}: BitcoinVNQuoteProps) {
  const [minAmountDifference, setMinAmountDifference] = useState<number>(0);
  const [maxAmountDifference, setMaxAmountDifference] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [state, setState] = useState<ComponentState>("loading");
  const [metaData, setMetaData] = useState<BitcoinVNMetadata | null>(null);
  const [quote, setQuote] = useState<BitcoinVNQuote | null>(null);
  const [prevAmount, setPrevAmount] = useState<number>(amount);

  const { t: tCrossborder } = useTranslation("crossborder");

  useEffect(() => {
    setState("loading");
    getBitcoinVNMetaData()
      .then((data) => {
        setMetaData(data);
      })
      .catch((error) => {
        sendErrorReport("BitcoinVNQuote - Fetching metadata failed", error);
        setState("error");
      });
  }, []);

  useEffect(() => {
    if (!metaData) {
      setState("loading");
      setIsDisabled(true);
      return;
    }

    if (prevAmount !== amount) {
      setQuote(null);
      setPrevAmount(amount);
      setState("loading-quote");
    }

    if (amount <= 0) {
      setIsDisabled(true);
      setMinAmountDifference(0);
      setMaxAmountDifference(0);
      setState("metadata-loaded");
      return;
    }

    if (amount < metaData.min) {
      setMinAmountDifference(metaData.min - amount);
      setMaxAmountDifference(0);
      setIsDisabled(true);
      setState("metadata-loaded");
    } else if (amount > metaData.max) {
      setMinAmountDifference(0);
      setMaxAmountDifference(amount - metaData.max);
      setIsDisabled(true);
      setState("metadata-loaded");
    } else {
      setMinAmountDifference(0);
      setMaxAmountDifference(0);
      setIsDisabled(false);

      if (!quote && state !== 'loading-quote' && state !== 'loaded') {
        setState("loading-quote");
        getBitcoinVNQuote(amount)
          .then((res) => {
            setQuote(res);
            setState("loaded");
          })
          .catch((err) => {
            sendErrorReport("BitcoinVNQuote - Fetching quote failed", err);
            setState("error");
          });
      } else if (quote && state !== 'loaded') {
        setState('loaded');
      }
    }
  }, [amount, metaData, prevAmount, quote, state]);

  const depositCurrency = method?.acceptedCrypto || "USDC";

  return (
    <div className="mb-2">
      <div
        className={`p-4 rounded-md flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-start sm:items-center cursor-pointer transition-colors duration-150 ease-in-out ${
          selectedMethod?.id === method.id
            ? "bg-uhuBlue text-white ring-2 ring-uhuBlue ring-offset-1"
            : "bg-uhuGray text-gray-800 hover:bg-gray-200"
        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => !isDisabled && handleSelect(method)}
        aria-disabled={isDisabled}
        role="button"
      >
        <h3 className="text-lg font-semibold flex-shrink-0">{method.name}</h3>

        <div className="flex flex-col items-end text-right flex-grow min-w-0">
          {(state === "loading" || state === "loading-quote") && <MiniLoader />}
          {state === "error" && (
            <p className="text-sm text-red-500 font-medium">
              {tCrossborder("methods.bitcoinvn.error")}
            </p>
          )}

          {minAmountDifference > 0 && (
            <p className="text-sm text-red-500">
              {tCrossborder("methods.bitcoinvn.addAmountToReachMin", {
                amount: minAmountDifference.toFixed(2),
                currency: depositCurrency,
              })}
            </p>
          )}
          {maxAmountDifference > 0 && (
            <p className="text-sm text-red-500">
              {tCrossborder("methods.bitcoinvn.reduceAmountBelowMax", {
                amount: maxAmountDifference.toFixed(2),
                currency: depositCurrency,
              })}
            </p>
          )}

          {state === "loaded" && quote && !isDisabled && (
            <div className="text-sm flex flex-col sm:flex-row sm:gap-4">
              <span>
                <strong>{tCrossborder("methods.bitcoinvn.payoutAmountLabel")}</strong>{" "}
                {quote.settleAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                {" "}
                {quote.settleMethod.toUpperCase()}
              </span>
              <span>
                <strong>{tCrossborder("methods.bitcoinvn.feeLabel")}</strong>{" "}
                {quote.depositFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                {" "}
                {quote.depositMethod.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {metaData && (
        <div className="flex items-end justify-end gap-2 text-xs text-gray-500 mt-1 px-1">
          <span>
            <strong>{tCrossborder("methods.bitcoinvn.minAmountLabel")}</strong>{" "}
            {metaData.min.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {depositCurrency}
          </span>
          <span>
            <strong>{tCrossborder("methods.bitcoinvn.maxAmountLabel")}</strong>{" "}
            {metaData.max.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {depositCurrency}
          </span>
        </div>
      )}
    </div>
  );
} 