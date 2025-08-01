import CryptoIcon from "../../../../assets/CryptoIcon";
import { getFiatInfo } from "../../../../utilities/stableCoinsMaps";
import React from "react";
import { useTranslation } from "next-i18next";
import { Currency, PaymentTypesArray } from "../../../../types/payload-types";
import { SwiperClass } from "swiper/react";
import { FiatCodes } from "../../../../types/derivedPayload.types";

interface FiatReceivingSelectorProps {
  availableMethods: PaymentTypesArray;
  allMethods: PaymentTypesArray;
  setAvailableMethods: (methods: PaymentTypesArray) => void;
  setPayoutCurrency: (currency: FiatCodes | "crypto") => void;
  setSelectedMethod: (method: PaymentTypesArray[number] | null) => void;
  swiperInstance: SwiperClass | null;
  nextSlide: number;
}

export default function FiatReceivingSelector({
  availableMethods,
  allMethods,
  setAvailableMethods,
  setPayoutCurrency,
  setSelectedMethod,
  swiperInstance,
  nextSlide,
}: FiatReceivingSelectorProps) {
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");

  // make a set of all available currencies from the availableMethods and adding crypto
  const allCurrencies = new Set<string>();
  availableMethods.forEach((method) => {
    // method.currenices is an array of objects with currency which contains its shorthand like EUR
    method.currencies.forEach((currency: PaymentTypesArray[number]["currencies"][number]) => {
      allCurrencies.add(currency.currency);
    });
  });

  // check if all methods contains a crypto method with type "crypto"
  if (allMethods.find((method) => method.type === "crypto")) {
    allCurrencies.add("crypto");
  }

  function getAvailableMethods(currency: string): PaymentTypesArray {
    return availableMethods.filter((method) =>
      method.currencies.find((c: PaymentTypesArray[number]["currencies"][number]) => c.currency === currency)
    );
  }

  return (
    <>
      <h2 className="text-2xl">{tCrossborder("receivingSelector.targetCurrency")}</h2>
      {Array.from(allCurrencies).map((currency: FiatCodes | "crypto") => {
        return currency === "crypto" ? (
          <div
            key={currency}
            onClick={() => {
              const cryptoMethod = allMethods.find((method) => method.type === "crypto");
              setSelectedMethod(cryptoMethod || null);
              setPayoutCurrency(currency);
              swiperInstance?.slideTo(nextSlide);
            }}
            className="flex items-center border justify-between gap-4 hover:bg-gray-100 p-4 rounded-lg cursor-pointer"
          >
            <div className="font-bold text-xl flex items-center justify-center bg-uhuBlue text-white p-2 rounded-full h-10 w-10">
              <CryptoIcon />
            </div>
            <h2 className="text-xl font-bold">{t("crypto")}</h2>
          </div>
        ) : (
          <div
            key={currency}
            onClick={() => {
              setAvailableMethods(getAvailableMethods(currency));
              setPayoutCurrency(currency);
              swiperInstance?.slideTo(nextSlide);
            }}
            className="flex items-center border justify-between gap-4 hover:bg-gray-100 p-4 rounded-lg cursor-pointer"
          >
            <div className="font-bold text-xl flex items-center justify-center bg-uhuBlue text-white p-2 rounded-full h-10 w-10">
              {getFiatInfo(currency)?.symbol}
            </div>
            <h2 className="text-xl font-bold">{getFiatInfo(currency)?.id}</h2>
          </div>
        );
      })}
    </>
  );
}
