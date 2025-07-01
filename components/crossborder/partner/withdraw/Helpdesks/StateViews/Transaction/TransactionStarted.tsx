import { useTranslation } from "next-i18next";
import React from "react";
import Loader from "../../../../../../UI/Loader";

export default function TransactionStarted() {
  const { t: tTransaction } = useTranslation("transaction");

  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-16">
      <div className="">{tTransaction("helpDeskDepositPanel.started")}</div>
      <Loader></Loader>
    </div>
  );
}
