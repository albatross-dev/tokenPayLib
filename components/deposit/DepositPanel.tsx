import { Account } from "thirdweb/wallets";
import BitcoinVN from "../../components/crossborder/partner/deposit/BitcoinVN";
import OnRamp from "../../components/crossborder/partner/deposit/OnRamp";
import Stasis from "../../components/crossborder/partner/deposit/Stasis";
import Swypt from "../../components/crossborder/partner/deposit/Swypt";
import Unlimit from "../../components/crossborder/partner/deposit/Unlimit";
import {
  Consumer,
  Vendor,
  PaymentTypesArray,
  Country,
} from "../../types/payload-types";
import React from "react";
import HelpDesk from "../crossborder/partner/withdraw/Helpdesks/HelpDesk";

interface DepositPanelProps {
  method: PaymentTypesArray[number];
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
      return (
        <Unlimit
          amount={amount}
          account={account}
          user={user}
          country={country}
        />
      );
    case "onramp_money":
      return (
        <OnRamp
          amount={amount}
          account={account}
          user={user}
          country={country}
          method={method}
        />
      );
    case "bitcoin_vn":
      return (
        <BitcoinVN
          amount={amount}
          startCurrency={startCurrency}
          endCurrency={endCurrency}
          account={account}
          user={user}
          country={country}
          method={method}
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
    case "stasis":
      return <Stasis amount={amount} account={account} user={user} />;
    case "bitcoin_vn_helpdesk":
    case "koywe_helpdesk":
    case "kotanipay_helpdesk":
    case "coinhako_helpdesk":
    case "ovex":
      return (
        <HelpDesk
          country={country}
          amount={amount}
          account={account}
          method={method}
        ></HelpDesk>
      );

    default:
      return <div>Unknown</div>;
  }
}
