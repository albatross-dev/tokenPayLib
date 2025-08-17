"use client";

import { Consumer, Vendor } from "@/tokenPayLib/types/payload-types";
import { SimpleToken } from "@/tokenPayLib/types/token.types";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { createThirdwebClient } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { api, sendErrorReport, useAuth } from "../../../context/UserContext";
import { useSendCryptoForm } from "../../hooks/useSendCryptoForm";
import { FiatTransactionRequest } from "../../types/derivedPayload.types";
import { chainTypesIds, TokensByChainId } from "../../utilities/crypto/currencies";
import fetchBalance from "../../utilities/crypto/fetchBalance";
import { tokenPayAbstractionSimpleTransfer } from "../../utilities/crypto/TokenPayAbstraction";
import numberWithZeros from "../../utilities/math/numberWithZeros";
import { LoadingButtonStates } from "../UI/LoadingButton";
import SimpleList from "../UI/SimpleList";
import { getSendCryptoColumns } from "./sendCryptoColumns";
import SendCryptoDialog from "./SendCryptoDialog";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

interface SendCryptoProps {
  setErrorMessage: (error: { message: string; error: any }) => void;
}

export default function SendCrypto({ setErrorMessage }: SendCryptoProps) {
  const [selectedToken, setSelectedToken] = useState<SimpleToken | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [originTokens, setOriginTokens] = useState<Record<string, SimpleToken>>({});
  const [selectedTokenBalance, setSelectedTokenBalance] = useState<number | null>(null);
  const [maxAmount, setMaxAmount] = useState(0);
  const account = useActiveAccount();
  const [targetAddress, setTargetAddress] = useState("");
  const [isLoading, setIsLoading] = useState<LoadingButtonStates>("normal");
  const [newTxHash, setNewTxHash] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth() as { user: Consumer | Vendor | null };
  const { t: tAccount } = useTranslation("wallet");
  const { errors, validate, setFieldError, clearFieldError } = useSendCryptoForm({ tAccount });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setOriginTokens(TokensByChainId[polygon.id as chainTypesIds]);
  }, []);

  useEffect(() => {
    if (newTxHash && selectedToken) fetchTokenBalance(selectedToken);
  }, [newTxHash, selectedToken]);

  const handleMaxClick = () => {
    if (!selectedToken) {
      setFieldError("amount", tAccount("sendCrypto.errors.selectTokenFirst"));
      return;
    }

    setAmount(maxAmount.toString());
  };

  const fetchTokenBalance = async (selectedToken: SimpleToken) => {
    if (!account) {
      console.error("No account found");
      return;
    }

    setSelectedToken(selectedToken);
    const balance = await fetchBalance(
      client,
      polygon,
      selectedToken.contractAddress,
      selectedToken.abi,
      account.address
    );

    setSelectedTokenBalance(Number(balance));

    // Calculate max amount immediately
    const calculatedMaxAmount = Number(balance) / numberWithZeros(selectedToken?.decimals || 1);
    setMaxAmount(calculatedMaxAmount);

    // Check if balance is zero and show error message
    if (calculatedMaxAmount <= 0) {
      setFieldError("amount", tAccount("sendCrypto.errors.noBalance"));
    } else {
      clearFieldError("selectedToken");
    }
  };

  const handleSend = async () => {
    if (!selectedToken) {
      return;
    }

    // Validate with current data before proceeding
    const isValid = validate(selectedToken, amount, targetAddress, maxAmount);

    if (isValid && account && user) {
      setIsLoading("processing");
      try {
        const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
          client,
          account,
          polygon,
          BigInt(Number(amount) * 10 ** selectedToken.decimals),
          selectedToken,
          targetAddress
        );

        const transferData: FiatTransactionRequest = {
          amount: Number(amount),
          currency: selectedToken.contractAddress,
          currencyName: selectedToken.id.toUpperCase(),
          transactionHash,
          sendingWallet: account?.address,
          currencyDecimals: selectedToken.decimals,
          receivingWallet: targetAddress,
        };

        if (user.type === "vendor") {
          transferData.vendor = user.id;
        } else {
          transferData.consumer = user.id;
        }

        await api.post("/api/cryptoTransfer", transferData);

        setTargetAddress("");
        setAmount("");
        setIsLoading("success");
        setNewTxHash(transactionHash);
      } catch (error) {
        console.log("error handle send", error);
        setErrorMessage({
          message: "Bitte versuchen Sie es später nochmal",
          error,
        });
        sendErrorReport("SendCrypto - Sending failed", error);
        setIsLoading("error");
        setTimeout(() => {
          setIsLoading("normal");
        }, 20000);
      }
    }
  };

  return (
    <>
      <SendCryptoDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        selectedToken={selectedToken}
        originTokens={originTokens}
        amount={amount}
        setAmount={setAmount}
        targetAddress={targetAddress}
        setTargetAddress={setTargetAddress}
        errors={errors}
        handleSend={handleSend}
        handleMaxClick={handleMaxClick}
        selectedTokenBalance={selectedTokenBalance}
        maxAmount={maxAmount}
        fetchTokenBalance={fetchTokenBalance}
        tAccount={tAccount}
        setFieldError={setFieldError}
        clearFieldError={clearFieldError}
      />
      <div>
        {isClient && (
          <SimpleList
            collection="cryptoTransfer"
            columns={getSendCryptoColumns(tAccount)}
            loader={Boolean(newTxHash)}
          >
            <button onClick={() => setIsOpen(true)} suppressHydrationWarning className="btn-primary">
              {tAccount("sendCrypto.table.newTransaction")}
            </button>
          </SimpleList>
        )}
      </div>
    </>
  );
}
