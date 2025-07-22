import client from "@/utilities/thirdweb-client";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { polygon } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";

// Import slides
import currencies from "../../../../../utilities/crypto/currencies";
import Error from "./slides/Error";
import Loading from "./slides/Loading";
import QuoteForm from "./slides/QuoteForm";
import Success from "./slides/Success";
import TransactionCreated from "./slides/TransactionCreated";

import { api, sendErrorReport } from "../../../../../../context/UserContext";
import { Consumer, Vendor } from "../../../../../types/payload-types";
import { tokenPayAbstractionSimpleTransfer } from "../../../../../utilities/crypto/TokenPayAbstraction";
import { LoadingButtonStates } from "../../../../UI/LoadingButton";

const POOL_FEE = 0.004;

interface BitcoinVNProps {
  amount: number;
  user: Vendor | Consumer;
}

interface Quote {
  id: string;
  rate: number;
  expiresAt: string;
  depositAmount: number;
  depositMethod: string;
  settleAmount: number;
  settleMethod: string;
}

export interface BitcoinVNTransaction {
  id: string;
  shortId: string;
  customOrderId?: string;
  status: string;
  depositMethod: string;
  depositAsset: string;
  depositAmount: number;
  depositFee: number;
  depositData: {
    address: string;
  };
  depositRefundData: {
    address: string;
  };
  depositTxns: any[];
  settleMethod: string;
  settleAsset: string;
  settleAmount: number;
  settleFee: number;
  settleData: {
    bank: string;
    accountHolder: string;
    accountNumber: string;
  };
  settleTxns: any[];
  settleReceiptUrl?: string;
  rate: number;
  depositMin: number;
  depositMax: number;
  createdAt: string;
  expiresAt: string;
  quote: {
    id: string;
    depositAmount: number;
    depositFee: number;
    depositMethod: string;
    settleAmount: number;
    settleFee: number;
    settleMethod: string;
    rate: number;
    rawRate: number;
    createdAt: string;
    expiresAt: string;
    accepted: boolean;
  };
  adminMessage?: string;
}

export default function BitcoinVN({ amount, user }: BitcoinVNProps) {
  const [state, setState] = useState<
    "loading" | "error" | "loaded" | "transaction-created" | "success"
  >("loading");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [transaction, setTransaction] = useState<BitcoinVNTransaction | null>(
    null
  );
  const selectedToken = currencies.USDC;
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountHolder: "",
    bank: "",
  });
  const account = useActiveAccount();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<LoadingButtonStates>("normal");
  const [bankList, setBankList] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [formError, setFormError] = useState("");
  const [quoteLoaded, setQuoteLoaded] = useState(false);
  const [infoLoaded, setInfoLoaded] = useState(false);

  const { t: tCrossborder } = useTranslation("crossborder");

  async function getQuote() {
    try {
      const result = await api.post("/api/fiatTransaction/bitcoinVN/quote", {
        depositAmount: amount - amount * POOL_FEE,
        settleAmount: null,
      });
      setQuote(result.data);
      setQuoteLoaded(true);
    } catch (error) {
      sendErrorReport(
        "BitcoinVNQuote - Withdraw - Fetching quote failed",
        error
      );
      console.error("Error fetching quote:", error);
      setState("error");
    }
  }

  const handleSend = async () => {
    try {
      setIsLoading("processing");
      const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
        client,
        account,
        polygon,
        BigInt(Number(amount) * 10 ** selectedToken.decimals),
        selectedToken,
        transaction?.depositData.address || ""
      );

      // get transaction from database
      const fiatTransactionRes = await api.get(
        `/api/fiatTransaction/?where[transactionDetails][equals]=${transaction.shortId}`
      );

      const fiatTransaction = fiatTransactionRes.data.docs[0];

      console.log("fiatTransaction", fiatTransactionRes);

      if (!fiatTransaction) {
        setIsLoading("error");
        setErrorMessage(tCrossborder("withdraw.bitcoinvn.errorAgain"));
        sendErrorReport(
          "BitcoinVN - Withdraw - Sending failed",
          "no transaction found"
        );
        setTimeout(() => {
          setIsLoading("normal");
        }, 20000);
      } else {
        try {
          await api.patch(`/api/fiatTransaction/${fiatTransaction?.id}`, {
            transactionHash,
          });

          setState("success");
          setIsLoading("success");
        } catch (error) {
          console.error("error handle send", error);
          setErrorMessage(tCrossborder("withdraw.bitcoinvn.errorAgain"));
          sendErrorReport(
            "BitcoinVN - Withdraw - Updating transaction with hash failed",
            error
          );
          setIsLoading("error");
          setTimeout(() => {
            setIsLoading("normal");
          }, 20000);
        }
      }
    } catch (error) {
      console.error("error handle send", error);
      setErrorMessage(tCrossborder("withdraw.bitcoinvn.errorAgain"));
      sendErrorReport("BitcoinVN - Withdraw - Sending failed", error);
      setIsLoading("error");
      setTimeout(() => {
        setIsLoading("normal");
      }, 20000);
    }
  };

  async function getInfo() {
    try {
      const result = await api.get("/api/fiatTransaction/bitcoinVN/getInfo");
      setBankList(
        result.data.transferMethods.vnd.details.banks.map((bank: string) => ({
          value: bank,
          label: bank,
        }))
      );
      setInfoLoaded(true);
    } catch (error) {
      sendErrorReport("BitcoinVN - Withdraw - Fetching info failed", error);
      console.error("Error fetching bank list:", error);
      setState("error");
    }
  }

  async function createTransaction() {
    setState("loading");
    try {
      const result = await api.post(
        "/api/fiatTransaction/bitcoinVN/createOrder",
        {
          quote: quote?.id,
          accountNumber: formData.accountNumber,
          accountHolder: formData.accountHolder,
          bank: formData.bank,
          address: account?.address,
          currency: selectedToken.contractAddress,
          currencyDecimals: selectedToken.decimals,
        }
      );
      setTransaction(result.data);
      setState("transaction-created");
    } catch (error) {
      sendErrorReport(
        "BitcoinVN - Withdraw - Creating transaction failed",
        error
      );
      console.error("Error creating transaction:", error);
      setState("error");
    }
  }

  useEffect(() => {
    setState("loading");
    Promise.all([getQuote(), getInfo()]).then(() => {
      setState("loaded");
    });
  }, [amount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (value: string) => {
    setFormData((prev) => ({ ...prev, bank: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bank) {
      setFormError(tCrossborder("withdraw.bitcoinvn.errorBank"));
      return;
    }

    setFormError("");
    createTransaction();
  };

  if (state === "loading" || !quoteLoaded || !infoLoaded) {
    return <Loading />;
  }

  if (state === "error") {
    return <Error />;
  }

  if (state === "loaded" && quote) {
    return (
      <QuoteForm
        quote={quote}
        amount={amount}
        bankList={bankList}
        formData={formData}
        formError={formError}
        onSubmit={handleFormSubmit}
        onBankChange={handleBankChange}
        onInputChange={handleInputChange}
      />
    );
  }

  if (state === "transaction-created" && transaction) {
    return (
      <TransactionCreated
        transaction={transaction}
        isLoading={isLoading}
        onSend={handleSend}
      />
    );
  }

  if (state === "success") {
    return <Success />;
  }

  return null;
}
