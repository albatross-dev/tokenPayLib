import React from 'react';
import { useTranslation } from "next-i18next";
import { ErrorProps } from './types';

export function Error({}: ErrorProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="text-center text-red-600 py-10">
      {tCrossborder("deposit.bitcoinvn.error")}
    </div>
  );
} 