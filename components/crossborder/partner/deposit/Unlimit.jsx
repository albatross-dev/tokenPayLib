import { useUhuConfig } from "@/context/UhuConfigContext";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Unlimit({ amount, account, user, country }) {
  console.log("Unlimit: ", amount, account, user, country);

  const { t } = useTranslation("common");
  const { setIsHelpModalOpen } = useUhuConfig();

  const { t: tCrossborder } = useTranslation("crossborder");

  const onrampUrl = `https://onramp.gatefi.com/?region=${
    country.countryCode
  }&partnerAccountId=${
    process.env.NEXT_PUBLIC_GATEFI_PARTNER_ACCOUNT_ID
  }&cryptoCurrency=usdc&cryptoCurrencyLock=true&fiatAmount=${amount}&fiatAmountLock=true&fiatCurrency=${
    country.currency
  }&themeMode=light&backToButtonLabel=${encodeURIComponent(
    t("back_to_tokenpay")
  )}&wallet=${encodeURIComponent(account.address)}&walletLock=true`;

  return (
    <div className="flex flex-col -mt-8">
      <div className="font-bold text-xl mb-2">
        {tCrossborder("deposit.unlimit.transactionTitle")}
      </div>
      <div>
        {tCrossborder("deposit.unlimit.transactionInstructions1")}
        <span
          className="text-uhuBlue cursor-pointer"
          onClick={() => {
            setIsHelpModalOpen(true);
          }}
        >
          {tCrossborder("deposit.unlimit.transactionInstructions2")}
        </span>
        {tCrossborder("deposit.unlimit.transactionInstructions3")}
      </div>
      <div className="iframe-container">
        <iframe
          src={onrampUrl}
          title={tCrossborder("deposit.unlimit.iframeTitle")}
          style={{
            width: "100%",
            height: "900px",
            border: "none",
          }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}