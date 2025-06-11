import React, { useEffect, useState } from "react";
import { QuotePaymentType } from "../../../../depositPage/slides/DepositMethodSelector";
import { Country } from "../../../../../types/payload-types";
import {
  createKoyweDepositTransaction,
  createKoyweTransaction,
  getKoyweAccountState,
  KoywePaymentMethod,
  KoyweQuoteResponse,
} from "../../universal/koyweUtils";
import {
  LoadingButtonError,
  LoadingButtonStates,
} from "../../../../UI/LoadingButton";
import Loader from "../../../../UI/Loader";
import { useTranslation } from "next-i18next";
import SelectPaymentMethodSlide from "./Slides/SelectPaymentMethodSlide";
import StartTransaction from "./Slides/StartTransaction";
import router from "next/router";
import UnverifiedSlide from "../../withdraw/Koywe/Slides/UnverifiedSlide";
import currencies from "../../../../../utilities/crypto/currencies";
import { Account } from "thirdweb/wallets";

interface KoyweProps {
  method: QuotePaymentType;
  account: Account;
  country: Country;
}

export default function Koywe({ method, account, country }: KoyweProps) {
  const [selectedQuote, setSelectedQuote] = useState<{
    quote: KoyweQuoteResponse;
    paymentMethod: KoywePaymentMethod;
  } | null>(null);

  const [view, setView] = useState<
    "SelectQuote" | "StartTransaction" | "unverified"
  >("SelectQuote");
  const [state, setState] = useState<LoadingButtonStates>("normal");
  const [loadingState, setLoadingState] =
    useState<LoadingButtonStates>("normal");
  const [error, setError] = useState<LoadingButtonError>({
    message: "",
    title: "",
    error: null,
  });

  const { t: tCrossborder } = useTranslation("crossborder");

  // ###################
  // # Component Logic #
  // ###################

  useEffect(() => {
    setState("processing");
    const fetchKoyweAccountState = async () => {
      const koyweAccountState = await getKoyweAccountState();
      setState("normal");
      if (koyweAccountState.canOperate) {
        setView("SelectQuote");
      } else {
        setView("unverified");
      }
    };
    fetchKoyweAccountState();
  }, []);

  async function startTransaction() {
    let token = currencies[method.acceptedCrypto.toUpperCase()];
    let currencyName = token.name;
    let currency = token.contractAddress;
    let currencyDecimals = token.decimals;

    let finalCurrency = "USDC";

    try {
      setLoadingState("processing");
      const transactionId = await createKoyweDepositTransaction({
        quote: selectedQuote?.quote,
        destinationAddress: account.address,
        currency,
        currencyName,
        currencyDecimals,
        finalCurrency,
        fiatOriginCurrency: country.countryInfo.currency,
      });

      console.log("transactionId", transactionId);

      router.push(`/transaction/${transactionId}`);
      setLoadingState("normal");
    } catch (error) {
      console.error("Error starting transaction", error);
      setLoadingState("error");
      setError({
        message: tCrossborder("deposit.koywe.errors.startTransaction"),
        title: tCrossborder("deposit.koywe.errors.startTransactionTitle"),
        error: error,
      });
    }
  }

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 md:p-8 items-center justify-center border-gray-200 border rounded-md">
      {state === "processing" && (
        <div className="flex justify-center items-center h-full w-full p-4 md:p-8">
          <Loader />
        </div>
      )}
      {state === "normal" && view === "SelectQuote" ? (
        <SelectPaymentMethodSlide
          method={method}
          setSelectedQuote={setSelectedQuote}
          setView={setView}
        />
      ) : view === "StartTransaction" ? (
        <StartTransaction
          selectedQuote={selectedQuote}
          method={method}
          setView={setView}
          loadingState={loadingState}
          error={error}
          startTransaction={startTransaction}
        />
      ) : view === "unverified" ? (
        <UnverifiedSlide />
      ) : (
        ""
      )}
      {state === "error" && <div>Error</div>}
    </div>
  );
}
