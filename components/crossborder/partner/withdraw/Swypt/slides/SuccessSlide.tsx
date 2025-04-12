import { useTranslation } from "next-i18next";
import React from "react";

export const SuccessSlide: React.FC = () => {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="max-w-4xl mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
        {tCrossborder("withdraw.swypt.transactionSuccess")}
      </h1>
      <p className="text-center">
        {tCrossborder("withdraw.swypt.transactionSuccess")}
      </p>
    </div>
  );
}; 