import React from "react";
import { FiatTransaction } from "../../../../types/payload-types";
import { useTranslation } from "next-i18next";
import KoyweAwaitingFiatPayment from "./KoyweAwaitingFiatPayment";

export default function KoyweDepositPanel({
  transaction,
  refetch,
}: {
  transaction: FiatTransaction;
  refetch: () => void;
}) {
  const { t: tTransaction } = useTranslation("transaction");
  switch (transaction.status) {
    case "pending":
      return <div>{tTransaction("koyweWithdrawPanel.pending")}</div>;
    case "awaitingFiatPayment":
      return (
        <KoyweAwaitingFiatPayment transaction={transaction} refetch={refetch} />
      );
    case "failed":
      return <div>{tTransaction("koyweWithdrawPanel.failed")}</div>;
    default:
      return <div>{tTransaction("koyweWithdrawPanel.noActionNecessary")}</div>;
  }
}
