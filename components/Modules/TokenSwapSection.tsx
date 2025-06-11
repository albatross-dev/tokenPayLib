import { useTranslation } from "react-i18next";
import TokenSelector from "../Forms/TokenSelector";
import ExchangeModal from "../../components/Modals/ExchangeModal";
import fetchBalance from "../../utilities/crypto/fetchBalance";
import tokenyByChain from "../../utilities/crypto/tokenByChain";

import numberWithZeros from "../../utilities/math/numberWithZeros";
import { ConvertStateButtonWide } from "../../components/UI/ConvertStateButton";

import { client } from "../../../pages/_app";
import { getContract, readContract } from "thirdweb";
import QuoteV2Abi from "../../assets/quoteV2Abi.json";
import { encodePacked } from "thirdweb/utils";

import { useActiveWalletChain, useActiveAccount } from "thirdweb/react";

import {
  formatCrypto,
  TokensByChainId,
} from "../../utilities/crypto/currencies";
import { RxUpdate } from "react-icons/rx";
import convertAnyToAny, {
  convertAnyToAnyDirect,
  uniswapAddresses,
  uniswapAddressesPublic,
} from "../../utilities/crypto/convertAnyToAny";
import { useEffect, useState } from "react";
import {
  arbitrum,
  avalanche,
  base,
  ethereum,
  optimism,
  polygon,
} from "thirdweb/chains";
import React from "react";
import { MODAL_TYPE_SUCCESS } from "../Modals/UniversalModal";
import UniversalModal from "../Modals/UniversalModal";
import ChainSelector from "../Forms/ChainSelector";
import { ExchangeType } from "../../utilities/exchangeTypes";
import QueryString from "qs";
import { SimpleToken } from "../../types/token.types";
import MiniLoader from "../UI/MiniLoader";
import { Pool } from "../../types/payload-types";
import { api } from "../../../context/UserContext";

const exchangeType: ExchangeType = process.env
  .NEXT_PUBLIC_EXCHANGE_TYPE as ExchangeType;

let retryCounterAny = 0;
let retryCounter = 0;

const chainIdSlugDictionary = {
  [ethereum.id]: "uniswapPoolsEthereum",
  [polygon.id]: "uniswapPoolsPolygon",
  [optimism.id]: "uniswapPoolsOptimism",
  [avalanche.id]: "uniswapPoolsAvalanche",
  [arbitrum.id]: "uniswapPoolsArbitrum",
  [base.id]: "uniswapPoolsBase",
};

type exchangeStateType = "normal" | "processing" | "error";

interface TokenSwapSectionProps {
  origin?: string;
  target?: string;
  max?: boolean;
  preAmount?: number;
}

export default function TokenSwapSection({
  origin,
  target,
  max,
  preAmount,
}: TokenSwapSectionProps) {
  const { t } = useTranslation("common");
  const activeChain = useActiveWalletChain();
  const account = useActiveAccount();

  const [balances, setBalances] = useState({});
  const [balanceUpdate, setBalanceUpdate] = useState<boolean>(false);
  const [exchangeState, setExchangeState] =
    useState<exchangeStateType>("normal");

  const [loading, setLoading] = useState<Record<string, string>>({
    inputTokens: "normal",
    quote: "normal",
    outputTokens: "normal",
  });

  // exchange
  const [selectedToken, setSelectedToken] = useState<SimpleToken | null>(null);
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(null);
  const [originTokens, setOriginTokens] = useState<Record<string, SimpleToken>>(
    {}
  );
  const [targetTokens, setTargetTokens] = useState<Record<string, SimpleToken>>(
    {}
  );
  const [selectedTargetToken, setSelectedTargetToken] =
    useState<SimpleToken | null>(null);
  const [selectedTargetTokenBalance, setSelectedTargetTokenBalance] = useState<
    bigint | null
  >(null);

  const [amount, setAmount] = useState<string>("");
  const [quote, setQuote] = useState<bigint | null>(null);
  const [showExchangeAnyModal, setShowExchangeAnyModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [inputError, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [pools, setPools] = useState<Pool[]>([]);

  /**
   * Initializes the token swap section with pre-selected values when origin/target tokens,
   * max amount, or pre-amount are provided as props. Sets up the initial state for
   * token selection, amounts, and target tokens.
   */
  useEffect(() => {
    if (origin) {
      const ot = getOriginTokens();
      setSelectedToken(ot[origin]);
      const tt = processTargetTokens(ot[origin]);
      if (target) {
        setSelectedTargetToken(tt[target]);
      }

      if (max) {
        setMaxAmountImmediately(ot[origin]);
      }

      if (preAmount) {
        setAmount(preAmount.toString());
      }
    }
  }, [origin, target, max, preAmount]);

  /**
   * Fetches a quote for a given token swap
   */
  useEffect(() => {
    if (selectedToken && selectedTargetToken && amount) {
      fetchQuote();
    }
  }, [selectedToken, selectedTargetToken, amount]);

  /**
   * Fetches the origin tokens for a given chain
   */
  useEffect(() => {
    async function fetchOriginTokens() {
      setOriginTokens(await getOriginTokens());
    }
    if (activeChain?.id) {
      fetchOriginTokens();
    }
  }, [activeChain]);

  /**
   * Fetches the balances for the selected token and target token
   */
  useEffect(() => {
    if (account && activeChain) {
      fetchBalances();
    }
  }, [activeChain, selectedToken, selectedTargetToken, account]);

  /**
   * Set the max amount immediately
   */
  async function setMaxAmountImmediately(ot: SimpleToken) {
    const balance = await fetchBalance(
      client,
      activeChain,
      ot.contractAddress,
      ot.abi,
      account.address
    );

    setSelectedTokenBalance(balance);

    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 100));

    setAmount(
      ((Number(balance) || 0) / numberWithZeros(ot?.decimals || 0)).toString()
    );
  }

  /**
   * Get the path for a given origin token and target token
   */
  async function getPath(originToken: SimpleToken, targetToken: SimpleToken) {
    let pool: Pool | undefined = pools.find(
      (path) =>
        path.inputToken === originToken.id.toUpperCase() &&
        path.outputToken === targetToken.id.toUpperCase()
    );

    if (pool) {
      let path = JSON.parse(pool.path);
      for (let i = 0; i < path[0].length; i++) {
        if (path[0][i] === "uint24") {
          path[1][i] = Number(path[1][i]);
        }
      }
      return path;
    } else {
      return [];
    }
  }

  /**
   * Fetch paths from the backend
   */
  async function fetchPaths(originToken: SimpleToken): Promise<Pool[]> {
    try {
      const query = {
        where: {
          and: [
            {
              inputToken: {
                equals: originToken.id.toUpperCase(),
              },
            },
            {
              chain: {
                equals: activeChain.id.toString(),
              },
            },
          ],
        },
        limit: 200,
      };

      const stringifiedQuery = QueryString.stringify(query, {
        addQueryPrefix: true,
      });

      console.log("stringifiedQuery", stringifiedQuery);

      const pathsRes = await api.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pool/${stringifiedQuery}`
      );

      const pools: Pool[] = pathsRes?.data?.docs || [];

      // parse paths from pool

      setPools(pools);

      return pools;
    } catch (e) {
      console.error("Error fetching paths", e);
      return;
    }
  }

  /**
   /**
    * Processes target tokens for a given origin token by:
    * 1. Fetching available swap paths from the backend
    * 2. Converting paths into a map of output tokens
    * 3. Updating the UI state with available target tokens
    */
  async function processTargetTokens(token: SimpleToken) {
    if (!token) return;

    setLoading((prevState) => ({
      ...prevState,
      targetTokens: "processing",
    }));

    let paths = await fetchPaths(token);

    console.log("paths", paths);

    let outputTokens = Object.fromEntries(
      paths.map((path) => {
        let obj: SimpleToken | null =
          TokensByChainId[activeChain.id][path.outputToken];
        if (obj && path.outputToken) {
          return [path.outputToken, obj];
        } else {
          return ["none", null];
        }
      })
    );

    delete outputTokens["none"];

    setTargetTokens(outputTokens);
    console.log("outputTokens", outputTokens);

    setLoading((prevState) => ({
      ...prevState,
      targetTokens: "normal",
    }));

    return targetTokens;
  }

  /**
   * Fetches a quote for a given token swap
   */
  async function fetchQuote() {
    let contract = getContract({
      client: client,
      chain: activeChain,
      address: uniswapAddressesPublic[activeChain.id].quote,
      abi: QuoteV2Abi as Array<any>,
    });

    const path: Array<Array<string>> = await getPath(
      selectedToken,
      selectedTargetToken
    );

    const encodedPath = encodePacked(path[0], path[1]);

    // make sure final amount is a integer
    if (Number(amount) > 0) {
      const finalAmount = Math.floor(
        Number(
          (
            Number(amount) * numberWithZeros(selectedToken?.decimals || 0)
          ).toFixed(0)
        )
      );

      console.log("encodedPath", encodedPath);
      console.log("finalAmount", finalAmount);

      try {
        const quote = await readContract({
          contract: contract,
          method: "quoteExactInput",
          params: [encodedPath, BigInt(finalAmount)],
        });
        console.log("quote", quote);
        setQuote(quote as bigint);
      } catch (e) {
        setQuote(BigInt(0));
        console.error("Error fetching quote", e);
      }
    }
    // Validate the amount and set error messages
    if (Number(amount) <= 0) {
      setError(t("greater_zero"));
    } else if (
      Number(amount) >
      (Number(selectedTokenBalance) || 0) /
        numberWithZeros(selectedToken?.decimals || 0)
    ) {
      setError(
        `${t("cannot_exceed")} ${
          (Number(selectedTokenBalance) || 0) /
          numberWithZeros(selectedToken?.decimals || 0)
        }.`
      );
    }
  }

  /**
   * Fetches the origin tokens for a given chain
   * @returns A map of token symbols to token objects for available origin tokens
   */
  async function getOriginTokens(): Promise<Record<string, SimpleToken>> {
    setLoading((prevState) => ({
      ...prevState,
      inputTokens: "processing",
    }));

    let inputTokensRes = await api.get(
      `/api/globals/inputTokens${activeChain.id}`
    );

    if (!inputTokensRes?.data?.inputTokens) {
      setLoading((prevState) => ({
        ...prevState,
        inputTokens: "normal",
      }));
      return {};
    }

    let inputTokens: string[] = JSON.parse(inputTokensRes?.data?.inputTokens);

    let inputTokensMap = Object.fromEntries(
      inputTokens.map((tokenID: string) => {
        let obj: SimpleToken | null = TokensByChainId[activeChain.id][tokenID];
        if (obj && tokenID) {
          return [tokenID, obj];
        } else {
          return ["none", null];
        }
      })
    );

    delete inputTokensMap["none"];

    setLoading((prevState) => ({
      ...prevState,
      inputTokens: "normal",
    }));

    return inputTokensMap;
  }

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

  /**
   * Handles the click event for the "Max" button
   */
  const handleMaxClick = () => {
    setAmount(
      (
        (Number(selectedTokenBalance) || 0) /
        numberWithZeros(selectedToken?.decimals || 0)
      ).toString()
    );
  };

  /**
   * Handles the click event for the "Confirm" button
   */
  const handleConfirmExchange = () => {
    handleExchangeAny(
      Number(amount) * numberWithZeros(selectedToken?.decimals || 0)
    );
  };

  /**
   * Handles the click event for the "Confirm" button
   */
  async function handleExchangeAny(amount: number) {
    setExchangeState("processing");
    await convertAnyToAnyDirect(
      selectedToken,
      amount,
      account,
      () => {
        setTimeout(() => {
          fetchBalances();
          setAmount("");
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

  /**
   * Handles the click event for the "Confirm" button
   */
  async function handleExchange(amount: number) {
    setExchangeState("processing");

    await convertAnyToAnyDirect(
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
        maxAmount={balances[selectedToken?.id]}
      />

      <ExchangeModal
        show={showExchangeAnyModal}
        closeModal={() => setShowExchangeAnyModal(false)}
        token={selectedToken}
        handleExchange={handleExchangeAny}
        maxAmount={balances[selectedToken?.id]}
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
      <ChainSelector type="chain" />
      <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
        <div>{t("choose_origin_currency")}</div>{" "}
        {loading.inputTokens === "processing" && <MiniLoader />}
      </div>

      <TokenSelector
        type="token"
        onSelect={(token) => {
          setAmount("");
          setSelectedToken(token);
          setTargetTokens({});
          setPools([]);
          setQuote(null);
          setSelectedTargetToken(null);
          setSelectedTargetTokenBalance(null);
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
        placeholder="0.00"
        value={amount}
        disabled={!selectedToken}
        onChange={(e) => {
          // round to the decimals of the token
          const value = Number(e.target.value);
          const decimals = selectedToken?.decimals || 18;
          const multiplier = Math.pow(10, decimals);
          const roundedValue = Math.floor(value * multiplier) / multiplier;
          setAmount(roundedValue.toString());
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
        {loading.targetTokens === "processing" && <MiniLoader />}
      </div>

      <TokenSelector
        type="token"
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
              numberWithZeros(selectedTargetToken?.decimals || 0) -
              (Number(quote ? quote[0] : 0) /
                numberWithZeros(selectedTargetToken?.decimals || 0)) *
                0.004 || 0}
            <span className="text-base">{selectedTargetToken?.name}</span>
          </div>
          {exchangeType === "external" && (
            <span className="text-base">
              {t("current_exchange_rate")}
              {/* display 0.04% commission */}{" "}
              {(
                Number(quote ? quote[0] : 0) /
                  numberWithZeros(selectedTargetToken?.decimals || 0) || 0
              ).toFixed(5)}
            </span>
          )}
          <div className="text-sm text-gray-500">
            {t("your_current_balance_is")}{" "}
            {Number(selectedTargetTokenBalance || 0) /
              numberWithZeros(selectedTargetToken?.decimals || 0) || 0}{" "}
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
