import React from 'react';
import { useTranslation } from "next-i18next";
import { IoAdd } from "react-icons/io5";
import { CryptoAccount } from './types';

interface SelectCryptoProps {
  cryptoAccounts: CryptoAccount[];
  onSelectCrypto: (account: CryptoAccount) => void;
  onAddCrypto: () => void;
}

export function SelectCrypto({ cryptoAccounts, onSelectCrypto, onAddCrypto }: SelectCryptoProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">
        {tCrossborder("deposit.stasis.selectCrypto.heading")}
      </h2>
      {cryptoAccounts.length > 0 ? (
        <ul className="space-y-4">
          {cryptoAccounts.map((account) => (
            <li
              key={account.uuid}
              className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <p className="text-sm font-medium text-gray-800 mb-1">
                {account.name}
              </p>
              <p className="text-xs text-gray-500">
                {tCrossborder("deposit.stasis.selectCrypto.address")}
                {account.address}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => onSelectCrypto(account)}
              >
                {tCrossborder("deposit.stasis.selectCrypto.button")}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          {tCrossborder("deposit.stasis.selectCrypto.noAccounts")}
        </p>
      )}
      <button
        className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
        onClick={onAddCrypto}
      >
        <IoAdd className="mr-2" />
        {tCrossborder("deposit.stasis.selectCrypto.addButton")}
      </button>
    </div>
  );
} 