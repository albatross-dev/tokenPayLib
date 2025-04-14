import React from 'react';
import { useTranslation } from "next-i18next";
import { IoAdd } from "react-icons/io5";
import { BankAccount } from '../../../universal/stasis.types';

interface SelectBankProps {
  bankAccounts: BankAccount[];
  onSelectBank: (account: BankAccount) => void;
  onAddBank: () => void;
}

export function SelectBank({ bankAccounts, onSelectBank, onAddBank }: SelectBankProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">
        {tCrossborder("deposit.stasis.selectBank.heading")}
      </h2>
      {bankAccounts.length > 0 ? (
        <ul className="space-y-4">
          {bankAccounts.map((account) => (
            <li
              key={account.uuid}
              className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <p className="text-sm font-medium text-gray-800 mb-2">
                {account.name}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                {tCrossborder("deposit.stasis.selectBank.owner")}{" "}
                {account.holder_name}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                {tCrossborder("deposit.stasis.selectBank.bank")} {account.bank_name}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                IBAN: {account.iban}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => onSelectBank(account)}
              >
                {tCrossborder("deposit.stasis.selectBank.button")}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          {tCrossborder("deposit.stasis.selectBank.noAccounts")}
        </p>
      )}
      <button
        className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
        onClick={onAddBank}
      >
        <IoAdd className="mr-2" />{" "}
        {tCrossborder("deposit.stasis.selectBank.addButton")}
      </button>
    </div>
  );
} 