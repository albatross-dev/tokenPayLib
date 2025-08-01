import { useTranslation } from "next-i18next";
import { Account } from "thirdweb/wallets";
import { Country } from "../../../../types/payload-types";
import { useUhuConfig } from "../../../contexts/UhuConfigContext";

interface UnlimitProps {
  amount: number;
  account: Account;
  country: Country;
}

function Unlimit({
  amount,
  account,
  country,
}: UnlimitProps){
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");
  const { setIsHelpModalOpen } = useUhuConfig();

  const offrampUrl = `https://offramp.gatefi.com/?region=${
    country.countryCode
  }&partnerAccountId=${
    process.env.NEXT_PUBLIC_GATEFI_PARTNER_ACCOUNT_ID
  }&cryptoCurrency=USDC&cryptoAmount=${amount}&fiatAmountLock=false&fiatCurrency=${
    country.countryInfo.currency.toUpperCase()
  }&payout=BANK&themeMode=light&redirectUrl=${encodeURIComponent(
    "https://exchange.usetokenpay.com"
  )}&backToButtonLabel=${encodeURIComponent(
    t("back_to_tokenpay")
  )}&wallet=${encodeURIComponent(account.address)}&walletLock=true`;

  return (
    <div className="flex flex-col -mt-8">
      <div className="font-bold text-xl mb-2">
        {tCrossborder("withdraw.unlimit.partnerHeadline")}
      </div>
      <div className="mb-4">
        {tCrossborder("withdraw.unlimit.partnerText")}{" "}
        <button
          className="text-uhuBlue cursor-pointer"
          type="button"
          onClick={() => {
            setIsHelpModalOpen(true);
          }}
        >
          {tCrossborder("withdraw.unlimit.customerSupport")}
        </button>
        .
      </div>
      <div className="iframe-container">
        <iframe
          src={offrampUrl}
          title="Offramp"
          style={{
            width: "100%",
            height: "820px",
            border: "none",
          }}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Unlimit;
