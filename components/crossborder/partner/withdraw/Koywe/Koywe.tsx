import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Account } from "thirdweb/wallets";
import {
  Consumer,
  PaymentTypesArray,
  Country,
  Vendor,
} from "../../../../../types/payload-types";
import Loader from "../../../../UI/Loader";
import React from "react";
interface KoyweProps {
  amount: number;
  account: Account;
  user: Consumer | Vendor;
  method: PaymentTypesArray[number];
  country: Country;
}

export default function Koywe({
  amount,
  account,
  user,
  method,
  country,
}: KoyweProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  // 'loading' | 'error' | 'overview' | 'created'
  const [state, setState] = useState("loading");

  // The transaction created by the backend
  //  on koywe with the payment informations
  const [transaction, setTransaction] = useState(null);

  // 'withdraw', 'success' or 'loading'
  const [view, setView] = useState("withdraw");

  // ###################
  // # Component Logic #
  // ###################

  useEffect(() => {
    setState("loading");
    // do stuff
    setState("overview");
  }, []);

  // ####################
  // # Render Functions #
  // ####################

  const renderLoading = () => (
    <div className="w-full h-full flex items-center justify-center mt-16">
      <Loader />
    </div>
  );

  const renderError = () => (
    <div className="text-center text-red-600 py-10">
      {tCrossborder("withdraw.koywe.error")}
    </div>
  );

  const renderKoyweKYCLink = () => (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">
        {tCrossborder("withdraw.koywe.kyc.heading")}
      </h2>
      <p className="text-gray-600">
        {tCrossborder("withdraw.koywe.kyc.description")}
      </p>
      <Link
        href="/kyc/koywe"
        className="mt-4 bg-uhuBlue text-white px-4 py-2 rounded-lg hover:bg-uhuBlue transition flex items-center justify-center"
      >
        {tCrossborder("withdraw.koywe.kyc.button")}
      </Link>
    </div>
  );

  const renderKoyweWithdraw = () => <div>Withdraw </div>;

  const renderSuccess = () => <div>Success </div>;

  return (
    <div className="flex flex-col w-full max-w-4xl  items-center justify-center p-4">
      {/* {user.koyweState === "unverified" || user.koyweState === undefined
        ? renderKoyweKYCLink()
        : user.koyweState === "in_progress"
        ? renderLoading()
        : user.koyweState === "verified"
        ? ( view === "withdraw"
          ? renderKoyweWithdraw()
          : view === "success"
          ? renderSuccess()
          : view === "loading"
          ? renderLoading()
          : renderError()
        )
        : renderLoading()} */}
    </div>
  );
}
