import { useUhuConfig } from "@/tokenPayLib/components/contexts/UhuConfigContext";
import React from "react";

export default function OnRamp({ amount, account, user, country, method }) {
  const { setIsHelpModalOpen } = useUhuConfig();

  const onrampUrl = `https://onramp.money/main/buy/?appId=${process.env.NEXT_PUBLIC_ONRAMP_APP_ID}&walletAddress=${account.address}&coinCode=${method.acceptedCrypto}&network=matic20&fiatAmount=${amount}&fiatType=${method.fiatType}&paymentMethod=1`;

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
      <div className="iframe-container">
        <iframe
          src={onrampUrl}
          title="Onramp"
          style={{
            width: "100%",
            height: "800px",
            border: "none",
          }}
          allowFullScreen
        />
      </div>
    </div>
  );
}
