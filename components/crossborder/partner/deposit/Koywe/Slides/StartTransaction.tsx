import React from "react";
import { useTranslation } from "next-i18next";
import { HiChevronDoubleRight } from "react-icons/hi2";
import {
  KoywePaymentMethod,
  KoyweQuoteResponse,
} from "../../../universal/koyweUtils";
import { QuotePaymentType } from "../../../../../depositPage/slides/DepositMethodSelector";
import { getFiatInfoForStableCoin } from "../../../../../../utilities/stableCoinsMaps";
import LoadingButton, {
  LoadingButtonStates,
  LoadingButtonError,
} from "../../../../../UI/LoadingButton";

export default function StartTransaction({
  selectedQuote,
  method,
  loadingState,
  error,
  startTransaction,
}: {
  selectedQuote: {
    quote: KoyweQuoteResponse;
    paymentMethod: KoywePaymentMethod;
  };
  method: QuotePaymentType;
  setView: (view: "SelectQuote" | "StartTransaction") => void;
  loadingState: LoadingButtonStates;
  error: LoadingButtonError;
  startTransaction: () => void;
}) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="flex justify-center items-center h-full w-full p-4 md:p-8">
      <div className="flex flex-col gap-4 w-full flex-1">
        <h2 className="text-2xl font-bold text-gray-800">
          {tCrossborder("deposit.koywe.startTransaction")}
        </h2>
        <div className="flex flex-col mb-4">
          <div className="flex flex-row gap-2 items-center text-sm">
            <p>
              <strong>{tCrossborder("deposit.koywe.rate")}:</strong>{" "}
              {selectedQuote?.quote.exchangeRate.toFixed(3)}
            </p>
            <p className="text-red-500">
              <strong>{tCrossborder("deposit.koywe.validFor")}:</strong>{" "}
              {tCrossborder("deposit.koywe.minutes")}
            </p>
          </div>
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col items-start gap-1">
              <p className="text-6xl">
                {selectedQuote?.quote.amountIn} {method.currencies[0].currency}
              </p>
              <strong className="text-gray-500">
                {tCrossborder("deposit.koywe.depositAmount")}
              </strong>
            </div>
            <div className="flex items-start">
              <HiChevronDoubleRight className="text-6xl text-gray-500" />
            </div>
            <div className="flex flex-col items-end justify-end gap-1">
              <p className="text-6xl">
                {selectedQuote?.quote.amountOut.toFixed(3)}{" "}
                {getFiatInfoForStableCoin(method.acceptedCrypto).id}
              </p>
              <strong className="text-gray-500">
                {tCrossborder("deposit.koywe.credit")}
              </strong>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span className="text-white bg-uhuBlue rounded px-1">
              {selectedQuote?.paymentMethod.name}
            </span>
          </div>
        </div>
        <LoadingButton
          isLoading={loadingState}
          onClick={startTransaction}
          error={error}
        >
          {tCrossborder("deposit.koywe.button")}
        </LoadingButton>
      </div>
    </div>
  );
}
