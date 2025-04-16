import { useTranslation } from "next-i18next";
import React from "react";
import Loader from "../../../../../../UI/Loader";
export default function TransactionPending() {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-16">
      <div className="">
        {tCrossborder("withdraw.otcStates.waitForPayment")}
      </div>
      <Loader />
    </div>
  );
}
