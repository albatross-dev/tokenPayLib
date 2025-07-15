import { useTranslation } from "next-i18next";
import { Account } from "thirdweb/wallets";
import {
  PaymentTypesArray
} from "../../../../types/payload-types";
import { useUhuConfig } from "../../../contexts/UhuConfigContext";

interface OnRampProps {
  amount: number;
  account: Account;
  method: PaymentTypesArray[number];
}

export default function OnRamp({ amount, account, method }: OnRampProps) {
  const { setIsHelpModalOpen } = useUhuConfig();
  const { t: tCrossborder } = useTranslation("crossborder");

  const onrampUrl = `https://onramp.money/main/buy/?appId=${process.env.NEXT_PUBLIC_ONRAMP_APP_ID}&walletAddress=${account.address}&coinCode=${method.acceptedCrypto}&network=matic20&fiatAmount=${amount}&fiatType=${method.fiatTypeOnramp}&paymentMethod=1`;

  return (
    <div className="flex flex-col -mt-8">
      <div className="font-bold text-xl mb-2">
        {tCrossborder("deposit.onramp.transactionTitle")}
      </div>
      <div className="mb-4">
        {tCrossborder("deposit.onramp.transactionInstructions1")}
        <button
          type="button"
          className="text-uhuBlue cursor-pointer"
          onClick={() => {
            setIsHelpModalOpen(true);
          }}
        >
          {tCrossborder("deposit.onramp.transactionInstructions2")}
        </button>
        {tCrossborder("deposit.onramp.transactionInstructions3")}
      </div>
      <div className="iframe-container">
        <iframe
          src={onrampUrl}
          title={tCrossborder("deposit.onramp.iframeTitle")}
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
