import React from "react";
import { useTranslation } from "next-i18next";
import LoadingButton, {
  LoadingButtonStates,
} from "../../../../../UI/LoadingButton";
import { BitcoinVNTransaction } from "../BitcoinVN";
interface TransactionCreatedProps {
  transaction: BitcoinVNTransaction;
  isLoading: LoadingButtonStates;
  onSend: () => void;
}

export default function TransactionCreated({
  transaction,
  isLoading,
  onSend,
}: TransactionCreatedProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="max-w-4xl mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-uhuBlue text-center">
        {tCrossborder("withdraw.bitcoinvn.transactionCreated")}
      </h1>
      <div className="space-y-4">
        <p>
          <strong>{tCrossborder("withdraw.bitcoinvn.transactionId")}</strong>{" "}
          {transaction.shortId}
        </p>
        <p>
          <strong>{tCrossborder("withdraw.bitcoinvn.depositAddress")}</strong>{" "}
          {transaction.depositData.address}
        </p>
        <p>
          <strong>{tCrossborder("withdraw.bitcoinvn.targetAccount")}</strong>{" "}
          {transaction.settleData.accountNumber}
        </p>
        <p>
          <strong>{tCrossborder("withdraw.bitcoinvn.bankInfo")}</strong>{" "}
          {transaction.settleData.bank}
        </p>
      </div>
      <div className="flex items-end justify-end mt-6">
        <LoadingButton
          openError={() => {}}
          isLoading={isLoading}
          onClick={onSend}
        >
          {tCrossborder("withdraw.bitcoinvn.finalizeTransaction")}
        </LoadingButton>
      </div>
    </div>
  );
}
