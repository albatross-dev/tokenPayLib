import React, { useState, Fragment, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  Transition,
} from "@headlessui/react";
import axios from "axios";
import numberWithZeros from "@/tokenPayLib/utilities/math/numberWithZeros";

// crypto imports
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { client } from "@/pages/_app";

import { useActiveAccount } from "thirdweb/react";
import currencies from "@/tokenPayLib/utilities/crypto/currencies";
import { FiAlertCircle } from "react-icons/fi";
import { useTranslation } from "next-i18next";

// Define the ABI for the depositV3 function
const SpokePoolAbi = [
  {
    inputs: [
      { internalType: "address", name: "depositor", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "address", name: "inputToken", type: "address" },
      { internalType: "address", name: "outputToken", type: "address" },
      { internalType: "uint256", name: "inputAmount", type: "uint256" },
      { internalType: "uint256", name: "outputAmount", type: "uint256" },
      { internalType: "uint256", name: "destinationChainId", type: "uint256" },
      { internalType: "address", name: "exclusiveRelayer", type: "address" },
      { internalType: "uint32", name: "quoteTimestamp", type: "uint32" },
      { internalType: "uint32", name: "fillDeadline", type: "uint32" },
      { internalType: "uint32", name: "exclusivityDeadline", type: "uint32" },
      { internalType: "bytes", name: "message", type: "bytes" },
    ],
    name: "depositV3",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
];

// Approve tokens
async function approveTokens(
  spokePoolAddress,
  tokenContractAddress,
  chain,
  amount,
  account
) {
  const tokenContract = getContract({
    client: client,
    chain: chain,
    address: tokenContractAddress,
    abi: currencies["USDC"].abi,
  });

  const approveCall = prepareContractCall({
    contract: tokenContract,
    method: "approve",
    params: [spokePoolAddress, amount],
  });

  console.log("approveCall", approveCall);

  let res = await sendAndConfirmTransaction({
    account,
    transaction: approveCall,
  });

  return res;
}

// Initiate the deposit
async function deposit(
  spokePoolAddress,
  depositor,
  recipient,
  inputToken,
  outputToken,
  inputAmount,
  outputAmount,
  destinationChainId,
  exclusiveRelayer,
  quoteTimestamp,
  fillDeadline,
  exclusivityDeadline,
  account,
  chain
) {
  const spokePoolContract = getContract({
    client: client,
    chain: chain, // Change this to the correct chain
    address: spokePoolAddress,
    abi: SpokePoolAbi,
  });

  console.log("spokePoolContract", spokePoolContract);

  const depositCall = prepareContractCall({
    contract: spokePoolContract,
    method: "depositV3",
    params: [
      depositor,
      recipient,
      inputToken,
      outputToken,
      inputAmount,
      outputAmount,
      destinationChainId,
      exclusiveRelayer,
      quoteTimestamp,
      fillDeadline,
      exclusivityDeadline,
      "0x", // Message
    ],
  });

  await sendAndConfirmTransaction({
    account,
    transaction: depositCall,
  });
}

// Complete flow
async function acrossBridgeDeposit(
  tokenAddress,
  originChainId,
  destinationChainId,
  amount,
  account,
  token,
  chain,
  quoteData,
  limits,
  spokePool
) {
  try {
    // Step 1: Get a Quote
    const { totalRelayFee, timestamp } = quoteData;

    // Step 2: Check Limits
    const { maxDepositInstant, maxDepositShortDelay, maxDeposit } = limits;

    if (amount > maxDeposit) {
      throw new Error("Deposit amount exceeds maximum allowed limit.");
    }

    // Step 3: Approve Tokens
    const spokePoolAddress = spokePool; // Replace with actual SpokePool address
    let res = await approveTokens(
      spokePoolAddress,
      tokenAddress,
      chain,
      amount,
      account
    );
    console.log("res", res);
    console.log("totalRelayFee.total", totalRelayFee.total);
    // Step 4: Initiate Deposit
    const depositor = account.address;
    const recipient = account.address;
    const outputToken = "0x0000000000000000000000000000000000000000"; // Auto-resolve the destination equivalent token
    const outputAmount = amount - totalRelayFee.total;
    const fillDeadline = Math.floor(Date.now() / 1000) + 18000; // 5 hours
    const exclusiveRelayer = quoteData.exclusiveRelayer;
    const exclusivityDeadline = quoteData.exclusivityDeadline;

    console.log(
      "deposit",
      "spokePoolAddress",
      spokePoolAddress,
      "depositor",
      depositor,
      "recipient",
      recipient,
      "tokenAddress",
      tokenAddress,
      "outputToken",
      outputToken,
      "amount",
      amount,
      "outputAmount",
      outputAmount,
      "destinationChainId",
      destinationChainId,
      "exclusiveRelayer",
      exclusiveRelayer,
      "timestamp",
      timestamp,
      "fillDeadline",
      fillDeadline,
      "exclusivityDeadline",
      exclusivityDeadline,
      "account",
      account
    );

    await deposit(
      spokePoolAddress,
      depositor,
      recipient,
      tokenAddress,
      outputToken,
      amount,
      outputAmount,
      destinationChainId,
      exclusiveRelayer,
      timestamp,
      fillDeadline,
      exclusivityDeadline,
      account,
      chain
    );

    console.log("Deposit successful!");
  } catch (error) {
    console.error("Error in acrossBridgeDeposit:", error);
  }
}
const POLYGON_CHAIN_ID = 137;

const BridgeModal = ({
  show,
  closeModal,
  token,
  maxAmount,
  chain,
  spokePool,
  onStart,
  onFinish,
}) => {
  const [amount, setAmount] = useState(Number(maxAmount) || 1);
  const [limits, setLimits] = useState(null);
  const [quote, setQuote] = useState(null);
  const account = useActiveAccount();

  const {t} = useTranslation("common");

  useEffect(() => {
    setAmount(
      (Number(maxAmount) || 1) / numberWithZeros(token?.contract.decimals || 1)
    );
  }, [maxAmount]);

  useEffect(() => {
    if (chain && token && amount) {
      if (POLYGON_CHAIN_ID !== chain?.id) {
        fetchLimitsAndQuote();
      }
    }
  }, [amount]);

  const fetchLimitsAndQuote = async () => {
    const destinationChainId = POLYGON_CHAIN_ID; // Replace with the actual destination chain ID
    const tokenAddress = token?.contract.contractAddress;
    const originChainId = chain?.id;
    const rawAmount = (
      amount * numberWithZeros(token?.contract.decimals || 1)
    ).toString();

    try {
      const limitsResponse = await axios.get(`/api/limits`, {
        params: { token: tokenAddress, originChainId, destinationChainId },
      });

      setLimits(limitsResponse.data);

      const quoteResponse = await axios.get(`/api/quotes`, {
        params: {
          token: tokenAddress,
          originChainId,
          destinationChainId,
          amount: rawAmount,
        },
      });

      setQuote(quoteResponse.data);
    } catch (error) {
      console.error("Error fetching limits and quote:", error);
    }
  };

  const handleMaxClick = () => {
    setAmount(
      (Number(maxAmount) || 1) / numberWithZeros(token?.contract.decimals || 1)
    );
  };

  const handleConfirmBridge = () => {
    handleBridge(
      amount * numberWithZeros(token?.contract.decimals || 1),
      quote
    );
    closeModal();
  };

  async function handleBridge(amount) {
    onStart();
    const tokenAddress = token?.contract.contractAddress;
    const originChainId = chain?.id;
    const destinationChainId = POLYGON_CHAIN_ID; // Replace with the actual destination chain ID
    console.log(
      "accrossBridgeDeposit",
      tokenAddress,
      originChainId,
      destinationChainId,
      amount,
      account,
      token
    );
    await acrossBridgeDeposit(
      tokenAddress,
      originChainId,
      destinationChainId,
      amount,
      account,
      token,
      chain,
      quote,
      limits,
      spokePool
    );
    onFinish();
  }

  return (
    <Transition appear show={show ? true : false} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="max-w-xl w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {`${t("transfer_of")} ${token?.symbol}`}
              </DialogTitle>

              <div className="flex flex-row gap-4 bg-red-100 text-red-600 my-4 rounded p-4 items-center">
                <FiAlertCircle className="w-6 h-6 "></FiAlertCircle>
                <div className="flex-1 font-bold">
                  {t("after_transaction_note")}
                </div>
              </div>

              <p className="text-gray-700">
                {t("enter_amount_transfer", { symbol: token?.symbol })}
              </p>

              <input
                type="number"
                className="mt-2 p-2 w-full border rounded-md"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                max={maxAmount}
              />

              {limits && (
                <div className="mt-4">
                  <p className="text-gray-700">
                    {t("maximum_instant_amount")}{" "}
                    {limits.maxDepositInstant /
                      numberWithZeros(token?.contract.decimals || 1)}{" "}
                    {token?.symbol}
                  </p>
                  <p className="text-gray-700">
                    {t("maximum_short_term_amount")}{" "}
                    {limits.maxDepositShortDelay /
                      numberWithZeros(token?.contract.decimals || 1)}{" "}
                    {token.symbol}
                  </p>
                  <p className="text-gray-700">
                    {t("maximum_amount")}{" "}
                    {limits.maxDeposit /
                      numberWithZeros(token?.contract.decimals || 1)}{" "}
                    {token.symbol}
                  </p>
                </div>
              )}

              {quote && (
                <div className="mt-4">
                  <p className="text-gray-700">
                    {t("rate")}{" "}
                    {quote.totalRelayFee.total /
                      numberWithZeros(token?.contract.decimals || 1)}{" "}
                    {token.symbol}
                  </p>
                  <p className="text-gray-700">
                    {t("time_of_exchange_rate")}{" "}
                    {new Date(quote.timestamp * 1000).toLocaleString()}
                  </p>
                </div>
              )}

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={handleMaxClick}
                >
                  {t("max")}
                </button>
                <button
                  type="button"
                  className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                  onClick={handleConfirmBridge}
                >
                  {t("confirm")}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BridgeModal;
