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
import UniversalModal from "@/tokenPayLib/components/Modals/UniversalModal";
import { HiInformationCircle } from "react-icons/hi2";
import ConvertPopup from "./ConverterPopup";
import { max } from "date-fns";
import { convertAnyToAnyDirect } from "@/tokenPayLib/utilities/crypto/convertAnyToAny";

export const STANDARD_STABLE_MAP = {
  USDC: { symbol: "USD", icon: "$" },
  EURS: { symbol: "EUR", icon: "€" },
};

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

async function getBalance(account, symbol, currency) {
  if (!account) return null;

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

    const balance = Number(result || 0) / numberWithZeros(currency.decimals);

    return {
      symbol,
      balance,
      currency: currency.currency,
      icon: currency.icon,
      decimals: currency.decimals,
    };
  } catch (error) {
    console.error(`Error fetching balance for ${symbol}:`, error);
  }
  return null; // Return null for currencies with no balance or errors
}

export default function CurrencyDisplay({
  onCurrencySelected,
  mainCurrencySymbol,
  selectedCurrency,
}) {
  const account = useActiveAccount();
  const [isClient, setIsClient] = useState(false);
  const { uhuConfig } = useContext(UhuConfigContext);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t: tCrossborder } = useTranslation("crossborder");

  const [mainCurrency, setMainCurrency] = useState(null);
  const [alternateCoinInfoOpen, setAlternateCoinInfoOpen] = useState(false);

  const [convertCurrency, setConvertCurrency] = useState(null);
  const [maxConvBalance, setMaxConvBalance] = useState(0);
  const [isConverterOpen, setIsConverterOpen] = useState(false);

  async function getMainCurrencyBalance() {
    let c = currencies[mainCurrencySymbol];
    let cBalance = await getBalance(account, mainCurrencySymbol, c);
    if (cBalance) {
      setMainCurrency(cBalance);
      onCurrencySelected(cBalance, cBalance.balance);
    }
  }

  const fetchBalances = async () => {
    if (!account?.address) return;

    const balancePromises = Object.entries(currencies).map(
      async ([symbol, currency]) => {
        let balance = await getBalance(account, symbol, currency);
        return balance;
      }
    );
    let resolvedBalances = (await Promise.all(balancePromises)).filter(
      (balance) => balance !== null
    );
    // allow only balances bigger 0.0001
    resolvedBalances = resolvedBalances.filter(
      (balance) => balance.balance > 0.0001
    );

    // blacklist some currencies
    let blacklist = ["UHU", mainCurrencySymbol];
    resolvedBalances = resolvedBalances.filter(
      (balance) => !blacklist.includes(balance.symbol)
    );

    setBalances(resolvedBalances.sort((a, b) => b.balance - a.balance));

    if (loading) {
      setLoading(false); // Stop the loader after the first fetch
    }
  };

  useEffect(() => {
    if (mainCurrencySymbol) {
      getMainCurrencyBalance();
    }
  }, [mainCurrencySymbol, account]);

  useEffect(() => {
    setIsClient(true);

    fetchBalances();

    const interval = setInterval(fetchBalances, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [account, client, uhuConfig, loading, mainCurrencySymbol]);

  const handleConvertClick = (currency, balance) => {
    setConvertCurrency(currency);
    setMaxConvBalance(balance);
    setIsConverterOpen(true);
  };

  return (
    <>
      <UniversalModal
        isOpen={alternateCoinInfoOpen}
        closeModal={() => {
          setAlternateCoinInfoOpen(false);
        }}
        type='info'
        title='Lorem'
        message='Ipsum'
      ></UniversalModal>
      <ConvertPopup
        show={isConverterOpen}
        closeModal={() => {
          setIsConverterOpen(false);
        }}
        onSuccess={() => {
          fetchBalances();
          getMainCurrencyBalance();
        }}
        token={currencies[convertCurrency]}
        targetToken={currencies[mainCurrencySymbol]}
        maxAmount={maxConvBalance}
      ></ConvertPopup>

      <div className='w-full'>
        {loading || mainCurrency === null ? (
          <div className='flex flex-col gap-2 justify-center items-center py-4 w-full'>
            <div className='flex p-4 border w-full rounded'>
              <div className='flex text-xl font-bold items-center gap-2 flex-1'>
                <MiniLoader />
                <div className='w-12 h-4 animate-pulse rounded bg-gray-200'></div>
              </div>
              <div className='flex flex-row items-center font-bold gap-6'>
                <div className='w-12 h-4 animate-pulse rounded bg-gray-200'></div>
              </div>
            </div>
            <div
              className={`flex h-12 w-full bg-uhuGray flex-rоw gap-4 items-center animate-pulse rounded-lg p-2 shadow-sm `}
            ></div>
          </div>
        ) : (
          <div>
            <div className='flex p-4 border rounded'>
              <div className='flex text-xl font-bold items-center gap-2 flex-1'>
                {STANDARD_STABLE_MAP[mainCurrency?.symbol] ? (
                  <div className='w-8 h-8 flex items-center justify-center bg-uhuBlue text-white rounded-full'>
                    {STANDARD_STABLE_MAP[mainCurrency?.symbol].icon}
                  </div>
                ) : (
                  <Image
                    src={mainCurrency?.icon}
                    className='h-4 w-4 bg-white rounded-full'
                    alt={`${mainCurrency?.symbol} icon`}
                    width={32}
                    height={32}
                  />
                )}
                {STANDARD_STABLE_MAP[mainCurrency?.symbol] ? (
                  <div>{STANDARD_STABLE_MAP[mainCurrency?.symbol].symbol}</div>
                ) : (
                  <div className='font-medium text-sm'>
                    {mainCurrency?.symbol}
                  </div>
                )}
              </div>
              <div className='flex flex-row items-center font-bold gap-6'>
                <div className=''>
                  {isClient && Number(mainCurrency?.balance).toFixed(5)}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 py-4 max-h-72 overflow-auto'>
              {balances.map((balance, index) => (
                <div
                  key={index}
                  className={`flex flex-rоw gap-4 items-center  rounded-lg p-2 shadow-sm  ${
                    selectedCurrency?.symbol === balance.symbol
                      ? "bg-uhuBlue text-white"
                      : "bg-uhuGray hover:bg-gray-50"
                  }`}
                >
                  <div className='flex items-center gap-2 flex-1'>
                    {STANDARD_STABLE_MAP[balance.symbol] ? (
                      <div className='w-6 h-6 flex items-center justify-center bg-uhuBlue text-white rounded-full'>
                        {STANDARD_STABLE_MAP[balance.symbol].icon}
                      </div>
                    ) : (
                      <Image
                        src={balance.icon}
                        className='h-6 w-6 bg-white rounded-full'
                        alt={`${balance.symbol} icon`}
                        width={32}
                        height={32}
                      />
                    )}

                    {STANDARD_STABLE_MAP[balance.symbol] ? (
                      <div>{STANDARD_STABLE_MAP[balance.symbol].symbol}</div>
                    ) : (
                      <div className='flex flex-row items-center gap-2 font-medium text-sm'>
                        {balance.symbol}
                        <div
                          className='flex flex-row gap-2 items-center text-gray-500 cursor-pointer'
                          onClick={() => {
                            setAlternateCoinInfoOpen(true);
                          }}
                        >
                          <HiInformationCircle className='h-6 w-6' />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='flex flex-row items-center  gap-6'>
                    <div className='text-sm md:text-base'>
                      {isClient && Number(balance.balance).toFixed(5)}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      handleConvertClick(
                        balance.symbol,
                        Number(balance.balance)
                      );
                    }}
                    className='px-2 py-1 bg-uhuBlue cursor-pointer rounded-full font-bold text-white'
                  >
                    {tCrossborder("durrencyDisplay.convert")}
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
