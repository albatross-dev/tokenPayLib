import React from "react";
import { useTranslation } from "next-i18next";
import { FiArrowLeft } from "react-icons/fi";
import { getFiatCurrencySymbol } from "../../../utilities/stableCoinsMaps";
import { Country, PaymentTypesArray } from "../../../types/payload-types";
import DepositMethodSelector from "./DepositMethodSelector";
import { FiatCodes } from "../../../types/derivedPayload.types";

interface DepositDetailsSlideProps {
  selectedCountry: Country | null;
  amount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  availableDepositMethods: PaymentTypesArray;
  selectedMethod: PaymentTypesArray[number] | null;
  setSelectedMethod: (method: PaymentTypesArray[number] | null) => void;
  preferredFiatCurrency: FiatCodes;
  preferredStableCoin: string | null;
  onBack: () => void;
  onNext: () => void;
}

const DepositDetailsSlide: React.FC<DepositDetailsSlideProps> = ({
  selectedCountry,
  amount,
  onAmountChange,
  error,
  availableDepositMethods,
  selectedMethod,
  setSelectedMethod,
  preferredFiatCurrency,
  preferredStableCoin,
  onBack,
  onNext,
}) => {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="relative z-[10] p-4 flex flex-col gap-4  max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-uhuBlue hover:text-blue-700 mb-4"
      >
        <FiArrowLeft className="mr-2" />
        {tCrossborder("depositPage.fiatSelection.back")}
      </button>
      <h2 className="text-2xl">
        {tCrossborder("depositPage.depositDetails.heading")}{" "}
        {selectedCountry?.countryInfo.name}
      </h2>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">
          {tCrossborder("depositPage.depositDetails.selectAmount")}
        </h2>
        <div className="relative">
          <input
            type="number"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            min="0"
            value={amount}
            onChange={onAmountChange}
          />
          <div className="absolute right-10 top-0 text-xl font-bold flex items-center justify-center h-full">
            {getFiatCurrencySymbol(preferredFiatCurrency)}
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <DepositMethodSelector
        methods={availableDepositMethods}
        amount={Number(amount)}
        setSelectedMethod={setSelectedMethod}
        selectedMethod={selectedMethod}
        startCurrency={preferredFiatCurrency}
        endCurrency={preferredStableCoin}
      />

      <div className="flex justify-end">
        <button
          className={`${
            selectedMethod ? "bg-uhuBlue" : "bg-gray-300"
          } text-white font-bold py-2 px-4 rounded-lg mt-4`}
          disabled={!selectedMethod}
          onClick={onNext}
        >
          {tCrossborder("depositPage.depositDetails.next")}
        </button>
      </div>
    </div>
  );
};

export default DepositDetailsSlide;
