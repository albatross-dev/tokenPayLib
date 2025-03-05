import Loader from "@/tokenPayLib/components/UI/Loader";
import { getQuote } from "@/tokenPayLib/utilities/partner/bitcoinvn";
import { STABLECOIN_TO_FIAT_MAP } from "@/utilities/stableCoinsMaps";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiChevronDoubleRight } from "react-icons/hi2";

export default function BitcoinVN({
  amount,
  startCurrency,
  endCurrency,
  account,
  user,
  method,
  country,
}) {
  // console.log("(BitcoinVN) amount: ", amount);
  // console.log("(BitcoinVN) account: ", account);
  // console.log("(BitcoinVN) user: ", user);
  // console.log("(BitcoinVN) country: ", country);
  // console.log("(BitcoinVN) method: ", method);
  // console.log("(BitcoinVN) startCurrency: ", startCurrency);
  // console.log("(BitcoinVN) endCurrency: ", endCurrency);

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

      setTransaction(result);
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
    <div className='w-full h-full flex items-center justify-center mt-16'>
      <Loader />
    </div>
  );

  const renderError = () => (
    <div className='text-center text-red-600 py-10'>
      Fehler beim Abrufen der Daten. Bitte versuchen Sie es später erneut.
    </div>
  );

  const renderOverview = () => (
    <div>
      <h2 className='text-xl font-semibold text-gray-700 mb-6'>
        Angebotszusammenfassung
      </h2>
      <div className='flex flex-col mb-4'>
        <div className='flex flex-row gap-2 items-center text-sm'>
          {/* Quote Rate */}
          <p>
            <strong>Wechselkurs:</strong> {quote.rate}
          </p>
          {/* Quote Expiration */}
          <p className='text-red-500'>
            <strong>Gültig für:</strong>&nbsp;
            {Math.round(
              (new Date(quote.expiresAt).getTime() - new Date().getTime()) /
                60000
            )}{" "}
            Minuten
          </p>
        </div>
        <div className='flex flex-row items-start justify-between'>
          {/* Deposit Amount */}
          <div className='flex flex-col items-start gap-1'>
            <p className='text-6xl'>
              {quote.depositAmount} {quote.depositMethod.toUpperCase()}
            </p>
            <strong className='text-gray-500'>Einzahlungsbetrag</strong>
          </div>
          {/* Divider */}
          <div className='flex items-start'>
            <HiChevronDoubleRight className='text-6xl text-gray-500' />
          </div>
          {/* Settle Amount */}
          <div className='flex flex-col items-end justify-end gap-1'>
            <p className='text-6xl'>
              {quote.settleAmount} {STABLECOIN_TO_FIAT_MAP[quote.settleMethod]}
            </p>
            <strong className='text-gray-500'>Gutschrift</strong>
          </div>
        </div>
      </div>
      <button
        onClick={handleStartTransaction}
        className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700'
      >
        Transaktion starten
      </button>
    </div>
  );

  const renderCreated = () => (
    <div>
      <h2 className='text-2xl font-bold mb-6 text-uhuBlue text-center'>
        Transaktion erstellt
      </h2>
      <div>
        <p>
          <strong>Transaktions-ID:</strong> {transaction.UUID}
        </p>
        Bitte überweisen Sie {transaction.depositAmount} an das folgende
        Bankkonto und geben Sie den Referenz Code ({transaction.shortId}) als
        Zahlungsbeschreibung mit an:
        <div>
          <p>
            <strong>Bank:</strong> {transaction.bank}
          </p>
          <p>
            <strong>Konto Inhaber:</strong> {transaction.accountHolder}
          </p>
          <p>
            <strong>Konto Nummer:</strong> {transaction.accountNumber}
          </p>
          <p>
            <strong>Referenz Code:</strong> {transaction.shortId}
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
