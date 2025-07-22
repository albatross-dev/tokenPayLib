import { Account } from "thirdweb/wallets";
import { Consumer, Country, Vendor } from "../../../types/payload-types";
import BitcoinVN from "../../crossborder/partner/deposit/BitcoinVN/BitcoinVN";
import HelpDesk from "../../crossborder/partner/deposit/Helpdesks/HelpDesk";
import Koywe from "../../crossborder/partner/deposit/Koywe/Koywe";
import OnRamp from "../../crossborder/partner/deposit/OnRamp";
import Stasis from "../../crossborder/partner/deposit/Stasis/Stasis";
import Swypt from "../../crossborder/partner/deposit/Swypt/Swypt";
import Unlimit from "../../crossborder/partner/deposit/Unlimit";
import DepositError from "../DepositError";
import { QuotePaymentType } from "./DepositMethodSelector";

interface DepositPanelProps {
  method: QuotePaymentType;
  amount: number;
  startCurrency?: string;
  endCurrency?: string;
  account: Account;
  user: Consumer | Vendor;
  country?: Country;
}

export default function DepositPanel({
  method,
  amount,
  startCurrency,
  endCurrency,
  account,
  user,
  country,
}: DepositPanelProps) {
  switch (method?.type) {
    case "unlimit":
      return <Unlimit amount={amount} account={account} user={user} country={country} />;
    case "onramp_money":
      return <OnRamp amount={amount} account={account} method={method} />;
    case "bitcoin_vn":
      return (
        <BitcoinVN
          amount={amount}
          startCurrency={startCurrency}
          endCurrency={endCurrency}
          account={account}
          user={user}
        />
      );
    case "swypt":
      return (
        <Swypt
          amount={amount}
          account={account}
          user={user}
          method={method}
          startCurrency={startCurrency}
          endCurrency={endCurrency}
        />
      );
    case "koywe":
      return <Koywe method={method} account={account} country={country} />;
    case "stasis":
      return <Stasis amount={amount} account={account} user={user} />;
    case "bitcoin_vn_helpdesk":
    case "koywe_helpdesk":
    case "kotanipay_helpdesk":
    case "coinhako_helpdesk":
    case "ovex":
      return (
        <HelpDesk
          method={method}
          amount={amount}
          country={country}
          startCurrency={startCurrency}
          endCurrency={endCurrency}
        />
      );

    default:
      return <DepositError errorType="unavailable" />;
  }
}
