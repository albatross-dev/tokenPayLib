import axios from "axios";
import React, { useEffect, useState } from "react";
import MiniLoader from "../../../components/UI/MiniLoader";
import { sendErrorReport } from "../../../../context/UserContext";
import { useTranslation } from "react-i18next";
import { PaymentTypesArray } from "../../../types/payload-types";

export interface SwyptQuoteResponse {
  inputAmount: string;
  outputAmount: number;
  inputCurrency: string;
  outputCurrency: string;
  exchangeRate: number;
  type: "onramp" | "offramp";
  network: string;
  fee?: {
    amount: number;
    currency: string;
    details?: {
      feeInKES: number;
      estimatedOutputKES: number;
    };
  };
}


interface SwyptQuoteProps {
  method: PaymentTypesArray[number];
  amount: number;
  selectedMethod: PaymentTypesArray[number] | null;
  handleSelect: (method: PaymentTypesArray[number]) => void;
}

type QuoteState = 'idle' | 'loading-quote' | 'loaded' | 'error' | 'limit-issue';

/**
 * Get a quote for a Swypt onramp transaction (Fiat to Crypto)
 */
export async function getSwyptQuote(
  amount: number | string,
  fiatCurrency: string = "KES",
  cryptoCurrency: string = "USDC",
  network: string = "Polygon",
  type: string = "offramp"
): Promise<SwyptQuoteResponse> {
  try {
    const result = await axios.post("https://pool.swypt.io/api/quotes", {
      type,
      amount: String(amount),
      fiatCurrency,
      cryptoCurrency,
      network,
    });
    return result.data;
  } catch (error) {
    sendErrorReport("SwyptQuote - Fetching quote failed", error);
    console.error("Error fetching Swypt quote:", error);
    throw error;
  }
}

/**
 * SwyptQuote component for fetching and displaying a crypto onramp quote
 */
export default function SwyptQuote({
  method,
  amount,
  selectedMethod,
  handleSelect,
}: SwyptQuoteProps) {
  const [minAmountDifference, setMinAmountDifference] = useState<number>(0);
  const [maxAmountDifference, setMaxAmountDifference] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [state, setState] = useState<QuoteState>("idle");
  const [quote, setQuote] = useState<SwyptQuoteResponse | null>(null);
  const [prevAmount, setPrevAmount] = useState<number>(amount);

  const { t: tCrossborder } = useTranslation("crossborder");

  // Static metadata for Swypt
  const metaData = {
    min: 10,
    max: 1000,
  };

  // Effect to handle amount changes and quote fetching
  useEffect(() => {
    if (prevAmount !== amount) {
      setQuote(null);
      setPrevAmount(amount);
      setState("idle");
    }

    if (!amount || amount <= 0) {
      setIsDisabled(true);
      setMinAmountDifference(0);
      setMaxAmountDifference(0);
      setState("idle");
      return;
    }

    if (amount < metaData.min) {
      setMinAmountDifference(metaData.min - amount);
      setMaxAmountDifference(0);
      setIsDisabled(true);
      setState("limit-issue");
    } else if (amount > metaData.max) {
      setMinAmountDifference(0);
      setMaxAmountDifference(amount - metaData.max);
      setIsDisabled(true);
      setState("limit-issue");
    } else {
      setMinAmountDifference(0);
      setMaxAmountDifference(0);
      setIsDisabled(false);

      if (!quote && state !== "loading-quote" && state !== "loaded") {
        setState("loading-quote");
        getSwyptQuote(amount)
          .then((res) => {
            setQuote(res);
            setState("loaded");
          })
          .catch((err) => {
            sendErrorReport("SwyptQuote - Fetching quote failed", err);
            console.error("Error fetching Swypt quote:", err);
            setState("error");
          });
      } else if (quote && state !== 'loaded' && state !== 'loading-quote') {
        setState('loaded');
      }
    }
  }, [amount, prevAmount, quote, state]);

  const depositCurrency = method?.acceptedCrypto;

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
          {state === "loading-quote" && <MiniLoader />}
          {state === "error" && (
            <p className="text-sm text-red-500 font-medium">
              {tCrossborder("methods.swypt.error")}
            </p>
          )}

          {state === "limit-issue" && minAmountDifference > 0 && (
            <p className="text-sm text-red-500">
              {tCrossborder("methods.swypt.addAmountToReachMin", {
                amount: minAmountDifference.toFixed(2),
                currency: depositCurrency,
              })}
            </p>
          )}
          {state === "limit-issue" && maxAmountDifference > 0 && (
            <p className="text-sm text-red-500">
              {tCrossborder("methods.swypt.reduceAmountBelowMax", {
                amount: maxAmountDifference.toFixed(2),
                currency: depositCurrency,
              })}
            </p>
          )}

          {state === "loaded" && quote && !isDisabled && (
            <div className="text-sm flex flex-col sm:flex-row sm:gap-4">
              <span>
                <strong>{tCrossborder("methods.swypt.payoutAmountLabel")}</strong>{" "}
                {quote.fee?.details?.estimatedOutputKES?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "N/A"}
                {" "}
                {quote.outputCurrency?.toUpperCase() || ""}
              </span>
              <span>
                <strong>{tCrossborder("methods.swypt.feeLabel")}</strong>{" "}
                {quote.fee?.details?.feeInKES?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "N/A"}
                {" "}
                {quote.outputCurrency?.toUpperCase() || depositCurrency}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-end justify-end gap-2 text-xs text-gray-500 mt-1 px-1">
        <span>
          <strong>{tCrossborder("methods.swypt.minAmountLabel")}</strong>{" "}
          {metaData.min.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {depositCurrency}
        </span>
        <span>
          <strong>{tCrossborder("methods.swypt.maxAmountLabel")}</strong>{" "}
          {metaData.max.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {depositCurrency}
        </span>
      </div>
    </div>
  );
}