import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getSwyptQuote } from "../../../methods/SwyptQuote";
import { Account } from "thirdweb/wallets";
import { Consumer, FiatTransaction, PaymentTypesArray, Vendor } from "../../../../../types/payload-types";
import {
  Input,
  AwaitTransaction,
  Loading,
  Pooling,
  TransactionCreated,
  Error,
  Success,
  SwyptState,
  FormData
} from './Slides';
import { AuthContext, sendErrorReport } from "../../../../../../context/UserContext";
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

    return new Promise((resolve, reject) => {
      const poll = setInterval(async () => {
        attempts++;

        try {
          const res = await axios.get(
            `https://pool.swypt.io/api/swypt-onramping/${transactionId}`
          );
          const status = res.data.status;

          if (status === "awaitTransaction") {
            clearInterval(poll);
            resolve(status);
          }

          if (status === "failed") {
            clearInterval(poll);
            return reject("Transaction failed");
          }

          if (attempts >= maxAttempts) {
            clearInterval(poll);
            return reject("Polling timed out");
          }
        } catch (err) {
          clearInterval(poll);
          return reject(err);
        }
      }, interval);
    });
  }

  useEffect(() => {
    async function loadData() {
      console.log("method", method);
      const swyptQuote = await getSwyptQuote(
        amount,
        startCurrency,
        endCurrency,
        "Polygon",
        "onramp"
      );
      setQuote(swyptQuote);
      setQuoteLoaded(true);
    }

    if (amount) {
      setQuoteLoaded(false);
      loadData();
    }
    console.log("method", method);
  }, [amount]);

  useEffect(() => {
    if (user.currentSwyptOnRampTransaction && typeof user.currentSwyptOnRampTransaction === "object") {
      if (user.currentSwyptOnRampTransaction.status === "awaitSTK") {
        setState("pooling");
        pollTransactionStatusFrontend(user.currentSwyptOnRampTransaction.UUID);
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

      const result = await axios.post(
        "https://pool.swypt.io/api/swypt-onramping",
        {
          partyA: formData.phone,
          amount: String(amount),
          side: "onramp",
          userAddress: selectedToken.contractAddress,
        }
      );

      console.log("swypt result", result);

      const transactionId = result.data.orderID;

      const fiatTransaction: FiatTransaction = {
        vendor: user.id,
        partner: "swypt",
        amount: Number(amount),
        currency: selectedToken.contractAddress,
        currencyName: selectedToken.id,
        transactionHash: "",
        UUID: transactionId,
        transactionDetails: account?.address,
        currencyDecimals: selectedToken.decimals,
        toAccountBankName: "Mobile Money",
        toAccountIdentifier: formData.phone,
        toNetwork: "polygon",
        fromNetwork: "fiat",
        status: "awaitSTK",
        type: "Withdraw",
        finalCurrency: "USDC",
        fee: quote.fee.amount,
        exchangeRate: quote.exchangeRate,
        finalamount: quote.outputAmount - quote.outputAmount * 0.004,
        id: null,
        updatedAt: null,
        createdAt: null
      }

      let transactionRes = await axios.post("/api/fiatTransaction", fiatTransaction);

      // update currentSwyptTransaction of the user
      await axios.post("/api/vendor", {
        currentSwyptOnRampTransaction: transactionRes.data.id,
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

    if (!user.currentSwyptOnRampTransaction || typeof user.currentSwyptOnRampTransaction !== "object") {
      setState("error");
      return;
    }

    try {
      const response = await axios.post("https://pool.swypt.io/api/deposit", {
        chain: "Polygon",
        amount: user.currentSwyptOnRampTransaction.amount,
        address: user.currentSwyptOnRampTransaction.toAccountIdentifier,
        tokenAddress: user.currentSwyptOnRampTransaction.currency,
        exchangeRate: user.currentSwyptOnRampTransaction.exchangeRate,
        feeAmount: user.currentSwyptOnRampTransaction.fee,
        symbol: user.currentSwyptOnRampTransaction.finalCurrency,
        project: "tokenPay",
        orderID: user.currentSwyptOnRampTransaction.UUID,
      });

      let transactionState = response.data.status;
      let processedState = transactionState === 200 ? "completed" : "failed";

      // update the fiat Transaction
      await axios.post(
        `/api/fiatTransaction/${user.currentSwyptOnRampTransaction.id}`,
        {
          status: processedState,
        }
      );

      // remove the current transaction from the user
      await axios.post("/api/vendor", {
        currentSwyptOnRampTransaction: null,
      });

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