import React from 'react';
import { useTranslation } from "next-i18next";
import { SlideProps } from "./types";
import LoadingButton from '../../../../../../../utilities/components/LoadingButton';
import { getFiatInfoForStableCoin } from '../../../../../../utilities/stableCoinsMaps';

export default function WithdrawView({ 
  amount,
  selectedToken,
  selectedBankAccount,
  errors,
  isLoading,
  handleSend
}: SlideProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="w-full max-w-96 mb-16 mt-4 flex flex-col items-center">
      <div className="w-full flex flex-col mt-4">
        <div className="text-gray-600">
          {tCrossborder("withdraw.stasis.payoutCurrency")} {getFiatInfoForStableCoin(selectedToken.id).symbol}:
        </div>
        <div className="text-4xl font-bold mb-4">
          {amount}
          {getFiatInfoForStableCoin(selectedToken.id).symbol}
        </div>

        {errors.amount && (
          <p className="text-red-500 text-sm mb-4">{errors.amount}</p>
        )}
        <div className="mb-2">
          {tCrossborder("withdraw.stasis.selectedBankAccount")}
        </div>
        {selectedBankAccount && (
          <div className="border p-4 rounded-lg bg-gray-50 mb-4">
            <p className="text-sm font-medium text-gray-800">
              {selectedBankAccount.holder_name} - {selectedBankAccount.bank_name}
            </p>
            <p className="text-xs text-gray-500">
              {tCrossborder("withdraw.stasis.IBAN")} {selectedBankAccount.iban}
            </p>
          </div>
        )}
        <LoadingButton
          isLoading={isLoading}
          onClick={handleSend}
          disabled={Object.keys(errors).length > 0 || !selectedBankAccount}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {tCrossborder("withdraw.stasis.payoutNow")}
        </LoadingButton>
        {errors.send && (
          <p className="text-red-500 text-sm mt-2">{errors.send}</p>
        )}
      </div>
    </div>
  );
} 