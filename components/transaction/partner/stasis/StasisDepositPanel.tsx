import React from "react";
import { FiatTransaction } from "../../../../types/payload-types";
import { useTranslation } from "next-i18next";
import StasisAwaitingFiatPayment from "./StasisAwaitingFiatPayment";

export default function StasisDepositPanel({
  transaction,
  refetch,
}: {
  transaction: FiatTransaction;
  refetch: () => void;
}) {
  const { t: tTransaction } = useTranslation("transaction");
  switch (transaction.status) {
    case "pending":
      return <div>{tTransaction("stasisDepositPanel.pending")}</div>;
    case "new":
      return <StasisAwaitingFiatPayment transaction={transaction} refetch={refetch} />;
    case "failed":
      return <div>{tTransaction("stasisDepositPanel.failed")}</div>;
    default:
      return <div>{tTransaction("stasisDepositPanel.noActionNecessary")}</div>;
  }
}
