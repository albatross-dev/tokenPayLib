import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Account } from "thirdweb/wallets";
import { Consumer, PaymentTypesArray, Country, Vendor } from "../../../../../types/payload-types";
import Loader from "../../../../UI/Loader";
import { getKoyweAccountState, KoyweBankAccount } from "../../universal/koyweUtils";
import SelectBankAccountSlide from "./Slides/SelectBankAccountSlide";
import UnverifiedSlide from "./Slides/UnverifiedSlide";
import CreateTransactionSlide from "./Slides/CreateTransactionSlide";

interface KoyweProps {
  amount: number;
  account: Account;
  user: Consumer | Vendor;
  method: PaymentTypesArray[number];
  country: Country;
}

export default function Koywe({ amount, account, user, method, country }: KoyweProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const [state, setState] = useState<"loading" | "error" | "normal">("loading");

  const [selectedBankAccount, setSelectedBankAccount] = useState<KoyweBankAccount | null>(null);

  const [view, setView] = useState<"unverified" | "bankAccount" | "createTransaction">("bankAccount");

  // ###################
  // # Component Logic #
  // ###################

  useEffect(() => {
    setState("loading");
    const fetchKoyweAccountState = async () => {
      const koyweAccountState = await getKoyweAccountState();
      setState("normal");
      if (koyweAccountState.canOperate) {
        setView("bankAccount");
      } else {
        setView("unverified");
      }
    };
    fetchKoyweAccountState();
  }, []);

  function handleOnSelectBankAccount(bankAccount: KoyweBankAccount) {
    setSelectedBankAccount(bankAccount);
    setView("createTransaction");
  }

  // ####################
  // # Render Functions #
  // ####################

  const renderLoading = () => (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );

  const renderError = () => (
    <div className="text-center text-red-600 py-10">{tCrossborder("withdraw.koywe.error")}</div>
  );

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 md:p-8 items-center justify-center border-gray-200 border rounded-md">
      {state === "loading" ? (
        renderLoading()
      ) : state === "error" ? (
        renderError()
      ) : state === "normal" ? (
        view === "bankAccount" ? (
          <SelectBankAccountSlide country={country} onSelectBankAccount={handleOnSelectBankAccount} />
        ) : view === "unverified" ? (
          <UnverifiedSlide />
        ) : view === "createTransaction" ? (
          <CreateTransactionSlide
            selectedBankAccount={selectedBankAccount}
            amount={amount}
            country={country}
            method={method}
          />
        ) : null
      ) : null}
    </div>
  );
}
