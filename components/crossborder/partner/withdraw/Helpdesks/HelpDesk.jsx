import { AuthContext } from "@/context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import TransactionNone from "./StateViews/Transaction/TransactionNone";
import TransactionStarted from "./StateViews/Transaction/TransactionStarted";
import TransactionPending from "./StateViews/Transaction/TransactionPending";
import TransactionDone from "./StateViews/Transaction/TransactionDone";
import HelpDeskVerificationForm from "./StateViews/HelpDesk/HelpDeskVerificationForm";
import HelpDeskRequestForm from "./StateViews/HelpDesk/HelpDeskRequestForm";
import VerificationInProgress from "./StateViews/HelpDesk/VerificationInProgress";
import LoadingHelpDesk from "./StateViews/HelpDesk/LoadingHelpDesk";
import VerificationRequestError from "./StateViews/HelpDesk/VerificationRequestError";
import TransactionManual from "./StateViews/Transaction/TransactionManuel";
import TransactionPaymentPending from "./StateViews/Transaction/TransactionPaymentPending";
import axios from "axios";
import currencies from "@/tokenPayLib/utilities/crypto/currencies";
import { tokenPayAbstractionSimpleTransfer } from "@/tokenPayLib/assets/TokenPayAbstraction";
import { client } from "@/pages/_app";
import { polygon } from "thirdweb/chains";
import preprocessDataForServer from "@/tokenPayLib/utilities/forms/preprocessData";
import getFormData from "@/tokenPayLib/utilities/forms/getFormData";
import { useTranslation } from "next-i18next";

const DESK_STATE_LOADING = "loading";
const DESK_STATE_ONGOING = "ongoing";
const DESK_STATE_UNVERIFIED = "unverified";
const DESK_STATE_VERIFIED = "verified";
const DESK_STATE_VERIFICATION_REQUESTED = "in_progress";
const DESK_STATE_FAILED = "verificationRequestError";

const TRANSACTION_STATE_STARTED = "started";
const TRANSACTION_STATE_PENDING = "pending";
const TRANSACTION_STATE_DONE = "done";
const TRANSACTION_STATE_MANUEL = "manuel";
const TRANSACTION_STATE_PAYMENT_PENDING = "paymentPending";

export default function HelpDesk({ country, amount, account, method }) {
  const { user, refreshAuthentication } = useContext(AuthContext);

  const { t: tCrossborder } = useTranslation("crossborder");

  // state for the helpdesk request form
  const [state, setState] = useState(DESK_STATE_LOADING);

  // state for an ongoing transaction
  const [transaction, setTransaction] = useState(null);

  // error for the helpdesk request form
  const [error, setError] = useState(null);

  // error message for the payment
  const [errorMessage, setErrorMessage] = useState(null);

  // state for the transaction details textarea
  const [textareaContent, setTextareaContent] = useState("");

  // state for tracking the payment progress
  const [isLoading, setIsLoading] = useState(false);

  // state should update
  const [shouldUpdate, setShouldUpdate] = useState(true);

  // set the correct state based on the user's verification status
  // and or ongoing transactions
  useEffect(() => {
    if(!shouldUpdate){
      return;
    }
    switch (method?.type) {
      case "ovex":
        if (user?.currentOvexTransaction) {
          console.log("setState", DESK_STATE_ONGOING);
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentOvexTransaction);
        } else {
          console.log("setState", user?.ovexState);
          setState(user?.ovexState);
        }
        break;
      case "bitcoin_vn_helpdesk":
        if (user?.currentBitcoinVNHelpdeskTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentBitcoinVNHelpdeskTransaction);
        } else {
          setState(user?.bitcoinVNHelpdeskState);
        }
        break;
      case "koywe_helpdesk":
        if (user?.currentKoyweHelpdeskTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentKoyweHelpdeskTransaction);
        } else {
          setState(user?.koyweHelpdeskState);
        }
        break;
      case "kotanipay_helpdesk":
        if (user?.currentKotaniPayHelpdeskTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentKotaniPayHelpdeskTransaction);
        } else {
          setState(user?.kotaniPayHelpdeskState);
        }
        break;
      case "coinhako_helpdesk":
        if (user?.currentCoinhakoHelpdeskTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentCoinhakoHelpdeskTransaction);
        } else {
          setState(user?.coinhakoHelpdeskState);
        }
        break;
      case "roma":
        if (user?.currentRomaTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentRomaTransaction);
        } else {
          setState(user?.romaState);
        }
        break;
      default:
        break;
    }
    console.log("user changed");
  }, [user]);

  useEffect(() => {
    // update the transaction every 10 seconds
    const interval = setInterval(refreshAuthentication, 10000);
    return () => clearInterval(interval);
  }, []);

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                Help desk actions                               ||
  // ! ||--------------------------------------------------------------------------------||

  /**
   * Handle the verification request for the helpdesk
   */
  async function handleVerificationRequest(data) {
    console.log("verification request");
    console.log("setState", DESK_STATE_LOADING);
    setShouldUpdate(false);
    setState(DESK_STATE_LOADING);
    try {
      try {
        const processedData = preprocessDataForServer(data);
        const formData = getFormData(processedData);

        let patchRes = await axios.patch(`/api/${user.collection}/${user.id}`, formData, {
          headers: { "Content-Type": undefined },
        });
        console.log("patchRes", patchRes);

        setShouldUpdate(true);

      } catch (e) {
        console.error(e);
        console.log("setState", DESK_STATE_FAILED);
        setState(DESK_STATE_FAILED);
        return;
      }

      let sendData = {
        partnerType: method.type,
      };
      await axios.post(
        "/api/fiatTransaction/helpDeskVerificationRequest",
        sendData
      );
      refreshAuthentication();
      console.log("setState", DESK_STATE_VERIFICATION_REQUESTED);
      setState(DESK_STATE_VERIFICATION_REQUESTED);
    } catch (e) {
      console.error(e);
      console.log("setState", DESK_STATE_FAILED);
      setState(DESK_STATE_FAILED);
    }
  }

  /**
   * Handle the start of a transaction
   * This will send the transaction details to the server
   * and start the transaction
   */
  async function handleStartTransaction() {
    if (!textareaContent.trim()) {
      setError(tCrossborder("withdraw.helpDesk.errorText"));
      return;
    }

    setError(""); // Clear any previous error messages
    console.log("setState", DESK_STATE_LOADING);
    setState("loading");
    try {
      await axios.post("/api/fiatTransaction/helpDeskRequest", {
        partnerType: method.type,
        currencyName: country.preferredStableCoin,
        currency: country.preferredStableCoin,
        currencyDecimals: currencies[country.preferredStableCoin].decimals,
        finalCurrency: country.currency,
        amount: amount,
        country: country.countryCode,
        fromCountry: user?.vendorCountry || user?.country,
        transactionDetails: textareaContent,
      });
      setState("ongoing");

      refreshAuthentication();
    } catch (e) {
      console.error(e);
      setState("verificationRequestError");
    }
  }

  /**
   * Make crypto payment to burn address
   */
  async function handleSend() {
    try {
      setIsLoading("processing");
      const acceptedCrypto = currencies[method.acceptedCrypto];
      const amountWithDecimals = amount * Math.pow(10, acceptedCrypto.decimals);
      console.log("amountWithDecimals", amount);
      const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
        client,
        account,
        polygon,
        amountWithDecimals,
        acceptedCrypto,
        transaction.burnAddress
      );

      await axios.post("/api/fiatTransaction/paymentUpdate", {
        transaction: transaction,
        transactionHash: transactionHash,
      });

      console.log("transactionHash", transactionHash);
    } catch (error) {
      console.log("error handle send", error);
      setErrorMessage({
        message: tCrossborder("withdraw.helpDesk.errorTryLater"),
        error: error,
      });
      setIsLoading("error");
      setTimeout(() => {
        setIsLoading("normal");
      }, 20000);
    }
  }

  /**
   * Handle the creation of a new transaction
   */
  function handleNewTransaction() {
    refreshAuthentication();
  }

  return (
    <div className="mb-16">
      {state === DESK_STATE_ONGOING && transaction && (
        <>
          {transaction.status === TRANSACTION_STATE_STARTED && (
            <TransactionStarted />
          )}
          {transaction.status === TRANSACTION_STATE_PENDING && (
            <TransactionPending />
          )}
          {transaction.status === TRANSACTION_STATE_PAYMENT_PENDING && (
            <TransactionPaymentPending
              handleSend={handleSend}
              isLoading={isLoading}
              transaction={transaction}
              errorMessage={errorMessage}
            />
          )}
          {transaction.status === TRANSACTION_STATE_DONE && <TransactionDone />}
          {transaction.status === TRANSACTION_STATE_MANUEL && (
            <TransactionManual />
          )}
          {transaction === null && (
            <TransactionNone handleNewTransaction={handleNewTransaction} />
          )}
        </>
      )}
      {state === DESK_STATE_UNVERIFIED && (
        <HelpDeskVerificationForm
          method={method}
          handleVerificationRequest={handleVerificationRequest}
        />
      )}
      {state === DESK_STATE_VERIFIED && (
        <HelpDeskRequestForm
          textareaContent={textareaContent}
          setTextareaContent={setTextareaContent}
          error={error}
          handleStartTransaction={handleStartTransaction}
        />
      )}
      {state === DESK_STATE_VERIFICATION_REQUESTED && (
        <VerificationInProgress />
      )}
      {state === DESK_STATE_LOADING && <LoadingHelpDesk />}
      {state === DESK_STATE_FAILED && <VerificationRequestError />}
    </div>
  );
}
