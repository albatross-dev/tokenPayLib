"use client";

import React, { useState, useEffect, useContext } from "react";
import { formatNumberWithCurrency } from "@/utilities/currencies";
import currencies, {
  formatCrypto,
} from "@/tokenPayLib/utilities/crypto/currencies";
import MiniLoader from "@/tokenPayLib/components/UI/MiniLoader";
import numberWithZeros from "@/utilities/numberWithZeros";
import Image from "next/image";

import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { UhuConfigContext } from "@/tokenPayLib/components/contexts/UhuConfigContext";
import { useTranslation } from "next-i18next";
import { HiInformationCircle } from "react-icons/hi2";
import UniversalModal from "@/tokenPayLib/components/Modals/UniversalModal";
import { useRouter } from "next/router";
import Link from "next/link";
import ConvertPopup from "./ConverterPopup";
import { sendErrorReport } from "@/context/UserContext";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export default function BalanceOverview() {
  const account = useActiveAccount();
  const [isClient, setIsClient] = useState(false);
  const { uhuConfig } = useContext(UhuConfigContext);
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");
  const [balances, setBalances] = useState([]);
  const [totalEuroBalance, setTotalEuroBalance] = useState(0);
  const [totalUsdBalance, setTotalUsdBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const [isUSDInfoModalOpen, setIsUSDInfoModalOpen] = useState(false);

  const euroWhitelist = ["EUROE", "EURS", "UHU"]; // Whitelisted EUR stablecoins
  const usdWhitelist = ["USDC", "USDT"]; // Whitelisted USD stablecoins

  const fetchBalances = async () => {
    if (!account?.address) return;

    const balancePromises = Object.entries(currencies).map(
      async ([symbol, currency]) => {
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
              currency: currency.currency,
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
        return null; // Return null for currencies with no balance or errors
      }
    );

    const resolvedBalances = (await Promise.all(balancePromises)).filter(
      (balance) => balance !== null
    );

    let euroBalanceSum = 0;
    let usdBalanceSum = 0;

    resolvedBalances.forEach((balance) => {
      if (euroWhitelist.includes(balance.symbol)) {
        euroBalanceSum +=
          balance.symbol === "UHU"
            ? balance.balance * (uhuConfig?.uhuEuroPrice || 0)
            : balance.balance;
      }
      if (usdWhitelist.includes(balance.symbol)) {
        usdBalanceSum += balance.balance;
      }
    });

    setBalances(resolvedBalances.sort((a, b) => b.balance - a.balance));
    setTotalEuroBalance(euroBalanceSum);
    setTotalUsdBalance(usdBalanceSum);

    if (loading) {
      setLoading(false); // Stop the loader after the first fetch
    }
  };

  useEffect(() => {
    setIsClient(true);

    fetchBalances();
    const interval = setInterval(fetchBalances, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
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
