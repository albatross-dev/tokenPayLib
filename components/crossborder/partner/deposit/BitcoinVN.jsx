import Loader from "@/tokenPayLib/components/UI/Loader";
import { getQuote } from "@/tokenPayLib/utilities/partner/bitcoinvn";
import { getFiatCurrencyCode } from "@/tokenPayLib/utilities/stableCoinsMaps";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiChevronDoubleRight } from "react-icons/hi2";
import { useTranslation } from "next-i18next";

export default function BitcoinVN({
  amount,
  startCurrency,
  endCurrency,
  account,
  user,
  method,
  country,
}) {
  const { t: tCrossborder } = useTranslation("crossborder");

  // 'loading' | 'error' | 'overview' | 'created'
  const [state, setState] = useState("loading");
  // The quote received from bitcoinvn
  const [quote, setQuote] = useState(null);

  // The transaction created by the backend
  //  on bitcoinvn with the payment informations
  const [transaction, setTransaction] = useState(null);

  // ###################
  // # Component Logic #
  // ###################

  // On mount fetch a quote from bitcoinvn
  useEffect(() => {
    setState("loading");
    getQuote({
      depositMethod: startCurrency,
      settleMethod: endCurrency,
      depositAmount: amount,
    })
      .then((bitcoinVNQuote) => {
        if (bitcoinVNQuote) {
          setQuote(bitcoinVNQuote);
          setState("overview");
        } else {
          setState("error");
        }
      })
      .catch((reason) => {
        console.log("Failed to get bictoinVN quote:", reason);
        setState("error");
      });
  }, []);

  const handleStartTransaction = async () => {
    setState("loading");

    // create the transaktion on bitcoin vn
    try {
      const result = await axios.post(
        "/api/fiatTransaction/bitcoinVN/v2/createDeposit",
        {
          quote: quote.id,
          address: account.address,
        }
      );

      setTransaction(result.data); // Access the response data
      setState("created");
    } catch (error) {
      console.error(
        "(BitcoinVN::deposit::handleStartTransaktion) An Error Occured: ",
        error
      );
      setState("error");
    }
  };

  // ####################
  // # Render Functions #
  // ####################

  const renderLoading = () => (
    <div className="w-full h-full flex items-center justify-center mt-16">
      <Loader />
    </div>
  );

  const renderError = () => (
    <div className="text-center text-red-600 py-10">
      {tCrossborder("deposit.bitcoinvn.error")}
    </div>
  );

  const renderOverview = () => (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        {tCrossborder("deposit.bitcoinvn.overview.heading")}
      </h2>
      <div className="flex flex-col mb-4">
        <div className="flex flex-row gap-2 items-center text-sm">
          {/* Quote Rate */}
          <p>
            <strong>{tCrossborder("deposit.bitcoinvn.overview.rate")}</strong>{" "}
            {quote.rate}
          </p>
          {/* Quote Expiration */}
          <p className="text-red-500">
            <strong>
              {tCrossborder("deposit.bitcoinvn.overview.validFor")}
            </strong>
             
            {Math.round(
              (new Date(quote.expiresAt).getTime() - new Date().getTime()) /
                60000
            )}{" "}
            {tCrossborder("deposit.bitcoinvn.overview.minutes")}
          </p>
        </div>
        <div className="flex flex-row items-start justify-between">
          {/* Deposit Amount */}
          <div className="flex flex-col items-start gap-1">
            <p className="text-6xl">
              {quote.depositAmount} {quote.depositMethod.toUpperCase()}
            </p>
            <strong className="text-gray-500">
              {tCrossborder("deposit.bitcoinvn.overview.depositAmount")}
            </strong>
          </div>
          {/* Divider */}
          <div className="flex items-start">
            <HiChevronDoubleRight className="text-6xl text-gray-500" />
          </div>
          {/* Settle Amount */}
          <div className='flex flex-col items-end justify-end gap-1'>
            <p className='text-6xl'>
              {quote.settleAmount} {getFiatCurrencyCode(quote.settleMethod)}
            </p>
            <strong className="text-gray-500">
              {tCrossborder("deposit.bitcoinvn.overview.credit")}
            </strong>
          </div>
        </div>
      </div>
      <button
        onClick={handleStartTransaction}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        {tCrossborder("deposit.bitcoinvn.overview.button")}
      </button>
    </div>
  );

  const renderCreated = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-uhuBlue text-center">
        {tCrossborder("deposit.bitcoinvn.created.heading")}
      </h2>
      <div>
        <p>
          <strong>{tCrossborder("deposit.bitcoinvn.created.transactionId")}</strong>{" "}
          {transaction.UUID}
        </p>
        {tCrossborder("deposit.bitcoinvn.created.instructions1")}
        {transaction.depositAmount} {transaction.depositMethod}
        {tCrossborder("deposit.bitcoinvn.created.instructions2")}
        {transaction.shortId}
        {tCrossborder("deposit.bitcoinvn.created.instructions3")}

        <div>
          <p>
            <strong>{tCrossborder("deposit.bitcoinvn.created.bank")}</strong>{" "}
            {transaction.bank}
          </p>
          <p>
            <strong>
              {tCrossborder("deposit.bitcoinvn.created.accountHolder")}
            </strong>{" "}
            {transaction.accountHolder}
          </p>
          <p>
            <strong>
              {tCrossborder("deposit.bitcoinvn.created.accountNumber")}
            </strong>{" "}
            {transaction.accountNumber}
          </p>
          <p>
            <strong>
              {tCrossborder("deposit.bitcoinvn.created.referenceCode")}
            </strong>{" "}
            {transaction.shortId}
          </p>
        </div>
      </div>
    </div>
  );

  // ################
  // # Render Logic #
  // ################

  return state === "loading"
    ? renderLoading()
    : state === "error"
    ? renderError()
    : state === "overview"
    ? renderOverview()
    : renderCreated();
}