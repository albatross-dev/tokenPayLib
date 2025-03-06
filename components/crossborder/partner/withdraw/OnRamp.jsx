import React from "react";
import { useTranslation } from "next-i18next";
import { useUhuConfig } from "@/tokenPayLib/components/contexts/UhuConfigContext";

export default function OnRamp({ amount, account, user, method }) {
  console.log("Unlimit", amount, account);

  const { t } = useTranslation("common");

  const { t: tCrossborder } = useTranslation("crossborder");
  
  const { setIsHelpModalOpen } = useUhuConfig();

  const offrampUrl = `https://onramp.money/main/sell/?appId=${process.env.NEXT_PUBLIC_ONRAMP_APP_ID}&coinAmount=${amount}&coinCode=USDC&network=matic20&fiatType=${method.fiatType}`;

  return (
    <div className="flex flex-col -mt-8">
    <div className="font-bold text-xl mb-2">
    {tCrossborder("withdraw.onramp.headerInfo")}
    </div>
    <div className="mb-4">
    {tCrossborder("withdraw.onramp.infoText")}
      {" "}
      <span
        className="text-uhuBlue cursor-pointer"
        onClick={() => {
          setIsHelpModalOpen(true);
        }}
      >
        {tCrossborder("withdraw.onramp.customerSupport")}
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
