import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useActiveAccount } from "thirdweb/react";
import { polygon } from "thirdweb/chains";
import { useTranslation } from "next-i18next";
import { Account } from "thirdweb/wallets";

// Import slides
import Loading from "./slides/Loading";
import Error from "./slides/Error";
import QuoteForm from "./slides/QuoteForm";
import TransactionCreated from "./slides/TransactionCreated";
import Success from "./slides/Success";
import currencies from "../../../../../utilities/crypto/currencies";
import { client } from "../../../../../../pages/_app";
import { sendErrorReport } from "../../../../../../context/UserContext";
import { Vendor, Consumer } from "../../../../../types/payload-types";
import { tokenPayAbstractionSimpleTransfer } from "../../../../../utilities/crypto/TokenPayAbstraction";
import { FiatTransactionRequest } from "../../../../../types/derivedPayload.types";

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

interface Transaction {
  id: string;
  depositData: {
    address: string;
  };
  settleData: {
    accountNumber: string;
    bank: string;
  };
}

type LoadingState = "normal" | "loading" | "success" | "error";

export default function BitcoinVN({ amount, user }: BitcoinVNProps) {
  const [state, setState] = useState<"loading" | "error" | "loaded" | "transaction-created" | "success">("loading");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const selectedToken = currencies["USDC"];
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountHolder: "",
    bank: "",
  });
  const account = useActiveAccount();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<LoadingState>("normal");
  const [bankList, setBankList] = useState<Array<{ value: string; label: string }>>([]);
  const [formError, setFormError] = useState("");
  const [quoteLoaded, setQuoteLoaded] = useState(false);
  const [infoLoaded, setInfoLoaded] = useState(false);

  const { t: tCrossborder } = useTranslation("crossborder");

  async function getQuote() {
    try {
      const result = await axios.post("/api/fiatTransaction/bitcoinVN/quote", {
        depositAmount: amount - amount * POOL_FEE,
        settleAmount: null,
      });
      setQuote(result.data);
      setQuoteLoaded(true);
    } catch (error) {
      sendErrorReport("BitcoinVNQuote - Withdraw - Fetching quote failed", error);
      console.error("Error fetching quote:", error);
      setState("error");
    }
  }

  const handleSend = async () => {
    try {
      const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
        client,
        account,
        polygon,
        BigInt(Number(amount) * 10 ** selectedToken.decimals),
        selectedToken,
        transaction?.depositData.address || ""
      );

      const transactionData: FiatTransactionRequest = {
        partner: "bitcoin_vn",
        amount: Number(amount),
        currency: selectedToken.contractAddress,
        currencyName: selectedToken.id,
        transactionHash: transactionHash,
        UUID: transaction?.id || "",
        sendingWallet: account?.address || "",
        currencyDecimals: selectedToken.decimals,
        receivingWallet: transaction?.depositData.address || "",
        toAccountBankName: transaction?.settleData.bank || "",
        toAccountIdentifier: transaction?.settleData.accountNumber || "",
        toNetwork: "fiat",
        fromNetwork: "polygon",
        type: "Withdraw",
        finalCurrency: "VND",
        finalamount: quote?.settleAmount || 0,
      };

      if (user.type === "vendor") {
        transactionData.vendor = user.id;
      } else {
        transactionData.consumer = user.id;
      }

      await axios.post("/api/fiatTransaction", transactionData);

      setIsLoading("success");
      setTimeout(() => {
        setIsLoading("normal");
      }, 20000);
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
      const result = await axios.get("/api/fiatTransaction/bitcoinVN/getInfo");
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
      const result = await axios.post("/api/fiatTransaction/bitcoinVN/createOrder", {
        quote: quote?.id,
        accountNumber: formData.accountNumber,
        accountHolder: formData.accountHolder,
        bank: formData.bank,
        address: account?.address,
      });
      setTransaction(result.data);
      setState("transaction-created");
    } catch (error) {
      sendErrorReport("BitcoinVN - Withdraw - Creating transaction failed", error);
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