import React, { useContext, useEffect, useState } from "react";
import { getSwyptQuote } from "../../universal/swyptUtils";
import { Account } from "thirdweb/wallets";
import {
  Consumer,
  FiatTransaction,
  PaymentTypesArray,
  Vendor,
} from "../../../../../types/payload-types";
import {
  Input,
  AwaitTransaction,
  Loading,
  Pooling,
  TransactionCreated,
  Error,
  Success,
  SwyptState,
  FormData,
} from "./Slides";
import {
  api,
  AuthContext,
  sendErrorReport,
} from "../../../../../../context/UserContext";
import currencies from "../../../../../utilities/crypto/currencies";

interface SwyptProps {
  amount: number;
  account: Account;
  user: Vendor | Consumer;
  method: PaymentTypesArray[number];
  startCurrency: string;
  endCurrency: string;
}

export default function Swypt({
  amount,
  account,
  user,
  method,
  startCurrency,
  endCurrency,
}: SwyptProps) {
  const [state, setState] = useState<SwyptState>("input");
  const [formError, setFormError] = useState<string>("");
  const [quote, setQuote] = useState<any>(null);
  const [quoteLoaded, setQuoteLoaded] = useState<boolean>(false);
  const { refreshAuthentication } = useContext(AuthContext);

  const selectedToken = currencies[method?.acceptedCrypto];

  const [formData, setFormData] = useState<FormData>({
    phone: "",
  });

  async function pollTransactionStatusFrontend(transactionId: string) {
    const interval = 5000;
    const timeout = 30 * 60 * 1000; // 30 minutes max
    const maxAttempts = timeout / interval;
    let attempts = 0;

    return new Promise<string>((resolve, reject) => {
      const poll = setInterval(async () => {
        attempts++;

        try {
          const res = await api.post(
            "/api/fiatTransaction/swypt/onrampStatus",
            {
              transactionId: transactionId,
            }
          );
          console.log("res", res);
          const status = res.data.status.toLowerCase();

          if (status === "success") {
            clearInterval(poll);
            resolve(status);
          }

          if (status === "failed") {
            clearInterval(poll);
            resolve(status);
          }

          if (attempts >= maxAttempts) {
            clearInterval(poll);
            return reject("Polling timed out");
          }
        } catch (err) {
          clearInterval(poll);
          console.log("err", err);
          return reject(err);
        }
      }, interval);
    });
  }

  useEffect(() => {
    async function loadData() {
      console.log("method", method);
      try {
        const swyptQuote = await getSwyptQuote(
          amount,
          startCurrency,
          endCurrency,
          "Polygon",
          "onramp"
        );
        setQuote(swyptQuote);
        setQuoteLoaded(true);
      } catch (error) {
        console.error("Error getting Swypt quote:", error);
        sendErrorReport("Swypt - Withdraw - Error getting quote", error);
        setState("error");
      }
    }

    if (amount) {
      setQuoteLoaded(false);
      loadData();
    }
    console.log("method", method);
  }, [amount]);

  useEffect(() => {
    if (
      user.currentSwyptOnRampTransaction &&
      typeof user.currentSwyptOnRampTransaction === "object"
    ) {
      if (user.currentSwyptOnRampTransaction.status === "awaitSTK") {
        setState("pooling");
        const checkStatus = async () => {
          if (typeof user.currentSwyptOnRampTransaction === "object") {
            try {
              let status = await pollTransactionStatusFrontend(
                user.currentSwyptOnRampTransaction.UUID
              );
              if (status === "awaitTransaction") {
                setState("awaitTransaction");
              } else if (status === "failed") {
                setState("error");
              } else if (status === "completed") {
                setState("success");
              }
            } catch (error) {
              console.error("Error polling transaction status:", error);
              sendErrorReport(
                "Swypt - Withdraw - Error polling transaction status",
                error
              );
              setState("error");
            }
          }
        };
        checkStatus();
      } else if (
        user.currentSwyptOnRampTransaction.status === "awaitTransaction"
      ) {
        setState("awaitTransaction");
      }
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phone) {
      setFormError("withdraw.swypt.formErrorPhone");
      return;
    }

    setFormError("");
    handleSend();
  };

  const handleSend = async () => {
    try {
      setState("loading");

      // create transaction
      await api.post("/api/fiatTransaction/swypt/onramp", {
        phone: formData.phone,
        amount: amount.toString(),
        selectedTokenId: selectedToken.id,
        selectedTokenDecimals: selectedToken.decimals,
        selectedTokenContractAddress: selectedToken.contractAddress,
        receivingWallet: account.address,
        fee: Number(quote.fee.amount),
        exchangeRate: Number(quote.exchangeRate),
        outputAmount: Number(quote.outputAmount),
      });

      refreshAuthentication();
    } catch (error) {
      console.error("Error creating transaction:", error);
      sendErrorReport("Swypt - Withdraw - Error creating transaction", error);
      setState("error");
    }
  };

  const finalizeTransaction = async () => {
    setState("loading");

    if (
      !user.currentSwyptOnRampTransaction ||
      typeof user.currentSwyptOnRampTransaction !== "object"
    ) {
      setState("error");
      return;
    }

    try {
      let result = await api.get("/api/fiatTransaction/swypt/deposit");

      let processedState = result.data.status;

      refreshAuthentication();
      setState(processedState === "completed" ? "success" : "error");
    } catch (error) {
      console.error("Error finalizing transaction:", error);
      sendErrorReport("Swypt - Withdraw - Error finalizing transaction", error);
      setState("error");
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white">
      {state === "input" && quoteLoaded && (
        <Input
          amount={amount}
          startCurrency={startCurrency}
          endCurrency={endCurrency}
          quote={quote}
          account={account}
          formData={formData}
          formError={formError}
          onFormSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
        />
      )}

      {state === "awaitTransaction" && quoteLoaded && (
        <AwaitTransaction
          amount={amount}
          startCurrency={startCurrency}
          endCurrency={endCurrency}
          quote={quote}
          account={account}
          onFinalize={finalizeTransaction}
        />
      )}

      {(state === "loading" || !quoteLoaded) && <Loading />}
      {state === "pooling" && <Pooling />}
      {state === "transaction-created" && <TransactionCreated />}
      {state === "error" && <Error />}
      {state === "success" && <Success />}
    </div>
  );
}
