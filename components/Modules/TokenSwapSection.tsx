import { useTranslation } from "react-i18next";
import TokenSelector from "../Forms/TokenSelector";
import ExchangeModal from "../../components/Modals/ExchangeModal";
import fetchBalance from "../../utilities/crypto/fetchBalance";
import tokenyByChain from "../../utilities/crypto/tokenByChain";

import { PATHS } from "../../utilities/crypto/getPath";
import numberWithZeros from "../../utilities/math/numberWithZeros";
import { ConvertStateButtonWide } from "../../components/UI/ConvertStateButton";

import { client } from "../../../pages/_app";
import { getContract, readContract } from "thirdweb";
import QuoteV2Abi from "../../assets/quoteV2Abi.json";
import { encodePacked } from "thirdweb/utils";

import {
  useActiveWalletChain,
  useActiveAccount,
} from "thirdweb/react";

import {
  formatCrypto,
  TokensByChainId,
} from "../../utilities/crypto/currencies";
import { RxUpdate } from "react-icons/rx";
import convertAnyToAny, {
  convertAnyToAnyDirect,
  uniswapAddresses,
  uniswapAddressesPublic
} from "../../utilities/crypto/convertAnyToAny";
import { useEffect, useState } from "react";
import axios from "axios";
import { arbitrum, avalanche, base, ethereum, optimism, polygon } from "thirdweb/chains";
import React from "react";
import { MODAL_TYPE_SUCCESS } from "../Modals/UniversalModal";
import UniversalModal from "../Modals/UniversalModal";
import ChainSelector from "../Forms/ChainSelector";
import { UniswapPoolsPolygon } from "../../types/payload-types";
import { ExchangeType } from "../../utilities/exchangeTypes";

const exchangeType: ExchangeType = process.env.NEXT_PUBLIC_EXCHANGE_TYPE as ExchangeType;

let retryCounterAny = 0;
let retryCounter = 0;

const chainIdSlugDictionary = {
  [ethereum.id]: "uniswapPoolsEthereum",
  [polygon.id]: "uniswapPoolsPolygon",
  [optimism.id]: "uniswapPoolsOptimism",
  [avalanche.id]: "uniswapPoolsAvalanche",
  [arbitrum.id]: "uniswapPoolsArbitrum",
  [base.id]: "uniswapPoolsBase",
}

let oldActiveChainId: number;

type exchangeStateType = "normal" | "processing" | "error";

export default function TokenSwapSection({ origin, target, max, preAmount }) {
  const { t } = useTranslation("common");
  const activeChain = useActiveWalletChain();
  const account = useActiveAccount();

  const [balances, setBalances] = useState({});
  const [balanceUpdate, setBalanceUpdate] = useState<boolean>(false);
  const [exchangeState, setExchangeState] = useState<exchangeStateType>("normal");

  const [loading, setLoading] = useState<Record<string, string>>({});

  // exchange
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(null);
  const [originTokens, setOriginTokens] = useState({});
  const [targetTokens, setTargetTokens] = useState({});
  const [selectedTargetToken, setSelectedTargetToken] = useState(null);
  const [selectedTargetTokenBalance, setSelectedTargetTokenBalance] =
    useState<bigint | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [quote, setQuote] = useState<bigint | null>(null);
  const [showExchangeAnyModal, setShowExchangeAnyModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [inputError, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [paths, setPaths] = useState(null);

  async function setMaxAmountImmediately(ot) {
    const balance = await fetchBalance(
      client,
      activeChain,
      ot.contractAddress,
      ot.abi,
      account.address
    );

    setSelectedTokenBalance(balance);

    console.log("balance", balance);

    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 100));

    setAmount((Number(balance) || 1) / numberWithZeros(ot?.decimals || 1));
  }

  async function fetchPaths() {
    // fetch paths from backend
    console.log("fetching paths", activeChain.name);
    try {
      const pathsRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/globals/${chainIdSlugDictionary[activeChain.id]}`
      );

      const paths: UniswapPoolsPolygon = pathsRes.data;
      console.log("paths", paths);
      setPaths(paths)
    } catch (e) {
      console.error("Error fetching paths", e);
      return;
    }
    
  }

  useEffect(() => {
    if (origin) {
      const ot = getOriginTokens();
      setSelectedToken(ot[origin]);
      const tt = processTargetTokens(ot[origin]);
      console.log("tt", tt);
      console.log("target", target);
      if (target) {
        console.log("target", target, tt[target]);
        setSelectedTargetToken(tt[target]);
      }

      if (max) {
        setMaxAmountImmediately(ot[origin]);
      }

      if (preAmount) {
        setAmount(preAmount);
      }
    }
  }, [origin, target, max, preAmount]);

  useEffect(() => {
    async function fetchQuote() {
      let contract = getContract({
        client: client,
        chain: activeChain,
        address: (exchangeType === "internal"
          ? uniswapAddresses
          : uniswapAddressesPublic)[activeChain.id].quote,
        abi: QuoteV2Abi,
      });

      const path =
        PATHS[activeChain.id][
          (selectedToken.id || selectedToken.symbol).toUpperCase()
        ][selectedTargetToken.id.toUpperCase()];

      const encodedPath = encodePacked(path[0], path[1]);

      // make sure final amount is a integer
      const finalAmount = Math.floor(Number((amount * numberWithZeros(selectedToken?.decimals || 1)).toFixed(0)));

      const quote = await readContract({
        contract: contract,
        method: "quoteExactInput",
        params: [
          encodedPath,
          BigInt(finalAmount),
        ],
      });
      setQuote(quote as bigint);
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

  function getOriginTokens() {
    const tokens = Object.keys(PATHS[activeChain.id]).map((tokenId) => {
      let obj = TokensByChainId[activeChain.id][tokenId];
      if (obj) obj.id = tokenId;
      return [tokenId, obj];
    });

    const tokenObj = Object.fromEntries(tokens);
    return tokenObj;
  }


  useEffect(() => {
    if (activeChain?.id && activeChain?.id !== oldActiveChainId) {
      setOriginTokens(getOriginTokens());
      fetchPaths();
      oldActiveChainId = activeChain.id;
    }
  }, [activeChain]);

  useEffect(() => {
    if (account && activeChain) {
      fetchBalances();
    }
  }, [activeChain, selectedToken, selectedTargetToken, account]);

  // fetch all necessary balances
  async function fetchBalances() {
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
      setSelectedTargetTokenBalance(balance as bigint);
    }

    const newBalances = {};

    // search for usdc in tokenyByChain
    let usdcToken = tokenyByChain[activeChain.id].tokens.find(
      (token) => token.symbol === "USDC"
    );

    // fetch usdc balance
    if (usdcToken) {
      const balance = await fetchBalance(
        client,
        activeChain,
        usdcToken.contract.contractAddress,
        usdcToken.contract.abi,
        account.address
      );
      newBalances["USDC"] = balance;
    }

    setBalances(newBalances);

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
        setTimeout(() => {
          fetchBalances();
          setAmount(0);
        }, 1000);
        setShowSuccessModal(true);
      },
      (error) => {
        retryCounterAny++;
        if (retryCounterAny < 3) {
          handleExchangeAny(amount);
          console.log("retrying exchange", retryCounterAny);
        } else {
          retryCounterAny = 0;
          console.error("Error converting to EUROE", error);
          setExchangeState("error");
          setTimeout(() => {
            setExchangeState("normal");
          }, 4000);
        }
      },
      activeChain,
      selectedTargetToken
    );
    setExchangeState("normal");
  }

  // handle exchanges from the modals
  async function handleExchange(amount) {
    setLoading((prevState) => ({
      ...prevState,
      [selectedToken.symbol]: "processing",
    }));

    await convertAnyToAny(
      selectedToken,
      amount,
      account,
      () => {
        setTimeout(() => {
          fetchBalances();
        }, 1000);
        setShowSuccessModal(true);
      },
      (error) => {
        retryCounter++;
        if (retryCounter < 3) {
          handleExchange(amount);
          console.log("retrying exchange", retryCounter);
        } else {
          retryCounter = 0;
          console.error("Error converting to EUROE", error);

          setLoading((prevState) => ({
            ...prevState,
            [selectedToken.symbol]: "error",
          }));

          setTimeout(() => {
            setLoading((prevState) => ({
              ...prevState,
              [selectedToken.symbol]: "normal",
            }));
          }, 4000);
        }
      },
      activeChain,
      "usdc"
    );
    setLoading((prevState) => ({
      ...prevState,
      [selectedToken.symbol]: "normal",
    }));
  }

  function processTargetTokens(token) {
    if (!token) return;
    let targetTokenArr = Object.keys(
      PATHS[activeChain.id][token.id.toUpperCase()]
    ).map((tokenId) => {
      return [tokenId, TokensByChainId[activeChain.id][tokenId]];
    });

    targetTokenArr = targetTokenArr.filter((item) => {
      return item[1] !== undefined;
    });

    let targetTokens = Object.fromEntries(targetTokenArr);
    setTargetTokens(targetTokens);
    setSelectedTargetToken(targetTokenArr[0][1]);

    return targetTokens;
  }

  return (
    <div>
      <UniversalModal
        isOpen={showSuccessModal}
        type={MODAL_TYPE_SUCCESS}
        title={t("exchange_success_title")}
        message={t("exchange_success_message")}
        closeModal={() => setShowSuccessModal(false)}
      />

      <ExchangeModal
        show={showExchangeModal}
        closeModal={() => setShowExchangeModal(false)}
        token={selectedToken}
        handleExchange={handleExchange}
        maxAmount={balances[selectedToken?.symbol]}
      />

      <ExchangeModal
        show={showExchangeAnyModal}
        closeModal={() => setShowExchangeAnyModal(false)}
        token={selectedToken}
        handleExchange={handleExchangeAny}
        maxAmount={balances[selectedToken?.symbol]}
      />
      <div className="bg-gray-100 p-4 my-4 rounded-lg">
        <div className="mb-2 mt-4 font-bold">{t("info_text_h")}</div>
        <div className="mb-2">{t("info_text_p1")}</div>
        <div className="mb-2">{t("info_text_p2")}</div>
        <div className="mb-4">{t("info_text_p3")}</div>
      </div>
      <div className="mt-4">{t("select_all")}</div>
      <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
        <div>{t("choose_chain")}</div>
      </div>
      <ChainSelector />
      <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
        <div>{t("choose_origin_currency")}</div>
      </div>

      <TokenSelector
        onSelect={(token) => {
          setAmount(0);
          setSelectedToken(token);
          processTargetTokens(token);
        }}
        tokens={originTokens}
        selectedToken={selectedToken}
      />

      <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
        <div>{t("enter_amount_exchange1")}</div>
      </div>
      <input
        type="number"
        className={`mt-2 p-2 w-full border rounded-md ${
          !selectedToken && "border-gray-300"
        }`}
        value={amount}
        disabled={!selectedToken}
        onChange={(e) => {
          // round to the decimals of the token
          const value = Number(e.target.value);
          const decimals = selectedToken?.decimals || 18;
          const multiplier = Math.pow(10, decimals);
          const roundedValue = Math.floor(value * multiplier) / multiplier;
          setAmount(roundedValue);
        }}
        max={selectedTokenBalance}
        min={0}
      />

      {inputError && <span className="text-red-500 text-sm">{inputError}</span>}

      <div className="mt-4 flex justify-between items-center gap-2">
        <div>{t("current_balance_is")}</div>
        <div>
          {formatCrypto(
            selectedTokenBalance || 0,
            selectedToken?.decimals || 18,
            6
          )}
        </div>
        <div>{selectedToken?.name}</div>
        <div className="flex-1"></div>
        <RxUpdate
          className={`w-6 h-6 ${balanceUpdate && "animate-spin"}`}
          onClick={async () => {
            setBalanceUpdate(true);
            await fetchBalances();
            setBalanceUpdate(false);
          }}
        />
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={handleMaxClick}
        >
          {t("max")}
        </button>
      </div>

      <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
        <div>{t("choose_target_currency")}</div>
      </div>

      <TokenSelector
        onSelect={(selectedToken) => {
          setSelectedTargetToken(selectedToken);
        }}
        tokens={targetTokens}
        selectedToken={selectedTargetToken}
      />

      <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
        <div>{t("exchange")}</div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end">
        <div className="flex flex-col mt-4">
          <div className="text-sm text-gray-500">
            {t("you_will_receive_roughly")}
          </div>
          <div className="text-5xl font-bold flex gap-2 items-end">
            {Number(quote ? quote[0] : 0) /
              numberWithZeros(selectedTargetToken?.decimals || 1) -
              (Number(quote ? quote[0] : 0) /
                numberWithZeros(selectedTargetToken?.decimals || 1)) *
                0.004}
            <span className="text-base">{selectedTargetToken?.name}</span>
          </div>
          {exchangeType === "external" && (
            <span className="text-base">
              {t("current_exchange_rate")}
              {/* display 0.04% commission */}{" "}
              {(
                Number(quote ? quote[0] : 0) /
                numberWithZeros(selectedTargetToken?.decimals || 1)
              ).toFixed(5)}
            </span>
          )}
          <div className="text-sm text-gray-500">
            {t("your_current_balance_is")}{" "}
            {Number(selectedTargetTokenBalance || 0) /
              numberWithZeros(selectedTargetToken?.decimals || 1)}{" "}
            <span className="text-base">{selectedTargetToken?.name}</span>
          </div>
        </div>
        <div className="self-end">
          <ConvertStateButtonWide
            enabled={
              selectedTargetToken && selectedToken && amount && !inputError
            }
            state={exchangeState}
            onClick={handleConfirmExchange}
          >
            {t("convert_now")}
          </ConvertStateButtonWide>
        </div>
      </div>
    </div>
  );
}
