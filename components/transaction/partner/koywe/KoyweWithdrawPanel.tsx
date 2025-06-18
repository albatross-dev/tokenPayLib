import React from "react";
import { FiatTransaction } from "../../../../types/payload-types";
import { useTranslation } from "next-i18next";
import KoyweAwaitingCryptoPayment from "./KoyweAwaitingCryptoPayment";

export default function KoyweWithdrawPanel({
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
    case "awaitingCryptoPayment":
      return (
        <KoyweAwaitingCryptoPayment
          transaction={transaction}
          refetch={refetch}
        />
      );
    case "failed":
      return <div>{tTransaction("koyweWithdrawPanel.failed")}</div>;
    default:
      return <div>{tTransaction("koyweWithdrawPanel.noActionNecessary")}</div>;
  }
}
