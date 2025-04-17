import { useTranslation } from "next-i18next";
import React from "react";
import { HiChevronDoubleRight } from "react-icons/hi";
import { FormData } from "../types";
import { PaymentTypesArray } from "../../../../../../types/payload-types";
import { SwyptQuoteResponse } from "../../../../methods/SwyptQuote";

interface InputSlideProps {
  amount: number;
  method: PaymentTypesArray[number];
  quote: SwyptQuoteResponse;
  formData: FormData;
  formError: string;
  onFormSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputSlide: React.FC<InputSlideProps> = ({
  amount,
  method,
  quote,
  formData,
  formError,
  onFormSubmit,
  onInputChange,
}) => {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          {tCrossborder("withdraw.bitcoinvn.offerSummary")}
        </h2>
        <div className="flex flex-col">
          <div className="w-full flex-1 flex flex-row gap-4">
            <div className="gap-1 flex-1 flex flex-col">
              <div className="font-bold text-6xl text-gray-600 whitespace-nowrap">
                {amount} {method?.currencies[0]?.currency || "USD"}
              </div>
              <div>{tCrossborder("withdraw.bitcoinvn.depositAmount")}</div>
            </div>
            <div className="flex items-center justify-center">
              <HiChevronDoubleRight className="h-12 w-12 text-gray-600" />
            </div>

            <div className="gap-1 flex-1 flex flex-col justify-end items-end">
              <div className="font-bold text-6xl whitespace-nowrap ">
                {(quote.outputAmount - quote.outputAmount * 0.004).toFixed(2)}{" "}
                {quote.outputCurrency.toUpperCase()}
              </div>
              <div>{tCrossborder("withdraw.bitcoinvn.withdrawAmount")}</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={onFormSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {tCrossborder("withdraw.swypt.phoneNumber")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="z.B. +4915123456789"
          />
        </div>
        {formError && <p className="text-red-500 text-sm">{formError}</p>}
        <button
          type="submit"
          className="w-full bg-uhuBlue text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {tCrossborder("withdraw.swypt.startTransaction")}
        </button>
      </form>
    </>
  );
};
