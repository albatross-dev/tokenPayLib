import React from 'react';
import { useTranslation } from "next-i18next";
import { SuccessProps } from './types';

export function Success({}: SuccessProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
        {tCrossborder("withdraw.swypt.transactionSuccess")}
      </h1>
      <p className="text-center">
        {tCrossborder("withdraw.swypt.transactionSuccess")}
      </p>
    </div>
  );
} 