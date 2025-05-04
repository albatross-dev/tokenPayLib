import React from "react";
import { FiatTransaction } from "../../../types/payload-types";
import { useTranslation } from "next-i18next";
import KoyweWithdrawPanel from "./koywe/KoyweWithdrawPanel";
import KoyweAwaitingFiatPayment from "./koywe/KoyweAwaitingFiatPayment";

export default function PartnerPanel({
  transaction,
  refetch,
}: {
  transaction: FiatTransaction;
  refetch: () => void;
}) {
  const { t: tTransaction } = useTranslation("transaction");

  switch (transaction.type) {
    case "Withdraw":
      switch (transaction.partner) {
        case "koywe":
          return (
            <KoyweWithdrawPanel transaction={transaction} refetch={refetch} />
          );
        default:
          return <div>{tTransaction("partnerPanel.noActionAvailable")}</div>;
      }
    case "Deposit":
      switch (transaction.partner) {
        case "koywe":
          return (
            <KoyweAwaitingFiatPayment
              transaction={transaction}
              refetch={refetch}
            />
          );
        default:
          return <div>{tTransaction("partnerPanel.noActionAvailable")}</div>;
      }
  }
}
