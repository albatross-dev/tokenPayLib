import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { IoAdd } from "react-icons/io5";
import { NewBankAccount, StasisErrors } from "../../../universal/stasis.types";
import LoadingButton, { LoadingButtonStates } from "../../../../../UI/LoadingButton";
import { api, sendErrorReport } from "../../../../../../../context/UserContext";
interface AddBankProps {
  loadingState: LoadingButtonStates;
  errors: StasisErrors;
  setLoadingState: (state: LoadingButtonStates) => void;
  fetchBankAccounts: () => Promise<void>;
  setErrors: (errors: StasisErrors) => void;
  setView: (view: string) => void;
}

export function AddBank({
  loadingState,
  setLoadingState,
  fetchBankAccounts,
  errors,
  setErrors,
  setView,
}: AddBankProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const handleAddBankAccount = async () => {
    setLoadingState("processing");
    try {
      await api.post("/api/fiatTransaction/stasis/createBankAccount", newBankAccount);
      await fetchBankAccounts();
      setView("selectBank");
      setErrors({
        ...errors,
        bankAccount: null,
      });
      setLoadingState("normal");
    } catch (error) {
      sendErrorReport("Stasis - Deposit - Creating bank account failed", error);
      setView("selectBank");
      setErrors({
        ...errors,
        bankAccount: tCrossborder("deposit.stasis.errors.bankAccountCreate"),
      });
      setLoadingState("normal");
    }
  };

  const [newBankAccount, setNewBankAccount] = useState<NewBankAccount>({
    name: "",
    iban: "",
    bank_code: "",
    bank_name: "",
    holder_name: "",
    bank_address: "",
  });

  const isFormComplete = () => {
    return Boolean(
      newBankAccount.name &&
        newBankAccount.iban &&
        newBankAccount.bank_code &&
        newBankAccount.bank_name &&
        newBankAccount.holder_name &&
        newBankAccount.bank_address
    );
  };

  return (
    <div className="w-full">
      <div className="mb-2">
        <label htmlFor="holder_name" className="block text-sm font-medium text-gray-700">
          {tCrossborder("deposit.stasis.addBank.accountName")}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={newBankAccount.name}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              name: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-uhuBlue"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="holder_name" className="block text-sm font-medium text-gray-700">
          {tCrossborder("deposit.stasis.addBank.accountHolderName")}
        </label>
        <input
          type="text"
          name="holder_name"
          id="holder_name"
          required
          value={newBankAccount.holder_name}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              holder_name: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-uhuBlue"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="iban" className="block text-sm font-medium text-gray-700">
          {tCrossborder("deposit.stasis.addBank.iban")}
        </label>
        <input
          type="text"
          name="iban"
          id="iban"
          required
          value={newBankAccount.iban}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              iban: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-uhuBlue"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="bank_code" className="block text-sm font-medium text-gray-700">
          {tCrossborder("deposit.stasis.addBank.bic")}
        </label>
        <input
          type="text"
          name="bank_code"
          id="bank_code"
          required
          value={newBankAccount.bank_code}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              bank_code: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-uhuBlue"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700">
          {tCrossborder("deposit.stasis.addBank.bankName")}
        </label>
        <input
          type="text"
          name="bank_name"
          id="bank_name"
          required
          value={newBankAccount.bank_name}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              bank_name: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-uhuBlue"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="bank_address" className="block text-sm font-medium text-gray-700">
          {tCrossborder("deposit.stasis.addBank.bankAddress")}
        </label>
        <input
          type="text"
          name="bank_address"
          id="bank_address"
          required
          value={newBankAccount.bank_address}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-uhuBlue"
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              bank_address: e.target.value,
            })
          }
        />
      </div>

      <LoadingButton active={isFormComplete()} isLoading={loadingState} onClick={handleAddBankAccount}>
        <IoAdd className="mr-2" /> {tCrossborder("deposit.stasis.addBank.button")}
      </LoadingButton>

      {errors.bankAccount && <p className="text-red-500 text-sm mt-2">{errors.bankAccount}</p>}
    </div>
  );
}
