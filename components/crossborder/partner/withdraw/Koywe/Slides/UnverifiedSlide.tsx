import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export default function UnverifiedSlide() {
  const { t: tCrossborder } = useTranslation("crossborder");
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {tCrossborder("withdraw.koywe.verificationRequired")}
        </h2>
        <p className="text-gray-600">
          {tCrossborder("withdraw.koywe.verificationRequiredDescription")}
        </p>
      </div>
      <Link
        href="/kyc/koywe"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-uhuBlue hover:bg-uhuBlue-light transition-colors duration-200"
      >
        {tCrossborder("withdraw.koywe.completeVerification")}
      </Link>
    </div>
  );
}
