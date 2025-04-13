"use client";

import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import { useActiveAccount } from "thirdweb/react";
import { polygon } from "thirdweb/chains";
import axios from "axios";
import currencies from "../../../../../../utilities/currencies";
import { StasisProps } from "./slides/types";

// Components
import SelectBankAccount from "./slides/SelectBankAccount";
import AddBankAccount from "./slides/AddBankAccount";
import WithdrawView from "./slides/WithdrawView";
import SuccessView from "./slides/SuccessView";
import KYCRequired from "./slides/KYCRequired";
import Loader from "../../../../UI/Loader";
import { client } from "../../../../../../pages/_app";
import fetchBalance from "../../../../../utilities/crypto/fetchBalance";
import fetchBankAccounts from "../../../../../utilities/partner/stasis/fetchBankAccounts";
import { tokenPayAbstractionSimpleTransfer } from "../../../../../utilities/crypto/TokenPayAbstraction";
import { BankAccount } from "../../universal/stasis.types";
import { SimpleToken } from "../../../../../types/token.types";

const POOL_FEE = 0.004;

export default function Stasis({ amount, account, user, preferredStableCoin }: StasisProps) {
  const [isLoading, setIsLoading] = useState<string>("normal");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedToken, setSelectedToken] = useState<SimpleToken>(currencies[preferredStableCoin]);
  const [selectedTokenBalance, setSelectedTokenBalance] = useState<BigInt | null>(null);
  const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccount | null>(null);
  const [view, setView] = useState<string>("select"); // 'select', 'add', or 'withdraw'
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  const { t: tCrossborder } = useTranslation("crossborder");

  useEffect(() => {
    fetchTokenBalance(selectedToken);
    fetchBankAccounts({setBankAccounts, user});
  }, [account, user]);

  const fetchTokenBalance = async (selectedToken: SimpleToken) => {
    setSelectedToken(selectedToken);
    if (!account) return;
    const balance = await fetchBalance(
      client,
      polygon,
      selectedToken.contractAddress,
      selectedToken.abi,
      account.address
    );
    setSelectedTokenBalance(balance);
    setErrors((prevErrors) => ({ ...prevErrors, selectedToken: "" }));
  };

  const validate = () => {
    let newErrors: Record<string, string> = {};
    if (!amount || amount < 10) {
      newErrors.amount = tCrossborder("withdraw.stasis.errorLargerAmount");
    }
    if (Number(amount) > Number(selectedTokenBalance)) {
      newErrors.amount = tCrossborder("withdraw.stasis.errorSufficianFunds");
    }
    if (!selectedBankAccount) {
      newErrors.bankAccount = tCrossborder("withdraw.stasis.errorChooseBankAccount");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = async () => {
    if (Number(amount) < 10) {
      setErrors({
        ...errors,
        amount: tCrossborder("withdraw.stasis.errorMinAmount"),
      });
      return;
    }

    if (validate() && account) {
      setIsLoading("processing");
      try {
        const withdrawalResponse = await axios.post(
          "/api/fiatTransaction/stasis/createWithdraw",
          {
            incoming_amount: Number(amount - amount * POOL_FEE),
            bankAccountId: selectedBankAccount?.uuid,
            preferredStableCoin: selectedToken
          }
        );

        const { order, transaction } = withdrawalResponse.data;
        const depositAddress = order.deposit_address;

        const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
          client,
          account,
          polygon,
          BigInt(Number(amount) * 10 ** selectedToken.decimals),
          selectedToken,
          depositAddress
        );

        await axios.patch(`/api/fiatTransaction/${transaction.id}`, {
          transactionHash: transactionHash,
        });

        setIsLoading("success");
      } catch (error) {
        console.error("Error handling send", error);
        setErrors({
          ...errors,
          send: tCrossborder("withdraw.stasis.errorTryLater"),
        });
        setIsLoading("normal");
      }
    }
  };

  const renderHeader = () => (
    <div className="flex w-full items-center mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
      {view !== "select" && (
        <button
          className="mr-4 text-gray-500 hover:text-gray-700 transition"
          onClick={() => setView("select")}
        >
          <IoArrowBack className="w-6 h-6" />
        </button>
      )}
      <div className="text-2xl font-bold leading-6 text-gray-900 flex-grow">
        {view === "add"
          ? tCrossborder("withdraw.stasis.newBankAccount")
          : tCrossborder("withdraw.stasis.payout")}
      </div>
    </div>
  );

  if (isLoading === "processing") {
    return (
      <div className="flex flex-col w-full max-w-4xl items-center justify-center p-4">
        {renderHeader()}
        <div className="flex items-center justify-center h-[30rem] mb-16 mt-4">
          <Loader />
        </div>
      </div>
    );
  }

  if (user?.stasisKYBStatus !== "approved") {
    return (
      <div className="flex flex-col w-full max-w-4xl items-center justify-center p-4">
        {renderHeader()}
        <KYCRequired />
      </div>
    );
  }

  if (isLoading === "success") {
    return (
      <div className="flex flex-col w-full max-w-4xl items-center justify-center p-4">
        {renderHeader()}
        <SuccessView />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-4xl items-center justify-center p-4">
      {renderHeader()}
      {view === "select" ? (
        <SelectBankAccount
          {...{
            amount,
            account,
            user,
            preferredStableCoin,
            setView,
            selectedToken,
            selectedTokenBalance,
            errors,
            setErrors,
            bankAccounts,
            setBankAccounts,
            selectedBankAccount,
            setSelectedBankAccount,
            isLoading,
            setIsLoading,
            handleSend
          }}
        />
      ) : view === "add" ? (
        <AddBankAccount
          {...{
            amount,
            account,
            user,
            preferredStableCoin,
            setView,
            selectedToken,
            selectedTokenBalance,
            errors,
            setErrors,
            bankAccounts,
            setBankAccounts,
            selectedBankAccount,
            setSelectedBankAccount,
            isLoading,
            setIsLoading,
            handleSend
          }}
        />
      ) : (
        <WithdrawView
          {...{
            amount,
            account,
            user,
            preferredStableCoin,
            setView,
            selectedToken,
            selectedTokenBalance,
            errors,
            setErrors,
            bankAccounts,
            setBankAccounts,
            selectedBankAccount,
            setSelectedBankAccount,
            isLoading,
            setIsLoading,
            handleSend
          }}
        />
      )}
    </div>
  );
} 