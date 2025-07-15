/* eslint-disable */

import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { api, sendErrorReport } from "../../../../context/UserContext";
import { FiatCodes } from "../../../types/derivedPayload.types";
import { PaymentTypesArray } from "../../../types/payload-types";
import duplicateByPaymentModality from "../../../utilities/crossborder/duplicateByPaymentModality";
import { getMetaData, getQuote } from "../../../utilities/partner/bitcoinvn";
import { getFiatCurrencyCode, getFiatCurrencySymbol } from "../../../utilities/stableCoinsMaps";
import {
  getKoywePaymentMethods,
  getKoyweQuote,
  KoywePaymentMethod,
  KoyweQuoteResponse,
} from "../../crossborder/partner/universal/koyweUtils";
import { getSwyptQuote } from "../../crossborder/partner/universal/swyptUtils";
import MiniLoader from "../../UI/MiniLoader";

export type PaymentMethodType = PaymentTypesArray[number];

export interface QuotePaymentType extends PaymentMethodType {
  predictedOnrampAmount: number;
  apiError: string | null;
  onrampMinAmount: number;
  onrampMaxAmount: number;
  context: {
    koywe?: {
      quotes: {
        quote: KoyweQuoteResponse;
        paymentMethod: KoywePaymentMethod;
      }[];
    };
  };
}

interface DepositMethodSelectorProps {
  methods: PaymentTypesArray;
  amount: number;
  selectedMethod: QuotePaymentType | null;
  setSelectedMethod: (method: QuotePaymentType | null) => void;
  startCurrency: FiatCodes;
  endCurrency: string;
}

interface ModalityMethodMap
  extends Record<
    QuotePaymentType["onrampModality"][number],
    {
      methods: QuotePaymentType[];
      cheapestMethod: QuotePaymentType | null;
      nextLowerLimitMethod: QuotePaymentType | null;
      nextMethodWithLimit: QuotePaymentType | null;
      hasApiError: boolean;
    }
  > {}

export default function DepositMethodSelector({
  methods,
  amount,
  selectedMethod,
  setSelectedMethod,
  startCurrency,
  endCurrency,
}: DepositMethodSelectorProps) {
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");
  const [loading, setLoading] = useState(false);
  const [modalityMethodMap, setModalityMethodMap] = useState<ModalityMethodMap | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchExchangeRate = useCallback(
    async (startCurrency: string, endCurrencyCode: string): Promise<number | null> => {
      try {
        const response = await api.post(`/api/fiatTransaction/exchangeRate`, {
          startCurrency,
          endCurrency: endCurrencyCode,
        });

        return response.data.rate;
      } catch (error) {
        sendErrorReport("DepositMethodSelector - Fetching exchange rate failed", error);
        console.error("Error fetching exchange rate:", error);
        return null;
      }
    },
    []
  );

  useEffect(() => {
    const update = async () => {
      const endCurrencyCode = getFiatCurrencyCode(endCurrency);

      const exchangeRate = await fetchExchangeRate(startCurrency, endCurrencyCode);

      if (!exchangeRate) {
        setError(tCrossborder("deposit.depositmethodselector.errorExchangeRate"));
        setLoading(false);
        return;
      }

      let sortedMethods: ModalityMethodMap = {
        mobile_money: {
          methods: [],
          cheapestMethod: null,
          nextLowerLimitMethod: null,
          nextMethodWithLimit: null,
          hasApiError: false,
        },
        credit_card: {
          methods: [],
          cheapestMethod: null,
          nextLowerLimitMethod: null,
          nextMethodWithLimit: null,
          hasApiError: false,
        },
        bank_account: {
          methods: [],
          cheapestMethod: null,
          nextLowerLimitMethod: null,
          nextMethodWithLimit: null,
          hasApiError: false,
        },
      };
      let filledInPartners = duplicateByPaymentModality(methods || [], "onrampModality");

      const methodPromises = filledInPartners.map(async (method) => {
        let predictedOnrampAmount = 0;
        let minAmount = method.onrampMinAmount;
        let maxAmount = method.onrampMaxAmount;
        let apiError: string | null = null;
        let context = {};

        try {
          switch (method.type) {
            case "swypt":
              if (Number(amount) >= minAmount && Number(amount) <= maxAmount) {
                const swyptQuote = await getSwyptQuote(Number(amount), startCurrency, endCurrency, "Polygon", "onramp");

                if (swyptQuote && swyptQuote.outputAmount) {
                  predictedOnrampAmount = swyptQuote.outputAmount - swyptQuote.outputAmount * 0.004;
                } else {
                  predictedOnrampAmount =
                    Number(amount) * exchangeRate -
                    Number(amount) * exchangeRate * (method.onrampFee / 100) -
                    Number(amount) * exchangeRate * 0.004;
                }
              }
              break;
            case "bitcoin_vn": {
              const bitcoinVNMeta = await getMetaData({
                depositMethod: startCurrency,
                settleMethod: endCurrency,
              });

              if (bitcoinVNMeta) {
                minAmount = bitcoinVNMeta.min;
                maxAmount = bitcoinVNMeta.max;
              }

              if (Number(amount) >= minAmount && Number(amount) <= maxAmount) {
                const bitcoinVNQoute = await getQuote({
                  depositMethod: startCurrency,
                  settleMethod: endCurrency,
                  depositAmount: Number(amount),
                });

                if (bitcoinVNQoute && bitcoinVNQoute.settleAmount) {
                  predictedOnrampAmount = bitcoinVNQoute.settleAmount - bitcoinVNQoute.settleAmount * 0.004;
                } else {
                  predictedOnrampAmount =
                    Number(amount) * exchangeRate -
                    Number(amount) * exchangeRate * (method.onrampFee / 100) -
                    Number(amount) * exchangeRate * 0.004;
                }
              }
              break;
            }
            case "unlimit":
            case "onramp_money": {
              if (Number(amount) >= minAmount && Number(amount) <= maxAmount) {
                predictedOnrampAmount =
                  Number(amount) * exchangeRate - Number(amount) * exchangeRate * (method.onrampFee / 100);
              }
              break;
            }
            case "koywe": {
              if (Number(amount) >= minAmount && Number(amount) <= maxAmount) {
                const paymentMethods = await getKoywePaymentMethods({
                  currencySymbol: startCurrency,
                });

                let koyweQuotes: {
                  quote: KoyweQuoteResponse;
                  paymentMethod: KoywePaymentMethod;
                }[] = [];

                for (const paymentMethod of paymentMethods) {
                  console.log("fetching quote for", paymentMethod);
                  const koyweQuote = await getKoyweQuote({
                    symbolIn: startCurrency,
                    symbolOut: endCurrency,
                    amountIn: Number(amount),
                    paymentMethodId: paymentMethod._id,
                    executable: true,
                    deductFees: true,
                    includeClientId: true,
                  });

                  if (koyweQuote) {
                    koyweQuotes.push({ quote: koyweQuote, paymentMethod });
                  }
                }

                console.log("koyweQuotes", koyweQuotes);

                // get cheapest quote
                const cheapestQuote = koyweQuotes.reduce((min, quote) => {
                  return Math.min(min, quote.quote.amountOut);
                }, Infinity);

                context = {
                  ...context,
                  koywe: {
                    quotes: koyweQuotes,
                    cheapestQuote,
                  },
                };

                console.log("cheapestQuote", cheapestQuote);

                predictedOnrampAmount = cheapestQuote;
              }
              break;
            }
            case "stasis": {
              console.log(
                "stasis",
                method,
                exchangeRate,
                method.onrampFee ? Number(amount) * exchangeRate * (method.onrampFee / 100) : 0,
                method.onrampCommission || 0
              );
              if (Number(amount) >= minAmount && Number(amount) <= maxAmount) {
                predictedOnrampAmount =
                  Number(amount) * exchangeRate -
                  (method.onrampFee ? Number(amount) * exchangeRate * (method.onrampFee / 100) : 0) -
                  (method.onrampCommission || 0);
              }
              console.log("stasis predictedOnrampAmount", predictedOnrampAmount);
              break;
            }
            default: {
              if (Number(amount) >= minAmount && Number(amount) <= maxAmount) {
                predictedOnrampAmount =
                  Number(amount) * exchangeRate -
                  Number(amount) * exchangeRate * 0.004 -
                  (method.onrampFee ? Number(amount) * exchangeRate * (method.onrampFee / 100) : 0) -
                  (method.onrampCommission || 0);
              }
              break;
            }
          }
        } catch (err) {
          console.error(`Error processing method ${method.name} (${method.type}):`, err);
          predictedOnrampAmount = -1;
          apiError = tCrossborder("deposit.depositmethodselector.errorApiMethod", { methodType: method.type });
        }

        return {
          ...method,
          predictedOnrampAmount,
          onrampMinAmount: minAmount,
          onrampMaxAmount: maxAmount,
          apiError,
          context,
        };
      });

      const processedMethods = await Promise.all(methodPromises);

      processedMethods.forEach((method) => {
        if (!method) return;

        const modality: QuotePaymentType["onrampModality"][number] = method.onrampModality[0];
        if (modality && !sortedMethods[modality]) {
          sortedMethods[modality] = {
            methods: [],
            cheapestMethod: null,
            nextLowerLimitMethod: null,
            nextMethodWithLimit: null,
            hasApiError: false,
          };
        }

        sortedMethods[modality].methods.push(method);
        if (method.apiError) {
          sortedMethods[modality].hasApiError = true;
        }
      });

      console.log("sortedMethods", sortedMethods);


      // for (const modality in sortedMethods) {
      //   let cheapest: QuotePaymentType | null = null;
      //   let nextLower: QuotePaymentType | null = null;
      //   let nextHigher: QuotePaymentType | null = null;

      //   sortedMethods[modality].methods.forEach((method) => {
      //     if (method.apiError) return;

      //     if (method.predictedOnrampAmount > 0) {
      //       if (!cheapest || method.predictedOnrampAmount > cheapest.predictedOnrampAmount) {
      //         cheapest = method;
      //       }
      //     } else {
      //       if (Number(amount) < method.onrampMinAmount) {
      //         if (!nextHigher || method.onrampMinAmount < nextHigher.onrampMinAmount) {
      //           nextHigher = method;
      //         }
      //       } else if (Number(amount) > method.onrampMaxAmount) {
      //         if (!nextLower || method.onrampMaxAmount > nextLower.onrampMaxAmount) {
      //           nextLower = method;
      //         }
      //       }
      //     }
      //   });

      //   sortedMethods[modality].cheapestMethod = cheapest;
      //   sortedMethods[modality].nextLowerLimitMethod = nextLower;
      //   sortedMethods[modality].nextMethodWithLimit = nextHigher;
      // }

      for (const modality in sortedMethods) {
        const methodsInModality = sortedMethods[modality].methods;
        const numMethods = methodsInModality.length;

        if (numMethods === 1) {
          const singleMethod = methodsInModality[0];
          const withinLimits = amount >= singleMethod.onrampMinAmount && amount <= singleMethod.onrampMaxAmount;

          console.log("singleMethod", singleMethod);
          console.log("withinLimits", withinLimits);
          console.log("amount", amount);
          console.log("singleMethod.onrampMaxAmount", singleMethod.onrampMaxAmount);
          console.log("singleMethod.onrampMinAmount", singleMethod.onrampMinAmount);

          if (withinLimits) {
            if (singleMethod.predictedOnrampAmount > 0) {
              sortedMethods[modality].cheapestMethod = singleMethod;
            } else {
              sortedMethods[modality].nextMethodWithLimit = singleMethod;
            }
          } else if (amount < singleMethod.onrampMinAmount) {
            sortedMethods[modality].nextMethodWithLimit = singleMethod;
          } else {
            sortedMethods[modality].nextLowerLimitMethod = singleMethod;
          }
          continue;
        }

        let cheapestMethod: QuotePaymentType | null = null;
        let nextMethodWithLimit: QuotePaymentType | null = null;

        for (const method of methodsInModality) {
          if (method.predictedOnrampAmount > 0) {
            if (!cheapestMethod || method.predictedOnrampAmount > cheapestMethod.predictedOnrampAmount) {
              cheapestMethod = method;
            }
          } else {
            if (
              method.onrampMaxAmount >= amount &&
              (!nextMethodWithLimit || method.onrampMinAmount < nextMethodWithLimit.onrampMinAmount)
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
            method.onrampMaxAmount <= amount &&
            (!nextLowerLimitMethod || method.onrampMaxAmount > nextLowerLimitMethod.onrampMaxAmount)
          ) {
            nextLowerLimitMethod = method;
          }
        }

        sortedMethods[modality].nextLowerLimitMethod = nextLowerLimitMethod;
      }

      setModalityMethodMap(sortedMethods);
      setLoading(false);
    };

    if (Number(amount) > 0 && startCurrency && endCurrency) {
      setLoading(true);
      setError(null);
      setSelectedMethod(null);
      setModalityMethodMap(null);

      // only call update if the amount has not changed for 2 seconds
      const timeout = setTimeout(() => {
        update();
      }, 1000);

      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
      setModalityMethodMap(null);
    }
  }, [amount, startCurrency, endCurrency, fetchExchangeRate, setSelectedMethod, tCrossborder]);

  const renderHeader = () => (
    <h2 className="text-xl font-bold mb-2 mt-8">{tCrossborder("deposit.depositmethodselector.header")}</h2>
  );

  const renderPromptEnterAmount = () => (
    <div className="flex p-4 border w-full rounded items-center justify-between">
      <div className="text-sm font-medium text-gray-700">
        {tCrossborder("deposit.depositmethodselector.promptEnterAmount")}
      </div>
      <IoWarning className="text-gray-500 text-xl" />
    </div>
  );

  const renderLoading = () => (
    <div>
      <div className="flex p-4 border w-full rounded items-center gap-3">
        <MiniLoader />
        <div className="text-sm text-gray-600">{tCrossborder("deposit.depositmethodselector.loadingMessage")}</div>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="flex p-4 border border-red-300 bg-red-50 w-full rounded items-center gap-3">
      <IoWarning className="text-red-500 text-xl" />
      <div className="text-sm text-red-700 font-medium">
        {error || tCrossborder("deposit.depositmethodselector.errorGeneral")}
      </div>
    </div>
  );

  const renderOnrampMethods = () => {
    if (!modalityMethodMap || Object.keys(modalityMethodMap).length === 0) {
      return (
        <div className="text-sm text-gray-500 mt-4">
          {tCrossborder("deposit.depositmethodselector.noMethodsConfigured")}
        </div>
      );
    }

    const endCurrencyCode = getFiatCurrencyCode(endCurrency);
    const endCurrencySymbol = getFiatCurrencySymbol(endCurrencyCode);

    return Object.keys(modalityMethodMap).map((modality: QuotePaymentType["onrampModality"][number]) => {
      const { cheapestMethod, nextLowerLimitMethod, nextMethodWithLimit, hasApiError } = modalityMethodMap[modality];

      const isSelected = selectedMethod && selectedMethod.onrampModality[0] === modality;
      const canSelect = !!cheapestMethod;

      const lowerLimitDiff = nextLowerLimitMethod ? Number(amount) - nextLowerLimitMethod.onrampMaxAmount : 0;
      const higherLimitDiff = nextMethodWithLimit ? nextMethodWithLimit.onrampMinAmount - Number(amount) : 0;

      return (
        <div key={modality} className="bg-white w-full mt-4">
          <div
            onClick={() => canSelect && setSelectedMethod(cheapestMethod)}
            className={`border flex flex-col sm:flex-row p-4 gap-2 items-start sm:items-center border-gray-200 rounded-md transition-colors duration-150 ${
              isSelected
                ? "bg-uhuBlue text-white ring-2 ring-uhuBlue ring-offset-1"
                : canSelect
                  ? "text-gray-800 hover:bg-gray-100 cursor-pointer"
                  : "text-gray-500 bg-gray-50 border-gray-200"
            }`}
            aria-disabled={!canSelect}
            role={canSelect ? "button" : undefined}
          >
            <h3 className={`text-lg sm:text-xl font-bold flex-shrink-0 ${!canSelect && "text-gray-400"}`}>
              {t(modality)}
            </h3>

            <div className="flex flex-col items-start sm:items-end sm:text-right flex-grow w-full sm:w-auto">
              {cheapestMethod ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-3 gap-y-1 w-full">
                  <div className="text-xs bg-uhuBlue text-white px-1.5 py-0.5 rounded font-medium w-fit">
                    {tCrossborder("deposit.depositmethodselector.viaLabel")}{" "}
                    <span className="font-bold">{cheapestMethod.name}</span>
                  </div>
                  <div className="text-sm sm:text-base">
                    {tCrossborder("deposit.depositmethodselector.approxLabel")}{" "}
                    <span className="font-bold">
                      {cheapestMethod.predictedOnrampAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 5,
                      })}
                      {" " + endCurrencySymbol}
                    </span>
                  </div>
                </div>
              ) : hasApiError ? (
                <div className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs font-medium w-fit">
                  {tCrossborder("deposit.depositmethodselector.errorApiModality")}
                </div>
              ) : (
                <div className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-xs font-medium w-fit">
                  {tCrossborder("deposit.depositmethodselector.noMethodAvailable")}
                </div>
              )}

            
            </div>
          </div>

          {!cheapestMethod && nextLowerLimitMethod && (
                <p className="text-xs text-red-600 mt-1 text-right w-full">
                  {tCrossborder("deposit.depositmethodselector.amountExceedsMaxBy", {
                    difference: lowerLimitDiff.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }),
                    currency: getFiatCurrencySymbol(startCurrency),
                  })}
                </p>
              )}
              { nextMethodWithLimit && (
                <p className="text-xs text-blue-600 mt-1 text-right w-full">
                  {tCrossborder("deposit.depositmethodselector.amountUntilNextMethod", {
                    difference: higherLimitDiff.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }),
                    currency: getFiatCurrencySymbol(startCurrency),
                  })}
                </p>
              )}
        </div>
      );
    });
  };

  return (
    <div className="w-full">
      {renderHeader()}
      {Number(amount) <= 0
        ? renderPromptEnterAmount()
        : loading
          ? renderLoading()
          : error
            ? renderError()
            : renderOnrampMethods()}
    </div>
  );
}
