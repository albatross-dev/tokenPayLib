import { api, AuthContext, sendErrorReport } from "@/context/UserContext";
import { QuotePaymentType } from "@/tokenPayLib/components/depositPage/slides/DepositMethodSelector";
import { Country } from "@/tokenPayLib/types/payload-types";
import currencies from "@/tokenPayLib/utilities/crypto/currencies";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  DESK_STATE_FAILED,
  DESK_STATE_LOADING,
  DESK_STATE_UNVERIFIED,
  DESK_STATE_VERIFICATION_REQUESTED,
  DESK_STATE_VERIFIED,
  handleVerificationRequest,
} from "../../withdraw/Helpdesks/HelpDesk";
import HelpDeskVerificationForm from "../../withdraw/Helpdesks/StateViews/HelpDesk/HelpDeskVerificationForm";
import LoadingHelpDesk from "../../withdraw/Helpdesks/StateViews/HelpDesk/LoadingHelpDesk";
import VerificationInProgress from "../../withdraw/Helpdesks/StateViews/HelpDesk/VerificationInProgress";
import VerificationRequestError from "../../withdraw/Helpdesks/StateViews/HelpDesk/VerificationRequestError";
import { DeskState } from "../../withdraw/Helpdesks/types";
import HelpDeskDepositRequestForm, { HelpDeskDepositRequestFormData } from "./StateViews/HelpDeskDepositRequestForm";

interface HelpDeskProps {
  country: Country;
  amount: number;
  method: QuotePaymentType;
  startCurrency: string;
  endCurrency: string;
}

export default function HelpDesk({ country, amount, method, startCurrency, endCurrency }: HelpDeskProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const { user, refreshAuthentication } = useContext(AuthContext);

  const router = useRouter();

  // error for the helpdesk request form
  const [error, setError] = useState<string | null>(null);

  // state for the helpdesk request form
  const [state, setState] = useState<DeskState>(DESK_STATE_LOADING);

  // set the correct state based on the user's verification status
  // and or ongoing transactions
  useEffect(() => {
    switch (method?.type) {
      case "ovex":
        setState(user?.ovexState as DeskState);
        break;
      case "bitcoin_vn_helpdesk":
        setState(user?.bitcoinVNHelpdeskState as DeskState);
        break;
      case "koywe_helpdesk":
        setState(user?.koyweHelpdeskState as DeskState);
        break;
      case "kotanipay_helpdesk":
        setState(user?.kotaniPayHelpdeskState as DeskState);
        break;
      case "coinhako_helpdesk":
        setState(user?.coinhakoHelpdeskState as DeskState);
        break;
      case "roma":
        setState(user?.romaState as DeskState);
        break;
      default:
        break;
    }
  }, [user]);

  /**
   * Handle the start of a transaction
   */
  async function handleStartTransaction(data: HelpDeskDepositRequestFormData) {
    setError(null);
    setState(DESK_STATE_LOADING);
    try {
      let transactionDetails = "";
      if (user?.type === "consumer") {
        transactionDetails = `Name: ${user.firstName} ${user.lastName}\nReceiving Wallet: ${data.receivingWallet}\nComments: ${data.textareaContent}`;
      } else {
        transactionDetails = `Name: ${user.companyName}\nReceiving Wallet: ${data.receivingWallet}\nComments: ${data.textareaContent}`;
      }

      console.log("all params", {
        startCurrency,
        endCurrency,
        amount,
        country: country.countryCode,
        fromCountry: user?.vendorCountry || user?.country,
        transactionDetails,
        type: "Deposit",
      });

      console.dir(method, { depth: null });

      const createDepositRes = await api.post("/api/fiatTransaction/helpDeskRequest", {
        partnerType: method.type,
        currencyName: startCurrency,
        currency: endCurrency,
        currencyDecimals: currencies[endCurrency].decimals,
        finalCurrency: endCurrency,
        amount,
        country: country.countryCode,
        fromCountry: user?.vendorCountry || user?.billingAddress?.country,
        transactionDetails,
        finalamount: method.predictedOnrampAmount,
        type: "Deposit",
      });

      // route to transaction page
      router.push(`/transaction/${createDepositRes.data.transaction.id}`);
    } catch (e) {
      sendErrorReport("HelpDesk - Start transaction failed", e);
      console.error(e);
      setState(DESK_STATE_FAILED);
    }
  }

  return (
    <div className="mb-16">
      {state === DESK_STATE_UNVERIFIED && (
        <HelpDeskVerificationForm
          method={method}
          handleVerificationRequest={(data) =>
            handleVerificationRequest({ data, setState, refreshAuthentication, user, method })
          }
        />
      )}
      {state === DESK_STATE_VERIFIED && (
        <HelpDeskDepositRequestForm error={error} handleStartTransaction={handleStartTransaction} />
      )}
      {state === DESK_STATE_VERIFICATION_REQUESTED && <VerificationInProgress />}
      {state === DESK_STATE_LOADING && <LoadingHelpDesk />}
      {state === DESK_STATE_FAILED && <VerificationRequestError />}
    </div>
  );
}
