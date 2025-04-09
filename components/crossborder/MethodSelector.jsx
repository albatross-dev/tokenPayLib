import React, { useEffect, useState } from "react";
import BitcoinVNQuote, {
  getBitcoinVNMetaData,
  getBitcoinVNQuote,
} from "./methods/BitcoinVNQuote";
import DefaultQuote from "./methods/DefaultQuote";
import MiniLoader from "@/tokenPayLib/components/UI/MiniLoader";
import { useTranslation } from "react-i18next";
import { IoWarning } from "react-icons/io5";
import SwyptQuote, { getSwyptQuote } from "./methods/SwyptQuote";

function QuoteSection({
  method,
  amount,
  selectable,
  selectedMethod,
  handleSelect,
}) {
  switch (method?.type) {
    case "bitcoin_vn":
      return (
        <BitcoinVNQuote
          method={method}
          amount={amount}
          selectedMethod={selectedMethod}
          handleSelect={handleSelect}
        />
      );
    case "swypt":
      return (
        <SwyptQuote
          method={method}
          amount={amount}
          selectedMethod={selectedMethod}
          handleSelect={handleSelect}
        />
      );
    default:
      return (
        <DefaultQuote
          selectable={selectable}
          method={method}
          amount={amount}
          selectedMethod={selectedMethod}
          handleSelect={handleSelect}
        />
      );
  }
}

export function MethodSelectorOld({
  selectable,
  methods,
  amount,
  selectedMethod,
  setSelectedMethod,
}) {
  const { t: tCrossborder } = useTranslation("crossborder");

  // check if the method are there
  if (!methods || methods.length === 0) {
    return null;
  }

  // Sort methods: recommended methods first, then by fee amount
  const sortedMethods = [...methods].sort((a, b) => {
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;
    return a.fee - b.fee;
  });

  const handleSelect = (method) => {
    if (selectable) {
      setSelectedMethod(method);
    }
  };

  return (
    <div className="space-y-4 bg-white w-full mt-4">
      <h2 className="text-xl font-bold mb-2">
        {tCrossborder("methodSelector.selectMethod")}
      </h2>
      {sortedMethods.map((method, index) => {
        return (
          <QuoteSection
            selectable={selectable}
            key={`${index}_${method.name}`}
            method={method}
            amount={amount}
            selectedMethod={selectedMethod}
            handleSelect={handleSelect}
          />
        );
      })}
    </div>
  );
}

export default function MethodSelector({
  selectable,
  methods,
  exchangeRate,
  loadedExchangeRate,
  finalCurrency,
  amount,
  sendingCurrency,
  selectedMethod,
  setSelectedMethod,
}) {
  const [sortedMethods, setSortedMethods] = useState({});
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function update() {
      setLoading(true);
      console.log("update started");
      // sort the methods by payment modality
      let sortedMethods = {};
      for (let method of methods) {
        if (!sortedMethods[method.withdrawModality]) {
          sortedMethods[method.withdrawModality] = {
            methods: [],
            cheapestMethod: null,
            nextLowerLimitMethod: null,
            nextMethodWithLimit: null,
          };
        }

        // calculate predicted amount and populate data
        switch (method.type) {
          case "bitcoin_vn":
            // set minAmount and maxAmount
            const bitcoinVNMetadata = await getBitcoinVNMetaData();
            method.minAmount = bitcoinVNMetadata.min;
            method.maxAmount = bitcoinVNMetadata.max;

            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
            } else {
              // applying poolbase fee of 0.4% to retreived amount
              const bitcoinVNQuote = await getBitcoinVNQuote(amount);
              method.predictedAmount =
                bitcoinVNQuote.settleAmount -
                bitcoinVNQuote.settleAmount * 0.004;
            }
            break;
          case "swypt":
            // Define min/max manually (adjust as needed)

            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
            } else {
              try {
                const swyptQuote = await getSwyptQuote(
                  amount,
                  "KES", // or dynamically selected
                  "USDC", // or dynamically selected
                  "Polygon" // or "Celo", etc.
                );

                console.log(
                  "swyptQuote",
                  swyptQuote,
                  "predictedAmount",
                  swyptQuote.data.outputAmount
                );

                // Apply your platform fee (0.4%)
                method.predictedAmount =
                  swyptQuote.data.outputAmount -
                  swyptQuote.data.outputAmount * 0.004;
              } catch (error) {
                console.error(
                  "SwyptQuote - Fehler beim Abrufen des Angebots:",
                  error
                );
                method.predictedAmount = 0;
              }
            }
            break;
          case "unlimit":
            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
              break;
            }
            // in the widget works without the basic pool fe, only the fee (%) and the exchange rate
            method.predictedAmount =
              amount * exchangeRate -
              amount * exchangeRate * (method.fee / 100);
            break;
          case "onramp_money":
            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
              break;
            }
            // in the widget works without the basic pool fe, only the fee (%) and the exchange rate
            method.predictedAmount =
              amount * exchangeRate -
              amount * exchangeRate * (method.fee / 100);
            break;
          default:
            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
              break;
            }
            /** in default case use base Pool fee of 0.4%, fee (%) and the exchange rate
             * this includes at the moment:
             * - ovex
             * - roma
             * - stasis
             * - stasis_crypto_only
             * - koywe_crypto_only
             * - koywe
             */

            method.predictedAmount =
              amount * exchangeRate -
              amount * exchangeRate * 0.004 -
              amount * exchangeRate * (method.fee / 100);
            break;
        }
        sortedMethods[method.withdrawModality].methods.push(method);
      }

      // set cheapest method and next method with limit

      for (let modality in sortedMethods) {
        const methodsInModality = sortedMethods[modality].methods; // Get the array of methods
        const numMethods = methodsInModality.length;

        // --- Special handling for only one method ---
        if (numMethods === 1) {
          const singleMethod = methodsInModality[0];

          // Check if the amount is within the single method's limits
          const withinLimits =
            amount >= singleMethod.minAmount &&
            amount <= singleMethod.maxAmount;

          if (withinLimits) {
            // Amount is within limits
            if (singleMethod.predictedAmount > 0) {
              // If prediction is positive, it's the cheapest
              sortedMethods[modality].cheapestMethod = singleMethod;
            } else {
              // If prediction is not positive, but amount is within limits,
              // it could be considered the 'next' option if no positive prediction exists.
              // Or, more accurately, it's the only option available, but not strictly 'cheapest' based on prediction.
              // Let's classify it as 'nextMethodWithLimit' in this scenario as it *can* handle the amount.
              sortedMethods[modality].nextMethodWithLimit = singleMethod;
            }
          } else if (amount < singleMethod.minAmount) {
            // Amount is BELOW the minimum required
            // This method is the only one, but you need to increase the amount.
            sortedMethods[modality].nextMethodWithLimit = singleMethod;
          } else {
            // amount > singleMethod.maxAmount
            // Amount is ABOVE the maximum allowed
            // This method is the only one, but it's a lower limit option.
            sortedMethods[modality].nextLowerLimitMethod = singleMethod;
          }
          continue; // Move to the next modality
        }

        // --- Original logic for 0 or 2+ methods ---
        let cheapestMethod = null;
        let nextMethodWithLimit = null;
        // Find cheapest method (positive predicted amount) and next method with limit (zero predicted amount)
        for (let method of methodsInModality) {
          if (method.predictedAmount > 0) {
            // This is a potential cheapest method
            if (
              !cheapestMethod ||
              method.predictedAmount > cheapestMethod.predictedAmount
            ) {
              cheapestMethod = method;
            }
          } else {
            // This is a potential next method if amount exceeds its prediction (or prediction is 0/negative)
            // Check if the requested amount fits within this method's limits
            if (
              method.maxAmount >= amount && // Can handle the amount
              (!nextMethodWithLimit || // Either the first one found...
                method.minAmount < nextMethodWithLimit.minAmount) // ...or has a lower minimum requirement
              // Consider if fee comparison is better here if minAmount isn't the deciding factor
            ) {
              nextMethodWithLimit = method;
            }
          }
        }
        sortedMethods[modality].cheapestMethod = cheapestMethod;
        sortedMethods[modality].nextMethodWithLimit = nextMethodWithLimit;

        // get the method with the closest upper limit, that is below our amount
        let nextLowerLimitMethod = null;
        for (let method of methodsInModality) {
          // Check methods whose maximum is less than or equal to the amount
          if (
            method.maxAmount <= amount &&
            (!nextLowerLimitMethod || // Either the first one found...
              method.maxAmount > nextLowerLimitMethod.maxAmount) // ...or its max is closer (higher) than the current best
          ) {
            nextLowerLimitMethod = method;
          }
        }

        sortedMethods[modality].nextLowerLimitMethod = nextLowerLimitMethod;
      }

      console.log("sortedMethods", sortedMethods);
      setSortedMethods(sortedMethods);
      setLoading(false);
    }

    console.log("update", methods, amount, exchangeRate);

    if ((methods, amount, exchangeRate, loadedExchangeRate)) {
      console.log("update", methods, amount, exchangeRate);
      update();
    }
  }, [methods, amount, exchangeRate]);

  if (!loadedExchangeRate) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2 mt-8">
          {tCrossborder("methodSelector.selectMethod")}
        </h2>
        <div className="flex p-4 border w-full rounded">
          <div className="flex text-xl font-bold items-center gap-2 flex-1">
            <div className=" text-sm px-2 rounded">
              {tCrossborder("methodSelector.loadingExchangeRates")}
            </div>
          </div>
          <div className="flex flex-row items-center font-bold gap-6">
            <IoWarning className="text-gray-600" />
          </div>
        </div>
      </div>
    );
  }

  if (!selectable) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2 mt-8">
          {tCrossborder("methodSelector.selectMethod")}
        </h2>
        <div className="flex p-4 border w-full rounded">
          <div className="flex text-xl font-bold items-center gap-2 flex-1">
            <div className=" text-sm px-2 rounded">
              {tCrossborder("methodSelector.selectAmount")}
            </div>
          </div>
          <div className="flex flex-row items-center font-bold gap-6">
            <IoWarning className="text-gray-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 mt-8">
        {tCrossborder("methodSelector.selectMethod")}
      </h2>
      {loading ? (
        <div>
          <div className="flex flex-col gap-2 justify-center items-center py-4 w-full">
            <div className="flex p-4 border w-full rounded">
              <div className="flex text-xl font-bold items-center gap-2 flex-1">
                <MiniLoader />
                <div className=" text-sm px-2 animate-pulse rounded bg-gray-200">
                  {tCrossborder("methodSelector.findingBestOffer")}
                </div>
              </div>
              <div className="flex flex-row items-center font-bold gap-6">
                <div className="w-12 h-4 px-2 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
            <div
              className={`flex h-12 w-full bg-uhuGray flex-rоw gap-4 items-center animate-pulse rounded-lg p-2 shadow-sm `}
            ></div>
          </div>
        </div>
      ) : (
        Object.keys(sortedMethods).map((modality, index) => {
          return (
            <div className="bg-white w-full mt-4" key={`modality_${index}`}>
              <div
                className={`flex gap-2 items-center p-4 flex-row border rounded ${
                  selectedMethod
                    ? "bg-uhuBlue text-white"
                    : sortedMethods[modality].cheapestMethod
                    ? "text-gray-800 cursor-pointer"
                    : "text-gray-500 border-gray-200"
                } `}
                onClick={() => {
                  sortedMethods[modality].cheapestMethod
                    ? setSelectedMethod(sortedMethods[modality].cheapestMethod)
                    : null;
                }}
              >
                <h2 className="text-xl font-bold">{t(modality)}</h2>
                {sortedMethods[modality].cheapestMethod ? (
                  <div className="flex-1 flex flex-row justify-between items-center">
                    <div className="text-[9px] bg-uhuBlue text-white px-1 rounded">
                      via{" "}
                      <span className="font-bold">
                        {sortedMethods[modality].cheapestMethod.name}
                      </span>
                    </div>
                    <div>
                      ≈{" "}
                      <span className="font-bold">
                        {sortedMethods[
                          modality
                        ].cheapestMethod.predictedAmount.toFixed(5)}{" "}
                        {finalCurrency?.symbol}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[9px] bg-gray-200 text-gray-500 px-1 rounded">
                    {tCrossborder("methodSelector.noMethodAvailable")}
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-between">
                {/** display next method with limit */}
                {!sortedMethods[modality].cheapestMethod &&
                sortedMethods[modality].nextLowerLimitMethod ? (
                  <div className="flex flex-row justify-between text-sm">
                    <div>
                      {tCrossborder("methodSelector.notEnoughMoney")}{" "}
                      <span className="font-bold text-red-500">
                        {amount -
                          sortedMethods[modality].nextLowerLimitMethod
                            .maxAmount}{" "}
                        {sendingCurrency?.icon}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                {/** display next method with limit */}
                {sortedMethods[modality].nextMethodWithLimit && (
                  <div className="flex flex-row justify-between">
                    <div></div>
                    <div className="text-sm">
                      {tCrossborder("methodSelector.missingAmount")}{" "}
                      <span className="font-bold text-uhuBlue">
                        {sortedMethods[modality].nextMethodWithLimit.minAmount -
                          amount}{" "}
                        {sendingCurrency?.icon}
                      </span>{" "}
                      {tCrossborder("methodSelector.missingAmount1")}
                    </div>
                  </div>
                )}
              </div>
              {sortedMethods[modality].methods.map((method, index1) => {
                return (
                  <div
                    key={`modality_${index}_${index1}`}
                    className="flex flex-row justify-between hidden"
                  >
                    <div>{method.name}</div>
                    <div>{method.minAmount}</div>
                    <div>{method.maxAmount}</div>
                    <div>
                      {method.predictedAmount} {finalCurrency?.symbol}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}
