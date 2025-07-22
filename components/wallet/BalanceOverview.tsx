"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { useTranslation } from "next-i18next";
import Link from "next/link";
import { createThirdwebClient } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import MiniLoader from "../UI/MiniLoader";
import currencies from "../../utilities/crypto/currencies";
import { formatNumberWithCurrency } from "../../../utilities/currencies";
import { sendErrorReport } from "../../../context/UserContext";
import fetchBalance from "../../utilities/crypto/fetchBalance";
import numberWithZeros from "../../utilities/math/numberWithZeros";
import { useUhuConfig } from "../contexts/UhuConfigContext";
import { Balance } from "../crossborder/CurrencySelector";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export default function BalanceOverview() {
  const account = useActiveAccount();
  const [isClient, setIsClient] = useState(false);
  const { uhuConfig } = useUhuConfig();
  const { t: tAccount } = useTranslation("wallet");
  const [balances, setBalances] = useState<Balance[] | null>(null);
  const [totalEuroBalance, setTotalEuroBalance] = useState(0);
  const [totalUsdBalance, setTotalUsdBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const euroWhitelist = ["EUROE", "EURS", "UHU"]; // Whitelisted EUR stablecoins
  const usdWhitelist = ["USDC", "USDT"]; // Whitelisted USD stablecoins

  useEffect(() => {
    setIsClient(true);

    if (uhuConfig === "loading") return;

    const fetchBalances = async () => {
      if (!account?.address) return;

      const balancePromises = Object.entries(currencies).map(
        async ([symbol, currency]) => {
          try {
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
          } catch (error) {
            console.error(`Error fetching balance for ${symbol}:`, error);
            sendErrorReport("BalanceOverview - Fetching balance failed", error);
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

    fetchBalances();

    const interval = setInterval(fetchBalances, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [account, client, uhuConfig, loading]);

  return (
    <div className="flex flex-col items-center md:items-start bg-uhuGray shadow-md w-full rounded-lg p-6">
      <div className="flex justify-between md:justify-start w-full mb-4 gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span
            className={`text-5xl font-bold ${
              loading && "loadingPanel"
            }`}
          >
            {isClient && formatNumberWithCurrency(totalEuroBalance, "EUR")}
          </span>
          <span className="text-gray-500">
            {tAccount("BalanceOverview.total_balance_eur")}
          </span>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <span
            className={`text-5xl font-bold ${
              loading && "loadingPanel"
            }`}
          >
            {isClient && formatNumberWithCurrency(totalUsdBalance, "USD")}
          </span>
          <span className="text-gray-500">
            {tAccount("BalanceOverview.total_balance_usd")}
          </span>
        </div>

        <div className="flex-1" />
        <div>
          <Link
            href="/withdraw?source=wallet"
            className="border hover:bg-gray-200 rounded px-3 py-1 border-gray-300"
          >
            {tAccount("withdrawal")}
          </Link>
        </div>
        <div>
          <Link
            href="/deposit?source=wallet"
            className="border hover:bg-gray-200 rounded px-3 py-1 border-gray-300"
          >
            {tAccount("deposit")}
          </Link>
        </div>
      </div>
      {loading || !balances ? (
        <div className="flex justify-center items-center py-4">
          <MiniLoader />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-4">
          {balances.map((balance, index) => (
            <div
              key={index}
              className="flex flex-row gap-4 items-center bg-white rounded-lg p-2 shadow-sm hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={balance.icon}
                  className="h-8 w-8"
                  alt={`${balance.symbol} icon`}
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="font-medium text-sm">{balance.symbol}</span>
                <div
                  className="relative text-sm md:text-base text-gray-500"
                  title={`${balance.balance}`}
                >
                  {isClient && Number(balance.balance).toFixed(5)}
                  {balance.balance.toString().split(".")[1]?.length > 5 && (
                    <span className="absolute left-0 top-full mt-1 hidden group-hover:block text-xs bg-white p-2 border border-gray-200 rounded shadow-md">
                      {balance.balance}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
