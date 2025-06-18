import React, { useContext } from "react";
import BackButton from "../components/BackButton";
import TransferPanel from "../components/TransferPanel";
import { useActiveAccount } from "thirdweb/react";
import { AuthContext } from "../../../../../context/UserContext";
import { PaymentTypesArray } from "../../../../types/payload-types";
import { Country } from "../../../../types/payload-types";

interface PartnerPanelProps {
  selectedMethod: PaymentTypesArray[number] | null;
  amount: number;
  selectedCountry: Country | null;
  preferredStableCoin: string;
  onBack: () => void;
}

export default function PartnerPanel({
  selectedMethod,
  amount,
  selectedCountry,
  preferredStableCoin,
  onBack,
}: PartnerPanelProps) {
  const account = useActiveAccount();
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="relative z-[10] text-darkBlue flex flex-col max-w-4xl mx-auto">
        <div className="p-4">
          <BackButton onBack={onBack} />
        </div>
        {selectedMethod && selectedCountry && (
          <TransferPanel
            method={selectedMethod}
            amount={amount}
            account={account}
            user={user}
            selectedCountry={selectedCountry}
            selectedMethod={selectedMethod}
            preferredStableCoin={preferredStableCoin}
          />
        )}
      </div>
    </div>
  );
}
