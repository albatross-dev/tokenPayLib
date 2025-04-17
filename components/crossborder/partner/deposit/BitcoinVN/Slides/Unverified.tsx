import React from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { UnverifiedProps } from "./types";

export function Unverified({}: UnverifiedProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">
        {tCrossborder("deposit.bitcoinvn.kyc.heading")}
      </h2>
      <p className="text-gray-600">
        {tCrossborder("deposit.bitcoinvn.kyc.description")}
      </p>
      <Link
        href="/kyc/bitcoinvn"
        className="mt-4 bg-uhuBlue text-white px-4 py-2 rounded-lg hover:bg-uhuBlue transition flex items-center justify-center"
      >
        {tCrossborder("deposit.bitcoinvn.kyc.button")}
      </Link>
    </div>
  );
}
