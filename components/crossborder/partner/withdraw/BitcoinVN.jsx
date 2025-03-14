import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/tokenPayLib/components/UI/Loader";
import CustomDropdown from "@/tokenPayLib/components/Forms/CustomDropdown";
import { useActiveAccount } from "thirdweb/react";
import { HiChevronDoubleRight } from "react-icons/hi2";
import currencies from "@/tokenPayLib/utilities/crypto/currencies";
import { polygon } from "thirdweb/chains";
import { client } from "@/pages/_app";
import LoadingButton from "@/tokenPayLib/components/UI/LoadingButton";
import { tokenPayAbstractionSimpleTransfer } from "@/tokenPayLib/assets/TokenPayAbstraction";
import { useTranslation } from "next-i18next";
import { sendErrorReport } from "@/context/UserContext";

const POOL_FEE = 0.004;

export default function BitcoinVN({ amount }) {
  const [state, setState] = useState("loading");
  const [quote, setQuote] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const selectedToken = currencies["USDC"];
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountHolder: "",
    bank: "",
    address: "",
  });
  const account = useActiveAccount();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState("normal");

  const [bankList, setBankList] = useState([]);
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
      console.error("Fehler beim Abrufen des Angebots:", error);
      setState("error");
    }
  }

  const handleSend = async () => {
    try {
      console.log(
        selectedToken,
        transaction.depositData.address,
        amount,
        Number(amount) * 10 ** selectedToken.decimals
      );

      const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
        client,
        account,
        polygon,
        Number(amount) * 10 ** selectedToken.decimals,
        selectedToken.contractAddress,
        transaction.depositData.address
      );

      let transactionData = {
        partner: "bitcoinVN",
        amount: Number(amount),
        currency: selectedToken.contractAddress,
        currencyName: selectedToken.id,
        transactionHash: transactionHash,
        UUID: transaction.id,
        sendingWallet: account?.address,
        currencyDecimals: selectedToken.decimals,
        receivingWallet: transaction.depositData.address,
        toAccountBankName: transaction.settleData.bank,
        toAccountIdentifier: transaction.settleData.accountNumber,
        toNetwork: "fiat",
        fromNetwork: "polygon",
        type: "Withdraw",
        finalCurrency: "VND",
        finalAmount: quote.settleAmount,
      }

      if(user.type === "vendor") {
        transactionData.vendor = user.id
      }else{
        transactionData.consumer = user.id
      }

      const sendRes = axios.post("/api/fiatTransaction", transactionData);

      setIsLoading("success");
      // set on normal after 20 seconds
      setTimeout(() => {
        setIsLoading("normal");
      }, 20000);
    } catch (error) {
      console.log("error handle send", error);
      setErrorMessage({
        message: tCrossborder("withdraw.bitcoinvn.errorAgain"),
        error: error,
      });
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
        result.data.transferMethods.vnd.details.banks.map((bank) => ({
          value: bank,
          label: bank,
        }))
      );
      setInfoLoaded(true);
    } catch (error) {
      sendErrorReport("BitcoinVN - Withdraw - Fetching info failed", error);
      console.error("Fehler beim Abrufen der Bankliste:", error);
      setState("error");
    }
  }

  async function createTransaction() {
    setState("loading");
    try {
      const result = await axios.post(
        "/api/fiatTransaction/bitcoinVN/createOrder",
        {
          quote: quote.id,
          accountNumber: formData.accountNumber,
          accountHolder: formData.accountHolder,
          bank: formData.bank,
          address: account.address,
        }
      );
      setTransaction(result.data);
      setState("transaction-created");
    } catch (error) {
      sendErrorReport("BitcoinVN - Withdraw - Creating transaction failed", error);
      console.error("Fehler beim Erstellen der Transaktion:", error);
      setState("error");
    }
  }

  useEffect(() => {
    setState("loading");
    Promise.all([getQuote(), getInfo()]).then(() => {
      setState("loaded");
    });
  }, [amount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (value) => {
    setFormData((prev) => ({ ...prev, bank: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.bank) {
      setFormError(tCrossborder("withdraw.bitcoinvn.errorBank"));
      return;
    }

    setFormError("");
    createTransaction();
  };

  if (state === "loading" || !quoteLoaded || !infoLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center mt-16">
        <Loader />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="text-center text-red-600 py-10">
        {tCrossborder("withdraw.bitcoinvn.errorLoadingData")}
      </div>
    );
  }

  if (state === "loaded" && quote) {
    return (
      <div className="max-w-4xl w-full mx-auto p-6 bg-white">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            {tCrossborder("withdraw.bitcoinvn.offerSummary")}
          </h2>
          <div className="flex flex-col">
            <div className="flex gap-2 text-sm">
              <p>
                <strong>
                  {tCrossborder("withdraw.bitcoinvn.exchangeRate")}
                </strong>{" "}
                {quote.rate}
              </p>
              <p className="text-red-600">
                <strong>{tCrossborder("withdraw.bitcoinvn.validFor")}</strong>{" "}
                {Math.round((new Date(quote.expiresAt) - new Date()) / 60000)}{" "}
                {tCrossborder("withdraw.bitcoinvn.minutes")}
              </p>
            </div>

            <div className="w-full flex-1 flex flex-row gap-4">
              <div className="gap-1 flex-1 flex flex-col">
                <div className="font-bold text-6xl text-gray-600 whitespace-nowrap">
                  {quote.depositAmount} {quote.depositMethod.toUpperCase()}
                </div>
                <div>{tCrossborder("withdraw.bitcoinvn.depositAmount")}</div>
              </div>
              <div className="flex items-center justify-center">
                <HiChevronDoubleRight className="h-12 w-12 text-gray-600" />
              </div>

              <div className="gap-1 flex-1 flex flex-col justify-end items-end">
                <div className="font-bold text-6xl whitespace-nowrap ">
                  {quote.settleAmount} {quote.settleMethod.toUpperCase()}
                </div>
                <div>{tCrossborder("withdraw.bitcoinvn.withdrawAmount")}</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {tCrossborder("withdraw.bitcoinvn.bank")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <CustomDropdown
              options={bankList}
              value={formData.bank}
              onChange={handleBankChange}
              name="bank"
              placeholder={tCrossborder("withdraw.bitcoinvn.placeholderBank")}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {tCrossborder("withdraw.bitcoinvn.accountNumber")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {tCrossborder("withdraw.bitcoinvn.accountOwner")}
            </label>
            <input
              type="text"
              name="accountHolder"
              value={formData.accountHolder}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {tCrossborder("withdraw.bitcoinvn.startTransaction")}
          </button>
        </form>
      </div>
    );
  }

  if (state === "transaction-created" && transaction) {
    return (
      <div className="max-w-4xl mx-auto p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 text-uhuBlue text-center">
          {tCrossborder("withdraw.bitcoinvn.transactionCreated")}
        </h1>
        <div className="space-y-4">
          <p>
            <strong>{tCrossborder("withdraw.bitcoinvn.transactionId")}</strong>{" "}
            {transaction.id}
          </p>
          <p>
            <strong>{tCrossborder("withdraw.bitcoinvn.depositAddress")}</strong>{" "}
            {transaction.depositData.address}
          </p>
          <p>
            <strong>{tCrossborder("withdraw.bitcoinvn.targetAccount")}</strong>{" "}
            {transaction.settleData.accountNumber}
          </p>
          <p>
            <strong>{tCrossborder("withdraw.bitcoinvn.bankInfo")}</strong>{" "}
            {transaction.settleData.bank}
          </p>
        </div>
        <div className="flex items-end justify-end mt-6">
          <LoadingButton
            openError={() => {}}
            isLoading={isLoading}
            onClick={handleSend}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {tCrossborder("withdraw.bitcoinvn.finalizeTransaction")}
          </LoadingButton>
        </div>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="max-w-4xl mx-auto p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
          {tCrossborder("withdraw.bitcoinvn.transactionSuccess")}
        </h1>
        <p className="text-center">
          {tCrossborder("withdraw.bitcoinvn.successInfo")}
        </p>
      </div>
    );
  }

  return null;
}
