import { Consumer, Country, PaymentTypesArray, Vendor } from "../../../../types/payload-types";
import OnRamp from "../../../../components/crossborder/partner/withdraw/OnRamp";
import Swypt from "../../partner/withdraw/Swypt/Swypt";
import RawCrypto from "../../../../components/crossborder/partner/withdraw/Crypto";
import BitcoinVN from "../../partner/withdraw/BitcoinVN/BitcoinVN";
import Stasis from "../../../../components/crossborder/partner/withdraw/Stasis";
import CryptoPartner from "../../../../components/crossborder/partner/withdraw/PartnerCrypto";
import Unlimit from "../../../../components/crossborder/partner/withdraw/Unlimit";
import HelpDesk from "../../partner/withdraw/Helpdesks/HelpDesk";
import Koywe from "../../partner/withdraw/Koywe";
import { Account } from "thirdweb/wallets";
import React from "react";


interface TransferPanelProps {
  method?: PaymentTypesArray[number];
  amount: number;
  account: Account;
  user: Vendor | Consumer;
  selectedCountry: Country;
  selectedMethod: PaymentTypesArray[number];
  preferredStableCoin?: string;
}

export default function TransferPanel({
  method,
  amount,
  account,
  user,
  selectedCountry,
  selectedMethod,
  preferredStableCoin
}: TransferPanelProps) {
  switch (method?.type) {
    case "unlimit":
      return (
        <Unlimit
          amount={amount}
          account={account}
          user={user}
          country={selectedCountry}
        />
      );
    case "crypto":
      return <RawCrypto amount={amount} preferredStableCoin={preferredStableCoin} />;
    case "bitcoin_vn":
      return (
        <BitcoinVN
          amount={amount}
          user={user}
        />
      );
    case "onramp_money":
      return (
        <OnRamp
          amount={amount}
          method={selectedMethod}
        />
      );
    case "swypt":
      return (
        <Swypt
          amount={amount}
          account={account}
          user={user}
          method={selectedMethod}
          country={selectedCountry}
        />
      );
    case "bitcoin_vn_helpdesk":
    case "koywe_helpdesk":
    case "kotanipay_helpdesk":
    case "coinhako_helpdesk":
    case "ovex":
      return (
        <HelpDesk
          country={selectedCountry}
          amount={amount}
          account={account}
          method={selectedMethod}
        />
      );
    case "stasis":
      return (
        <Stasis
          amount={amount}
          account={account}
          user={user}
          preferredStableCoin={preferredStableCoin}
          method={selectedMethod}
        />
      );
    case "stasis_crypto_only":
      return (
        <CryptoPartner
          amount={amount}
          country={selectedCountry}
          method={selectedMethod}
          preferredStableCoin={preferredStableCoin}
        />
      );
    case "koywe_crypto_only":
      return (
        <CryptoPartner
          amount={amount}
          country={selectedCountry}
        />
      );
    case "koywe":
      return (
        <Koywe
          amount={amount}
          account={account}
          user={user}
          method={selectedMethod}
          country={selectedCountry}
        />
      );
    default:
      return <div>Unknown</div>;
  }
} 