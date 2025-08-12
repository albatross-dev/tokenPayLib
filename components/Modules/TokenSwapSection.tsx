import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import delay from "@/tokenPayLib/utilities/misc/delay";
import { Chain, getContract, readContract } from "thirdweb";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { encodePacked } from "thirdweb/utils";
import QueryString from "qs";
import { RxUpdate } from "react-icons/rx";

import client from "@/utilities/thirdweb-client";
import { showErrorPopup } from "../Modals/ErrorPrompt";
import ExchangeModal from "../Modals/ExchangeModal";
import fetchBalance, { fetchBalanceRaw } from "../../utilities/crypto/fetchBalance";
import tokenyByChain from "../../utilities/crypto/tokenByChain";
import TokenSelector from "../Forms/TokenSelector";

import { ConvertStateButtonWide } from "../UI/ConvertStateButton";
import numberWithZeros from "../../utilities/math/numberWithZeros";


import QuoteV2Abi from "../../assets/quoteV2Abi.json";


import { api } from "../../../context/UserContext";
import { Pool } from "../../types/payload-types";
import { SimpleToken } from "../../types/token.types";
import { convertAnyToAnyDirect, uniswapAddressesPublic } from "../../utilities/crypto/convertAnyToAny";
import { formatCrypto, TokensByChainId } from "../../utilities/crypto/currencies";
import { ExchangeType } from "../../utilities/exchangeTypes";
import ChainSelector from "../Forms/ChainSelector";

import UniversalModal, { MODAL_TYPE_SUCCESS } from "../Modals/UniversalModal";
import MiniLoader from "../UI/MiniLoader";


const exchangeType: ExchangeType = process.env.NEXT_PUBLIC_EXCHANGE_TYPE as ExchangeType;

let retryCounterAny = 0;
let retryCounter = 0;

type ExchangeStateType = "normal" | "processing" | "error";

interface TokenSwapSectionProps {
  origin?: string;
  target?: string;
  max?: boolean;
  preAmount?: number;
}

  /**
   * Fetch paths from the backend
   */
  export async function fetchPathsForTarget(targetToken: SimpleToken, activeChain: Chain): Promise<Pool[]> {
    try {
      const query = {
        where: {
          and: [
            {
              outputToken: {
                equals: targetToken.id.toUpperCase(),
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

      const pathsRes = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pool/${stringifiedQuery}`);

      const newPools: Pool[] = pathsRes?.data?.docs || [];

      // parse paths from pool

      return newPools;
    } catch (e) {
      console.error("Error fetching paths", e);
      return [];
    }
  }

  /**
   * Fetch paths from the backend
   */
  export async function fetchPaths(originToken: SimpleToken, activeChain: Chain): Promise<Pool[]> {
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

      const pathsRes = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pool/${stringifiedQuery}`);

      const newPools: Pool[] = pathsRes?.data?.docs || [];

      // parse paths from pool

      return newPools;
    } catch (e) {
      console.error("Error fetching paths", e);
      return [];
    }
  }


export default function TokenSwapSection({ origin, target, max, preAmount }: TokenSwapSectionProps) {
  const { t } = useTranslation("common");
  const { t: tAccount } = useTranslation("wallet");
  const activeChain = useActiveWalletChain();
  const account = useActiveAccount();

  const [balances, setBalances] = useState({});
  const [balanceUpdate, setBalanceUpdate] = useState<boolean>(false);
  const [exchangeState, setExchangeState] = useState<ExchangeStateType>("normal");

  const [loading, setLoading] = useState<Record<string, string>>({
    inputTokens: "normal",
    quote: "normal",
    outputTokens: "normal",
  });

  // exchange
  const [selectedToken, setSelectedToken] = useState<SimpleToken | null>(null);
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(null);
  const [originTokens, setOriginTokens] = useState<Record<string, SimpleToken>>({});
  const [targetTokens, setTargetTokens] = useState<Record<string, SimpleToken>>({});
  const [selectedTargetToken, setSelectedTargetToken] = useState<SimpleToken | null>(null);
  const [selectedTargetTokenBalance, setSelectedTargetTokenBalance] = useState<bigint | null>(null);

  const [amount, setAmount] = useState<string>("");
  const [quote, setQuote] = useState<bigint | null>(null);
  const [showExchangeAnyModal, setShowExchangeAnyModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [inputError, setError] = useState<string | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [pools, setPools] = useState<Pool[]>([]);

  /**
   * Set the max amount immediately
   */
  async function setMaxAmountImmediately(ot: SimpleToken) {
    const balance = await fetchBalance(client, activeChain, ot.contractAddress, ot.abi, account.address);

    setSelectedTokenBalance(balance);

    // wait for 100ms
    await delay(100);

    setAmount(((Number(balance) || 0) / numberWithZeros(ot?.decimals || 0)).toString());
  }

  /**
   * Get the path for a given origin token and target token
   */
  async function getPath(originToken: SimpleToken, targetToken: SimpleToken) {
    const pool: Pool | undefined = pools.find(
      (path) => path.inputToken === originToken.id.toUpperCase() && path.outputToken === targetToken.id.toUpperCase()
    );

    if (pool) {
      const path = JSON.parse(pool.path);
      for (let i = 0; i < path[0].length; i += 1) {
        if (path[0][i] === "uint24") {
          path[1][i] = Number(path[1][i]);
        }
      }
      return path;
    } 
    
    return [];
  }

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

    console.log("fetching paths for", token);

    const paths = await fetchPaths(token, activeChain);

    setPools(paths);

    console.log("paths", paths);

    const outputTokens = Object.fromEntries(
      paths.map((path) => {
        const obj: SimpleToken | null = TokensByChainId[activeChain.id][path.outputToken];
        if (obj && path.outputToken) {
          return [path.outputToken, obj];
        } 
        return ["none", null];
      })
    );

    delete outputTokens.none;

    setTargetTokens(outputTokens);

    setLoading((prevState) => ({
      ...prevState,
      targetTokens: "normal",
    }));
  }

  /**
   * Fetches a quote for a given token swap
   */
  async function fetchQuote() {
    setQuoteError(null);

    const contract = getContract({
      client,
      chain: activeChain,
      address: uniswapAddressesPublic[activeChain.id].quote,
      abi: QuoteV2Abi as Array<any>,
    });

    const path: Array<Array<string>> = await getPath(selectedToken, selectedTargetToken);

    const encodedPath = encodePacked(path[0], path[1]);

    // make sure final amount is a integer
    if (Number(amount) > 0) {
      const finalAmount = Math.floor(
        Number((Number(amount) * numberWithZeros(selectedToken?.decimals || 0)).toFixed(0))
      );

      try {
        const newQuote = await readContract({
          contract,
          method: "quoteExactInput",
          params: [encodedPath, BigInt(finalAmount)],
        });
        setQuote(newQuote as bigint);
      } catch (e) {
        console.log("contract", contract);
        console.log("path", path);
        console.log("encodedPath", encodedPath);
        console.log("amount", BigInt(finalAmount));
        setQuote(BigInt(0));
        console.error("Error fetching quote", e);
        setQuoteError(t("error_fetching_paths"));
      }
    }
    // Validate the amount and set error messages
    if (Number(amount) <= 0) {
      setError(t("greater_zero"));
    } else if (Number(amount) > (Number(selectedTokenBalance) || 0) / numberWithZeros(selectedToken?.decimals || 0)) {
      setError(
        `${t("cannot_exceed")} ${formatCrypto(Number(selectedTokenBalance) || 0, selectedToken?.decimals || 18, 6)}.`
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

    const inputTokensRes = await api.get(`/api/globals/inputTokens${activeChain.id}`);

    if (!inputTokensRes?.data?.inputTokens) {
      setLoading((prevState) => ({
        ...prevState,
        inputTokens: "normal",
      }));
      return {};
    }

    const inputTokens: string[] = JSON.parse(inputTokensRes?.data?.inputTokens);

    const inputTokensMap = Object.fromEntries(
      inputTokens.map((tokenID: string) => {
        const obj: SimpleToken | null = TokensByChainId[activeChain.id][tokenID];
        if (obj && tokenID) {
          return [tokenID, obj];
        } 

        return ["none", null];
      })
    );

    delete inputTokensMap.none;

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
      const balance = await fetchBalanceRaw(
        client,
        activeChain,
        selectedToken.contractAddress,
        selectedToken.abi,
        account.address
      );
      setSelectedTokenBalance(balance);

      // if the balance is 0, set the error
      if (balance === BigInt(0)) {
        setError(t("balance_zero"));
      }
    }

    if (selectedTargetToken) {
      const balance = await fetchBalanceRaw(
        client,
        activeChain,
        selectedTargetToken.contractAddress,
        selectedTargetToken.abi,
        account.address
      );
      setSelectedTargetTokenBalance(balance as bigint);
    }

    const newBalances: Record<string, bigint | null> = {
      USDC: null,
    };

    // search for usdc in tokenyByChain
    const usdcToken = tokenyByChain[activeChain.id].tokens.find((token) => token.symbol === "USDC");

    // fetch usdc balance
    if (usdcToken) {
      const balance = await fetchBalance(
        client,
        activeChain,
        usdcToken.contract.contractAddress,
        usdcToken.contract.abi,
        account.address
      );
      newBalances.USDC = balance;
    }

    setBalances(newBalances);

    setBalanceUpdate(false);
  }

  /**
   * Handles the click event for the "Max" button
   */
  const handleMaxClick = () => {
    setAmount(((Number(selectedTokenBalance) || 0) / numberWithZeros(selectedToken?.decimals || 0)).toString());
  };

  /**
   * Handles the click event for the "Confirm" button
   */
  async function handleExchangeAny(exchangeAmount: number) {
    setExchangeState("processing");

    const path: Array<Array<string>> = await getPath(selectedToken, selectedTargetToken);

    await convertAnyToAnyDirect(
      selectedToken,
      exchangeAmount,
      account,
      () => {
        setTimeout(() => {
          fetchBalances();
          setAmount("");
        }, 1000);
        setShowSuccessModal(true);
        setExchangeState("normal");
      },
      (error) => {
        retryCounterAny += 1;
        if (retryCounterAny < 3) {
          handleExchangeAny(exchangeAmount);
        } else {
          retryCounterAny = 0;
          showErrorPopup({
            messageKeyOrText: t("error_converting_token"),
            titleText: t("error_converting_token_title"),
          });
          console.error(`Error converting to ${selectedTargetToken?.name}`, error);
          setExchangeState("error");
          setTimeout(() => {
            setExchangeState("normal");
          }, 4000);
        }
      },
      activeChain,
      selectedTargetToken,
      path
    );
  }

  /**
   * Handles the click event for the "Confirm" button
   */
  const handleConfirmExchange = () => {
    handleExchangeAny(Number(amount) * numberWithZeros(selectedToken?.decimals || 0));
  };

  

  /**
   * Handles the click event for the "Confirm" button
   */
  async function handleExchange(exchangeAmount: number) {
    setExchangeState("processing");

    await convertAnyToAnyDirect(
      selectedToken,
      exchangeAmount,
      account,
      () => {
        setTimeout(() => {
          fetchBalances();
        }, 1000);
        setShowSuccessModal(true);
      },
      (error) => {
        retryCounter += 1;
        if (retryCounter < 3) {
          handleExchange(exchangeAmount);
          console.log("retrying exchange", retryCounter);
        } else {
          retryCounter = 0;
          console.error("Error converting to Stable Coin", error);

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
   * Handles the selection of an origin token in the token swap interface.
   * Resets the swap state and triggers the process to find compatible target tokens.
   *
   * @param token - The selected origin token to swap from
   */
  function handleOriginTokenSelected(token: SimpleToken) {
    setAmount("");
    setSelectedToken(token);
    setTargetTokens({});
    setPools([]);
    setQuote(null);
    setSelectedTargetToken(null);
    setSelectedTargetTokenBalance(null);
    processTargetTokens(token);
  }

  /**
   * Handles the input of token amount in the swap interface.
   * Rounds the input value to match the selected token's decimal precision.
   *
   * @param e - The input event containing the new amount value
   */
  function handleAmountInput(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    // round to the decimals of the token
    const value = Number(e.target.value);
    if (Number.isNaN(value)) {
      setError(tAccount("sendCrypto.errors.enterValidAmount"));
    } else {
      setError(null);

      // Convert comma to dot for decimal separator
      const normalizedValue = e.target.value.replace(",", ".");
      const decimalPart = normalizedValue.split(".")[1];
      console.log("decimal check", decimalPart?.length, selectedToken?.decimals);
      // check if the number has more decimals than the token
      if (decimalPart?.length > selectedToken?.decimals) {
        setError(tAccount("sendCrypto.errors.maxDecimals1") + (selectedToken?.decimals || 0) + tAccount("sendCrypto.errors.maxDecimals2"));
      } else {
        setError(null);

        // check if the number is greater than the max amount
        if (value > (Number(selectedTokenBalance) || 0) / numberWithZeros(selectedToken?.decimals || 0)) {
          setError(tAccount("sendCrypto.errors.insufficientBalance"));
        } else {
          setError(null);
        }
      }
    }

    setAmount(e.target.value);
  }

  /**
   * Handles the selection of a target token in the token swap interface.
   * Updates the selected target token and fetches its balance.
   *
   * @param token - The selected target token to swap to
   */
  function handleTargetTokenSelected(targetToken: SimpleToken) {
    setSelectedTargetToken(targetToken);
    setQuote(null);
  }

  async function handleBalanceUpdate() {
    setBalanceUpdate(true);
    await fetchBalances();
    setBalanceUpdate(false);
  }

  function handleChainSelected() {
    setSelectedToken(null);
    setSelectedTokenBalance(null);
    setSelectedTargetToken(null);
    setSelectedTargetTokenBalance(null);
    setQuote(null);
    setQuoteError(null);
    setError(null);
    setAmount("");
    setPools([]);
    setTargetTokens({});
  }

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
        handleExchange={(exchangeAmount) => handleExchange(exchangeAmount)}
        maxAmount={balances[selectedToken?.id]}
      />

      <ExchangeModal
        show={showExchangeAnyModal}
        closeModal={() => setShowExchangeAnyModal(false)}
        token={selectedToken}
        handleExchange={(exchangeAmount) => handleExchangeAny(exchangeAmount)}
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
      <ChainSelector type="chain" disabled={!account} onChain={() => handleChainSelected()} />
      <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
        <div>{t("choose_origin_currency")}</div> {loading.inputTokens === "processing" && <MiniLoader />}
      </div>

      <TokenSelector
        type="token"
        onSelect={(token) => handleOriginTokenSelected(token)}
        tokens={originTokens}
        selectedToken={selectedToken}
        disabled={!account}
      />

      <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
        <div>{t("enter_amount_exchange1")}</div>
      </div>
      <input
        type="number"
        className={`mt-2 p-2 w-full border rounded-md ${!selectedToken && "border-gray-300"}`}
        placeholder="0.00"
        value={amount}
        disabled={!selectedToken || !selectedTokenBalance || !account}
        onChange={handleAmountInput}
        max={selectedTokenBalance}
        min={0}
      />

      {inputError && <span className="text-red-500 text-sm">{inputError}</span>}

      <div className="mt-4 flex justify-between items-center gap-2">
        <div>{t("current_balance_is")}</div>
        <div>
          <span className={`${(balanceUpdate || !selectedToken) && "loadingPanel"}`}>
            {formatCrypto(selectedTokenBalance || 0, selectedToken?.decimals || 18, 6)}
          </span>
        </div>
        <div>{selectedToken?.name}</div>
        <div className="flex-1"/>
        <RxUpdate
          className={`w-6 h-6 cursor-pointer ${balanceUpdate && "animate-spin"}`}
          onClick={() => handleBalanceUpdate()}
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
        onSelect={(token) => handleTargetTokenSelected(token)}
        tokens={targetTokens}
        selectedToken={selectedTargetToken}
        disabled={!account}
      />

      <div className="flex flex-row gap-4 mt-4 text-gray-700 items-center justify-between text-gray-600 font-bold">
        <div>{t("exchange")}</div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end">
        <div className="flex flex-col mt-4">
          {quoteError && <span className="text-red-500 text-sm">{quoteError}</span>}
          <div className="text-sm text-gray-500">{t("you_will_receive_roughly")}</div>
          <div className="text-5xl font-bold flex gap-2 items-end">
            <span className={`${!quote && "loadingPanel px-4"}`}>
              {Number(quote ? quote[0] : 0) / numberWithZeros(selectedTargetToken?.decimals || 0) -
                (Number(quote ? quote[0] : 0) / numberWithZeros(selectedTargetToken?.decimals || 0)) * 0.004 || 0}{" "}
              <span className="text-base">{selectedTargetToken?.name}</span>
            </span>
          </div>
          {exchangeType === "external" && (
            <span className="text-base">
              {t("current_exchange_rate")}
              {/* display 0.04% commission */}{" "}
              <span className={`${!quote && "loadingPanel px-4"}`}>
                {(Number(quote ? quote[0] : 0) / numberWithZeros(selectedTargetToken?.decimals || 0) || 0).toFixed(5)}
              </span>
            </span>
          )}
          <div className="text-sm text-gray-500">
            {t("your_current_balance_is")}{" "}
            <span className={`${(balanceUpdate || !selectedTargetToken) && "loadingPanel px-4"}`}>
              {formatCrypto(Number(selectedTargetTokenBalance || 0), selectedTargetToken?.decimals || 18, 6)}{" "}
              <span className="text-base">{selectedTargetToken?.name}</span>
            </span>
          </div>
        </div>
        <div className="self-end">
          <ConvertStateButtonWide
            enabled={selectedTargetToken && selectedToken && amount && !inputError && Boolean(quote)}
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
