import React from 'react';
import { useTranslation } from "next-i18next";
import LoadingButton from '../../../../../UI/LoadingButton';
import { BankAccount, CryptoAccount, LoadingState, StasisErrors } from  '../../../universal/stasis.types';

interface DepositProps {
  amount: number;
  selectedBankAccount: BankAccount;
  selectedCryptoAccount: CryptoAccount;
  onSend: () => Promise<void>;
  loadingState: LoadingState;
  errors: StasisErrors;
}

export function Deposit({
  amount,
  selectedBankAccount,
  selectedCryptoAccount,
  onSend,
  loadingState,
  errors
}: DepositProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex flex-col mt-4">
        <div className="mb-2">{tCrossborder("deposit.stasis.deposit.amountLabel")}</div>
        <div className="border p-4 rounded-lg bg-gray-50 mb-4">
          <p className="text-sm font-medium text-gray-800">{amount} €</p>
        </div>

        <div className="mb-2">{tCrossborder("deposit.stasis.deposit.selectedBankLabel")}</div>
        {selectedBankAccount && (
          <div className="border p-4 rounded-lg bg-gray-50 mb-4">
            <p className="text-sm font-medium text-gray-800">
              {selectedBankAccount.holder_name} -{" "}
              {selectedBankAccount.bank_name}
            </p>
            <p className="text-xs text-gray-500">
              IBAN: {selectedBankAccount.iban}
            </p>
          </div>
        )}

        <div className="mb-2">{tCrossborder("deposit.stasis.deposit.selectedCryptoLabel")}</div>
        {selectedCryptoAccount && (
          <div className="border p-4 rounded-lg bg-gray-50 mb-4">
            <p className="text-sm font-medium text-gray-800">
              {selectedCryptoAccount.name}
            </p>
            <p className="text-xs text-gray-500">
              {tCrossborder("deposit.stasis.deposit.address")} {selectedCryptoAccount.address}
            </p>
          </div>
        )}

        <LoadingButton
          isLoading={loadingState}
          active={true}
          onClick={onSend}
        >
          {tCrossborder("deposit.stasis.deposit.button")}
        </LoadingButton>

        {errors.send && (
          <p className="text-red-500 text-sm mt-2">{errors.send}</p>
        )}
      </div>
    </div>
  );
} 