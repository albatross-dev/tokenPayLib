import { useUhuConfig } from "@/context/UhuConfigContext";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Unlimit({ amount, account, user, country }) {
  console.log("Unlimit: ", amount, account, user, country);

  const { t } = useTranslation("common");
  const { setIsHelpModalOpen } = useUhuConfig();

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
    <div className="font-bold text-xl mb-2">Transaktion mit TokenPay-Partner unlimit.crypto</div>
    <div>
      Für die Durchführung Ihrer Transaktion folgen Sie bitte den Schritten in
      dem Fenster unten und geben Sie gegebenenfalls weitere benötigte
      persönliche Daten und Informationen an. Die angefragten Informationen
      sind abhängig von der Transaktionshöhe und werden zur Prävention von
      Geldwäsche und aus Sicherheitsgründen regelmäßig abgefragt. Bei Fragen
      oder Fehlern wenden Sie sich gerne an den{" "}
      <span className="text-uhuBlue cursor-pointer" onClick={() => {setIsHelpModalOpen(true)}}>
        TokenPay-Kundenservice
      </span>
      .
    </div>
      <div className="iframe-container">
        <iframe
          src={onrampUrl}
          title="Offramp"
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
