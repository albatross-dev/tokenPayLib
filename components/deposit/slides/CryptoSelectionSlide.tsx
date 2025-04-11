import React from 'react';
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { STANDARD_STABLE_MAP } from "../../../components/crossborder/CurrencySelector";
import currencies from "../../../utilities/crypto/currencies";
import { PaymentTypesArray } from '../../../types/payload-types';

interface CryptoSelectionSlideProps {
  methodsByCurrency: Record<string, PaymentTypesArray>;
  onSelectCurrency: (currency: string) => void;
}

const CryptoSelectionSlide: React.FC<CryptoSelectionSlideProps> = ({
  methodsByCurrency,
  onSelectCurrency,
}) => {
  const { t: tCrossborder } = useTranslation("crossborder");

  console.log("methodsByCurrency", methodsByCurrency);

  return (
    <div className="relative z-[10] p-4 flex flex-col gap-4  max-w-4xl mx-auto">
      <h2 className="text-2xl">
        {tCrossborder("depositPage.cryptoSelection.heading")}
      </h2>
      {Object.keys(methodsByCurrency).map((currency) => {
        const currencyDetails = currencies[currency];
        const methods = methodsByCurrency[currency];
        console.log("methods", methods);
        return (
          <div
            key={currency}
            onClick={methods.length > 0 ? () => onSelectCurrency(currency) : undefined}
            className={`flex items-center border justify-between gap-4 p-4 rounded-lg ${
              methods.length > 0 
                ? "hover:bg-gray-100 cursor-pointer" 
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            {STANDARD_STABLE_MAP[currency] ? (
              <div className={`flex items-center justify-center ${methods.length > 0 ? 'bg-uhuBlue' : 'bg-gray-400'} text-xl rounded-full text-white font-bold w-10 h-10`}>
                {STANDARD_STABLE_MAP[currency].icon}
              </div>
            ) : (
              currencyDetails?.icon && <Image
                src={currencyDetails?.icon}
                fill={true}
                alt="currency icon"
              />
            )}
            <h2 className="text-xl font-bold">
              {STANDARD_STABLE_MAP[currency]
                ? STANDARD_STABLE_MAP[currency].symbol
                : currencyDetails?.name.toUpperCase()}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default CryptoSelectionSlide; 