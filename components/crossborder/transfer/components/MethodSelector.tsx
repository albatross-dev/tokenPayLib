/* eslint-disable */

import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { PaymentTypesArray } from "../../../../types/payload-types";
import { FiatInfo } from "../../../../utilities/stableCoinsMaps";
import MiniLoader from "../../../UI/MiniLoader";
import { getBitcoinVNMetaData, getBitcoinVNQuote } from "../../partner/universal/bitcoinVNUtils";
import { getKoyweQuote } from "../../partner/universal/koyweUtils";
import { getSwyptQuote } from "../../partner/universal/swyptUtils";

export type PaymentMethodType = PaymentTypesArray[number];

export interface SwyptQuoteResponse {
  data: {
    outputAmount: number;
    settleAmount?: number;
  };
}

interface QuotePaymentType extends PaymentMethodType {
  predictedAmount: number;
}

interface MethodSelectorProps {
  selectable: boolean;
  methods: PaymentTypesArray;
  exchangeRate: number;
  loadedExchangeRate: boolean;
  finalCurrency: FiatInfo | null;
  amount: number;
  sendingCurrency: FiatInfo | null;
  selectedMethod: PaymentTypesArray[number] | null;
  setSelectedMethod: (method: PaymentTypesArray[number] | null) => void;
}

interface SortedMethodsType {
  [key: string]: {
    methods: QuotePaymentType[];
    cheapestMethod: QuotePaymentType | null;
    nextMethodWithLimit: QuotePaymentType | null;
    nextLowerLimitMethod: QuotePaymentType | null;
  };
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
}: MethodSelectorProps) {
  const [sortedMethods, setSortedMethods] = useState<SortedMethodsType>({});
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");
  const [loading, setLoading] = useState(true);

  const quoteMethods = methods as QuotePaymentType[];

  useEffect(() => {
    async function update() {
      console.log("update started");
      // sort the methods by payment modality
      const sortedMethods: SortedMethodsType = {};
      for (const method of quoteMethods) {
        for (const modality of method.withdrawModality) {
          if (!sortedMethods[modality]) {
            sortedMethods[modality] = {
              methods: [],
              cheapestMethod: null,
              nextLowerLimitMethod: null,
              nextMethodWithLimit: null,
            };
          }
          sortedMethods[modality].methods.push(method);
        }

        // calculate predicted amount and populate data
        switch (method.type) {
          case "bitcoin_vn":
            // set minAmount and maxAmount
            const bitcoinVNMetadata = await getBitcoinVNMetaData();
            method.minAmount = bitcoinVNMetadata.min + amount * 0.005;
            method.maxAmount = bitcoinVNMetadata.max;

            try {
              const bitcoinVNQuote = await getBitcoinVNQuote(amount - amount * 0.004);
              method.predictedAmount = bitcoinVNQuote.settleAmount;
            } catch (error) {
              method.predictedAmount = 0;
            }

            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
            }
            break;
          case "swypt":
            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
            } else {
              try {
                const swyptQuote = await getSwyptQuote(amount, "KES", "USDC", "Polygon", "offramp");

                // Apply your platform fee (0.4%)
                method.predictedAmount = swyptQuote.outputAmount - swyptQuote.outputAmount * 0.004;
              } catch (error) {
                console.error("SwyptQuote - Error fetching quote:", error);
                method.predictedAmount = 0;
              }
            }
            break;
          case "koywe":
            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
              break;
            } else {
              try {
                let quoteObj = {
                  symbolIn: "USDC",
                  symbolOut: finalCurrency?.id || "",
                  amountIn: amount,
                };
                console.log("quoteObj", quoteObj);
                const koyweQuote = await getKoyweQuote(quoteObj);
                console.log("koyweQuote", koyweQuote);
                method.predictedAmount = koyweQuote.amountOut - koyweQuote.amountOut * 0.004;
              } catch (error) {
                console.error("KoyweQuote - Error fetching quote:", error);
                method.predictedAmount = 0;
              }
            }

            break;
          case "unlimit":
          case "onramp_money":
            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
              break;
            }
            method.predictedAmount = amount * exchangeRate - amount * exchangeRate * (method.fee / 100);
            break;
          default:
            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
              break;
            }
            method.predictedAmount =
              amount * exchangeRate - amount * exchangeRate * 0.004 - amount * exchangeRate * (method.fee / 100);
            break;
        }
      }

      // set cheapest method and next method with limit
      for (const modality in sortedMethods) {
        const methodsInModality = sortedMethods[modality].methods;
        const numMethods = methodsInModality.length;

        if (numMethods === 1) {
          const singleMethod = methodsInModality[0];
          const withinLimits = amount >= singleMethod.minAmount && amount <= singleMethod.maxAmount;

          if (withinLimits) {
            if (singleMethod.predictedAmount > 0) {
              sortedMethods[modality].cheapestMethod = singleMethod;
            } else {
              sortedMethods[modality].nextMethodWithLimit = singleMethod;
            }
          } else if (amount < singleMethod.minAmount) {
            sortedMethods[modality].nextMethodWithLimit = singleMethod;
          } else {
            sortedMethods[modality].nextLowerLimitMethod = singleMethod;
          }
          continue;
        }

        let cheapestMethod: QuotePaymentType | null = null;
        let nextMethodWithLimit: QuotePaymentType | null = null;

        for (const method of methodsInModality) {
          if (method.predictedAmount > 0) {
            if (!cheapestMethod || method.predictedAmount > cheapestMethod.predictedAmount) {
              cheapestMethod = method;
            }
          } else {
            if (
              method.maxAmount >= amount &&
              (!nextMethodWithLimit || method.minAmount < nextMethodWithLimit.minAmount)
            ) {
              nextMethodWithLimit = method;
            }
          }
        }
        sortedMethods[modality].cheapestMethod = cheapestMethod;
        sortedMethods[modality].nextMethodWithLimit = nextMethodWithLimit;

        let nextLowerLimitMethod: QuotePaymentType | null = null;
        for (const method of methodsInModality) {
          if (
            method.maxAmount <= amount &&
            (!nextLowerLimitMethod || method.maxAmount > nextLowerLimitMethod.maxAmount)
          ) {
            nextLowerLimitMethod = method;
          }
        }

        sortedMethods[modality].nextLowerLimitMethod = nextLowerLimitMethod;
      }

      setSortedMethods(sortedMethods);
      setLoading(false);
    }

    if (methods && amount && exchangeRate && loadedExchangeRate) {
      setLoading(true);

      // only call update if the amount has not changed for 1 seconds
      const timeout = setTimeout(() => {
        update();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [methods, amount, exchangeRate, loadedExchangeRate]);

  if (!loadedExchangeRate) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2 mt-8">{tCrossborder("methodSelector.selectMethod")}</h2>
        <div className="flex p-4 border w-full rounded">
          <div className="flex text-xl font-bold items-center gap-2 flex-1">
            <div className="text-sm px-2 rounded">{tCrossborder("methodSelector.loadingExchangeRates")}</div>
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
        <h2 className="text-xl font-bold mb-2 mt-8">{tCrossborder("methodSelector.selectMethod")}</h2>
        <div className="flex p-4 border w-full rounded">
          <div className="flex text-xl font-bold items-center gap-2 flex-1">
            <div className="text-sm px-2 rounded">{tCrossborder("methodSelector.selectAmount")}</div>
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
      <h2 className="text-xl font-bold mb-2 mt-8">{tCrossborder("methodSelector.selectMethod")}</h2>
      {loading ? (
        <div>
          <div className="flex flex-col gap-2 justify-center items-center py-4 w-full">
            <div className="flex p-4 border w-full rounded">
              <div className="flex text-xl font-bold items-center gap-2 flex-1">
                <MiniLoader />
                <div className="text-sm px-2 animate-pulse rounded bg-gray-200">
                  {tCrossborder("methodSelector.findingBestOffer")}
                </div>
              </div>
              <div className="flex flex-row items-center font-bold gap-6">
                <div className="w-12 h-4 px-2 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="flex h-12 w-full bg-uhuGray flex-row gap-4 items-center animate-pulse rounded-lg p-2 shadow-sm"></div>
          </div>
        </div>
      ) : (
        Object.keys(sortedMethods).map((modality, index) => {
          return (
            <div className="bg-white w-full mt-4" key={`modality_${index}`}>
              <div
                className={`flex gap-2 items-center p-4 flex-row border rounded ${
                  selectedMethod?.withdrawModality == modality
                    ? "bg-uhuBlue text-white ring-1 ring-uhuBlue "
                    : sortedMethods[modality].cheapestMethod
                      ? "text-gray-800 cursor-pointer"
                      : "text-gray-500 border-gray-200"
                }`}
                onClick={() => {
                  if (sortedMethods[modality].cheapestMethod) {
                    setSelectedMethod(sortedMethods[modality].cheapestMethod);
                  }
                }}
              >
                <h2 className="text-xl font-bold">{t(modality)}</h2>
                {sortedMethods[modality].cheapestMethod ? (
                  <div className="flex-1 flex flex-row justify-between items-center">
                    <div className="text-[9px] bg-uhuBlue text-white px-1 rounded">
                      via <span className="font-bold">{sortedMethods[modality].cheapestMethod.name}</span>
                    </div>
                    <div>
                      ≈{" "}
                      <span className="font-bold">
                        {sortedMethods[modality].cheapestMethod.predictedAmount.toFixed(5)} {finalCurrency?.symbol}
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
                {!sortedMethods[modality].cheapestMethod && sortedMethods[modality].nextLowerLimitMethod ? (
                  <div className="flex flex-row justify-between text-sm">
                    <div>
                      {tCrossborder("methodSelector.notEnoughMoney")}{" "}
                      <span className="font-bold text-red-500">
                        {(amount - sortedMethods[modality].nextLowerLimitMethod.maxAmount).toFixed(2)}{" "}
                        {sendingCurrency?.symbol}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                {sortedMethods[modality].nextMethodWithLimit && (
                  <div className="flex flex-row justify-between">
                    <div></div>
                    <div className="text-sm">
                      {tCrossborder("methodSelector.missingAmount")}{" "}
                      <span className="font-bold text-uhuBlue">
                        {(sortedMethods[modality].nextMethodWithLimit.minAmount - amount).toFixed(2)}{" "}
                        {sendingCurrency?.symbol}
                      </span>{" "}
                      {tCrossborder("methodSelector.missingAmount1")}
                    </div>
                  </div>
                )}
              </div>
              {sortedMethods[modality].methods.map((method, index1) => (
                <div key={`modality_${index}_${index1}`} className="flex flex-row justify-between hidden">
                  <div>{method.name}</div>
                  <div>{method.minAmount}</div>
                  <div>{method.maxAmount}</div>
                  <div>
                    {method.predictedAmount} {finalCurrency?.symbol}
                  </div>
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}
