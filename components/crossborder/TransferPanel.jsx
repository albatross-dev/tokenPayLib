import OnRamp from "@/tokenPayLib/components/crossborder/partner/withdraw/OnRamp";
import Swypt from "@/tokenPayLib/components/crossborder/partner/withdraw/Swypt";
import RawCrypto from "@/tokenPayLib/components/crossborder/partner/withdraw/Crypto";
import BitcoinVN from "@/tokenPayLib/components/crossborder/partner/withdraw/BitcoinVN";
import Stasis from "@/tokenPayLib/components/crossborder/partner/withdraw/Stasis";
import CryptoPartner from "@/tokenPayLib/components/crossborder/partner/withdraw/PartnerCrypto";
import Unlimit from "@/tokenPayLib/components/crossborder/partner/withdraw/Unlimit";
import HelpDesk from "./partner/withdraw/Helpdesks/HelpDesk";

export default function TransferPanel({
  method,
  amount,
  account,
  user,
  selectedCountry,
  selectedMethod,
  preferredStableCoin
}) {

  switch (method?.type) {
    case "unlimit":
      return (
        <Unlimit
          amount={amount}
          account={account}
          user={user}
          country={selectedCountry}
        ></Unlimit>
      );
    case "crypto":
      return <RawCrypto amount={amount} country={selectedCountry} preferredStableCoin={preferredStableCoin}></RawCrypto>;
    case "bitcoin_vn":
      return (
        <BitcoinVN
          amount={amount}
          account={account}
          user={user}
          method={selectedMethod}
          country={selectedCountry}
        ></BitcoinVN>
      );
    case "onramp_money":
      return (
        <OnRamp
          amount={amount}
          account={account}
          user={user}
          method={selectedMethod}
          country={selectedCountry}
        ></OnRamp>
      );
    case "swypt":
      return (
        <Swypt
          amount={amount}
          account={account}
          user={user}
          method={selectedMethod}
          country={selectedCountry}
        ></Swypt>
      );
    // case "roma" to include roma also create the kyc form
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
        ></HelpDesk>
      );
 
    case "stasis":
      return (
        <Stasis
          amount={amount}
          account={account}
          user={user}
          method={selectedMethod}
        ></Stasis>
      );
    case "stasis_crypto_only":
      return (
        <CryptoPartner
          amount={amount}
          country={selectedCountry}
          method={selectedMethod}
        ></CryptoPartner>
      );
    case "koywe_crypto_only":
      return (
        <CryptoPartner
          amount={amount}
          country={selectedCountry}
        ></CryptoPartner>
      );
    default:
      return <div>Unknown</div>;
  }
}
