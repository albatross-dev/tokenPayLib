import { sendErrorReport } from "@/context/UserContext";
import currencies from "@/tokenPayLib/utilities/crypto/currencies";
import axios from "axios";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import {
  createThirdwebClient,
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
  readContract,
} from "thirdweb";
import { polygon } from "thirdweb/chains";

export default function Swypt({ amount, account, user, method }) {
  const [state, setState] = useState("input");
  const [formError, setFormError] = useState("");
  const USDT = currencies["USDT"];

const { t: tCrossborder } = useTranslation("crossborder");

  const [formData, setFormData] = useState({
    phone: "",
  });

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

      const approve = prepareContractCall({
        contract: uhuContract,
        method: "approve",
        params: [
          monthType === "a"? currentRouter.routerAddress : currentRouterB.routerAddress, // Router Address
          Number(amount) * 10 ** 18,
        ],
      });

      await sendAndConfirmTransaction({
        account,
        transaction: approve,
      });

      const contract = getContract({
        client: client,
        chain: polygon,
        address: selectedToken.contractAddress,
        abi: selectedToken.abi,
      });

      console.log({
        contract: contract,
        method: "transfer",
        params: [
          transaction.depositData.address,
          Number(amount) * 10 ** selectedToken.decimals,
        ],
      });

      const transfer = prepareContractCall({
        contract: contract,
        method: "transfer",
        params: [
          transaction.depositData.address,
          Number(amount) * 10 ** selectedToken.decimals,
        ],
      }); 

      const { transactionHash } = await sendAndConfirmTransaction({
        account: account,
        transaction: transfer,
      });

      const result = await axios.post(
        "https://api.swypt.io/api/token-pay-offramp",
        {
          partyB: formData.phone,
          tokenAddress: token,
          hash: hash,
          chain: chain
        }
      );
      console.log("swypt result", result);

      axios.post("/api/fiatTransaction", {
        vendor: user.id,
        partner: "swypt",
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
        finalCurrency: "KES",
        finalAmount: 0,
      });

      setState("success");
    } catch (error) {
      sendErrorReport("Swypt - Withdraw - Error creating transaction", error);
      setState("error");
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white">
      {state === "input" && (
        <>
          {" "}
          <div className="mb-6 p-4 bg-blue-100 text-blue-700 rounded-lg text-center">
            <h2 className="text-lg font-bold">{tCrossborder("withdraw.swypt.send")}</h2>
            <p className="text-2xl font-semibold">
              {amount} {method?.currency || "USD"}
            </p>
          </div>
          {/* Form Section */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
              {tCrossborder("withdraw.swypt.phoneNumber")} <span className="text-red-500">*</span>
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
      {state === "loading" && (
         <div className="w-full h-full flex items-center justify-center mt-16">
         <Loader />
       </div>
      )}
      {state === "transaction-created" && (
        <p className="text-green-500 mt-4">{tCrossborder("withdraw.swypt.successMessage")}</p>
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
