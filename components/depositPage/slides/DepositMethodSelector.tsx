import MiniLoader from "../../UI/MiniLoader";
import { useEffect, useState, useCallback } from "react";
import { IoWarning } from "react-icons/io5";
import axios from "axios";
import {
  getFiatCurrencySymbol,
  getFiatCurrencyCode,
} from "../../../utilities/stableCoinsMaps";
import { useTranslation } from "react-i18next";
import { getMetaData, getQuote } from "../../../utilities/partner/bitcoinvn";
import { sendErrorReport } from "../../../../context/UserContext";
import duplicateByPaymentModality from "../../../utilities/crossborder/duplicateByPaymentModality";
import { getSwyptQuote } from "../../crossborder/methods/SwyptQuote";
import { PaymentTypesArray } from "../../../types/payload-types";
import React from "react";
import { FiatCodes } from "../../../types/derivedPayload.types";

export type PaymentMethodType = PaymentTypesArray[number];


interface QuotePaymentType extends PaymentMethodType {
  predictedAmount: number;
  apiError: string | null;
  predictedOnrampAmount: number;
  onrampMinAmount: number;
}

interface DepositMethodSelectorProps {
  methods: QuotePaymentType[];
  amount: number;
  selectedMethod: QuotePaymentType | null;
  setSelectedMethod: (method: QuotePaymentType | null) => void;
  startCurrency: FiatCodes;
  endCurrency: string;
}

interface ModalityMethodMap extends Record<QuotePaymentType["onrampModality"][number], {
  methods: QuotePaymentType[];
  cheapestMethod: QuotePaymentType | null;
  nextLowerLimitMethod: QuotePaymentType | null;
  nextMethodWithLimit: QuotePaymentType | null;
  hasApiError: boolean;
}> {}

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
        const response = await axios.post(`/api/fiatTransaction/exchangeRate`, {
          startCurrency,
          endCurrency: endCurrencyCode,
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
    []
  );

  useEffect(() => {
    const update = async () => {
      setLoading(true);
      setError(null);
      setSelectedMethod(null);
      setModalityMethodMap(null);

      const endCurrencyCode = getFiatCurrencyCode(endCurrency);

      const exchangeRate = await fetchExchangeRate(startCurrency, endCurrencyCode);

      if (!exchangeRate) {
        setError(tCrossborder("deposit.depositmethodselector.errorExchangeRate"));
        setLoading(false);
        return;
      }

      let sortedMethods: ModalityMethodMap;
      let filledInPartners = duplicateByPaymentModality(
        methods || [],
        "onrampModality"
      );

      const methodPromises = filledInPartners.map(async (method) => {
        let predictedOnrampAmount = 0;
        let minAmount = method.onrampMinAmount;
        let maxAmount = method.onrampMaxAmount;
        let apiError: string | null = null;

        try {
          switch (method.type) {
            case "swypt":
              if (Number(amount) >= minAmount && Number(amount) <= maxAmount) {
                console.log("Fetching Swypt data with", startCurrency);
                const swyptQuote = await getSwyptQuote(
                  Number(amount),
                  startCurrency,
                  endCurrency,
                  "Polygon",
                  "onramp"
                );

                if (swyptQuote && swyptQuote.outputAmount) {
                  predictedOnrampAmount =
                    swyptQuote.outputAmount -
                    swyptQuote.outputAmount * 0.004;
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
                  predictedOnrampAmount =
                    bitcoinVNQoute.settleAmount -
                    bitcoinVNQoute.settleAmount * 0.004;
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
                  Number(amount) * exchangeRate -
                  Number(amount) * exchangeRate * (method.onrampFee / 100);
              }
              break;
            }
            default: {
              if (Number(amount) >= minAmount && Number(amount) <= maxAmount) {
                predictedOnrampAmount =
                  Number(amount) * exchangeRate -
                  Number(amount) * exchangeRate * 0.004 -
                  Number(amount) * exchangeRate * (method.onrampFee / 100);
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
        };
      });

      const processedMethods = await Promise.all(methodPromises);

      processedMethods.forEach((method) => {
        if (!method) return;

        const modality: QuotePaymentType["onrampModality"][number] = method.onrampModality[0];
        if (!sortedMethods[modality]) {
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

      for (const modality in sortedMethods) {
        let cheapest: QuotePaymentType | null = null;
        let nextLower: QuotePaymentType | null = null;
        let nextHigher: QuotePaymentType | null = null;

        sortedMethods[modality].methods.forEach((method) => {
          if (method.apiError) return;

          if (method.predictedOnrampAmount > 0) {
            if (!cheapest || method.predictedOnrampAmount > cheapest.predictedOnrampAmount) {
              cheapest = method;
            }
          } else {
            if (Number(amount) < method.onrampMinAmount) {
              if (!nextHigher || method.onrampMinAmount < nextHigher.onrampMinAmount) {
                nextHigher = method;
              }
            } else if (Number(amount) > method.onrampMaxAmount) {
              if (!nextLower || method.onrampMaxAmount > nextLower.onrampMaxAmount) {
                nextLower = method;
              }
            }
          }
        });

        sortedMethods[modality].cheapestMethod = cheapest;
        sortedMethods[modality].nextLowerLimitMethod = nextLower;
        sortedMethods[modality].nextMethodWithLimit = nextHigher;
      }

      setModalityMethodMap(sortedMethods);
      setLoading(false);
    };

    if (Number(amount) > 0 && startCurrency && endCurrency) {
      update();
    } else {
      setLoading(false);
      setModalityMethodMap(null);
    }
  }, [amount, startCurrency, endCurrency, fetchExchangeRate, setSelectedMethod, tCrossborder]);

  const renderHeader = () => (
    <h2 className="text-xl font-bold mb-2 mt-8">
      {tCrossborder("deposit.depositmethodselector.header")}
    </h2>
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
        {error || tCrossborder("deposit.depositmethodselector.errorGeneral")}
      </div>
    </div>
  );

  const renderOnrampMethods = () => {
    if (!modalityMethodMap || Object.keys(modalityMethodMap).length === 0) {
      return <div className="text-sm text-gray-500 mt-4">{tCrossborder("deposit.depositmethodselector.noMethodsConfigured")}</div>;
    }

    const endCurrencyCode = getFiatCurrencyCode(endCurrency);
    const endCurrencySymbol = getFiatCurrencySymbol(endCurrencyCode);

    return Object.keys(modalityMethodMap).map((modality: QuotePaymentType["onrampModality"][number]) => {
      const {
        cheapestMethod,
        nextLowerLimitMethod,
        nextMethodWithLimit,
        hasApiError,
      } = modalityMethodMap[modality];

      const isSelected = selectedMethod && selectedMethod.onrampModality[0] === modality;
      const canSelect = !!cheapestMethod;

      const lowerLimitDiff = nextLowerLimitMethod
        ? (Number(amount) - nextLowerLimitMethod.onrampMaxAmount)
        : 0;
      const higherLimitDiff = nextMethodWithLimit
        ? (nextMethodWithLimit.onrampMinAmount - Number(amount))
        : 0;

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
            <h3
              className={`text-lg sm:text-xl font-bold flex-shrink-0 ${
                !canSelect && "text-gray-400"
              }`}
            >
              {t(modality)}
            </h3>

            <div className="flex flex-col items-start sm:items-end sm:text-right flex-grow w-full sm:w-auto">
              {cheapestMethod ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-3 gap-y-1 w-full">
                  <div className="text-xs bg-uhuBlue text-white px-1.5 py-0.5 rounded font-medium w-fit">
                    {tCrossborder("deposit.depositmethodselector.viaLabel")}{" "}
                    <span className='font-bold'>{cheapestMethod.name}</span>
                  </div>
                  <div className="text-sm sm:text-base">
                    {tCrossborder("deposit.depositmethodselector.approxLabel")}{" "}
                    <span className='font-bold'>
                      {cheapestMethod.predictedOnrampAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })}
                      {" " + endCurrencySymbol}
                    </span>
                  </div>
                </div>
              ) : hasApiError ? (
                <div className='bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs font-medium w-fit'>
                  {tCrossborder("deposit.depositmethodselector.errorApiModality")}
                </div>
              ) : (
                <div className='bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-xs font-medium w-fit'>
                  {tCrossborder("deposit.depositmethodselector.noMethodAvailable")}
                </div>
              )}

              {!cheapestMethod && nextLowerLimitMethod && (
                <p className='text-xs text-red-600 mt-1 text-right w-full'>
                  {tCrossborder("deposit.depositmethodselector.amountExceedsMaxBy", {
                    difference: lowerLimitDiff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    currency: getFiatCurrencySymbol(startCurrency),
                  })}
                </p>
              )}
              {!cheapestMethod && nextMethodWithLimit && (
                <p className='text-xs text-blue-600 mt-1 text-right w-full'>
                  {tCrossborder("deposit.depositmethodselector.amountUntilNextMethod", {
                    difference: higherLimitDiff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    currency: getFiatCurrencySymbol(startCurrency),
                  })}
                </p>
              )}
            </div>
          </div>
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