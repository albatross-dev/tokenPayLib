import duplicateByPaymentModality from "@/tokenPayLib/utilities/crossborder/duplicateByPaymentModality";
import sortMethodByCurrencyWithdraw from "@/tokenPayLib/utilities/crossborder/sortMethodByCurrency";
import { STABLE_FIAT_MAP } from "@/tokenPayLib/utilities/stableCoinsMaps";
import { useTranslation } from "next-i18next";
import React from "react";

const minimalBalances = ["EURS", "USDC"];

/**
 * a component to display available fiat currencies that are supported as a stable coin by a payment partner
 */
export default function FiatBalanceSelector({
  availableMethods,
  setAvailableMethods,
  setPreferredStableCoin,
  swiperInstance,
  transfer = true,
  nextSlide,
}) {

  let methodsByCurrency = sortMethodByCurrencyWithdraw(
    availableMethods,
    transfer
  );

  const { t: tCrossborder } = useTranslation("crossborder");

  let missingCurrencies = minimalBalances.filter(
    (currency) => !methodsByCurrency[currency]
  );

  return (
    <>
      {Object.keys(methodsByCurrency).map((currency) => {
        return (
          <div
            key={currency}
            onClick={() => {
              let filledInPartners = duplicateByPaymentModality(methodsByCurrency[currency], "withdrawModality");
              setAvailableMethods(filledInPartners);
              setPreferredStableCoin(currency);
              swiperInstance.slideTo(nextSlide);
            }}
            className="flex items-center border justify-between gap-4 hover:bg-gray-100 p-4 rounded-lg cursor-pointer"
          >
            <div className="font-bold text-xl flex items-center justify-center bg-uhuBlue text-white p-2 rounded-full h-10 w-10">
              {STABLE_FIAT_MAP[currency].symbol}
            </div>
            <h2 className="text-xl font-bold">
              {STABLE_FIAT_MAP[currency].id}
            </h2>
          </div>
        );
      })}
      {Object.keys(methodsByCurrency).length === 1 && (
        <div>
          {tCrossborder("fiatBalanceSelector.onlyAvailable1")}{" "}
          <span className="font-bold">
            {STABLE_FIAT_MAP[Object.keys(methodsByCurrency)[0]].id}
          </span>{" "}
          {tCrossborder("fiatBalanceSelector.onlyAvailable2")}{" "}
          <span className="font-bold">
            {STABLE_FIAT_MAP[Object.keys(methodsByCurrency)[0]].id}
          </span>{" "}
          {tCrossborder("fiatBalanceSelector.onlyAvailable3")}
        </div>
      )}

      {missingCurrencies.map((currency) => {
        return (
          <div
            key={currency}
            className="flex text-gray-500 items-center border justify-between gap-4 p-4 rounded-lg cursor-pointer"
          >
            <div className="font-bold text-xl flex items-center justify-center bg-gray-500 text-white p-2 rounded-full h-10 w-10">
              {STABLE_FIAT_MAP[currency].symbol}
            </div>
            <h2 className="text-xl font-bold">
              {STABLE_FIAT_MAP[currency].id}
            </h2>
          </div>
        );
      })}
      {missingCurrencies.length > 0 && (
        <div>
          {" "}
          {tCrossborder("fiatBalanceSelector.convert1")}{" "}
          <span className="font-bold">
            {STABLE_FIAT_MAP[Object.keys(methodsByCurrency)[0]].id}
          </span>{" "}
          {tCrossborder("fiatBalanceSelector.convert2")}{" "}
        </div>
      )}
    </>
  );
}
