"use client";

import React, { useState, useEffect, useContext } from "react";
import currencies, {
  formatCrypto,
  formatNumberWithCurrency,
} from "../../utilities/crypto/currencies";
import MiniLoader from "../UI/MiniLoader";
import numberWithZeros from "../../utilities/math/numberWithZeros";
import Image from "next/image";

import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { UhuConfigContext } from "../contexts/UhuConfigContext";
import { useTranslation } from "next-i18next";
import { HiInformationCircle } from "react-icons/hi2";
import UniversalModal from "../Modals/UniversalModal";
import { useRouter } from "next/router";
import Link from "next/link";
import ConvertPopup from "./ConverterPopup";
import { sendErrorReport } from "../../../context/UserContext";
import { SimpleToken } from "../../types/token.types";
interface Balance {
  symbol: string;
  balance: number;
  currency: string;
  icon: string;
  decimals: number;
}


const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export default function BalanceOverview() {
  const account = useActiveAccount();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { uhuConfig } = useContext(UhuConfigContext);
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");
  const [balances, setBalances] = useState<Balance[]>([]);
  const [totalEuroBalance, setTotalEuroBalance] = useState<number>(0);
  const [totalUsdBalance, setTotalUsdBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [isConverterOpen, setIsConverterOpen] = useState<boolean>(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState<boolean>(false);

  const [isUSDInfoModalOpen, setIsUSDInfoModalOpen] = useState<boolean>(false);

  const euroWhitelist: string[] = ["EUROE", "EURS", "UHU"]; // Whitelisted EUR stablecoins
  const usdWhitelist: string[] = ["USDC", "USDT"]; // Whitelisted USD stablecoins

  const fetchBalances = async (): Promise<void> => {
    if (!account?.address) return;

    const balancePromises = Object.entries(currencies).map(
      async ([symbol, currency]: [string, SimpleToken]) => {
        const contract = getContract({
          client: client,
          chain: polygon,
          address: currency.contractAddress,
          abi: currency.abi,
        });

        try {
          const result = await readContract({
            contract,
            method: "function balanceOf(address) view returns (uint256)",
            params: [account.address],
          });

          const balance =
            Number(result || 0) / numberWithZeros(currency.decimals);

          if (balance > 0) {
            return {
              symbol,
              balance,
              currency: currency.id,
              icon: currency.icon,
              decimals: currency.decimals,
            };
          }
        } catch (error) {
          sendErrorReport(
            `BalanceOverview - Error fetching balance for ${symbol}`,
            error
          );
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

    setBalances(resolvedBalances.sort((a, b) => b.balance - a.balance));
    setTotalEuroBalance(euroBalanceSum);
    setTotalUsdBalance(usdBalanceSum);

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (uhuConfig !== "loading") {
      fetchBalances();
      const interval = setInterval(fetchBalances, 10000);
      return () => clearInterval(interval);
    }
  }, [account, client, uhuConfig, loading]);

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
      ></UniversalModal>

      <UniversalModal
        isOpen={isSuccessPopupOpen}
        closeModal={() => {
          setIsSuccessPopupOpen(false);
        }}
        type="success"
        title={t("exchange_success_title")}
        message={t("exchange_success_message")}
      ></UniversalModal>

      <ConvertPopup
        show={isConverterOpen}
        closeModal={() => {
          setIsConverterOpen(false);
        }}
        token={currencies["EURS"]}
        targetToken={currencies["USDC"]}
        onSuccess={() => {
          fetchBalances();
          setIsConverterOpen(false);
          setIsSuccessPopupOpen(true);
        }}
        showSwapButton={true}
      ></ConvertPopup>

      <div className="flex flex-col items-center md:items-start bg-uhuGray shadow-md w-full rounded-lg p-6">
        <div className="flex justify-between md:justify-start w-full mb-4 gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span
              className={`text-5xl font-bold ${loading && "animate-pulse"}`}
            >
              {isClient && formatNumberWithCurrency(totalEuroBalance, "EUR")}
            </span>
            <span className="text-gray-500">
              {t("BalanceOverview.total_balance_eur")}
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span
              className={`text-5xl font-bold ${loading && "animate-pulse"}`}
            >
              {isClient && formatNumberWithCurrency(totalUsdBalance, "USD")}
            </span>
            <span className="text-gray-500">
              {t("BalanceOverview.total_balance_usd")}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
          <div
            className="flex flex-row gap-2 items-center text-blue-500 cursor-pointer"
            onClick={() => {
              setIsUSDInfoModalOpen(true);
            }}
          >
            <HiInformationCircle className="h-6 w-6" />
            {tCrossborder("balanceOverview.usdRecomendedButton")}
          </div>
          <div className="flex-1"></div>
          <div
            onClick={() => {
              setIsConverterOpen(true);
            }}
            className={`border hover:bg-gray-200  cursor-pointer rounded px-3 py-1 border-gray-300 ${
              isConverterOpen ? "text-uhuBlue border-uhuBlue" : ""
            }`}
          >
            {tCrossborder("balanceOverview.eurUsdConvert")}
          </div>
          <Link
            href={"/deposit"}
            className={`border hover:bg-gray-200 rounded px-3 py-1 border-gray-300 ${
              router.route === "/deposit" ? "text-uhuBlue border-uhuBlue" : ""
            }`}
          >
            {tCrossborder("balanceOverview.depositBalance")}
          </Link>
          <Link
            href={"/withdraw"}
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
