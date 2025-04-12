import { useTranslation } from "next-i18next";
import React from "react";

interface TransactionDoneProps {
  handleNewTransaction: () => void;
}

export default function TransactionDone({ handleNewTransaction }: TransactionDoneProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="max-w-4xl mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
        {tCrossborder("withdraw.otcStates.successHeader")}
      </h1>
      <p className="text-center">
        {tCrossborder("withdraw.otcStates.successInfo")}
      </p>
      <div className="flex items-center justify-center mt-6">
        <div
          onClick={handleNewTransaction}
          className="cursor-pointer bg-uhuBlue rounded py-1 px-2 font-bold text-white"
        >
          {tCrossborder("withdraw.otcStates.newTransaction")}
        </div>
      </div>
    </div>
  );
}
