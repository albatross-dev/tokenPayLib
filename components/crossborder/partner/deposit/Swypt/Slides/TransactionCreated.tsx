import React from 'react';
import { useTranslation } from "next-i18next";
import { TransactionCreatedProps } from './types';

export function TransactionCreated({}: TransactionCreatedProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <p className="text-green-500 mt-4">
      {tCrossborder("withdraw.swypt.successMessage")}
    </p>
  );
} 