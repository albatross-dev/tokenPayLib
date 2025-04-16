import React from "react";
import { useTranslation } from "next-i18next";
import { IoAdd } from "react-icons/io5";
import { Account } from "thirdweb/wallets";
import { StasisErrors } from "../../../universal/stasis.types";
import LoadingButton, {
  LoadingButtonStates,
} from "../../../../../UI/LoadingButton";

interface AddCryptoProps {
  account: Account;
  newCryptoAccountName: string | null;
  onCryptoAccountNameChange: (name: string) => void;
  onAddCryptoAccount: () => Promise<void>;
  loadingState: LoadingButtonStates;
  errors: StasisErrors;
}

export function AddCrypto({
  account,
  newCryptoAccountName,
  onCryptoAccountNameChange,
  onAddCryptoAccount,
  loadingState,
  errors,
}: AddCryptoProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="w-full">
      <div className="mb-2">
        <label
          htmlFor="crypto_name"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addCrypto.accountName")}
        </label>
        <input
          type="text"
          required
          id="crypto_name"
          name="crypto_name"
          value={newCryptoAccountName || ""}
          onChange={(e) => onCryptoAccountNameChange(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-gray-100 rounded p-2 mb-2">
        <p>{tCrossborder("deposit.stasis.addCrypto.currentAccount")}</p>
        <p className="font-bold break-all">{account?.address}</p>
      </div>

      <LoadingButton
        isLoading={loadingState}
        active={!!newCryptoAccountName}
        onClick={onAddCryptoAccount}
      >
        <IoAdd className="mr-2" />{" "}
        {tCrossborder("deposit.stasis.addCrypto.button")}
      </LoadingButton>

      {errors.cryptoAccount && (
        <p className="text-red-500 text-sm mt-2">{errors.cryptoAccount}</p>
      )}
    </div>
  );
}
