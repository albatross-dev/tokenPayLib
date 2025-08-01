import { FiatTransaction } from "@/tokenPayLib/types/payload-types";
import React from "react";
import { useTranslation } from "next-i18next";
import DepositTransactionStarted from "./DepositTransactionStarted";
import DepositTransactionPending from "./DepositTransactionPending";

export default function HelpDeskDepositPanel({
  transaction,
  refetch,
}: {
  transaction: FiatTransaction;
  refetch: () => void;
}) {
  const { t: tTransaction } = useTranslation("transaction");
  switch (transaction.status) {
    case "started":
      return <DepositTransactionStarted />;
    case "paymentPending":
      return <DepositTransactionPending transaction={transaction} />;
    case "done":
      return <div>{tTransaction("helpDeskDepositPanel.done")}</div>;
    default:
      return <div>{tTransaction("helpDeskDepositPanel.noActionNecessary")}</div>;
  }
}
