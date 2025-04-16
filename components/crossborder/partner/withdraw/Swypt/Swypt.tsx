import { sendErrorReport } from "../../../../../../context/UserContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { polygon } from "thirdweb/chains";
import { getSwyptQuote, SwyptQuoteResponse } from "../../../methods/SwyptQuote";
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

      const { transactionHash: approveHash } = await sendAndConfirmTransaction({
        account,
        transaction: approve,
      });

      const { transactionHash } = await sendAndConfirmTransaction({
        account: account,
        transaction: withdrawToEscrow,
      });

      const result = await axios.post(
        "https://pool.swypt.io/api/swypt-offramp",
        {
          partyB: formData.phone,
          tokenAddress: selectedToken.contractAddress,
          hash: transactionHash,
          chain: "Polygon",
        }
      );

      const transactionId = result.data.orderID;

      await axios.post("/api/fiatTransaction", {
        vendor: user.id,
        partner: "swypt",
        amount: Number(amount),
        currency: selectedToken.contractAddress,
        currencyName: selectedToken.id.toUpperCase(),
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
        finalAmount: quote!.outputAmount - quote!.outputAmount * 0.004,
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
