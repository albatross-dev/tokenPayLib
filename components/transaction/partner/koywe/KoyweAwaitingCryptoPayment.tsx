import client from "@/utilities/thirdweb-client";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { polygon } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { api, sendErrorReport } from "../../../../../context/UserContext";
import { FiatTransaction } from "../../../../types/payload-types";
import currencies from "../../../../utilities/crypto/currencies";
import { tokenPayAbstractionSimpleTransfer } from "../../../../utilities/crypto/TokenPayAbstraction";
import AddressDisplay from "../../../UI/AddressDisplay";
import LoadingButton, {
  LoadingButtonError,
  LoadingButtonStates,
} from "../../../UI/LoadingButton";

export default function KoyweAwaitingCryptoPayment({
  transaction,
  refetch,
}: {
  transaction: FiatTransaction;
  refetch: () => void;
}) {
  const { t: tTransaction } = useTranslation("transaction");
  const [isLoading, setIsLoading] = useState<LoadingButtonStates>("normal");
  const [error, setError] = useState<LoadingButtonError | null>(null);

  const account = useActiveAccount();

  async function handleSendCryptoPayment() {
    setIsLoading("processing");

    const selectedToken = currencies[transaction.currencyName];

    try {
      const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
        client,
        account,
        polygon,
        BigInt(Number(transaction.amount) * 10 ** transaction.currencyDecimals),
        selectedToken,
        transaction.burnAddress
      );

      if (transactionHash) {
        await api.patch(`/api/fiatTransaction/${transaction.id}`, {
          transactionHash,
        });

        refetch();

        setIsLoading("success");
      } else {
        setIsLoading("error");
      }
    } catch (e) {
      const err = e as Error;
      sendErrorReport("Koywe - Awaiting Crypto Payment - Error", err.message);
      const FormatedError: LoadingButtonError = {
        message: err.message,
        title: "Koywe - Awaiting Crypto Payment - Error",
        error: {
          message: err.message,
          error: err,
        },
      };

      setError(FormatedError);
      setIsLoading("error");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 w-full flex flex-col gap-4">
      <div>
        <span className="text-sm font-bold mb-6 bg-uhuBlue text-white rounded px-1 text-center">
          {tTransaction("koyweWithdrawPanel.awaitingCryptoPayment")}
        </span>
      </div>
      <div className="flex flex-col gap-4 bg-gray-50 rounded-md p-4">
        <div className="text-sm text-gray-500">
          {tTransaction("koyweWithdrawPanel.awaitingCryptoPaymentDescription")}
        </div>
        <div>
          <div className="mt-4 inline-block flex flex-row gap-2 items-center">
            <span className="font-bold">
              {transaction.amount} {transaction.currencyName}
            </span>
            <BsChevronRight />
            <AddressDisplay concat={false} value={transaction.burnAddress} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <LoadingButton
          error={error}
          onClick={() => handleSendCryptoPayment()}
          isLoading={isLoading}
        >
          {tTransaction("koyweWithdrawPanel.sendCryptoPaymentNow")}
        </LoadingButton>
      </div>
    </div>
  );
}
