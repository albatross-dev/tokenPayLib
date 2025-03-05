import React, { useState, Fragment, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  Transition,
} from "@headlessui/react";
import numberWithZeros from "@/tokenPayLib/utilities/math/numberWithZeros";
import { useTranslation } from "react-i18next";
import { FIAT_INFO_MAP } from "./FiatReceivingSelector";
import { STANDARD_STABLE_MAP } from "./CurrencySelector";
import { IoClose } from "react-icons/io5";
import currencies from "@/utilities/currencies";
import { formatCrypto } from "@/tokenPayLib/utilities/crypto/currencies";
import { RxUpdate } from "react-icons/rx";
import {
  convertAnyToAnyDirect,
  uniswapAddresses,
} from "@/tokenPayLib/utilities/crypto/convertAnyToAny";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { ConvertStateButtonWide } from "@/tokenPayLib/components/UI/ConvertStateButton";
import tokenyByChain from "@/tokenPayLib/utilities/crypto/tokenByChain";
import { client } from "@/pages/_app";
import fetchBalance from "@/tokenPayLib/utilities/crypto/fetchBalance";
import { getContract, readContract } from "thirdweb";
import { PATHS } from "@/tokenPayLib/utilities/crypto/getPath";
import QuoteV2Abi from "@/tokenPayLib/assets/quoteV2Abi.json";
import { encodePacked } from "thirdweb/utils";
import { IoIosSwap } from "react-icons/io";

const ConvertPopup = ({ show, closeModal, token, targetToken, onSuccess, showSwapButton = false }) => {
  const { t } = useTranslation();

  const activeChain = useActiveWalletChain();
  const account = useActiveAccount();
  const [balanceUpdate, setBalanceUpdate] = useState(false);

  const [selectedTargetToken, setSelectedTargetToken] = useState(targetToken);
  const [selectedTargetTokenBalance, setSelectedTargetTokenBalance] =
    useState(0);

  const [selectedToken, setSelectedToken] = useState(token);
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(0);
  const [amount, setAmount] = useState();
  const [quote, setQuote] = useState(null);
  const [inputError, setError] = useState("");
  const [exchangeState, setExchangeState] = useState("normal");

  const [retryCounter, setRetryCounter] = useState(0);

  useEffect(() => {
    async function update() {
      console.log("update token", token)
      if (token && targetToken) {
        setSelectedToken(token);
        setSelectedTokenBalance(0);
        setSelectedTargetToken(targetToken);
        setSelectedTargetTokenBalance(0);
        setBalanceUpdate(true);
        await fetchBalances(token,targetToken);
        setBalanceUpdate(false);
      }
    }
    update();
    setQuote(null);
  }, [token, targetToken]);

  function swapTokens(){
    const temp = selectedToken;
    fetchBalances(selectedTargetToken, selectedToken);
    setSelectedToken(selectedTargetToken);
    setSelectedTargetToken(temp);
    setAmount(0);
    setQuote(null);
  }

  useEffect(() => {
    async function fetchQuote() {
      console.log("fetchQuote", selectedToken, selectedTargetToken, amount);
      let contract = getContract({
        client: client,
        chain: activeChain,
        address: uniswapAddresses[activeChain.id].quote,
        abi: QuoteV2Abi,
      });

      const path =
        PATHS[activeChain.id][
          (selectedToken.id || selectedToken.symbol).toUpperCase()
        ][selectedTargetToken.id.toUpperCase()];

      const encodedPath = encodePacked(path[0], path[1]);

      const quote = await readContract({
        contract: contract,
        method: "quoteExactInput",
        params: [
          encodedPath,
          BigInt(amount * numberWithZeros(selectedToken?.decimals || 1)),
        ],
      });
      setQuote(quote);
    }
    // Validate the amount and set error messages
    if (amount <= 0) {
      setError(t("greater_zero"));
    } else if (
      amount >
      (Number(selectedTokenBalance) || 1) /
        numberWithZeros(selectedToken?.decimals || 1)
    ) {
      setError(
        `${t("cannot_exceed")} ${
          (Number(selectedTokenBalance) || 1) /
          numberWithZeros(selectedToken?.decimals || 1)
        }.`
      );
    } else {
      if (selectedToken && selectedTargetToken && amount) {
        fetchQuote();
      }
      setError(""); // Clear error if valid
    }
  }, [selectedToken, selectedTargetToken, amount]);

  // fetch all necessary balances
  async function fetchBalances(selectedToken,selectedTargetToken) {
    console.log(
      "fetchBalances",
      account,
      activeChain,
      selectedToken,
      selectedTargetToken
    );
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
    setAmount(
      (Number(selectedTokenBalance) || 1) /
        numberWithZeros(selectedToken?.decimals || 1)
    );
  };

  const handleConfirmExchange = () => {
    handleExchangeAny(amount * numberWithZeros(selectedToken?.decimals || 1));
  };

  // handle exchanges from the exchange function
  async function handleExchangeAny(amount) {
    setExchangeState("processing");
    await convertAnyToAnyDirect(
      selectedToken,
      amount,
      account,
      () => {
        fetchBalances(selectedToken, selectedToken);
        setAmount(0)
        onSuccess();
        closeModal();
        setExchangeState("normal");
      },
      (error) => {
        setRetryCounter(retryCounter + 1);
        if(retryCounter < 3) {
          handleExchangeAny(amount);
          console.log("retrying exchange");
        }else{
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
                className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900"
              >
                <div className="flex items-center gap-2">
                  Konvertiere{" "}
                  <span className="font-bold">
                    {STANDARD_STABLE_MAP[selectedToken?.name]
                      ? STANDARD_STABLE_MAP[selectedToken?.name]?.symbol
                      : selectedToken?.name}
                  </span>{" "}
                  zu{" "}
                  <span className="font-bold">
                    {STANDARD_STABLE_MAP[selectedTargetToken?.name]?.symbol}
                  </span>
                  {showSwapButton && <IoIosSwap className="w-6 h-6 p-1 cursor-pointer bg-uhuBlue rounded-full text-white flex items-center justify-center" onClick={swapTokens}/>}
             
                </div>
                <IoClose
                  className="w-5 h-5 cursor-pointer"
                  onClick={closeModal}
                />
              </DialogTitle>

              <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
                <div>Wie viel wollen Sie umwandeln?</div>
                <div  className="flex gap-2 bg-gray-200 items-center rounded-full cursor-pointer text-sm px-[6px] py-[2px]"  onClick={async () => {
                    setBalanceUpdate(true);
                    await fetchBalances(selectedToken, selectedTargetToken);
                    setBalanceUpdate(false);
                  }}>
                <div className="text-[11px]">Wechselkurs aktualisieren</div>
                <RxUpdate
                  className={`w-4 h-4 ${balanceUpdate && "animate-spin"}`}
                
                />
                </div>
              </div>
              <input
                type="number"
                className={`mt-2 p-2 w-full border rounded-md ${
                  !selectedToken && "border-gray-300"
                }`}
                value={amount}
                disabled={!selectedToken}
                onChange={(e) => setAmount(e.target.value)}
                max={selectedTokenBalance}
                min={0}
              />

              {inputError && (
                <span className="text-red-500 text-sm">{inputError}</span>
              )}

              <div className="mt-4 flex justify-between items-center gap-2">
                <div>{t("current_balance_is")}</div>
                <div>
                  {formatCrypto(
                    selectedTokenBalance || 0,
                    selectedToken?.decimals || 18,
                    6
                  )}
                </div>
                <div>  {STANDARD_STABLE_MAP[selectedToken?.name]
                        ? STANDARD_STABLE_MAP[selectedToken?.name]?.icon
                        : selectedToken?.name}
              
                </div>
                <div className="flex-1"></div>
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
                  <div className="text-sm text-gray-500">
                    {t("you_will_receive_roughly")}
                  </div>
                  <div className="text-5xl font-bold flex gap-2 items-end">
                    {(Number(quote ? quote[0] : 0) /
                      numberWithZeros(selectedTargetToken?.decimals || 1) -
                      (Number(quote ? quote[0] : 0) /
                        numberWithZeros(selectedTargetToken?.decimals || 1)) *
                        0.004).toFixed(6)}
                    <span className="text-base">
                      {STANDARD_STABLE_MAP[selectedTargetToken?.name]
                        ? STANDARD_STABLE_MAP[selectedTargetToken?.name]?.icon
                        : selectedTargetToken?.name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("your_current_balance_is")}{" "}
                    {Number(selectedTargetTokenBalance || 0) /
                      numberWithZeros(selectedTargetToken?.decimals || 1)}{" "}
                    <span className="text-base">
                      {STANDARD_STABLE_MAP[selectedTargetToken?.name]
                        ? STANDARD_STABLE_MAP[selectedTargetToken?.name]?.icon
                        : selectedTargetToken?.name}
                    </span>
                  </div>
                </div>
                <div className="self-end">
                  <ConvertStateButtonWide
                    enabled={
                      selectedTargetToken &&
                      selectedToken &&
                      amount &&
                      !inputError
                    }
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
