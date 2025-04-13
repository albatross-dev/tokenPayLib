import { Account } from "thirdweb/wallets";
import BitcoinVN from "../../partner/deposit/BitcoinVN";
import OnRamp from "../../crossborder/partner/deposit/OnRamp";
import Swypt from "../../partner/deposit/Swypt";
import Unlimit from "../../crossborder/partner/deposit/Unlimit";
import { Consumer, Vendor, PaymentTypesArray, Country } from "../../../types/payload-types";
import React from "react";
import DepositError from "./DepositError";
import Stasis from "../../crossborder/partner/deposit/Stasis/Stasis";

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
      return <DepositError errorType="helpdesk" />;
 
    default:
      return <DepositError errorType="unavailable" />;
  }
}
