import React, { useState, Fragment, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  Transition,
} from "@headlessui/react";
import { FiAlertCircle } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { useActiveAccount } from "thirdweb/react";
import { Chain } from "thirdweb";
import numberWithZeros from "../../utilities/math/numberWithZeros";
import { sendErrorReport } from "../../../context/UserContext";
import {
  QuoteData,
  Limits,
  fetchLimitsAndQuote,
  acrossBridgeDeposit,
} from "../../utilities/crypto/bridgeUtils";
import { SimpleToken } from "../../types/token.types";
import Loader from "../UI/Loader";
import MiniLoader from "../UI/MiniLoader";

interface BridgeModalUniversalProps {
  show: boolean;
  closeModal: () => void;
  token: SimpleToken;
  maxAmount: string | number;
  chain: Chain;
  spokePool: string;
  spokePoolWrapper?: string;
  onStart: () => void;
  onFinish: (success: boolean) => void;
  destinationChainId: number;
}

const BridgeModalUniversal = ({
  show,
  closeModal,
  token,
  maxAmount,
  chain,
  spokePool,
  spokePoolWrapper,
  onStart,
  onFinish,
  destinationChainId,
}: BridgeModalUniversalProps) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [limits, setLimits] = useState<Limits | null>(null);
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [inputError, setInputError] = useState("");
  const account = useActiveAccount();

  const [loading, setLoading] = useState(false);

  console.log("spokePool", spokePool);

  const { t } = useTranslation("common");

  useEffect(() => {
    if (typeof maxAmount === "number") {
      setAmount(
        (Number(maxAmount) || 0) / numberWithZeros(token?.decimals || 0)
      );
    }
  }, [maxAmount]);

  useEffect(() => {
    // Initialize with a valid QuoteData object
    setQuote({
      totalRelayFee: { total: 0 },
      timestamp: 0,
      exclusiveRelayer: "",
      exclusivityDeadline: 0,
      status: 0,
    });

    if (chain && token && amount && destinationChainId) {
      fetchLimitsAndQuoteData();
    }
  }, [amount, destinationChainId]);

  // Validate input amount
  useEffect(() => {
    if (amount === null) {
      setInputError("");
      return;
    }

    const maxAllowed =
      (Number(maxAmount) || 0) / numberWithZeros(token?.decimals || 0);
    console.log("Amount:", amount, "Max allowed:", maxAllowed);

    if (amount <= 0) {
      setInputError(t("greater_zero"));
    } else if (amount > maxAllowed) {
      setInputError(t("cannot_exceed") + " " + maxAllowed + " " + token?.id);
    } else {
      setInputError("");
    }
  }, [amount, maxAmount, token]);

  /**
   * Fetches the limits and quote data for a given token and chain
   */
  const fetchLimitsAndQuoteData = async () => {
    const tokenAddress = token?.contractAddress;
    const originChainId = chain?.id;

    if (!tokenAddress || !originChainId || amount === null) {
      return;
    }

    try {
      setLoading(true);
      const { limits: limitsData, quote: quoteData } =
        await fetchLimitsAndQuote(
          tokenAddress,
          originChainId,
          destinationChainId,
          amount,
          token.decimals
        );
      setLoading(false);
      setLimits(limitsData);
      setQuote(quoteData);
    } catch (error) {
      sendErrorReport("BridgeModalUniversal - Error fetching data", error);
      setQuote({
        status: 400,
        code: "ERROR",
        totalRelayFee: { total: 0 },
        timestamp: 0,
        exclusiveRelayer: "",
        exclusivityDeadline: 0,
      });
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  /**
   * Handles the click event for the "Max" button
   */
  const handleMaxClick = () => {
    setAmount((Number(maxAmount) || 0) / numberWithZeros(token?.decimals || 0));
  };

  /**
   * Handles the click event for the "Confirm" button
   */
  const handleConfirmBridge = () => {
    if (amount === null) return;

    handleBridge(amount * numberWithZeros(token?.decimals || 0));
    closeModal();
  };

  /**
   * Handles the bridge operation
   */
  async function handleBridge(amount: number): Promise<void> {
    onStart();
    const tokenAddress = token?.contractAddress;
    const originChainId = chain?.id;

    if (!tokenAddress || !originChainId || !quote || !limits) {
      console.error("Missing required data for bridge operation");
      return;
    }

    const success = await acrossBridgeDeposit({
      tokenAddress,
      originChainId,
      destinationChainId,
      amount,
      account,
      token,
      chain,
      quoteData: quote,
      limits,
      spokePool,
      spokePoolWrapper,
    });

    onFinish(success);
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
                {`${t("transfer_of")} ${token?.id}`}
              </DialogTitle>

              <div className="flex flex-row gap-4 bg-red-100 text-red-600 my-4 rounded p-4 items-center">
                <FiAlertCircle className="w-6 h-6 "></FiAlertCircle>
                <div className="flex-1 font-bold">
                  {t("after_transaction_note")}
                </div>
              </div>

              <p className="text-gray-700">
                {t("enter_amount_transfer", { symbol: token?.id })}
              </p>

              <input
                type="number"
                className="mt-2 p-2 w-full border rounded-md"
                value={amount === null ? "" : amount}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? null : Number(e.target.value);
                  setAmount(value);
                }}
                min={0}
              />

              {inputError && (
                <div className="mt-1 text-red-500">{inputError}</div>
              )}

              {quote?.status === 400 && quote?.code === "AMOUNT_TOO_LOW" && (
                <div className="mt-1 text-red-500">
                  {t("bridge_amount_to_low")}
                </div>
              )}

              <div className="rounded bg-gray-100 p-4 mt-4 flex flex-col gap-4">
                {limits && !loading && (
                  <div className="">
                    <p className="text-gray-700">
                      {t("maximum_instant_amount")}{" "}
                      {limits.maxDepositInstant /
                        numberWithZeros(token?.decimals || 0)}{" "}
                      {token?.id}
                    </p>
                    <p className="text-gray-700">
                      {t("maximum_short_term_amount")}{" "}
                      {limits.maxDepositShortDelay /
                        numberWithZeros(token?.decimals || 0)}{" "}
                      {token.id}
                    </p>
                  </div>
                )}

                {quote && quote?.status === 200 && (
                  <div className="">
                    <p className="text-gray-700">
                      {t("rate")}{" "}
                      {quote.totalRelayFee.total /
                        numberWithZeros(token?.decimals || 0)}{" "}
                      {token.id}
                    </p>
                    <p className="text-gray-700">
                      {t("time_of_exchange_rate")}{" "}
                      {new Date(quote.timestamp * 1000).toLocaleString()}
                    </p>
                  </div>
                )}

                {quote && quote?.status !== 200 && (
                  <div className="mt-4 text-red-500">{quote?.code}</div>
                )}

                {loading && (
                  <div className="">
                    <MiniLoader />
                  </div>
                )}
              </div>

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
                  disabled={quote?.status !== 200 || inputError !== ""}
                  className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                 ${
                   quote?.status !== 200 || inputError !== ""
                     ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                     : "bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500"
                 }`}
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

export default BridgeModalUniversal;
