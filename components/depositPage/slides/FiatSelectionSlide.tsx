import React from 'react';
import { useTranslation } from "next-i18next";
import { FiArrowLeft } from "react-icons/fi";
import { getFiatCurrencySymbol } from "../../../utilities/stableCoinsMaps";
import { FiatCodes } from '../../../types/derivedPayload.types';

interface FiatSelectionSlideProps {
  availableFiatCurrencies: FiatCodes[];
  onSelectCurrency: (currency: FiatCodes) => void;
  onBack: () => void;
}

const FiatSelectionSlide: React.FC<FiatSelectionSlideProps> = ({
  availableFiatCurrencies,
  onSelectCurrency,
  onBack,
}) => {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="relative p-4 z-[10] flex flex-col gap-4  max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-uhuBlue hover:text-blue-700 mb-4"
      >
        <FiArrowLeft className="mr-2" />
        {tCrossborder("depositPage.fiatSelection.back")}
      </button>
      <h2 className="text-2xl">
        {tCrossborder("depositPage.fiatSelection.heading")}
      </h2>
      {availableFiatCurrencies.map((currency) => (
        <div
          key={currency}
          onClick={() => onSelectCurrency(currency)}
          className="flex items-center border justify-between gap-4 hover:bg-gray-100 p-4 rounded-lg cursor-pointer"
        >
          <div className="flex items-center justify-center bg-uhuBlue text-xl rounded-full text-white font-bold w-10 h-10">
            {getFiatCurrencySymbol(currency)}
          </div>
          <h3 className="text-xl font-bold">{currency}</h3>
        </div>
      ))}
    </div>
  );
};

export default FiatSelectionSlide; 