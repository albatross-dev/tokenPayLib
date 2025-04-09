import { sendErrorReport } from "@/context/UserContext";
import currencies from "@/tokenPayLib/utilities/crypto/currencies";
import axios from "axios";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { polygon } from "thirdweb/chains";
import { getSwyptQuote } from "../../methods/SwyptQuote";
import Loader from "@/tokenPayLib/components/UI/Loader";
import { HiChevronDoubleRight } from "react-icons/hi";
import { swyptContract, swyptContractAddress } from "../universal/swyptUtils";
import { client } from "@/pages/_app";

export default function Swypt({ amount, account, user, method }) {
  const [state, setState] = useState("input");
  const [formError, setFormError] = useState("");
  const [quote, setQuote] = useState(null);
  const [quoteLoaded, setQuoteLoaded] = useState(false);

  const selectedToken = currencies[method?.acceptedCrypto];
  
  const { t: tCrossborder } = useTranslation("crossborder");

  const [formData, setFormData] = useState({
    phone: "",
  });

  useEffect(() => {
    async function loadData() {
      const { data: swyptQuote } = await getSwyptQuote(amount);
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

      const contract = getContract({
        client: client,
        chain: polygon,
        address: selectedToken.contractAddress,
        abi: selectedToken.abi,
      });

      console.log("creating contract with", selectedToken.contractAddress);

      const approve = prepareContractCall({
        contract: contract,
        method: "approve",
        params: [
          swyptContractAddress,
          Number(amount) * 10 ** selectedToken.decimals,
        ],
      });

      console.log("approve params", [
        swyptContractAddress,
        Number(amount) * 10 ** selectedToken.decimals,
      ]);

      const withdrawToEscrow = prepareContractCall({
        contract: swyptContract,
        method: "withdrawToEscrow",
        params: [ 
          selectedToken.contractAddress,
          Number(amount) * 10 ** selectedToken.decimals,
          quote.exchangeRate  * 10 ** selectedToken.decimals,
          quote.fee.amount * 10 ** selectedToken.decimals,
        ],
      });

      console.log("withdrawToEscrow params", [ 
        selectedToken.contractAddress,
        Number(amount) * 10 ** selectedToken.decimals,
        quote.exchangeRate  * 10 ** selectedToken.decimals,
        quote.fee.amount * 10 ** selectedToken.decimals,
      ]);

      const { transactionHash: approveHash} = await sendAndConfirmTransaction({
        account,
        transaction: approve,
      });

      console.log("approve transaction hash", approveHash);

      const { transactionHash } = await sendAndConfirmTransaction({
        account: account,
        transaction: withdrawToEscrow,
      });

      console.log("sendAndConfirmTransaction hash", transactionHash);

      const result = await axios.post(
        "https://pool.swypt.io/api/swypt-offramp",
        {
          partyB: formData.phone,
          tokenAddress: selectedToken.contractAddress,
          hash: transactionHash,
          chain: "Polygon",
        }
      );

      console.log("swypt result", result);

      const transactionId = result.data.orderID

      axios.post("/api/fiatTransaction", {
        vendor: user.id,
        partner: "swypt",
        amount: Number(amount),
        currency: selectedToken.contractAddress,
        currencyName: selectedToken.id,
        transactionHash: transactionHash,
        UUID: transactionId,
        sendingWallet: account?.address,
        currencyDecimals: selectedToken.decimals,
        receivingWallet: swyptContractAddress,
        toAccountBankName: "Mobile Money",
        toAccountIdentifier: formData.phone,
        toNetwork: "fiat",
        fromNetwork: "polygon",
        status: "pending",
        type: "Withdraw",
        finalCurrency: "KES",
        finalAmount: quote.outputAmount - (quote.outputAmount * 0.004),
      });

      setState("success");
    } catch (error) {
      console.error("Error creating transaction:", error);
      sendErrorReport("Swypt - Withdraw - Error creating transaction", error);
      setState("error");
    }
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
                  <div className="font-bold text-6xl text-gray-600 whitespace-nowrap">
                    {amount} {method?.currency || "USD"}
                  </div>
                  <div>{tCrossborder("withdraw.bitcoinvn.depositAmount")}</div>
                </div>
                <div className="flex items-center justify-center">
                  <HiChevronDoubleRight className="h-12 w-12 text-gray-600" />
                </div>

                <div className="gap-1 flex-1 flex flex-col justify-end items-end">
                  <div className="font-bold text-6xl whitespace-nowrap ">
                    {(quote.outputAmount - (quote.outputAmount * 0.004)).toFixed(2)} {quote.outputCurrency.toUpperCase()}
                  </div>
                  <div>{tCrossborder("withdraw.bitcoinvn.withdrawAmount")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {tCrossborder("withdraw.swypt.phoneNumber")}{" "}
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

      {/* State Handling */}
      {state === "loading" || (!quoteLoaded && (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ))}
      {state === "transaction-created" && (
        <p className="text-green-500 mt-4">
          {tCrossborder("withdraw.swypt.successMessage")}
        </p>
      )}
      {state === "error" && (
        <p className="text-red-500 mt-4">
          {tCrossborder("withdraw.swypt.errorCreating")}
        </p>
      )}

      {state === "success" && (
        <div className="max-w-4xl mx-auto p-6 w-full">
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
