import React from "react";
import { useTranslation } from "next-i18next";

export default function Error() {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="text-center text-red-600 py-10">
      {tCrossborder("withdraw.bitcoinvn.errorLoadingData")}
    </div>
  );
} 