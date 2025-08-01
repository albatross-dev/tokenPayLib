import { FiatTransaction } from "@/tokenPayLib/types/payload-types";
import { useTranslation } from "next-i18next";
import React from "react";

export default function DepositTransactionPending({ transaction }: { transaction: FiatTransaction }) {
  const { t: tCrossborder } = useTranslation("crossborder");
  return (
    <div className="max-w-4xl mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-uhuBlue text-center">
        {tCrossborder("withdraw.otcStates.finalize")}
      </h1>
      <div className="flex flex-col gap-2 bg-uhuGray p-4 rounded-lg shadow-sm">
        <div>{tCrossborder("withdraw.otcStates.send")}</div>
        <div className="font-bold text-6xl text-gray-600">
          {transaction?.amount?.toLocaleString()} {transaction?.fiatOriginCurrency}
        </div>
        <div>{tCrossborder("withdraw.otcStates.otcAddressInfo")}</div>
        <div className="">{transaction?.transferInstructions}</div>
      </div>
    </div>
  );
}
