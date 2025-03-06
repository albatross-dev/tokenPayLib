import React from "react";
import { useTranslation } from "next-i18next";
import { useUhuConfig } from "@/tokenPayLib/components/contexts/UhuConfigContext";

export default function OnRamp({ amount, account, user, method }) {
  console.log("Unlimit", amount, account);

  const { t } = useTranslation("common");
  const { setIsHelpModalOpen } = useUhuConfig();

  const offrampUrl = `https://onramp.money/main/sell/?appId=${process.env.NEXT_PUBLIC_ONRAMP_APP_ID}&coinAmount=${amount}&coinCode=USDC&network=matic20&fiatType=${method.fiatType}`;

  return (
    <div className="flex flex-col -mt-8">
    <div className="font-bold text-xl mb-2">
      Transaktion mit TokenPay-Partner onramp.money
    </div>
    <div>
      Für die Durchführung Ihrer Transaktion folgen Sie bitte den Schritten in
      dem Fenster unten und geben Sie gegebenenfalls weitere benötigte
      persönliche Daten und Informationen an. Die angefragten Informationen
      sind abhängig von der Transaktionshöhe und werden zur Prävention von
      Geldwäsche und aus Sicherheitsgründen regelmäßig abgefragt. Bei Fragen
      oder Fehlern wenden Sie sich gerne an den{" "}
      <span
        className="text-uhuBlue cursor-pointer"
        onClick={() => {
          setIsHelpModalOpen(true);
        }}
      >
        TokenPay-Kundenservice
      </span>
      .
    </div>
    <div className='iframe-container'>
      <iframe
        src={offrampUrl}
        title='Offramp'
        style={{
          width: "100%",
          height: "800px",
          border: "none",
        }}
        allowFullScreen
      ></iframe>
    </div>
    </div>
  );
}
