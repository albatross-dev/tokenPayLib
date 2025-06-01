import React, { useEffect, useState } from "react";
import {
  Country,
  PaymentTypesArray,
} from "../../../../../../types/payload-types";
import {
  createKoyweTransaction,
  getKoyweQuote,
  KoyweBankAccount,
  KoyweQuoteResponse,
} from "../../../universal/koyweUtils";
import LoadingButton, {
  LoadingButtonError,
  LoadingButtonStates,
} from "../../../../../UI/LoadingButton";
import { HiChevronDoubleRight } from "react-icons/hi";
import { useTranslation } from "next-i18next";
import { getFiatInfoForStableCoin } from "../../../../../../utilities/stableCoinsMaps";
import moment from "moment";
import showErrorPopup, {
  ErrorDetails,
} from "../../../../../Modals/ErrorPrompt";
import currencies from "../../../../../../utilities/crypto/currencies";
import { useRouter } from "next/router";
export default function CreateTransactionSlide({
  selectedBankAccount,
  amount,
  country,
  method,
}: {
  selectedBankAccount: KoyweBankAccount;
  amount: number;
  country: Country;
  method: PaymentTypesArray[number];
}) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const [quote, setQuote] = useState<KoyweQuoteResponse | null>(null);
  const [state, setState] = useState<"loading" | "error" | "normal">("loading");
  const [error, setError] = useState<LoadingButtonError | null>(null);
  const [loadingButtonState, setLoadingButtonState] =
    useState<LoadingButtonStates>("normal");

  const router = useRouter();

  useEffect(() => {
    const fetchQuote = async () => {
      setState("loading");
      try {
        const quote = await getKoyweQuote({
          amountIn: amount,
          symbolIn: method.acceptedCrypto,
          symbolOut: country.countryInfo.currency,
          executable: true,
          deductFees: true,
        });
        setQuote(quote);
        setState("normal");
      } catch (error) {
        console.error("Error fetching quote:", error);
        showErrorPopup({
          titleKey: tCrossborder("withdraw.koywe.quoteError"),
          messageKeyOrText: error.response?.data || error,
        });
      }
    };
    fetchQuote();
  }, []);

  async function handleStartTransaction() {
    setLoadingButtonState("processing");

    let token = currencies[method.acceptedCrypto.toUpperCase()];
    let currencyName = token.name;
    let currency = token.contractAddress;
    let currencyDecimals = token.decimals;

    let finalCurrency = country.countryInfo.currency;

    try {
      const transactionId = await createKoyweTransaction({
        quote: quote,
        bankAccount: selectedBankAccount,
        currency,
        currencyName,
        currencyDecimals,
        finalCurrency,
      });

      console.log("transactionId", transactionId);

      router.push(`/transaction/${transactionId}`);
    } catch (error) {
      console.error("Error creating transaction:", error);
      const errorDetails: ErrorDetails = {
        message: tCrossborder("withdraw.koywe.transactionError"),
        error: {
          message: JSON.stringify(error.response.data),
          code: error.response.status,
        },
      };
      setError({
        message: tCrossborder("withdraw.koywe.transactionError"),
        title: tCrossborder("withdraw.koywe.transactionErrorTitle"),
        error: errorDetails,
      });
      setLoadingButtonState("error");
    }
  }

  return (
    <div>
      <div className="w-full flex-1 flex flex-row gap-4 mb-8">
        <div className="gap-1 flex-1 flex flex-col">
          <div className="font-bold text-6xl text-gray-600 whitespace-nowrap">
            {state === "loading" ? (
              <div className="h-16 w-48 bg-gray-200 animate-pulse rounded" />
            ) : (
              `${amount} ${getFiatInfoForStableCoin(
                method.acceptedCrypto.toUpperCase()
              )?.id.toUpperCase()}`
            )}
          </div>
          <div className="text-gray-500">
            {tCrossborder("withdraw.koywe.depositAmount")}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <HiChevronDoubleRight className="h-12 w-12 text-gray-600" />
        </div>
        <div className="gap-1 flex-1 flex flex-col justify-end items-end">
          <div className="font-bold text-6xl whitespace-nowrap">
            {state === "loading" ? (
              <div className="h-16 w-48 bg-gray-200 animate-pulse rounded" />
            ) : (
              `${quote?.amountOut} ${quote?.symbolOut}`
            )}
          </div>
          <div className="text-gray-500">
            {tCrossborder("withdraw.koywe.withdrawAmount")}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <LoadingButton
          isLoading={loadingButtonState}
          onClick={handleStartTransaction}
          active={Boolean(quote && selectedBankAccount)}
          error={error}
        >
          {tCrossborder("withdraw.koywe.createTransaction")}
        </LoadingButton>
      </div>
    </div>
  );
}
