import { useTranslation } from "next-i18next";
import { FiatTransaction } from "../../../types/payload-types";
import KoyweDepositPanel from "./koywe/KoyweDepositPanel";
import KoyweWithdrawPanel from "./koywe/KoyweWithdrawPanel";
import StasisDepositPanel from "./stasis/StasisDepositPanel";
import HelpDeskDepositPanel from "./helpDesk/deposit/HelpDeskDepositPanel";

export default function PartnerPanel({ transaction, refetch }: { transaction: FiatTransaction; refetch: () => void }) {
  const { t: tTransaction } = useTranslation("transaction");

  switch (transaction.type) {
    case "Withdraw":
      switch (transaction.partner) {
        case "koywe":
          return <KoyweWithdrawPanel transaction={transaction} refetch={refetch} />;
        default:
          return <div>{tTransaction("partnerPanel.noActionAvailable")}</div>;
      }
    case "Deposit":
      switch (transaction.partner) {
        case "koywe":
          return <KoyweDepositPanel transaction={transaction} refetch={refetch} />;
        case "stasis":
          return <StasisDepositPanel transaction={transaction} refetch={refetch} />;
        case "bitcoin_vn_helpdesk":
        case "koywe_helpdesk":
        case "kotanipay_helpdesk":
        case "coinhako_helpdesk":
        case "ovex":
          return <HelpDeskDepositPanel transaction={transaction} refetch={refetch} />;
        default:
          return <div>{tTransaction("partnerPanel.noActionAvailable")}</div>;
      }
  }
}
