import React, { useCallback } from "react";
import { FiatTransaction } from "../../types/payload-types";
import { BsArrowClockwise, BsArrowLeft, BsChevronRight } from "react-icons/bs";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingButton from "../UI/LoadingButton";
import PartnerPanel from "./partner/PartnerPanel";

export default function TransactionDetails({
  transaction: initialTransaction,
}: {
  transaction: FiatTransaction;
}) {
  const { t: tTransaction } = useTranslation("transaction");

  // Use TanStack Query with the initial data from SSR
  const {
    data: transaction,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transaction", initialTransaction.id],
    queryFn: async () => {
      console.log("Fetching transaction data...");
      const { data } = await axios.get(
        `/api/fiatTransaction/${initialTransaction.id}`
      );
      console.log("Transaction data fetched:", data);
      return data;
    },
    // Use the initial data from SSR
    initialData: initialTransaction,
    // Don't refetch on mount since we already have the data
    refetchOnMount: false,
    // Don't refetch on window focus
    refetchOnWindowFocus: false,
  });

  // Create a callback function for the refresh button
  const handleRefresh = useCallback(() => {
    console.log("Refresh button clicked");
    refetch()
      .then(() => {
        console.log("Refetch completed");
      })
      .catch((err) => {
        console.error("Error during refetch:", err);
      });
  }, [refetch]);

  return (
    <div>
      <div className="flex items-center mb-4">
        <Link href="/crossborder?tab=2">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <BsArrowLeft className="w-5 h-5 mr-2" />
            {tTransaction("transactionDetails.backButton")}
          </button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            {tTransaction("transactionDetails.title")}
            <button
              onClick={handleRefresh}
              className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              title={tTransaction("transactionDetails.refreshButton")}
            >
              <BsArrowClockwise
                className={`w-5 h-5 text-gray-600 ${
                  isFetching ? "animate-spin" : ""
                }`}
              />
            </button>
          </h1>
          <span className="px-2 py-1 rounded text-sm font-bold bg-uhuBlue text-white">
            {transaction.partner.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">
                {tTransaction("transactionDetails.fromNetwork")}
              </span>
              <span className="font-medium capitalize">
                {transaction.fromNetwork}
              </span>
              <span className="text-sm text-gray-500 mt-2">
                {tTransaction("transactionDetails.amount")}
              </span>
              <span className="font-medium">
                {transaction.amount}{" "}
                {transaction.fromNetwork === "fiat"
                  ? transaction.fiatOriginCurrency
                  : transaction.currencyName}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center mx-4">
            <BsChevronRight className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-500 mt-2">
              {tTransaction("transactionDetails.type")}
            </span>
            <span className="font-medium capitalize">
              {tTransaction(`transactionDetails.${transaction.type}`)}
            </span>
            <span className="text-sm text-gray-500 mt-2">
              {tTransaction("transactionDetails.statusLabel")}
            </span>
            <span className="font-medium capitalize">
              {tTransaction(`transactionDetails.status.${transaction.status}`)}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">
                {tTransaction("transactionDetails.toNetwork")}
              </span>
              <span className="font-medium capitalize">
                {transaction.toNetwork}
              </span>
              <span className="text-sm text-gray-500 mt-2">
                {tTransaction("transactionDetails.finalAmount")}
              </span>
              <span className="font-medium">
                {transaction.finalamount} {transaction.finalCurrency}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-uhuBlue rounded-md p-4">
          <div className="text-xl font-bold text-uhuBlue mb-2">
            {tTransaction("transactionDetails.actions")}
          </div>
          <PartnerPanel transaction={transaction} refetch={refetch} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            {transaction.toAccountBankName && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  {tTransaction("transactionDetails.bankName")}
                </span>

                <span className="font-medium">
                  {transaction.toAccountBankName}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">
                {tTransaction("transactionDetails.accountNumber")}
              </span>
              <span className="font-medium">
                {transaction.toAccountIdentifier}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-500">
            <span>
              {tTransaction("transactionDetails.createdAt")}:{" "}
              {typeof transaction.createdAt === "string" &&
              !isNaN(Date.parse(transaction.createdAt))
                ? new Date(transaction.createdAt).toLocaleString("de-DE")
                : transaction.createdAt}
            </span>
            <span>
              {tTransaction("transactionDetails.updatedAt")}:{" "}
              {typeof transaction.updatedAt === "string" &&
              !isNaN(Date.parse(transaction.updatedAt))
                ? new Date(transaction.updatedAt).toLocaleString("de-DE")
                : transaction.updatedAt}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {tTransaction("transactionDetails.errorRefreshing")}
        </div>
      )}
    </div>
  );
}
