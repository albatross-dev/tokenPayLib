import { useTranslation } from "next-i18next";
import React from "react";
import { ErrorMessage } from "../../../../../../../types/errorMessage.types";
import { FiatTransaction } from "../../../../../../../types/payload-types";
import AddressDisplay from "../../../../../../UI/AddressDisplay";
import LoadingButton, {
  LoadingButtonStates,
} from "../../../../../../UI/LoadingButton";

interface TransactionPaymentPendingProps {
  transaction: FiatTransaction;
  handleSend: () => void;
  isLoading: LoadingButtonStates;
  errorMessage: ErrorMessage;
}

export default function TransactionPaymentPending({
  transaction,
  handleSend,
  isLoading,
  errorMessage,
}: TransactionPaymentPendingProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="max-w-4xl mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-uhuBlue text-center">
        {tCrossborder("withdraw.otcStates.finalize")}
      </h1>
      <div className="flex flex-col gap-2 bg-uhuGray p-4 rounded-lg shadow-sm">
        <div>{tCrossborder("withdraw.otcStates.send")}</div>
        <div className="font-bold text-6xl text-gray-600">
          {transaction?.amount} {transaction?.currencyName}
        </div>
        <div>{tCrossborder("withdraw.otcStates.otcAddressInfo")}</div>
        <div className="">
          <AddressDisplay
            concat
            value={transaction?.burnAddress}
            className="bg-gray-200 rounded p-2 inline-flex items-center justify-center"
          />
        </div>
      </div>
      <div className="flex flex-col items-end justify-end mt-6">
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage.message}</div>
        )}
        <LoadingButton
          openError={() => {}}
          isLoading={isLoading}
          onClick={handleSend}
        >
          {tCrossborder("withdraw.otcStates.finalize")}
        </LoadingButton>
      </div>
    </div>
  );
}
