import { useTranslation } from "next-i18next";
import React from "react";

interface TransactionManualProps {
  handleNewTransaction: () => void;
}

export default function DepositTransactionManual({ handleNewTransaction }: TransactionManualProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-2">
      <div className="font-bold">{tCrossborder("withdraw.otcStates.manuelInfo")}</div>
      <div>{tCrossborder("withdraw.otcStates.manuelInfo2")}</div>
    </div>
  );
}
