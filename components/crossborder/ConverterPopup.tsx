import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { IoClose } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";

import { IoIosSwap } from "react-icons/io";
import { getContract, readContract } from "thirdweb";
import { encodePacked } from "thirdweb/utils";
import client from "@/utilities/thirdweb-client";
import { convertAnyToAnyDirect, uniswapAddresses } from "../../utilities/crypto/convertAnyToAny";
import QuoteV2Abi from "../../assets/quoteV2Abi.json";
import { SimpleToken } from "../../types/token.types";
import { formatCrypto } from "../../utilities/crypto/currencies";
import fetchBalance from "../../utilities/crypto/fetchBalance";
import { PATHS } from "../../utilities/crypto/getPath";
import numberWithZeros from "../../utilities/math/numberWithZeros";
import { STANDARD_STABLE_MAP } from "../../utilities/stableCoinsMaps";
import { useUhuConfig } from "../contexts/UhuConfigContext";
import { ConvertStateButtonState, ConvertStateButtonWide } from "../UI/ConvertStateButton";
import Maintenance from "../UI/Maintenance";

interface ConvertPopupProps {
  show: boolean;
  closeModal: () => void;
  token: SimpleToken;
  targetToken: SimpleToken;
  onSuccess: () => void;
  showSwapButton?: boolean;
}

const ConvertPopup: React.FC<ConvertPopupProps> = ({
  show,
  closeModal,
  token,
  targetToken,
  onSuccess,
  showSwapButton = false,
}) => {
  const { t } = useTranslation();
  const { t: tCrossborder } = useTranslation("crossborder");

  const activeChain = useActiveWalletChain();
  const account = useActiveAccount();
  const [balanceUpdate, setBalanceUpdate] = useState<boolean>(false);

  const [selectedTargetToken, setSelectedTargetToken] = useState<SimpleToken>(targetToken);
  const [selectedTargetTokenBalance, setSelectedTargetTokenBalance] = useState<bigint>(BigInt(0));

  const [selectedToken, setSelectedToken] = useState<SimpleToken>(token);
  const [selectedTokenBalance, setSelectedTokenBalance] = useState<bigint>(BigInt(0));
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [quote, setQuote] = useState<any>(null);
  const [inputError, setError] = useState<string>("");
  const [exchangeState, setExchangeState] = useState<ConvertStateButtonState>("normal");
  const [retryCounter, setRetryCounter] = useState<number>(0);

  const { maintenance } = useUhuConfig();

  useEffect(() => {
    async function update() {
      if (token && targetToken) {
        setSelectedToken(token);
        setSelectedTokenBalance(BigInt(0));
        setSelectedTargetToken(targetToken);
        setSelectedTargetTokenBalance(BigInt(0));
        setBalanceUpdate(true);
        await fetchBalances(token, targetToken);
        setBalanceUpdate(false);
      }
    }
    update();
    setQuote(null);
  }, [token, targetToken]);

  function swapTokens() {
    const temp = selectedToken;
    fetchBalances(selectedTargetToken, selectedToken);
    setSelectedToken(selectedTargetToken);
    setSelectedTargetToken(temp);
    setAmount(0);
  }

  useEffect(() => {
    async function fetchQuote() {
      if (!activeChain) {
        console.error("No active chain available");
        return;
      }

      if (!selectedToken || !selectedTargetToken || !amount) {
        console.error("Missing required parameters");
        return;
      }

      const contract = getContract({
        client,
        chain: activeChain,
        address: uniswapAddresses[activeChain.id].quote,
        abi: QuoteV2Abi as any,
      });

      const path = PATHS[activeChain.id][selectedToken.id.toUpperCase()][selectedTargetToken.id.toUpperCase()];

      const encodedPath = encodePacked(path[0], path[1]);

      const quote = await readContract({
        contract,
        method: "quoteExactInput",
        params: [encodedPath, BigInt(amount * numberWithZeros(selectedToken?.decimals || 1))],
      });
      setQuote(quote);
    }
    // Validate the amount and set error messages
    if (!amount || amount <= 0) {
      setError(t("greater_zero"));
    } else if (amount > (Number(selectedTokenBalance) || 1) / numberWithZeros(selectedToken?.decimals || 1)) {
      setError(
        `${t("cannot_exceed")} ${(Number(selectedTokenBalance) || 1) / numberWithZeros(selectedToken?.decimals || 1)}.`
      );
    } else {
      if (selectedToken && selectedTargetToken && amount && activeChain) {
        fetchQuote();
      }
      setError(""); // Clear error if valid
    }
  }, [selectedToken, selectedTargetToken, amount, activeChain]);

  // fetch all necessary balances
  async function fetchBalances(selectedToken: SimpleToken, selectedTargetToken: SimpleToken) {
    if (!account?.address || !activeChain) return;
    setBalanceUpdate(true);

    if (selectedToken) {
      const balance = await fetchBalance(
        client,
        activeChain,
        selectedToken.contractAddress,
        selectedToken.abi,
        account.address
      );
      setSelectedTokenBalance(balance);
    }

    if (selectedTargetToken) {
      const balance = await fetchBalance(
        client,
        activeChain,
        selectedTargetToken.contractAddress,
        selectedTargetToken.abi,
        account.address
      );
      setSelectedTargetTokenBalance(balance);
    }

    setBalanceUpdate(false);
  }

  const handleMaxClick = () => {
    setAmount((Number(selectedTokenBalance) || 1) / numberWithZeros(selectedToken?.decimals || 1));
  };

  const handleConfirmExchange = () => {
    if (amount) {
      handleExchangeAny(amount * numberWithZeros(selectedToken?.decimals || 1));
    }
  };

  // handle exchanges from the exchange function
  async function handleExchangeAny(amount: number) {
    setExchangeState("processing");
    await convertAnyToAnyDirect(
      selectedToken,
      amount,
      account,
      () => {
        fetchBalances(selectedToken, selectedToken);
        setAmount(0);
        onSuccess();
        closeModal();
        setExchangeState("normal");
      },
      (error) => {
        setRetryCounter(retryCounter + 1);
        if (retryCounter < 3) {
          handleExchangeAny(amount);
        } else {
          console.error("Error converting to EUROE", error);
          setExchangeState("error");
          setRetryCounter(0);
          setTimeout(() => {
            setExchangeState("normal");
          }, 4000);
        }
      },
      activeChain,
      selectedTargetToken
    );
  }

  return (
    <Transition appear show={!!show} as={Fragment}>
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
            <DialogPanel className="relative max-w-xl w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              {maintenance !== "loading" && maintenance && maintenance.common.crossborder && <Maintenance />}
              <DialogTitle
                as="h3"
                className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900"
              >
                <div className="flex items-center gap-2">
                  {tCrossborder("convertPopup.convert")}{" "}
                  <span className="font-bold">
                    {STANDARD_STABLE_MAP[selectedToken?.name]
                      ? STANDARD_STABLE_MAP[selectedToken?.name]?.symbol
                      : selectedToken?.name}
                  </span>{" "}
                  {tCrossborder("convertPopup.to")}{" "}
                  <span className="font-bold">{STANDARD_STABLE_MAP[selectedTargetToken?.name]?.symbol}</span>
                  {showSwapButton && (
                    <IoIosSwap
                      className="w-6 h-6 p-1 cursor-pointer bg-uhuBlue rounded-full text-white flex items-center justify-center"
                      onClick={swapTokens}
                    />
                  )}
                </div>
                <IoClose className="w-5 h-5 cursor-pointer" onClick={closeModal} />
              </DialogTitle>

              <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
                <div>{tCrossborder("convertPopup.howMuch")}</div>
                <div
                  className="flex gap-2 bg-gray-200 items-center rounded-full cursor-pointer text-sm px-[6px] py-[2px]"
                  onClick={async () => {
                    setBalanceUpdate(true);
                    await fetchBalances(selectedToken, selectedTargetToken);
                    setBalanceUpdate(false);
                  }}
                >
                  <div className="text-[11px]">{tCrossborder("convertPopup.reloadRate")}</div>
                  <RxUpdate className={`w-4 h-4 ${balanceUpdate && "animate-spin"}`} />
                </div>
              </div>
              <input
                type="number"
                className={`mt-2 p-2 w-full border rounded-md ${!selectedToken && "border-gray-300"}`}
                value={amount}
                disabled={!selectedToken}
                onChange={(e) => setAmount(Number(e.target.value))}
                max={Number(selectedTokenBalance)}
                min={0}
              />

              {inputError && <span className="text-red-500 text-sm">{inputError}</span>}

              <div className="mt-4 flex justify-between items-center gap-2">
                <div>{t("current_balance_is")}</div>
                <div>{formatCrypto(Number(selectedTokenBalance || BigInt(0)), selectedToken?.decimals || 18, 6)}</div>
                <div>
                  {" "}
                  {STANDARD_STABLE_MAP[selectedToken?.name]
                    ? STANDARD_STABLE_MAP[selectedToken?.name]?.symbol
                    : selectedToken?.name}
                </div>
                <div className="flex-1" />
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={handleMaxClick}
                >
                  {t("max")}
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end">
                <div className="flex flex-col mt-4">
                  <div className="text-sm text-gray-500">{t("you_will_receive_roughly")}</div>
                  <div className="text-5xl font-bold flex gap-2 items-end">
                    {(
                      Number(quote ? quote[0] : 0) / numberWithZeros(selectedTargetToken?.decimals || 1) -
                      (Number(quote ? quote[0] : 0) / numberWithZeros(selectedTargetToken?.decimals || 1)) * 0.004
                    ).toFixed(6)}
                    <span className="text-base">
                      {STANDARD_STABLE_MAP[selectedTargetToken?.name]
                        ? STANDARD_STABLE_MAP[selectedTargetToken?.name]?.symbol
                        : selectedTargetToken?.name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("your_current_balance_is")}{" "}
                    {Number(selectedTargetTokenBalance || BigInt(0)) /
                      numberWithZeros(selectedTargetToken?.decimals || 1)}{" "}
                    <span className="text-base">
                      {STANDARD_STABLE_MAP[selectedTargetToken?.name]
                        ? STANDARD_STABLE_MAP[selectedTargetToken?.name]?.symbol
                        : selectedTargetToken?.name}
                    </span>
                  </div>
                </div>
                <div className="self-end">
                  <ConvertStateButtonWide
                    enabled={Boolean(selectedTargetToken && selectedToken && amount && !inputError)}
                    state={exchangeState}
                    onClick={handleConfirmExchange}
                  >
                    {t("convert_now")}
                  </ConvertStateButtonWide>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConvertPopup;
