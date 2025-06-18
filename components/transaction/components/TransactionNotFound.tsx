import React from "react";
import Link from "next/link";
import { BsArrowLeft, BsExclamationCircle } from "react-icons/bs";
import { useTranslation } from "next-i18next";

export default function TransactionNotFound() {
  const { t } = useTranslation("transaction");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <BsExclamationCircle className="text-amber-500 w-16 h-16" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {t("transaction.notFound.title", "Transaction Not Found")}
        </h1>

        <p className="text-gray-600 mb-8">
          {t(
            "transaction.notFound.description",
            "We couldn't find the transaction you're looking for. It may have been deleted or you may not have permission to view it."
          )}
        </p>

        <Link href="/crossborder?tab=2">
          <button className="flex items-center justify-center w-full px-4 py-3 bg-uhuBlue text-white rounded-md hover:bg-uhuBlue/80 transition-colors">
            <BsArrowLeft className="mr-2" />
            {t("transaction.notFound.backButton", "Back to Transactions")}
          </button>
        </Link>
      </div>
    </div>
  );
}
