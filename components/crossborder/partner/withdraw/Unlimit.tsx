import React from "react";
import { useTranslation } from "next-i18next";
import { useUhuConfig } from "../../../contexts/UhuConfigContext";
import { Consumer, Country, Vendor } from "../../../../types/payload-types";
import { Account } from "thirdweb/wallets";

interface UnlimitProps {
  amount: number;
  account: Account;
  user: Consumer | Vendor;
  country: Country;
}

const Unlimit: React.FC<UnlimitProps> = ({
  amount,
  account,
  user,
  country,
}) => {
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");
  const { setIsHelpModalOpen } = useUhuConfig();

  const offrampUrl = `https://offramp.gatefi.com/?region=${
    country.countryCode
  }&partnerAccountId=${
    process.env.NEXT_PUBLIC_GATEFI_PARTNER_ACCOUNT_ID
  }&cryptoCurrency=usdc&cryptoAmount=${amount}&fiatAmountLock=false&fiatCurrency=${
    country.countryInfo.currency
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
        <span
          className="text-uhuBlue cursor-pointer"
          onClick={() => {
            setIsHelpModalOpen(true);
          }}
        >
          {tCrossborder("withdraw.unlimit.customerSupport")}
        </span>
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
        ></iframe>
      </div>
    </div>
  );
};

export default Unlimit;
