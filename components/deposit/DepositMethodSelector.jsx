import MiniLoader from "@/tokenPayLib/components/UI/MiniLoader";
import { useEffect, useState, useCallback } from "react";
import { IoWarning } from "react-icons/io5";
import axios from "axios";
import {
  getFiatCurrencySymbol,
  getFiatCurrencyCode,
} from "@/tokenPayLib/utilities/stableCoinsMaps";
import { useTranslation } from "react-i18next";
import { getMetaData, getQuote } from "@/tokenPayLib/utilities/partner/bitcoinvn";
import { sendErrorReport } from "@/context/UserContext";
import duplicateByPaymentModality from "@/tokenPayLib/utilities/crossborder/duplicateByPaymentModality";
import { getSwyptQuote } from "../crossborder/methods/SwyptQuote"; // Ensure this path is correct

export default function DepositMethodSelector({
  methods,
  amount,
  selectedMethod,
  setSelectedMethod,
  startCurrency,
  endCurrency,
}) {
  // Keep 't' from common if needed for other translations like modality names
  const { t } = useTranslation("common");
  // Get tCrossborder for specific component texts
  const { t: tCrossborder } = useTranslation("crossborder");
  const [loading, setLoading] = useState(false); // Start not loading until amount > 0
  const [modalityMethodMap, setModalityMethodMap] = useState(null);
  const [error, setError] = useState(null);

  // ###################
  // # Component Logic #
  // ###################

  const fetchExchangeRate = useCallback(
    async (startCurrency, endCurrencyCode) => {
      // Renamed endCurrency parameter to endCurrencyCode for clarity
      try {
        const response = await axios.post(`/api/fiatTransaction/exchangeRate`, {
          startCurrency,
          endCurrency: endCurrencyCode, // Use the code here
        });

        return response.data.rate;
      } catch (error) {
        sendErrorReport(
          "DepositMethodSelector - Fetching exchange rate failed",
          error
        );
        console.error("Error fetching exchange rate:", error);
        return null;
      }
    },
    [] // Dependencies removed as start/end currency codes are passed directly now
  );

  useEffect(() => {
    const update = async () => {
      setLoading(true);
      setError(null); // Reset error on new update
      setSelectedMethod(null);
      setModalityMethodMap(null); // Clear previous map

      const endCurrencyCode = getFiatCurrencyCode(endCurrency); // Get code once

      // Fetch the current exchange rate
      const exchangeRate = await fetchExchangeRate(startCurrency, endCurrencyCode);

      if (!exchangeRate) {
        setError(tCrossborder("deposit.depositmethodselector.errorExchangeRate")); // Use translation key
        setLoading(false);
        return;
      }

      const sortedMethods = {};
      // Use optional chaining in case methods is null/undefined
      let filledInPartners = duplicateByPaymentModality(
        methods || [], // Ensure methods is an array
        "onrampModality"
      );

      // Use Promise.all to fetch quotes concurrently
      const methodPromises = filledInPartners.map(async (method) => {
        let predictedOnrampAmount = 0;
        let minAmount = method.onrampMinAmount;
        let maxAmount = method.onrampMaxAmount;
        let apiError = null; // Track API errors per method

        try { // Wrap API calls in try-catch
          switch (method.type) {
            case "swypt":
              if (amount >= minAmount && amount <= maxAmount) {

                console.log("Fetching Swypt data with", startCurrency, );
                const swyptQuoteRes = await getSwyptQuote(
                  amount,
                  startCurrency,
                  endCurrency, // Use code
                  "Polygon", // Consider making chain dynamic if needed
                  "onramp"
                );

                const swyptQuote = swyptQuoteRes?.data; // Use optional chaining

                if (swyptQuote && swyptQuote.outputAmount) {
                  predictedOnrampAmount =
                    swyptQuote.outputAmount -
                    swyptQuote.outputAmount * 0.004; // Assuming 0.4% fee post-quote
                } else {
                  // Fallback if quote fails or lacks data
                  predictedOnrampAmount =
                    amount * exchangeRate -
                    amount * exchangeRate * (method.onrampFee / 100) - // Assuming onrampFee is percentage
                    amount * exchangeRate * 0.004;
                }
              }
              break;
            case "bitcoin_vn": {
              const bitcoinVNMeta = await getMetaData({
                depositMethod: startCurrency,
                settleMethod: endCurrency,
              });

              if (bitcoinVNMeta) {
                 minAmount = bitcoinVNMeta.min; // Update method-specific limits
                 maxAmount = bitcoinVNMeta.max;
                 // Optionally update the method object itself if needed elsewhere:
                 // method.onrampMinAmount = minAmount;
                 // method.onrampMaxAmount = maxAmount;
              }

              if (amount >= minAmount && amount <= maxAmount) {
                const bitcoinVNQoute = await getQuote({
                  depositMethod: startCurrency,
                  settleMethod: endCurrency,
                  depositAmount: amount,
                });

                if (bitcoinVNQoute && bitcoinVNQoute.settleAmount) {
                  predictedOnrampAmount =
                    bitcoinVNQoute.settleAmount -
                    bitcoinVNQoute.settleAmount * 0.004; // Assuming 0.4% fee post-quote
                } else {
                  // Fallback
                   predictedOnrampAmount =
                    amount * exchangeRate -
                    amount * exchangeRate * (method.onrampFee / 100) - // Use configured fee
                    amount * exchangeRate * 0.004;
                }
              }
              break;
            }
            case "unlimit":
            case "onramp_money": {
              if (amount >= minAmount && amount <= maxAmount) {
                 predictedOnrampAmount =
                  amount * exchangeRate -
                  amount * exchangeRate * (method.onrampFee / 100);
              }
              break;
            }
            default: {
              if (amount >= minAmount && amount <= maxAmount) {
                predictedOnrampAmount =
                  amount * exchangeRate -
                  amount * exchangeRate * 0.004 - // General fee assumption
                  amount * exchangeRate * (method.onrampFee / 100); // Configured fee
              }
              break;
            }
          }
        } catch(err) {
            console.error(`Error processing method ${method.name} (${method.type}):`, err);
            // Set a flag or specific value to indicate an error for this method's prediction
            predictedOnrampAmount = -1; // Or some other indicator
            apiError = tCrossborder("deposit.depositmethodselector.errorApiMethod", { methodType: method.type }); // Set specific error message
        }

        // Return processed data for aggregation
        return {
            ...method, // Keep original method data
            predictedOnrampAmount,
            onrampMinAmount: minAmount, // Ensure updated limits are returned
            onrampMaxAmount: maxAmount,
            apiError // Include potential error message
        };
      });

      // Wait for all method processing to complete
      const processedMethods = await Promise.all(methodPromises);

      // Aggregate results into sortedMethods map
      processedMethods.forEach((method) => {
        if (!method) return; // Skip if something went wrong

        const modality = method.onrampModality;
        if (!sortedMethods[modality]) {
          sortedMethods[modality] = {
            methods: [],
            cheapestMethod: null,
            nextLowerLimitMethod: null,
            nextMethodWithLimit: null,
            hasApiError: false, // Flag if any method in modality failed
          };
        }

        // Add the processed method
        sortedMethods[modality].methods.push(method);
        if (method.apiError) {
            sortedMethods[modality].hasApiError = true; // Mark modality if any method had API error
        }

         // Logic to determine cheapest, next lower, next higher
         // Run this *after* all methods for a modality are collected
      });

       // --- Refined Logic to find cheapest/next after processing all methods ---
       for (const modality in sortedMethods) {
            let cheapest = null;
            let nextLower = null;
            let nextHigher = null;

            sortedMethods[modality].methods.forEach(method => {
                 // Skip methods that had an API error during quote fetch
                if (method.apiError) return;

                // Check for Cheapest (positive prediction, within limits implicitly checked by prediction > 0)
                if (method.predictedOnrampAmount > 0) {
                    if (!cheapest || method.predictedOnrampAmount > cheapest.predictedOnrampAmount) {
                        cheapest = method;
                    }
                } else { // predictedOnrampAmount <= 0 or -1 (API error handled above)
                    // Check for Next Higher Limit (amount is BELOW min)
                    if (amount < method.onrampMinAmount) {
                       if (!nextHigher || method.onrampMinAmount < nextHigher.onrampMinAmount) {
                            // Find the one with the *lowest* minimum amount above the current amount
                           nextHigher = method;
                       }
                    }
                    // Check for Next Lower Limit (amount is ABOVE max)
                    else if (amount > method.onrampMaxAmount) {
                        if (!nextLower || method.onrampMaxAmount > nextLower.onrampMaxAmount) {
                            // Find the one with the *highest* maximum amount below the current amount
                           nextLower = method;
                        }
                    }
                }
            });

            sortedMethods[modality].cheapestMethod = cheapest;
            sortedMethods[modality].nextLowerLimitMethod = nextLower;
            sortedMethods[modality].nextMethodWithLimit = nextHigher; // Renamed for clarity (next higher limit needed)
       }
       // --- End Refined Logic ---


      setModalityMethodMap(sortedMethods);
      setLoading(false);
    };

    if (amount > 0 && startCurrency && endCurrency) {
      update();
    } else {
      setLoading(false); // Ensure loading stops if amount is 0 or currencies missing
      setModalityMethodMap(null); // Clear map if amount is 0
    }
    // Dependencies adjusted: fetchExchangeRate is stable due to useCallback([])
  }, [amount, startCurrency, endCurrency, fetchExchangeRate, setSelectedMethod, tCrossborder]); // Added tCrossborder


  // ####################
  // # Render Functions #
  // ####################

  const renderHeader = () => (
    <h2 className="text-xl font-bold mb-2 mt-8">
      {tCrossborder("deposit.depositmethodselector.header")}
    </h2>
  );

  const renderPromptEnterAmount = () => (
    <div className="flex p-4 border w-full rounded items-center justify-between">
      <div className="text-sm font-medium text-gray-700"> {/* Adjusted styling */}
        {tCrossborder("deposit.depositmethodselector.promptEnterAmount")}
      </div>
      <IoWarning className="text-gray-500 text-xl" /> {/* Adjusted styling */}
    </div>
  );

  const renderLoading = () => (
    <div>
      {/* Simplified loading indicator */}
      <div className='flex p-4 border w-full rounded items-center gap-3'>
          <MiniLoader />
          <div className='text-sm text-gray-600'>
           {tCrossborder("deposit.depositmethodselector.loadingMessage")}
          </div>
      </div>
    </div>
  );

   const renderError = () => (
    <div className='flex p-4 border border-red-300 bg-red-50 w-full rounded items-center gap-3'>
       <IoWarning className="text-red-500 text-xl" />
       <div className='text-sm text-red-700 font-medium'>
         {error || tCrossborder("deposit.depositmethodselector.errorGeneral")} {/* Display specific or general error */}
       </div>
   </div>
   );


  const renderOnrampMethods = () => {
    if (!modalityMethodMap || Object.keys(modalityMethodMap).length === 0) {
      // Handle case where no methods are processed or available
      return <div className="text-sm text-gray-500 mt-4">{tCrossborder("deposit.depositmethodselector.noMethodsConfigured")}</div>;
    }

    const endCurrencyCode = getFiatCurrencyCode(endCurrency); // Get code once for rendering
    const endCurrencySymbol = getFiatCurrencySymbol(endCurrencyCode); // Get symbol once

    return Object.keys(modalityMethodMap).map((modality) => {
      const {
        cheapestMethod,
        nextLowerLimitMethod,
        nextMethodWithLimit, // This is the next *higher* limit
        hasApiError, // Use the flag
      } = modalityMethodMap[modality];

      const isSelected = selectedMethod && selectedMethod.onrampModality === modality;
      const canSelect = !!cheapestMethod; // Can only select if there's a valid cheapest method for the amount

      // Calculate differences only if needed
      const lowerLimitDiff = nextLowerLimitMethod
        ? (amount - nextLowerLimitMethod.onrampMaxAmount)
        : 0;
      const higherLimitDiff = nextMethodWithLimit
        ? (nextMethodWithLimit.onrampMinAmount - amount)
        : 0;

      return (
        <div key={modality} className="bg-white w-full mt-4">
          <div
            onClick={() => canSelect && setSelectedMethod(cheapestMethod)}
            className={`border flex flex-col sm:flex-row p-4 gap-2 items-start sm:items-center border-gray-200 rounded-md transition-colors duration-150 ${
              isSelected
                ? "bg-uhuBlue text-white ring-2 ring-uhuBlue ring-offset-1" // Clearer selection
                : canSelect
                ? "text-gray-800 hover:bg-gray-100 cursor-pointer" // Hover only if selectable
                : "text-gray-500 bg-gray-50 border-gray-200" // Visually distinct non-selectable
            }`}
            aria-disabled={!canSelect}
            role={canSelect ? "button" : undefined} // Role only if clickable
          >
            {/* Modality Name */}
            <h3
              className={`text-lg sm:text-xl font-bold flex-shrink-0 ${
                !canSelect && "text-gray-400" // Dim name if not selectable
              }`}
            >
              {t(modality)} {/* Assuming modality name comes from 'common' */}
            </h3>

            {/* Details Section */}
            <div className="flex flex-col items-start sm:items-end sm:text-right flex-grow w-full sm:w-auto">
              {/* Cheapest Method Info */}
              {cheapestMethod ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-3 gap-y-1 w-full">
                   <div className="text-xs bg-uhuBlue text-white px-1.5 py-0.5 rounded font-medium w-fit"> {/* Improved label */}
                    {tCrossborder("deposit.depositmethodselector.viaLabel")}{" "}
                    <span className='font-bold'>{cheapestMethod.name}</span>
                   </div>
                   <div className="text-sm sm:text-base">
                    {tCrossborder("deposit.depositmethodselector.approxLabel")}{" "}
                    <span className='font-bold'>
                      {cheapestMethod.predictedOnrampAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })} {/* Format number */}
                      {" " + endCurrencySymbol}
                    </span>
                  </div>
                </div>
              ) : hasApiError ? ( // Check if any method under this modality had API error
                 <div className='bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs font-medium w-fit'>
                    {tCrossborder("deposit.depositmethodselector.errorApiModality")}
                 </div>
              ) : ( // No cheapest and no specific API error flagged for modality
                 <div className='bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-xs font-medium w-fit'>
                   {tCrossborder("deposit.depositmethodselector.noMethodAvailable")}
                 </div>
              )}

              {/* Limit Messages - shown only if there's NO cheapest method */}
              {!cheapestMethod && nextLowerLimitMethod && (
                <p className='text-xs text-red-600 mt-1 text-right w-full'>
                  {tCrossborder("deposit.depositmethodselector.amountExceedsMaxBy", {
                    difference: lowerLimitDiff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    currency: getFiatCurrencySymbol(startCurrency), // Use start currency symbol
                  })}
                </p>
              )}
              {!cheapestMethod && nextMethodWithLimit && (
                <p className='text-xs text-blue-600 mt-1 text-right w-full'>
                  {tCrossborder("deposit.depositmethodselector.amountUntilNextMethod", {
                    difference: higherLimitDiff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    currency: getFiatCurrencySymbol(startCurrency), // Use start currency symbol
                  })}
                </p>
              )}
            </div> {/* End Details Section */}
          </div>
        </div>
      );
    });
  };

  // ################
  // # Render Logic #
  // ################

  return (
    <div className="w-full"> {/* Ensure component takes full width */}
      {renderHeader()}
      {amount <= 0
        ? renderPromptEnterAmount()
        : loading
        ? renderLoading()
        : error // Check for global errors first (e.g., exchange rate)
        ? renderError()
        : renderOnrampMethods()}
    </div>
  );
}