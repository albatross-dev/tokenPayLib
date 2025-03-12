"use client";

import React, { useState, useEffect, useContext } from "react";
import { formatNumberWithCurrency } from "@/utilities/currencies";
import currencies from "@/tokenPayLib/utilities/crypto/currencies";
import MiniLoader from "@/tokenPayLib/components/UI/MiniLoader";
import numberWithZeros from "@/utilities/numberWithZeros";
import Image from "next/image";

import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { UhuConfigContext } from "@/tokenPayLib/components/contexts/UhuConfigContext";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export default function BalanceOverview() {
  const account = useActiveAccount();
  const [isClient, setIsClient] = useState(false);
  const { uhuConfig } = useContext(UhuConfigContext);
  const { t: tAccount } = useTranslation("wallet");
  const [balances, setBalances] = useState([]);
  const [totalEuroBalance, setTotalEuroBalance] = useState(0);
  const [totalUsdBalance, setTotalUsdBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const euroWhitelist = ["EUROE", "EURS", "UHU"]; // Whitelisted EUR stablecoins
  const usdWhitelist = ["USDC", "USDT"]; // Whitelisted USD stablecoins

  useEffect(() => {
    setIsClient(true);

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

    fetchBalances();

    const interval = setInterval(fetchBalances, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [account, client, uhuConfig, loading]);

  return (
    <div className="flex flex-col items-center md:items-start bg-uhuGray shadow-md w-full rounded-lg p-6">
      <div className="flex justify-between md:justify-start w-full mb-4 gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className={`text-5xl font-bold ${loading && "animate-pulse"}`}>
            {isClient && formatNumberWithCurrency(totalEuroBalance, "EUR")}
          </span>
          <span className="text-gray-500">
            {tAccount("BalanceOverview.total_balance_eur")}
          </span>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <span className={`text-5xl font-bold ${loading && "animate-pulse"}`}>
            {isClient && formatNumberWithCurrency(totalUsdBalance, "USD")}
          </span>
          <span className="text-gray-500">
            {tAccount("BalanceOverview.total_balance_usd")}
          </span>
        </div>

        <div className="flex-1"></div>
        <div>
          <Link
            href={"/withdraw"}
            className="border hover:bg-gray-200 rounded px-3 py-1 border-gray-300"
          >
            {tAccount("withdrawal")}
          </Link>
        </div>
        <div>
          <Link
            href={"/deposit"}
            className="border hover:bg-gray-200 rounded px-3 py-1 border-gray-300"
          >
             {tAccount("deposit")}
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <MiniLoader />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 py-4">
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
              <div className="flex flex-col">
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
