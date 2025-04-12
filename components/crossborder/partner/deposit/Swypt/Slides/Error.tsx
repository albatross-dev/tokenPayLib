import React from 'react';
import { useTranslation } from "next-i18next";
import { ErrorProps } from './types';

export function Error({}: ErrorProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <p className="text-red-500 mt-4 w-full text-center bg-gray-100 p-4 rounded-lg">
      {tCrossborder("withdraw.swypt.errorCreating")}
    </p>
  );
} 