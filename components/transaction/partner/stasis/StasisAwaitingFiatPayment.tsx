import { useTranslation } from "next-i18next";
import { IoCopy } from "react-icons/io5";
import { FiatTransaction } from "../../../../types/payload-types";

export default function StasisAwaitingFiatPayment({
  transaction,
  refetch,
}: {
  transaction: FiatTransaction;
  refetch: () => void;
}) {
  const { t: tTransaction } = useTranslation("transaction");

  return (
    <div className="text-gray-600">
      <div className="w-full flex flex-col mt-4 gap-2">
        <h3 className="text-lg font-semibold mb-4">{tTransaction("stasisAwaitingFiatPayment.infoHeading")}</h3>

        <div className="flex justify-start flex-1 gap-2">
          <p className="text-sm font-medium text-gray-800">
            <span className="font-bold">{tTransaction("stasisAwaitingFiatPayment.amount")}</span> {transaction.amount}{" "}
            EUR
          </p>
        </div>

        <div className="flex justify-start flex-1 gap-2">
          <p className="text-sm font-medium text-gray-800">
            <span className="font-bold">{tTransaction("stasisAwaitingFiatPayment.bankName")}</span>{" "}
            {transaction.toAccountBankName}
          </p>
        </div>

        <div className="flex justify-start flex-1 gap-2">
          <p className="text-sm font-medium text-gray-800">
            <span className="font-bold">{tTransaction("stasisAwaitingFiatPayment.bankCountry")}</span>{" "}
            {transaction.toAccountBankCountry}
          </p>
        </div>

        <div className="flex justify-start flex-1 gap-2">
          <p className="text-sm font-medium text-gray-800">
            <span className="font-bold">{tTransaction("stasisAwaitingFiatPayment.bic")}</span>{" "}
            {transaction.toAccountCode}
          </p>
        </div>

        <div className="flex justify-start flex-1 gap-2">
          <p className="text-sm font-medium text-gray-800">
            <span className="font-bold">{tTransaction("stasisAwaitingFiatPayment.iban")}</span>{" "}
            {transaction.toAccountIdentifier}
          </p>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => navigator.clipboard.writeText(transaction.toAccountIdentifier)}
          >
            <IoCopy className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-start flex-1 gap-2">
          <p className="text-sm font-medium text-gray-800">
            <span className="font-bold">{tTransaction("stasisAwaitingFiatPayment.referenceCode")}</span>{" "}
            {transaction.toAccountReference}
          </p>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => navigator.clipboard.writeText(transaction.toAccountReference)}
          >
            <IoCopy className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4 mt-5">{tTransaction("stasisAwaitingFiatPayment.instructions")}</p>
      </div>
    </div>
  );
}
