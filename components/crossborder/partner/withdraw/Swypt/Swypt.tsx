import { api, sendErrorReport } from "../../../../../../context/UserContext";
import React, { useEffect, useState } from "react";
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { polygon } from "thirdweb/chains";
import { getSwyptQuote, SwyptQuoteResponse } from "../../universal/swyptUtils";
import {
  swyptContract,
  swyptContractAddress,
} from "../../universal/swyptUtils";
import { client } from "../../../../../../pages/_app";
import { FormData, SwyptProps, SwyptState } from "./types";
import { InputSlide } from "./slides/InputSlide";
import { LoadingSlide } from "./slides/LoadingSlide";
import { SuccessSlide } from "./slides/SuccessSlide";
import { ErrorSlide } from "./slides/ErrorSlide";
import currencies from "../../../../../utilities/crypto/currencies";

const Swypt: React.FC<SwyptProps> = ({ amount, account, user, method }) => {
  const [state, setState] = useState<SwyptState>("input");
  const [formError, setFormError] = useState("");
  const [quote, setQuote] = useState<SwyptQuoteResponse | null>(null);
  const [quoteLoaded, setQuoteLoaded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    phone: "",
  });

  const selectedToken = currencies[method?.acceptedCrypto];

  useEffect(() => {
    async function loadData() {
      const swyptQuote = await getSwyptQuote(amount);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phone) {
      setFormError("Phone number is required");
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

      const approve = prepareContractCall({
        contract: contract,
        method: "approve",
        params: [
          swyptContractAddress,
          Number(amount) * 10 ** selectedToken.decimals,
        ],
      });

      const withdrawToEscrow = prepareContractCall({
        contract: swyptContract,
        method: "withdrawToEscrow",
        params: [
          selectedToken.contractAddress,
          BigInt(Number(amount) * 10 ** selectedToken.decimals),
          BigInt(quote!.exchangeRate * 10 ** selectedToken.decimals),
          BigInt(quote!.fee.amount * 10 ** selectedToken.decimals),
        ],
      });

      await sendAndConfirmTransaction({
        account,
        transaction: approve,
      });

      const { transactionHash } = await sendAndConfirmTransaction({
        account: account,
        transaction: withdrawToEscrow,
      });

      // call the offramp endpoint

      await api.post("/api/fiatTransaction/swypt/offramp", {
        phone: formData.phone,
        chain: "polygon",
        tokenAddress: selectedToken.contractAddress,
        tokenDecimals: selectedToken.decimals,
        transactionHash: transactionHash,
        sendingWallet: account?.address,
        amount: Number(amount),
        tokenId: selectedToken.id.toUpperCase(),
        swyptContractAddress: swyptContractAddress,
        outputAmount: Number(amount),
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
      {state === "input" && quoteLoaded && quote && (
        <InputSlide
          amount={amount}
          method={method}
          quote={quote}
          formData={formData}
          formError={formError}
          onFormSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
        />
      )}

      {(state === "loading" || !quoteLoaded) && <LoadingSlide />}
      {state === "success" && <SuccessSlide />}
      {state === "error" && <ErrorSlide />}
    </div>
  );
};

export default Swypt;
