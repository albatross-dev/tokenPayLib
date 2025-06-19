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

interface BridgeModalProps {
  show: boolean;
  closeModal: () => void;
  token: SimpleToken;
  maxAmount: string | number;
  chain: Chain;
  spokePool: string;
  onStart: () => void;
  onFinish: (success: boolean) => void;
}

const POLYGON_CHAIN_ID = 137;

const BridgeModal: React.FC<BridgeModalProps> = ({
  show,
  closeModal,
  token,
  maxAmount,
  chain,
  spokePool,
  onStart,
  onFinish,
}) => {
  const [amount, setAmount] = useState<number>(Number(maxAmount) || 0);
  const [limits, setLimits] = useState<Limits | null>(null);
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const account = useActiveAccount();

  const { t } = useTranslation("common");

  useEffect(() => {
    setAmount((Number(maxAmount) || 0) / numberWithZeros(token?.decimals || 0));
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

    if (chain && token && amount) {
      if (POLYGON_CHAIN_ID !== chain?.id) {
        fetchLimitsAndQuoteData();
      }
    }
  }, [amount]);

  const fetchLimitsAndQuoteData = async (): Promise<void> => {
    const destinationChainId = POLYGON_CHAIN_ID;
    const tokenAddress = token?.contractAddress;
    const originChainId = chain?.id;

    if (!tokenAddress || !originChainId) {
      return;
    }

    try {
      const { limits: limitsData, quote: quoteData } =
        await fetchLimitsAndQuote(
          tokenAddress,
          originChainId,
          destinationChainId,
          amount,
          token.decimals
        );

      setLimits(limitsData);
      setQuote(quoteData);
    } catch (error) {
      sendErrorReport("BridgeModal - Error fetching data", error);
      console.error("Error fetching data:", error);
    }
  };

  const handleMaxClick = (): void => {
    setAmount((Number(maxAmount) || 0) / numberWithZeros(token?.decimals || 0));
  };

  const handleConfirmBridge = (): void => {
    handleBridge(amount * numberWithZeros(token?.decimals || 0));
    closeModal();
  };

  async function handleBridge(amount: number): Promise<void> {
    onStart();
    const tokenAddress = token?.contractAddress;
    const originChainId = chain?.id;
    const destinationChainId = POLYGON_CHAIN_ID;

    if (!tokenAddress || !originChainId || !quote || !limits) {
      console.error("Missing required data for bridge operation");
      return;
    }

    if (!account) {
      console.error("No account found");
      return;
    }

    let success = await acrossBridgeDeposit({
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
      spokePoolWrapper: spokePool, // Using spokePool as the wrapper for this component
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
                {t("enter_amount_transfer", { id: token?.id })}
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
                      numberWithZeros(token?.decimals || 0)}{" "}
                    {token?.id}
                  </p>
                  <p className="text-gray-700">
                    {t("maximum_short_term_amount")}{" "}
                    {limits.maxDepositShortDelay /
                      numberWithZeros(token?.decimals || 0)}{" "}
                    {token.id}
                  </p>
                  <p className="text-gray-700">
                    {t("maximum_amount")}{" "}
                    {limits.maxDeposit / numberWithZeros(token?.decimals || 0)}{" "}
                    {token.id}
                  </p>
                </div>
              )}

              {quote && quote?.status === 200 && (
                <div className="mt-4">
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
