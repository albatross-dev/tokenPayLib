import React from "react";
import { useTranslation } from "next-i18next";

export default function Success() {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="max-w-4xl mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
        {tCrossborder("withdraw.bitcoinvn.transactionSuccess")}
      </h1>
      <p className="text-center">
        {tCrossborder("withdraw.bitcoinvn.successInfo")}
      </p>
    </div>
  );
} 