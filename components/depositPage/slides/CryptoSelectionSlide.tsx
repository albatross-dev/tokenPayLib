import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import currencies from "../../../utilities/crypto/currencies";
import { PaymentTypesArray } from "../../../types/payload-types";
import { STANDARD_STABLE_MAP } from "../../../utilities/stableCoinsMaps";
import BackButton from "../../crossborder/transfer/components/BackButton";

interface CryptoSelectionSlideProps {
  methodsByCurrency: Record<string, PaymentTypesArray>;
  onSelectCurrency: (currency: string) => void;
}

const CryptoSelectionSlide: React.FC<CryptoSelectionSlideProps> = ({
  methodsByCurrency,
  onSelectCurrency,
}) => {
  const { t: tCrossborder } = useTranslation("crossborder");

  const methodsByCurrencyKeys: string[] = Object.keys(methodsByCurrency);

  const router = useRouter();
  const {source} = router.query;

  function goBack() {
    if (source === "crossborder") {
      router.push("/crossborder");
    } else {
      router.push("/wallet");
    }
  }

  return (
    <div className="relative z-[10] p-4 flex flex-col gap-4  max-w-4xl mx-auto">
      <BackButton onBack={goBack} />
      <h2 className="text-2xl">
        {tCrossborder("depositPage.cryptoSelection.heading")}
      </h2>
      {methodsByCurrencyKeys.map((currency) => {
        const currencyDetails = currencies[currency];
        const methods = methodsByCurrency[currency];
        console.log("methods", methods);
        return (
          <div
            key={currency}
            onClick={
              methods.length > 0 ? () => onSelectCurrency(currency) : undefined
            }
            className={`flex items-center border justify-between gap-4 p-4 rounded-lg ${
              methods.length > 0
                ? "hover:bg-gray-100 cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            {STANDARD_STABLE_MAP[currency] ? (
              <div
                className={`flex items-center justify-center ${
                  methods.length > 0 ? "bg-uhuBlue" : "bg-gray-400"
                } text-xl rounded-full text-white font-bold w-10 h-10`}
              >
                {STANDARD_STABLE_MAP[currency].symbol}
              </div>
            ) : (
              currencyDetails?.icon && (
                <Image
                  src={currencyDetails?.icon}
                  fill
                  alt="currency icon"
                />
              )
            )}
            <h2 className="text-xl font-bold">
              {STANDARD_STABLE_MAP[currency]
                ? STANDARD_STABLE_MAP[currency].id
                : currencyDetails?.name.toUpperCase()}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default CryptoSelectionSlide;
