import React from "react";
import { useTranslation } from "next-i18next";
import { KoywePaymentMethod, KoyweQuoteResponse } from "../../../universal/koyweUtils";
import { QuotePaymentType } from "../../../../../depositPage/slides/DepositMethodSelector";
import { getFiatInfoForStableCoin } from "../../../../../../utilities/stableCoinsMaps";

export default function SelectPaymentMethodSlide({
  method,
  setSelectedQuote,
  setView,
}: {
  method: QuotePaymentType;
  setSelectedQuote: ({
    quote,
    paymentMethod,
  }: {
    quote: KoyweQuoteResponse;
    paymentMethod: KoywePaymentMethod;
  }) => void;
  setView: (view: "SelectQuote" | "StartTransaction") => void;
}) {
  const { t: tCrossborder } = useTranslation("crossborder");
  return (
    <div className="flex justify-center items-center h-full w-full p-4 md:p-8">
      <div className="flex flex-col gap-4 w-full flex-1">
        <h2 className="text-2xl font-bold text-gray-800">{tCrossborder("deposit.koywe.header")}</h2>
        <div>
          {method.context.koywe?.quotes.map((quote) => (
            <div
              key={quote.paymentMethod._id}
              className="rounded-lg p-2 border border-blue-300 bg-blue-50 mb-4 hover:bg-blue-100 transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedQuote(quote);
                setView("StartTransaction");
              }}
            >
              <div className="flex flex-col">
                <div className="font-semibold text-gray-800">{quote.paymentMethod.name}</div>
                <div className="text-sm text-gray-500">{quote.paymentMethod.description}</div>
                <div className="flex items-center gap-2">
                  <span className=" font-bold text-uhuBlue">
                    {quote.quote.amountOut.toFixed(3)} {getFiatInfoForStableCoin(method.acceptedCrypto).id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
