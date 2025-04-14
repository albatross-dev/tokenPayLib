import React from 'react';
import { useTranslation } from "next-i18next";
import { PoolingProps } from './types';
import Loader from '../../../../../UI/Loader';

export function Pooling({}: PoolingProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
      <div className="rounded bg-green-100 p-4">
        {tCrossborder("deposit.swypt.poolingMessage")}
      </div>
      <Loader />
    </div>
  );
} 