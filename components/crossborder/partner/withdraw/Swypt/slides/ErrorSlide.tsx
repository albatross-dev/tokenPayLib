import { useTranslation } from "next-i18next";
import React from "react";

export const ErrorSlide: React.FC = () => {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <p className="text-red-500 mt-4">
      {tCrossborder("withdraw.swypt.errorCreating")}
    </p>
  );
}; 