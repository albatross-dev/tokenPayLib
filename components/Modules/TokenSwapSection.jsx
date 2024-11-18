import { useTranslation } from "react-i18next";
import ChainSelector from "../Forms/ChainSelector";
import TokenSelector from "../Forms/TokenSelector";
import ExchangeModal from "@/tokenPayLib/components/Modals/ExchangeModal";
import fetchBalance from "@/tokenPayLib/utilities/crypto/fetchBalance";
import tokenyByChain from "@/tokenPayLib/utilities/crypto/tokenByChain";
import {
  EXCHANGE_TYPE_EXTERNAL,
  EXCHANGE_TYPE_INTERNAL,
} from "@/tokenPayLib/utilities/exchangeTypes";

import { PATHS } from "@/tokenPayLib/utilities/crypto/getPath";
import numberWithZeros from "@/tokenPayLib/utilities/math/numberWithZeros";
import {
  ConvertStateButtonWide,
} from "@/tokenPayLib/components/UI/ConvertStateButton";

import { client } from "@/pages/_app";
import { getContract, readContract } from "thirdweb";
import QuoteV2Abi from "@/tokenPayLib/assets/quoteV2Abi.json";
import { encodePacked } from "thirdweb/utils";

import {
  useActiveWalletChain,
  useActiveWallet,
  useActiveAccount,
  useIsAutoConnecting,
  useDisconnect,
} from "thirdweb/react";

import {
  formatCrypto,
  TokensByChainId,
} from "@/tokenPayLib/utilities/crypto/currencies";
import { RxUpdate } from "react-icons/rx";
import convertAnyToAny, {
  convertAnyToAnyDirect,
  uniswapAddresses,
} from "@/tokenPayLib/utilities/crypto/convertAnyToAny";
import { useEffect, useState } from "react";

const exchangeType = process.env.NEXT_PUBLIC_EXCHANGE_TYPE;

export default function CrossChainSection() {
  const { t } = useTranslation("common");
  const activeChain = useActiveWalletChain();
  const account = useActiveAccount();

  const [balances, setBalances] = useState({});
  const [balanceUpdate, setBalanceUpdate] = useState(false);
  const [exchangeState, setExchangeState] = useState("normal");

  // exchange
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(null);
  const [originTokens, setOriginTokens] = useState({});
  const [targetTokens, setTargetTokens] = useState({});
  const [selectedTargetToken, setSelectedTargetToken] = useState(null);
  const [selectedTargetTokenBalance, setSelectedTargetTokenBalance] =
    useState(0);
  const [amount, setAmount] = useState();
  const [quote, setQuote] = useState(null);
  const [showExchangeAnyModal, setShowExchangeAnyModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [inputError, setError] = useState("");


  useEffect(() => {
    async function fetchQuote() {
      let contract = getContract({
        client: client,
        chain: activeChain,
        address: (exchangeType === EXCHANGE_TYPE_INTERNAL
          ? uniswapAddresses
          : uniswapAddresses)[activeChain.id].quote,
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
      console.log("quote", quote);
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




  useEffect(() => {
    if (activeChain) {
      const tokens = Object.keys(PATHS[activeChain.id]).map((tokenId) => {
        return [tokenId, TokensByChainId[activeChain.id][tokenId]];
      });

      const tokenObj = Object.fromEntries(tokens);
      setOriginTokens(tokenObj);
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
      setSelectedTargetTokenBalance(balance);
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
        },
        (error) => {
          console.error("Error converting to EUROE", error);
  
          setExchangeState("error");
  
          setTimeout(() => {
            setExchangeState("normal");
          }, 4000);
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
      },
      (error) => {
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
      },
      activeChain,
      "usdc"
    );
    setLoading((prevState) => ({
      ...prevState,
      [selectedToken.symbol]: "normal",
    }));
  }

  return (
    <div>
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
          let targetTokenArr = Object.keys(
            PATHS[activeChain.id][token.id.toUpperCase()]
          ).map((tokenId) => {
            return [tokenId, TokensByChainId[activeChain.id][tokenId]];
          });

          let targetTokens = Object.fromEntries(targetTokenArr);
          setTargetTokens(targetTokens);
          console.log("targetTokens", targetTokenArr);
          setSelectedTargetToken(targetTokenArr[0][1]);
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
        onChange={(e) => setAmount(e.target.value)}
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
          {exchangeType === EXCHANGE_TYPE_EXTERNAL && (
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
};
