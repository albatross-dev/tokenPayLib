import BitcoinVN from "@/tokenPayLib/components/crossborder/partner/deposit/BitcoinVN";
import OnRamp from "@/tokenPayLib/components/crossborder/partner/deposit/OnRamp";
import Stasis from "@/tokenPayLib/components/crossborder/partner/deposit/Stasis";
import Swypt from "@/tokenPayLib/components/crossborder/partner/deposit/Swypt";
import Unlimit from "@/tokenPayLib/components/crossborder/partner/deposit/Unlimit";

export default function DepositPanel({
  method,
  amount,
  startCurrency,
  endCurrency,
  account,
  user,
  country,
}) {
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
          country={country}
          method={method}
        />
      );
    case "stasis":
      return <Stasis amount={amount} account={account} user={user} />;
    default:
      return <div>Unknown</div>;
  }
}
