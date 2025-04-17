import React from "react";
import { useTranslation } from "next-i18next";
import { HiChevronDoubleRight } from "react-icons/hi2";
import CustomDropdown from "../../../../../Forms/CustomDropdown";
import { getFiatInfoForStableCoin } from "../../../../../../utilities/stableCoinsMaps";

interface QuoteFormProps {
  quote: {
    rate: number;
    expiresAt: string;
    depositAmount: number;
    depositMethod: string;
    settleAmount: number;
    settleMethod: string;
  };
  amount: number;
  bankList: Array<{ value: string; label: string }>;
  formData: {
    bank: string;
    accountNumber: string;
    accountHolder: string;
  };
  formError: string;
  onSubmit: (e: React.FormEvent) => void;
  onBankChange: (value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function QuoteForm({
  quote,
  amount,
  bankList,
  formData,
  formError,
  onSubmit,
  onBankChange,
  onInputChange,
}: QuoteFormProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  console.log("amount", amount);
  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          {tCrossborder("withdraw.bitcoinvn.offerSummary")}
        </h2>
        <div className="flex flex-col">
          <div className="flex gap-2 text-sm">
            <p>
              <strong>{tCrossborder("withdraw.bitcoinvn.exchangeRate")}</strong>{" "}
              {quote.rate}
            </p>
            <p className="text-red-600">
              <strong>{tCrossborder("withdraw.bitcoinvn.validFor")}</strong>{" "}
              {Math.round(
                (new Date(quote.expiresAt).getTime() - new Date().getTime()) /
                  60000
              )}{" "}
              {tCrossborder("withdraw.bitcoinvn.minutes")}
            </p>
          </div>

          <div className="w-full flex-1 flex flex-row gap-4">
            <div className="gap-1 flex-1 flex flex-col">
              <div className="font-bold text-6xl text-gray-600 whitespace-nowrap">
                {amount}{" "}
                {getFiatInfoForStableCoin(
                  quote.depositMethod.toUpperCase()
                )?.id.toUpperCase()}
              </div>
              <div>{tCrossborder("withdraw.bitcoinvn.depositAmount")}</div>
            </div>
            <div className="flex items-center justify-center">
              <HiChevronDoubleRight className="h-12 w-12 text-gray-600" />
            </div>

            <div className="gap-1 flex-1 flex flex-col justify-end items-end">
              <div className="font-bold text-6xl whitespace-nowrap">
                {quote.settleAmount} {quote.settleMethod.toUpperCase()}
              </div>
              <div>{tCrossborder("withdraw.bitcoinvn.withdrawAmount")}</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {tCrossborder("withdraw.bitcoinvn.bank")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <CustomDropdown
            options={bankList}
            value={formData.bank}
            onChange={onBankChange}
            name="bank"
            placeholder={tCrossborder("withdraw.bitcoinvn.placeholderBank")}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {tCrossborder("withdraw.bitcoinvn.accountNumber")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={onInputChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {tCrossborder("withdraw.bitcoinvn.accountOwner")}
          </label>
          <input
            type="text"
            name="accountHolder"
            value={formData.accountHolder}
            onChange={onInputChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        {formError && <p className="text-red-500 text-sm">{formError}</p>}
        <button
          type="submit"
          className="w-full bg-uhuBlue text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {tCrossborder("withdraw.bitcoinvn.startTransaction")}
        </button>
      </form>
    </div>
  );
}
