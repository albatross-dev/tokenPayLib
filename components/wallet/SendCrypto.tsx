"use client";
import React, { useEffect, useState, useContext } from "react";
import { useActiveAccount } from "thirdweb/react";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import numberWithZeros from "../../utilities/math/numberWithZeros";
import {
  api,
  AuthContext,
  sendErrorReport,
} from "../../../context/UserContext";
import SimpleList from "../UI/SimpleList";
import { TokensByChainId } from "../../utilities/crypto/currencies";
import { useTranslation } from "react-i18next";
import { tokenPayAbstractionSimpleTransfer } from "../../utilities/crypto/TokenPayAbstraction";
import { getSendCryptoColumns } from "./sendCryptoColumns";
import { useSendCryptoForm } from "../../hooks/useSendCryptoForm";
import SendCryptoDialog from "./SendCryptoDialog";
import fetchBalance from "../../utilities/crypto/fetchBalance";
import { FiatTransactionRequest } from "../../types/derivedPayload.types";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

interface SendCryptoProps {
  setErrorMessage: (error: { message: string; error: any }) => void;
}

export default function SendCrypto({ setErrorMessage }: SendCryptoProps) {
  const [selectedToken, setSelectedToken] = useState(null);
  const [amount, setAmount] = useState(0);
  const [originTokens, setOriginTokens] = useState({});
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(null);
  const [maxAmount, setMaxAmount] = useState(0);
  const account = useActiveAccount();
  const [targetAddress, setTargetAddress] = useState("");
  const [isLoading, setIsLoading] = useState("normal");
  const [newTxHash, setNewTxHash] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { user } = useContext(AuthContext);
  const { t: tAccount } = useTranslation("wallet");
  const { errors, validate, setFieldError, clearFieldError } =
    useSendCryptoForm({ tAccount });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setOriginTokens(TokensByChainId[polygon.id]);
  }, []);

  useEffect(() => {
    if (newTxHash) fetchTokenBalance(selectedToken);
  }, [newTxHash]);

  const handleMaxClick = () => {
    if (!selectedToken) {
      setFieldError("amount", tAccount("sendCrypto.errors.selectTokenFirst"));
      return;
    }

    setAmount(maxAmount);
  };

  const fetchTokenBalance = async (selectedToken) => {
    setSelectedToken(selectedToken);
    const balance = await fetchBalance(
      client,
      polygon,
      selectedToken.contractAddress,
      selectedToken.abi,
      account.address
    );

    setSelectedTokenBalance(balance);

    // Calculate max amount immediately
    const calculatedMaxAmount =
      Number(balance) / numberWithZeros(selectedToken?.decimals || 1);
    setMaxAmount(calculatedMaxAmount);

    // Check if balance is zero and show error message
    if (calculatedMaxAmount <= 0) {
      setFieldError("amount", tAccount("sendCrypto.errors.noBalance"));
    } else {
      clearFieldError("selectedToken");
    }
  };

  const handleSend = async () => {
    // Validate with current data before proceeding
    const isValid = validate(selectedToken, amount, targetAddress, maxAmount);

    if (isValid) {
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

        let transferData: FiatTransactionRequest = {
          amount: Number(amount),
          currency: selectedToken.contractAddress,
          currencyName: selectedToken.id.toUpperCase(),
          transactionHash: transactionHash,
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
        setAmount(0);
        setIsLoading("success");
        setNewTxHash(transactionHash);
      } catch (error) {
        console.log("error handle send", error);
        setErrorMessage({
          message: "Bitte versuchen Sie es später nochmal",
          error: error,
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
            collection={"cryptoTransfer"}
            columns={getSendCryptoColumns(tAccount)}
            loader={newTxHash}
          >
            <button
              onClick={() => setIsOpen(true)}
              suppressHydrationWarning
              className="btn-primary"
            >
              {tAccount("sendCrypto.table.newTransaction")}
            </button>
          </SimpleList>
        )}
      </div>
    </>
  );
}
