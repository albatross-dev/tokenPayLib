import React from 'react';
import { IoAdd } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import { SlideProps } from "./types";

export default function SelectBankAccount({ 
  bankAccounts,
  setView,
  setSelectedBankAccount
}: SlideProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const handleSelectBankAccount = (account: any) => {
    setSelectedBankAccount(account);
    setView("withdraw");
  };

  return (
    <div className="max-w-96 w-full mb-16 mt-4">
      <h2 className="text-xl font-semibold mb-4">
        {tCrossborder("withdraw.stasis.chooseBankaccount")}
      </h2>
      {bankAccounts.length > 0 ? (
        <ul className="space-y-4">
          {bankAccounts.map((account) => (
            <li
              key={account.uuid}
              className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <p className="text-sm font-medium text-gray-800">
                {account.holder_name} - {account.bank_name}
              </p>
              <p className="text-xs text-gray-500">
                {tCrossborder("withdraw.stasis.IBAN")} {account.iban}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => handleSelectBankAccount(account)}
              >
                {tCrossborder("withdraw.stasis.chooseThisAcount")}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          {tCrossborder("withdraw.stasis.noAccountAvailable")}
        </p>
      )}
      <button
        className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
        onClick={() => setView("add")}
      >
        <IoAdd className="mr-2" />
        {tCrossborder("withdraw.stasis.addNewBankAccount")}
      </button>
    </div>
  );
} 