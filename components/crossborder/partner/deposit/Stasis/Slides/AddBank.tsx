import React from 'react';
import { useTranslation } from "next-i18next";
import { IoAdd } from "react-icons/io5";
import LoadingButton from "../../../../UI/LoadingButton";
import { NewBankAccount, LoadingState, StasisErrors } from './types';

interface AddBankProps {
  newBankAccount: NewBankAccount;
  onBankAccountChange: (account: NewBankAccount) => void;
  onAddBankAccount: () => Promise<void>;
  loadingState: LoadingState;
  errors: StasisErrors;
}

export function AddBank({
  newBankAccount,
  onBankAccountChange,
  onAddBankAccount,
  loadingState,
  errors
}: AddBankProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const isFormComplete = () => {
    return (
      newBankAccount.name &&
      newBankAccount.iban &&
      newBankAccount.bank_code &&
      newBankAccount.bank_name &&
      newBankAccount.holder_name
    );
  };

  return (
    <div className="w-full">
      <div className="mb-2">
        <label
          htmlFor="holder_name"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addBank.accountName")}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={newBankAccount.name}
          onChange={(e) =>
            onBankAccountChange({
              ...newBankAccount,
              name: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="holder_name"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addBank.accountHolderName")}
        </label>
        <input
          type="text"
          name="holder_name"
          id="holder_name"
          required
          value={newBankAccount.holder_name}
          onChange={(e) =>
            onBankAccountChange({
              ...newBankAccount,
              holder_name: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="iban"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addBank.iban")}
        </label>
        <input
          type="text"
          name="iban"
          id="iban"
          required
          value={newBankAccount.iban}
          onChange={(e) =>
            onBankAccountChange({
              ...newBankAccount,
              iban: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="bank_code"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addBank.bic")}
        </label>
        <input
          type="text"
          name="bank_code"
          id="bank_code"
          required
          value={newBankAccount.bank_code}
          onChange={(e) =>
            onBankAccountChange({
              ...newBankAccount,
              bank_code: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="bank_name"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addBank.bankName")}
        </label>
        <input
          type="text"
          name="bank_name"
          id="bank_name"
          required
          value={newBankAccount.bank_name}
          onChange={(e) =>
            onBankAccountChange({
              ...newBankAccount,
              bank_name: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <LoadingButton
        active={isFormComplete()}
        isLoading={loadingState === "processing"}
        onClick={onAddBankAccount}
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
      >
        <IoAdd className="mr-2" /> {tCrossborder("deposit.stasis.addBank.button")}
      </LoadingButton>

      {errors.bankAccount && (
        <p className="text-red-500 text-sm mt-2">{errors.bankAccount}</p>
      )}
    </div>
  );
} 