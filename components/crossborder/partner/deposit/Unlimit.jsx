import { useUhuConfig } from "@/tokenPayLib/components/contexts/UhuConfigContext";
import React from "react";
import { useTranslation } from "next-i18next";

export default function Unlimit({ amount, account, country, method }) {
  console.log("Unlimit: ", method);

  const { t } = useTranslation("common");
  const { setIsHelpModalOpen } = useUhuConfig();

  const { t: tCrossborder } = useTranslation("crossborder");



  let payment = "";
  if (method.onrampModality[0] === "credit_card") {
    payment = "&payment=BANKCARD_EU"
  } else {
    payment = "&payment=SEPAINSTANT"
  }

  let onrampUrl = `https://onramp.gatefi.com/?region=${country.countryCode}&partnerAccountId=${
    process.env.NEXT_PUBLIC_GATEFI_PARTNER_ACCOUNT_ID
  }&cryptoCurrency=USDC_POLYGON&cryptoCurrencyLock=true&fiatAmount=${amount}&fiatAmountLock=true&fiatCurrency=${
    country.currency
  }&themeMode=light&backToButtonLabel=${encodeURIComponent(
    t("back_to_tokenpay")
  )}&wallet=${encodeURIComponent(account.address)}&walletLock=true`;

  if (payment) {
    onrampUrl += payment;
  }

  return (
    <div className="flex flex-col -mt-8">
      <div className="font-bold text-xl mb-2">{tCrossborder("deposit.unlimit.transactionTitle")}</div>
      <div className="mb-4">
        {tCrossborder("deposit.unlimit.transactionInstructions1")}
        <button
          type="button"
          className="text-uhuBlue cursor-pointer"
          onClick={() => {
            setIsHelpModalOpen(true);
          }}
        >
          {tCrossborder("deposit.unlimit.transactionInstructions2")}
        </button>
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
        />
      </div>
    </div>
  );
}
