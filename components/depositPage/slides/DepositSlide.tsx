import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import {
  Consumer,
  Country,
  PaymentTypesArray,
  Vendor,
} from "../../../types/payload-types";
import { Account } from "thirdweb/wallets";
import Loader from "../../UI/Loader";
import DepositPanel from "../DepositPanel";

interface DepositSlideProps {
  selectedMethod: PaymentTypesArray[number] | null;
  amount: number;
  preferredFiatCurrency: string;
  preferredStableCoin: string | null;
  account: Account | null;
  user: Vendor | Consumer | "loading";
  selectedCountry: Country | null;
  onBack: () => void;
}

const DepositSlide: React.FC<DepositSlideProps> = ({
  selectedMethod,
  amount,
  preferredFiatCurrency,
  preferredStableCoin,
  account,
  user,
  selectedCountry,
  onBack,
}) => {
  return (
    <div className="relative z-[10]  flex flex-col gap-4  max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-uhuBlue hover:text-blue-700 mb-4"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>
      {user === "loading" ? (
        <div className="w-full h-full p-4">
          <Loader />
        </div>
      ) : (
        <DepositPanel
          method={selectedMethod}
          amount={amount}
          startCurrency={preferredFiatCurrency}
          endCurrency={preferredStableCoin}
          account={account}
          user={user}
          country={selectedCountry}
        />
      )}
    </div>
  );
};

export default DepositSlide;
