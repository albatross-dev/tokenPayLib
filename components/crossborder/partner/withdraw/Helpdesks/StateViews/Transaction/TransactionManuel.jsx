import { useTranslation } from "next-i18next";
import React from "react";

export default function TransactionManual() {
  const { t: tCrossborder } = useTranslation("crossborder");

  <div className="flex flex-col items-center justify-center mt-8 gap-2">
    <div className="font-bold">
      {tCrossborder("withdraw.otcStates.manuelInfo")}
    </div>
    <div>{tCrossborder("withdraw.otcStates.manuelInfo2")}</div>
    <div
      onClick={handleNewTransaction}
      className="cursor-pointer bg-uhuBlue rounded py-1 px-2 font-bold text-white"
    >
      {tCrossborder("withdraw.otcStates.newTransaction")}
    </div>
  </div>;
}
