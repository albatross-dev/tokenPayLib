"use client";

import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";

import { createThirdwebClient } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { useTranslation } from "next-i18next";
import { HiInformationCircle } from "react-icons/hi2";
import { useRouter } from "next/router";
import Link from "next/link";
import UniversalModal from "../Modals/UniversalModal";
import { UhuConfigContext } from "../contexts/UhuConfigContext";
import numberWithZeros from "../../utilities/math/numberWithZeros";
import currencies, {
  formatNumberWithCurrency,
} from "../../utilities/crypto/currencies";
import ConvertPopup from "./ConverterPopup";
import { SimpleToken } from "../../types/token.types";
import fetchBalance from "../../utilities/crypto/fetchBalance";

interface Balance {
  symbol: string;
  balance: number;
  currency: string;
  icon: string;
  decimals: number;
}

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export default function BalanceOverview() {
  const account = useActiveAccount();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { uhuConfig } = useContext(UhuConfigContext);
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");
  const [totalEuroBalance, setTotalEuroBalance] = useState<number>(0);
  const [totalUsdBalance, setTotalUsdBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [isConverterOpen, setIsConverterOpen] = useState<boolean>(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState<boolean>(false);

  const [isUSDInfoModalOpen, setIsUSDInfoModalOpen] = useState<boolean>(false);

  const euroWhitelist: string[] = ["EURS", "UHU"]; // Whitelisted EUR stablecoins
  const usdWhitelist: string[] = ["USDC", "USDT"]; // Whitelisted USD stablecoins
  const popularWhitelist: string[] = [
    "WETH",
    "WMATIC",
    "WBTC",
    "USDC.E",
    "DAI",
  ];

  const [lastFetchTime, setLastFetchTime] = useState(0);
  const DEBOUNCE_DELAY = 10000; // 10 seconds in milliseconds
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchBalances = async (): Promise<void> => {
    if (!account?.address) return;
    const whiteList = [...euroWhitelist, ...usdWhitelist, ...popularWhitelist];
    const currenciesToFetch = Object.entries(currencies).filter(([symbol]) =>
      whiteList.includes(symbol)
    );
    const balancePromises = currenciesToFetch.map(
      async ([symbol, currency]: [string, SimpleToken]) => {
        try {
          if (symbol) {
            const balance = await fetchBalance(
              client,
              polygon,
              currency.contractAddress,
              currency.abi,
              account.address
            );

            if (balance > 0) {
              return {
                symbol,
                balance: Number(balance) / numberWithZeros(currency.decimals),
                currency: currency.id,
                icon: currency.icon,
                decimals: currency.decimals,
              };
            }
          }
        } catch (error) {
          console.error(`Error fetching balance for ${symbol}:`, error);
        }
        return null;
      }
    );

    const resolvedBalances = (await Promise.all(balancePromises)).filter(
      (balance): balance is Balance => balance !== null
    );

    let euroBalanceSum = 0;
    let usdBalanceSum = 0;

    resolvedBalances.forEach((balance) => {
      if (euroWhitelist.includes(balance.symbol)) {
        if (uhuConfig !== "loading") {
          euroBalanceSum +=
            balance.symbol === "UHU"
              ? balance.balance * (uhuConfig?.uhuEuroPrice || 0)
              : balance.balance;
        }
      }
      if (usdWhitelist.includes(balance.symbol)) {
        usdBalanceSum += balance.balance;
      }
    });

    setTotalEuroBalance(euroBalanceSum);
    setTotalUsdBalance(usdBalanceSum);

    if (loading) {
      setLoading(false);
    }
  };

  // Properly debounced fetchBalances function
  const debouncedFetchBalances = useCallback(() => {
    // Clear any existing timeout to prevent multiple calls
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTime;

    if (timeSinceLastFetch < DEBOUNCE_DELAY) {
      // If less than 10 seconds have passed, schedule the fetch for later
      const delay = DEBOUNCE_DELAY - timeSinceLastFetch;
      fetchTimeoutRef.current = setTimeout(() => {
        fetchBalances();
        setLastFetchTime(Date.now());
        fetchTimeoutRef.current = null;
      }, delay);
    } else {
      // If more than 10 seconds have passed, fetch immediately
      fetchBalances();
      setLastFetchTime(now);
    }
  }, [fetchBalances, lastFetchTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (uhuConfig !== "loading") {
      debouncedFetchBalances();
      interval = setInterval(debouncedFetchBalances, 10000);
      
    }

    return () => {
      if(interval) {
        clearInterval(interval);
      }
      // Also clear any pending timeout when component unmounts
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [account, client, uhuConfig, loading, debouncedFetchBalances]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <UniversalModal
        isOpen={isUSDInfoModalOpen}
        closeModal={() => {
          setIsUSDInfoModalOpen(false);
        }}
        type="info"
        title={tCrossborder("balanceOverview.useUSDInfoHeadline")}
        message={tCrossborder("balanceOverview.useUSDInfoMessage")}
       />

      <UniversalModal
        isOpen={isSuccessPopupOpen}
        closeModal={() => {
          setIsSuccessPopupOpen(false);
        }}
        type="success"
        title={t("exchange_success_title")}
        message={t("exchange_success_message")}
       />

      <ConvertPopup
        show={isConverterOpen}
        closeModal={() => {
          setIsConverterOpen(false);
        }}
        token={currencies.EURS}
        targetToken={currencies.USDC}
        onSuccess={() => {
          fetchBalances();
          setIsConverterOpen(false);
          setIsSuccessPopupOpen(true);
        }}
        showSwapButton
       />

      <div className="flex flex-col items-center md:items-start bg-uhuGray shadow-md w-full rounded-lg p-6">
        <div className="flex justify-between md:justify-start w-full mb-4 gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span
              className={`text-5xl font-bold ${
                loading &&
                "loadingPanel"
              }`}
            >
              {isClient && formatNumberWithCurrency(totalEuroBalance, "EUR")}
            </span>
            <span className="text-gray-500">
              {t("BalanceOverview.total_balance_eur")}
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span
              className={`text-5xl font-bold ${
                loading &&
                "loadingPanel"
              }`}
            >
              {isClient && formatNumberWithCurrency(totalUsdBalance, "USD")}
            </span>
            <span className="text-gray-500">
              {t("BalanceOverview.total_balance_usd")}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
          <button
            type="button"
            className="flex flex-row gap-2 items-center text-blue-500 cursor-pointer"
            onClick={() => {
              setIsUSDInfoModalOpen(true);
            }}
          >
            <HiInformationCircle className="h-6 w-6" />
            {tCrossborder("balanceOverview.usdRecomendedButton")}
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => {
              setIsConverterOpen(true);
            }}
            className={`border hover:bg-gray-200  cursor-pointer rounded px-3 py-1 border-gray-300 ${
              isConverterOpen ? "text-uhuBlue border-uhuBlue" : ""
            }`}
          >
            {tCrossborder("balanceOverview.eurUsdConvert")}
          </button>
          <Link
            href="/deposit?source=crossborder"
            className={`border hover:bg-gray-200 rounded px-3 py-1 border-gray-300 ${
              router.route === "/deposit" ? "text-uhuBlue border-uhuBlue" : ""
            }`}
          >
            {tCrossborder("balanceOverview.depositBalance")}
          </Link>
          <Link
            href="/withdraw?source=crossborder"
            className={`border hover:bg-gray-200  rounded px-3 py-1 border-gray-300 ${
              router.route === "/withdraw" ? "text-uhuBlue border-uhuBlue" : ""
            }`}
          >
            {tCrossborder("balanceOverview.withdrawBalance")}
          </Link>
        </div>
      </div>
    </>
  );
}
