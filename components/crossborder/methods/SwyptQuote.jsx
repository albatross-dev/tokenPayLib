import axios from "axios";
import React, { useEffect, useState } from "react";
import MiniLoader from "@/tokenPayLib/components/UI/MiniLoader";
import { sendErrorReport } from "@/context/UserContext";
import { useTranslation } from "react-i18next";

/**
 * Get a quote for a Swypt onramp transaction (Fiat to Crypto)
 * @param {number|string} amount - The amount in fiat currency to convert
 * @param {string} fiatCurrency - Fiat currency code (e.g., "KES")
 * @param {string} cryptoCurrency - Cryptocurrency symbol (e.g., "USDT")
 * @param {string} network - Blockchain network (e.g., "Polygon", "Celo")
 * @returns {Promise<{settleAmount: number, rate: number, depositFee: number, depositAmount: number}>}
 */
export async function getSwyptQuote(amount, fiatCurrency = "KES", cryptoCurrency = "USDC", network = "Polygon", type = "offramp") {
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
}) {
  const [minAmountDifference, setMinAmountDifference] = useState(0);
  const [maxAmountDifference, setMaxAmountDifference] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true); // Start disabled
  const [state, setState] = useState("idle"); // Initial state
  const [quote, setQuote] = useState(null);
  const [prevAmount, setPrevAmount] = useState(amount);

  const { t: tCrossborder } = useTranslation("crossborder");

  // Static metadata for Swypt (as provided in the original code)
  // In a real scenario, this might be fetched asynchronously
  const metaData = {
    min: 10, // example min
    max: 1000, // example max
  };

  // Effect to handle amount changes and quote fetching
  useEffect(() => {
    // Reset quote if the amount actually changes
    if (prevAmount !== amount) {
      setQuote(null); // Clear previous quote
      setPrevAmount(amount); // Update tracked amount
      setState("idle"); // Reset state when amount changes, triggering re-evaluation
    }

    // Basic validation: amount must be positive
    if (!amount || amount <= 0) {
      setIsDisabled(true);
      setMinAmountDifference(0); // Reset differences
      setMaxAmountDifference(0);
      setState("idle"); // Stay idle or specific invalid state if needed
      return;
    }

    // Check amount against limits (using the static metaData here)
    if (amount < metaData.min) {
      setMinAmountDifference(metaData.min - amount);
      setMaxAmountDifference(0);
      setIsDisabled(true);
      setState("limit-issue"); // State indicating limits are the problem
    } else if (amount > metaData.max) {
      setMinAmountDifference(0);
      setMaxAmountDifference(amount - metaData.max);
      setIsDisabled(true);
      setState("limit-issue"); // State indicating limits are the problem
    } else {
      // Amount is within valid range
      setMinAmountDifference(0);
      setMaxAmountDifference(0);
      setIsDisabled(false); // Enable selection

      // Fetch quote only if amount is valid and quote is not already loaded/loading
      if (!quote && state !== "loading-quote" && state !== "loaded") {
        setState("loading-quote");
        getSwyptQuote(amount) // Assuming this function takes the amount
          .then((res) => {
            setQuote(res);
            setState("loaded"); // Quote successfully loaded
          })
          .catch((err) => {
            sendErrorReport("SwyptQuote - Fetching quote failed", err);
            console.error("Error fetching Swypt quote:", err);
            setState("error"); // Error fetching quote
          });
      } else if (quote && state !== 'loaded' && state !== 'loading-quote') {
         // If a quote exists from previous state but state isn't loaded/loading, set to loaded
         setState('loaded');
      }
    }
  }, [amount, prevAmount, quote, state, metaData]); // Include metaData if it becomes dynamic

  // Determine Display Currency (assuming deposit is USDC as per min/max labels)
  const depositCurrency = method?.currency || "USDC"; // Use method currency or fallback

  return (
    <div className="mb-2">
      <div
        className={`p-4 rounded-md flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-start sm:items-center cursor-pointer transition-colors duration-150 ease-in-out ${
          selectedMethod?.id === method.id // Use a unique identifier
            ? "bg-uhuBlue text-white ring-2 ring-uhuBlue ring-offset-1"
            : "bg-uhuGray text-gray-800 hover:bg-gray-200"
        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => !isDisabled && handleSelect(method)}
        aria-disabled={isDisabled}
        role="button"
      >
        {/* Left Side: Method Name */}
        <h3 className="text-lg font-semibold flex-shrink-0">{method.name}</h3>

        {/* Right Side: Status and Details */}
        <div className="flex flex-col items-end text-right flex-grow min-w-0">
          {/* Loader or Error */}
          {state === "loading-quote" && <MiniLoader />}
          {state === "error" && (
            <p className="text-sm text-red-500 font-medium">
              {tCrossborder("methods.swypt.error")}
            </p>
          )}

          {/* Amount Validation Messages (only show if state reflects limit issue) */}
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

          {/* Quote Details (only show if loaded and not disabled) */}
          {state === "loaded" && quote && !isDisabled && (
            <div className="text-sm flex flex-col sm:flex-row sm:gap-4">
              <span>
                <strong>{tCrossborder("methods.swypt.payoutAmountLabel")}</strong>{" "}
                {/* Adjust access based on actual quote structure */}
                {quote.fee?.details?.estimatedOutputKES?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "N/A"}
                {" "}
                {quote.settleMethod?.toUpperCase() || ""} {/* Use appropriate settlement currency key */}
              </span>
              <span>
                <strong>{tCrossborder("methods.swypt.feeLabel")}</strong>{" "}
                 {/* Adjust access based on actual quote structure */}
                {quote.fee?.details?.feeInKES?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "N/A"}
                {" "}
                {quote.depositMethod?.toUpperCase() || depositCurrency} {/* Use deposit currency key or fallback */}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Min and Max Values Display (always show as metadata is static) */}
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