import { AuthContext, sendErrorReport } from "@/context/UserContext";
import currencies from "@/tokenPayLib/utilities/crypto/currencies";
import axios from "axios";
import { useTranslation } from "next-i18next";
import React, { useContext, useEffect, useState } from "react";
import { getSwyptQuote } from "../../methods/SwyptQuote";
import Loader from "@/tokenPayLib/components/UI/Loader";
import { HiChevronDoubleRight } from "react-icons/hi";

export default function Swypt({
  amount,
  account,
  user,
  method,
  startCurrency,
  endCurrency,
}) {
  const [state, setState] = useState("awaitTransaction");
  const [formError, setFormError] = useState("");
  const [quote, setQuote] = useState(null);
  const [quoteLoaded, setQuoteLoaded] = useState(false);
  const { refreshAuthentication } = useContext(AuthContext);

  const selectedToken = currencies[method?.acceptedCrypto];

  const { t: tCrossborder } = useTranslation("crossborder");

  const [formData, setFormData] = useState({
    phone: "",
  });

  async function pollTransactionStatusFrontend(transactionId) {
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
            reject(new Error("Transaction failed"));
          }

          if (attempts >= maxAttempts) {
            clearInterval(poll);
            reject(new Error("Polling timed out"));
          }
        } catch (err) {
          clearInterval(poll);
          reject(err);
        }
      }, interval);
    });
  }

  useEffect(() => {
    async function loadData() {
      console.log("method", method);
      const { data: swyptQuote } = await getSwyptQuote(
        amount,
        startCurrency,
        endCurrency,
        "Polygon",
        "onramp"
      );
      console.log("swyptQuote", swyptQuote);
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
    if (user.currentSwyptOnRampTransaction) {
      if (user.currentSwyptOnRampTransaction.status === "awaitSTK") {
        setState("polling");
        pollTransactionStatusFrontend(user.currentSwyptOnRampTransaction.UUID);
      } else if (
        user.currentSwyptOnRampTransaction.status === "awaitTransaction"
      ) {
        setState("awaitTransaction");
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.phone) {
      setFormError(tCrossborder("withdraw.swypt.formErrorPhone"));
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

      let transactionRes = axios.post("/api/fiatTransaction", {
        vendor: user.id,
        partner: "swypt",
        amount: Number(amount),
        currency: selectedToken.contractAddress,
        currencyName: selectedToken.id,
        transactionHash: "",
        UUID: transactionId,
        sendingWallet: account?.address,
        currencyDecimals: selectedToken.decimals,
        receivingWallet: account?.address,
        toAccountBankName: "Mobile Money",
        toAccountIdentifier: formData.phone,
        toNetwork: "polygon",
        fromNetwork: "fiat",
        status: "awaitSTK",
        type: "Withdraw",
        finalCurrency: "USDC",
        fee: quote.fee.amount,
        exchangeRate: quote.exchangeRate,
        finalAmount: quote.outputAmount - quote.outputAmount * 0.004,
      });

      // update currentSwyptTransaction of the user
      let updateUser = axios.post("/api/vendor", {
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

    const response = await axios.post("https://pool.swypt.io/api/deposit", {
      chain: "Polygon",
      amount: user.currentSwyptOnRampTransaction.amount,
      address: user.currentSwyptOnRampTransaction.receivingWallet,
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
    let transactionRes = axios.post(
      `/api/fiatTransaction/${user.currentSwyptOnRampTransaction.id}`,
      {
        status: processedState,
      }
    );

    // remove the current transaction from the user
    let updateUser = axios.post("/api/vendor", {
      currentSwyptOnRampTransaction: null,
    });

    refreshAuthentication();
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white">
      {state === "input" && quoteLoaded && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              {tCrossborder("withdraw.bitcoinvn.offerSummary")}
            </h2>
            <div className="flex flex-col">
              <div className="w-full flex-1 flex flex-row gap-4">
                <div className="gap-1 flex-1 flex flex-col">
                  <div className="font-bold text-2xl sm:text-6xl text-gray-600 whitespace-nowrap">
                    {amount} {startCurrency}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <HiChevronDoubleRight className="h-12 w-12 text-gray-600" />
                </div>

                <div className="gap-1 flex-1 flex flex-col justify-end items-end">
                  <div className="font-bold text-2xl sm:text-6xl whitespace-nowrap ">
                    {(quote.outputAmount - quote.outputAmount * 0.004).toFixed(
                      2
                    )}{" "}
                    {endCurrency}
                  </div>
                  <div>{tCrossborder("withdraw.bitcoinvn.depositAmount")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Receiving Address */}
          <p className=" w-full bg-gray-100 p-4 rounded-lg mb-4 flex flex-col gap-2">
            {tCrossborder("deposit.swypt.receiverAddress")}
            <div className="font-bold w-full overflow-hidden text-ellipsis">
              {" "}
              {account.address}
            </div>
          </p>

          {/* Form Section */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {tCrossborder("deposit.swypt.senderPhone")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="z.B. +4915123456789"
              />
            </div>
            {formError && <p className="text-red-500 text-sm">{formError}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {tCrossborder("withdraw.swypt.startTransaction")}
            </button>
          </form>
        </>
      )}

      {state === "awaitTransaction" && quoteLoaded && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              {tCrossborder("deposit.swypt.finalizeTransaction")}
            </h2>
            <div className="flex flex-col">
              <div className="w-full flex-1 flex flex-row gap-4">
                <div className="gap-1 flex-1 flex flex-col">
                  <div className="font-bold text-2xl sm:text-6xl text-gray-600 whitespace-nowrap">
                    {amount} {startCurrency}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <HiChevronDoubleRight className="h-12 w-12 text-gray-600" />
                </div>

                <div className="gap-1 flex-1 flex flex-col justify-end items-end">
                  <div className="font-bold text-2xl sm:text-6xl whitespace-nowrap ">
                    {(quote.outputAmount - quote.outputAmount * 0.004).toFixed(
                      2
                    )}{" "}
                    {endCurrency}
                  </div>
                  <div>{tCrossborder("withdraw.bitcoinvn.depositAmount")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Receiving Address */}
          <p className=" w-full bg-gray-100 p-4 rounded-lg mb-4 flex flex-col gap-2">
            {tCrossborder("deposit.swypt.swyptReceived")}
            <div className="font-bold w-full overflow-hidden text-ellipsis">
              {" "}
              {account.address}
            </div>
          </p>

          <button
            onClick={finalizeTransaction}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {tCrossborder("deposit.swypt.finalize")}
          </button>
        </>
      )}

      {/* State Handling */}
      {(state === "loading" || !quoteLoaded) && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      {(state === "pooling" || !quoteLoaded) && (
        <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
          <div className="rounded bg-green-100 p-4">
            {tCrossborder("deposit.swypt.poolingMessage")}
          </div>
          <Loader />
        </div>
      )}

      {state === "transaction-created" && (
        <p className="text-green-500 mt-4">
          {tCrossborder("withdraw.swypt.successMessage")}
        </p>
      )}
      {state === "error" && (
        <p className="text-red-500 mt-4 w-full text-center bg-gray-100 p-4 rounded-lg">
          {tCrossborder("withdraw.swypt.errorCreating")}
        </p>
      )}

      {state === "success" && (
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
            {tCrossborder("withdraw.swypt.transactionSuccess")}
          </h1>
          <p className="text-center">
            {tCrossborder("withdraw.swypt.transactionSuccess")}
          </p>
        </div>
      )}
    </div>
  );
}
