import React from 'react';
import { useTranslation } from "next-i18next";
import { HiChevronDoubleRight } from "react-icons/hi2";
import { OverviewProps } from './types';
import { getFiatCurrencyCode } from '../../../../../../utilities/stableCoinsMaps';

export function Overview({ quote, onStartTransaction }: OverviewProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        {tCrossborder("deposit.bitcoinvn.overview.heading")}
      </h2>
      <div className="flex flex-col mb-4">
        <div className="flex flex-row gap-2 items-center text-sm">
          <p>
            <strong>{tCrossborder("deposit.bitcoinvn.overview.rate")}</strong>{" "}
            {quote.rate}
          </p>
          <p className="text-red-500">
            <strong>{tCrossborder("deposit.bitcoinvn.overview.validFor")}</strong>{" "}
            {quote.expiresAt &&
              Math.round(
                (new Date(quote.expiresAt).getTime() - new Date().getTime()) /
                  60000
              )}{" "}
            {tCrossborder("deposit.bitcoinvn.overview.minutes")}
          </p>
        </div>
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col items-start gap-1">
            <p className="text-6xl">
              {quote.depositAmount} {quote.depositMethod.toUpperCase()}
            </p>
            <strong className="text-gray-500">
              {tCrossborder("deposit.bitcoinvn.overview.depositAmount")}
            </strong>
          </div>
          <div className="flex items-start">
            <HiChevronDoubleRight className="text-6xl text-gray-500" />
          </div>
          <div className="flex flex-col items-end justify-end gap-1">
            <p className="text-6xl">
              {quote.settleAmount} {quote.settleMethod && getFiatCurrencyCode(quote.settleMethod)}
            </p>
            <strong className="text-gray-500">
              {tCrossborder("deposit.bitcoinvn.overview.credit")}
            </strong>
          </div>
        </div>
      </div>
      <button
        onClick={onStartTransaction}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        {tCrossborder("deposit.bitcoinvn.overview.button")}
      </button>
    </div>
  );
} 