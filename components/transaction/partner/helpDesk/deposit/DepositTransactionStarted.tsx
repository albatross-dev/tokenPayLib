import Loader from "@/tokenPayLib/components/UI/Loader";
import { useTranslation } from "next-i18next";
import React from "react";

export default function DepositTransactionStarted() {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="flex flex-col items-center justify-center my-8 gap-16">
      <div className="">{tCrossborder("withdraw.otcStates.waitForAddress")}</div>
      <Loader></Loader>
    </div>
  );
}
