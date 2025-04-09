import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Assuming useTranslation is used for tCrossborder
import MiniLoader from "@/tokenPayLib/components/UI/MiniLoader";
import { sendErrorReport } from "@/context/UserContext";

/**
 * Get the metadata for BitcoinVN transactions
 * @returns {Promise<{min: number, max: number}>}
 */
export async function getBitcoinVNMetaData() {
  try {
    const result = await axios.get(
      "/api/fiatTransaction/bitcoinVN/getMetaData"
    );
    return result.data;
  } catch (error) {
    // Keep error reporting using sendErrorReport if needed, but avoid duplicate logging
    console.error("Error fetching BitcoinVN metadata:", error); // Log simpler message
    throw error; // Re-throw for caller handling
  }
}

/**
 * Get a quote for a BitcoinVN transaction
 * @param {number} amount - The amount to deposit
 * @returns {Promise<{depositAmount: number, depositMethod: string, depositFee: number, settleAmount: number, settleMethod: string}>}
 */
export async function getBitcoinVNQuote(amount) {
  try {
    const result = await axios.post("/api/fiatTransaction/bitcoinVN/quote", {
      depositAmount: amount,
      settleAmount: null, // Explicitly setting null as per original code
    });
    return result.data;
  } catch (error) {
    // Keep error reporting using sendErrorReport if needed
    console.error("Error fetching BitcoinVN quote:", error); // Log simpler message
    throw error; // Re-throw for caller handling
  }
}

export default function BitcoinVNQuote({
  method,
  amount,
  selectedMethod,
  handleSelect,
}) {
  const [minAmountDifference, setMinAmountDifference] = useState(0);
  const [maxAmountDifference, setMaxAmountDifference] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true); // Start as disabled until checks pass
  const [state, setState] = useState("loading"); // Initial state: loading metadata
  const [metaData, setMetaData] = useState(null);
  const [quote, setQuote] = useState(null);
  const [prevAmount, setPrevAmount] = useState(amount); // Track previous amount

  // Use the translation hook
  const { t: tCrossborder } = useTranslation("crossborder");

  // --- Fetch Metadata ---
  useEffect(() => {
    setState("loading"); // Ensure loading state is set
    getBitcoinVNMetaData()
      .then((data) => {
        setMetaData(data);
        // Don't set state to metadata-loaded here yet, wait for amount check
      })
      .catch((error) => {
        sendErrorReport("BitcoinVNQuote - Fetching metadata failed", error); // Keep specific error reporting if desired
        // console.error already happened in getBitcoinVNMetaData
        setState("error");
      });
  }, []); // Fetch metadata only once on mount

  // --- Handle Amount Changes and Fetch Quote ---
  useEffect(() => {
    // Don't proceed if metadata hasn't loaded yet
    if (!metaData) {
        setState("loading"); // Remain in loading state if metadata is not ready
        setIsDisabled(true);
        return;
    }

    // Reset quote if the amount actually changes
    if (prevAmount !== amount) {
      setQuote(null); // Clear previous quote
      setPrevAmount(amount); // Update tracked amount
      setState("loading-quote"); // Indicate quote needs loading (or re-evaluation)
    }

    // Basic validation: amount must be positive
    if (amount <= 0) {
      setIsDisabled(true);
      setMinAmountDifference(0); // Reset differences
      setMaxAmountDifference(0);
      // Decide if you need a specific state for invalid amount,
      // or if just being disabled is enough. 'metadata-loaded' could be okay here.
      setState("metadata-loaded"); // Or a new state like 'invalid-amount'
      return;
    }

    // Check amount against limits from metadata
    if (amount < metaData.min) {
      setMinAmountDifference(metaData.min - amount);
      setMaxAmountDifference(0);
      setIsDisabled(true);
      setState("metadata-loaded"); // Ready, but disabled due to limits
    } else if (amount > metaData.max) {
      setMinAmountDifference(0);
      setMaxAmountDifference(amount - metaData.max);
      setIsDisabled(true);
      setState("metadata-loaded"); // Ready, but disabled due to limits
    } else {
      // Amount is within valid range
      setMinAmountDifference(0);
      setMaxAmountDifference(0);
      setIsDisabled(false); // Enable selection

      // Fetch quote only if not already loaded for the current valid amount
      // Check if state is not already 'loaded' or 'loading-quote' to prevent redundant calls
      // Only proceed if quote is null (meaning amount changed or first load within range)
      // or if state implies we need a quote fetch (e.g., state === 'metadata-loaded' after limits passed)
      if (!quote && state !== 'loading-quote' && state !== 'loaded') {
          setState("loading-quote");
          getBitcoinVNQuote(amount)
            .then((res) => {
              setQuote(res);
              setState("loaded"); // Quote successfully loaded
            })
            .catch((err) => {
              sendErrorReport("BitcoinVNQuote - Fetching quote failed", err);
              // console.error already happened in getBitcoinVNQuote
              setState("error"); // Error fetching quote
            });
      } else if (quote && state !== 'loaded') {
          // If quote exists but state is not 'loaded', transition to 'loaded'
          setState('loaded');
      } else if (!quote && state === 'loading-quote') {
          // If still loading quote, do nothing, wait for promise to resolve/reject
      }
    }
  }, [amount, metaData, prevAmount, quote, state]); // Add quote and state to dependencies for accurate transitions

  // --- Determine Display Currency ---
  // Assuming method.currency holds the deposit currency (e.g., 'USDC')
  const depositCurrency = method?.currency || "USDC"; // Fallback if needed

  return (
    <div className="mb-2"> {/* Add some margin-bottom for spacing */}
      <div
        className={`p-4 rounded-md flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-start sm:items-center cursor-pointer transition-colors duration-150 ease-in-out ${
          selectedMethod?.id === method.id // Use a unique identifier like method.id if available
            ? "bg-uhuBlue text-white ring-2 ring-uhuBlue ring-offset-1" // Clearer selection style
            : "bg-uhuGray text-gray-800 hover:bg-gray-200" // Hover effect for non-selected
        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`} // Style disabled state
        onClick={() => !isDisabled && handleSelect(method)}
        aria-disabled={isDisabled} // Accessibility
        role="button" // Accessibility
      >
        {/* Left Side: Method Name */}
        <h3 className="text-lg font-semibold flex-shrink-0">{method.name}</h3>

        {/* Right Side: Status and Details */}
        <div className="flex flex-col items-end text-right flex-grow min-w-0"> {/* Allow shrinking */}
          {/* Loader or Error */}
          {(state === "loading" || state === "loading-quote") && <MiniLoader />}
          {state === "error" && (
            <p className="text-sm text-red-500 font-medium">
              {tCrossborder("methods.bitcoinvn.error")}
            </p>
          )}

          {/* Amount Validation Messages */}
          {minAmountDifference > 0 && (
            <p className="text-sm text-red-500">
              {tCrossborder("methods.bitcoinvn.addAmountToReachMin", {
                amount: minAmountDifference.toFixed(2),
                currency: depositCurrency, // Pass currency for context
              })}
            </p>
          )}
          {maxAmountDifference > 0 && (
            <p className="text-sm text-red-500">
              {tCrossborder("methods.bitcoinvn.reduceAmountBelowMax", {
                amount: maxAmountDifference.toFixed(2),
                currency: depositCurrency, // Pass currency for context
              })}
            </p>
          )}

          {/* Quote Details (only show if loaded and not disabled) */}
          {state === "loaded" && quote && !isDisabled && (
            <div className="text-sm flex flex-col sm:flex-row sm:gap-4">
              <span> {/* Use span for inline behaviour by default */}
                <strong>{tCrossborder("methods.bitcoinvn.payoutAmountLabel")}</strong>{" "}
                {quote.settleAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {/* Format number */}
                {" "}
                {quote.settleMethod.toUpperCase()}
              </span>
              <span>
                <strong>{tCrossborder("methods.bitcoinvn.feeLabel")}</strong>{" "}
                {/* Use quote.depositFee, ensure it's the fee in deposit currency */}
                {quote.depositFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })} {/* Allow more decimals for crypto fees */}
                {" "}
                {quote.depositMethod.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Min and Max Values Display (always show if metadata loaded) */}
      {metaData && (
        <div className="flex items-end justify-end gap-2 text-xs text-gray-500 mt-1 px-1"> {/* Subtle styling */}
          <span> {/* Use span for better flex alignment */}
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