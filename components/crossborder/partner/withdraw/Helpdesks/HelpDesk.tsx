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
import { client } from "../../../../../../pages/_app";
import { polygon } from "thirdweb/chains";
import { useTranslation } from "next-i18next";
import { DeskState, HelpDeskProps, TransactionState } from "./types";
import {
  api,
  AuthContext,
  sendErrorReport,
} from "../../../../../../context/UserContext";
import preprocessDataForServer from "../../../../../utilities/forms/preprocessData";
import currencies from "../../../../../utilities/crypto/currencies";
import getFormData from "../../../../../utilities/forms/getFormData";

import { FiatTransaction } from "../../../../../types/payload-types";
import { ErrorMessage } from "../../../../../types/errorMessage.types";
import { LoadingButtonStates } from "../../../../UI/LoadingButton";
import { tokenPayAbstractionSimpleTransfer } from "../../../../../utilities/crypto/TokenPayAbstraction";

const DESK_STATE_LOADING: DeskState = "loading";
const DESK_STATE_ONGOING: DeskState = "ongoing";
const DESK_STATE_UNVERIFIED: DeskState = "unverified";
const DESK_STATE_VERIFIED: DeskState = "verified";
const DESK_STATE_VERIFICATION_REQUESTED: DeskState = "in_progress";
const DESK_STATE_FAILED: DeskState = "verificationRequestError";

const TRANSACTION_STATE_STARTED: TransactionState = "started";
const TRANSACTION_STATE_PENDING: TransactionState = "pending";
const TRANSACTION_STATE_DONE: TransactionState = "done";
const TRANSACTION_STATE_MANUEL: TransactionState = "manuel";
const TRANSACTION_STATE_PAYMENT_PENDING: TransactionState = "paymentPending";

const HelpDesk: React.FC<HelpDeskProps> = ({
  country,
  amount,
  account,
  method,
}) => {
  const { user, refreshAuthentication } = useContext(AuthContext);

  const { t: tCrossborder } = useTranslation("crossborder");

  // state for the helpdesk request form
  const [state, setState] = useState<DeskState>(DESK_STATE_LOADING);

  // state for an ongoing transaction
  const [transaction, setTransaction] = useState<FiatTransaction | null>(null);

  // error for the helpdesk request form
  const [error, setError] = useState<string | null>(null);

  // error message for the payment
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  // state for the transaction details textarea
  const [textareaContent, setTextareaContent] = useState("");

  // state for tracking the payment progress
  const [isLoading, setIsLoading] = useState<LoadingButtonStates>("normal");

  // state should update
  const [shouldUpdate, setShouldUpdate] = useState(true);

  // set the correct state based on the user's verification status
  // and or ongoing transactions
  useEffect(() => {
    if (!shouldUpdate) {
      return;
    }
    switch (method?.type) {
      case "ovex":
        if (user?.currentOvexTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentOvexTransaction);
        } else {
          setState(user?.ovexState as DeskState);
        }
        break;
      case "bitcoin_vn_helpdesk":
        if (user?.currentBitcoinVNHelpdeskTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentBitcoinVNHelpdeskTransaction);
        } else {
          setState(user?.bitcoinVNHelpdeskState as DeskState);
        }
        break;
      case "koywe_helpdesk":
        if (user?.currentKoyweHelpdeskTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentKoyweHelpdeskTransaction);
        } else {
          setState(user?.koyweHelpdeskState as DeskState);
        }
        break;
      case "kotanipay_helpdesk":
        if (user?.currentKotaniPayHelpdeskTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentKotaniPayHelpdeskTransaction);
        } else {
          setState(user?.kotaniPayHelpdeskState as DeskState);
        }
        break;
      case "coinhako_helpdesk":
        if (user?.currentCoinhakoHelpdeskTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentCoinhakoHelpdeskTransaction);
        } else {
          setState(user?.coinhakoHelpdeskState as DeskState);
        }
        break;
      case "roma":
        if (user?.currentRomaTransaction) {
          setState(DESK_STATE_ONGOING);
          setTransaction(user?.currentRomaTransaction);
        } else {
          setState(user?.romaState as DeskState);
        }
        break;
      default:
        break;
    }
  }, [user]);

  useEffect(() => {
    // update the transaction every 10 seconds
    const interval = setInterval(refreshAuthentication, 10000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Handle the verification request for the helpdesk
   */
  async function handleVerificationRequest(data: Record<string, any>) {
    setShouldUpdate(false);
    setState(DESK_STATE_LOADING);
    try {
      try {
        const processedData = preprocessDataForServer(data);
        const formData = getFormData(processedData);

        await api.patch(`/api/${user!.type}/${user!.id}`, formData, {
          headers: { "Content-Type": undefined },
        });

        setShouldUpdate(true);
      } catch (e) {
        sendErrorReport("HelpDesk - Verification request failed patch user", e);
        console.error(e);
        setState(DESK_STATE_FAILED);
        return;
      }

      const sendData = {
        partnerType: method.type,
      };
      await api.post(
        "/api/fiatTransaction/helpDeskVerificationRequest",
        sendData
      );
      refreshAuthentication();
      setState(DESK_STATE_VERIFICATION_REQUESTED);
    } catch (e) {
      sendErrorReport(
        "HelpDesk - Verification request failed custom endpoint",
        e
      );
      console.error(e);
      setState(DESK_STATE_FAILED);
    }
  }

  /**
   * Handle the start of a transaction
   */
  async function handleStartTransaction() {
    if (!textareaContent.trim()) {
      setError(tCrossborder("withdraw.helpDesk.errorText"));
      return;
    }

    setError(null);
    setState(DESK_STATE_LOADING);
    try {
      await api.post("/api/fiatTransaction/helpDeskRequest", {
        partnerType: method.type,
        currencyName: country.preferredStableCoin,
        currency: country.preferredStableCoin,
        currencyDecimals: currencies[country.preferredStableCoin].decimals,
        finalCurrency: country.countryInfo.currency,
        amount: amount,
        country: country.countryCode,
        fromCountry: user?.vendorCountry || user?.country,
        transactionDetails: textareaContent,
      });
      setState(DESK_STATE_ONGOING);

      refreshAuthentication();
    } catch (e) {
      sendErrorReport("HelpDesk - Start transaction failed", e);
      console.error(e);
      setState(DESK_STATE_FAILED);
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
      const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
        client,
        account,
        polygon,
        BigInt(amountWithDecimals),
        acceptedCrypto,
        transaction!.burnAddress
      );

      await api.post("/api/fiatTransaction/paymentUpdate", {
        transaction: transaction,
        transactionHash: transactionHash,
      });
    } catch (error) {
      sendErrorReport("HelpDesk - Send payment failed", error);
      setErrorMessage({
        message: tCrossborder("withdraw.helpDesk.errorTryLater"),
        error: error as Error,
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
          {transaction.status === TRANSACTION_STATE_DONE && (
            <TransactionDone handleNewTransaction={handleNewTransaction} />
          )}
          {transaction.status === TRANSACTION_STATE_MANUEL && (
            <TransactionManual handleNewTransaction={handleNewTransaction} />
          )}
          {transaction === null && <TransactionNone />}
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
};

export default HelpDesk;
