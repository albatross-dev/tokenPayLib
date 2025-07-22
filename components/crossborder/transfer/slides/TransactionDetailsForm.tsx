import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { SwiperClass } from "swiper/react";
import { FiatCodes } from "../../../../types/derivedPayload.types";
import { CdnMedia, Country, PaymentTypesArray } from "../../../../types/payload-types";
import { getFiatInfo, getFiatInfoForStableCoin } from "../../../../utilities/stableCoinsMaps";
import CurrencyDisplay, { Balance } from "../../CurrencySelector";
import BackButton from "../components/BackButton";
import MethodSelector from "../components/MethodSelector";

interface TransactionDetailsFormProps {
  selectedCountry: Country | null;
  selectedCurrency: Balance | null;
  selectedMethod: PaymentTypesArray[number] | null;
  availableMethods: PaymentTypesArray;
  preferredStableCoin: string;
  amount: string;
  error: string;
  setError: (error: string) => void;
  maxAmount: number;
  setMaxAmount: (max: number) => void;
  exchangeRate: number;
  loadedExchangeRate: boolean;
  payoutCurrency: FiatCodes | "crypto" | null;
  swiperInstance: SwiperClass | null;
  setSelectedCurrency: (currency: Balance | null, max: number) => void;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedMethod: (method: PaymentTypesArray[number] | null) => void;
  clearData: () => void;
}

const isDevelopment = process.env.NEXT_PUBLIC_NEXT_ENV === "development";

export default function TransactionDetailsForm({
  selectedCountry,
  selectedCurrency,
  selectedMethod,
  availableMethods,
  preferredStableCoin,
  amount,
  error,
  setError,
  maxAmount,
  setMaxAmount,
  exchangeRate,
  loadedExchangeRate,
  payoutCurrency,
  swiperInstance,
  setSelectedCurrency,
  handleAmountChange,
  setSelectedMethod,
  clearData,
}: TransactionDetailsFormProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="relative p-4">
      <div className="relative z-[10] text-darkBlue flex flex-col gap-4 max-w-4xl mx-auto">
        <BackButton onBack={() => swiperInstance?.slideTo(2)} clearData={clearData} />

        <h2 className="text-2xl">
          {tCrossborder("transferSection.selected_target_country", {
            country: selectedCountry?.countryInfo.name,
          })}
        </h2>

        <p className="text-xl font-bold">{tCrossborder("transferSection.balance")}</p>
        <CurrencyDisplay
          selectedCurrency={selectedCurrency}
          mainCurrencySymbol={preferredStableCoin}
          onCurrencySelected={(currency, max) => {
            setSelectedCurrency(currency, max);
            setMaxAmount(max);
            setError(""); // Clear any existing error
          }}
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{tCrossborder("transferSection.select_amount")}</h2>
          <div className="relative">
            <input
              type="number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              min="0"
              max={maxAmount}
              value={amount}
              onChange={handleAmountChange}
              disabled={!selectedCurrency}
            />

            <div className="absolute right-10 top-0 h-14 flex items-center justify-center font-bold text-xl">
              {getFiatInfoForStableCoin(selectedCurrency?.symbol || "")
                ? `${getFiatInfoForStableCoin(selectedCurrency?.symbol || "")?.symbol 
                  } (${ 
                  getFiatInfoForStableCoin(selectedCurrency?.symbol || "")?.id 
                  })`
                : selectedCurrency?.symbol}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {!selectedCurrency && (
            <p className="text-red-500 text-sm">{tCrossborder("transferSection.select_amount_first")}</p>
          )}
        </div>

        {selectedMethod?.type !== "crypto" && payoutCurrency !== "crypto" && (
          <MethodSelector
            methods={availableMethods}
            selectable={Boolean(availableMethods && parseFloat(amount) > 0)}
            amount={Number(amount)}
            exchangeRate={exchangeRate}
            loadedExchangeRate={loadedExchangeRate}
            setSelectedMethod={setSelectedMethod}
            selectedMethod={selectedMethod}
            sendingCurrency={getFiatInfoForStableCoin(preferredStableCoin)}
            finalCurrency={getFiatInfo(payoutCurrency)}
          />
        )}

        <div className="flex justify-end">
          <button
            className={`${
              selectedMethod && (!error || isDevelopment) ? "bg-uhuBlue" : "bg-gray-300"
            } text-white font-bold py-2 px-4 rounded-lg mt-4`}
            disabled={!selectedMethod || (error && !isDevelopment)}
            onClick={() => swiperInstance?.slideTo(4)}
          >
            {tCrossborder("transferSection.next")}
          </button>
        </div>

        <div className="border rounded-lg overflow-hidden bg-white/90 shadow-md w-full my-16">
          <div className="h-72 w-full relative">
            {selectedCountry?.countryInfo.background && (
              <div className="absolute top-0 z-[1] left-0 w-full h-72">
                <Image
                  src={(selectedCountry.countryInfo.background as CdnMedia).url}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Country Background"
                />
              </div>
            )}
            <div className="h-24 absolute bottom-0 left-0 z-[2] w-full bg-gradient-to-t from-black" />

            <h2 className="left-8 bottom-0 absolute z-[3] text-white text-3xl font-bold mb-4">
              {selectedCountry?.countryInfo.name}
            </h2>
          </div>

          <div className="p-8">
            <div className="flex flex-col gap-4 sm:flex-row text-gray-700">
              <div className="flex-1">
                <p>{selectedCountry?.countryInfo.fact}</p>
              </div>
              <div className="flex-1 gap-2 flex flex-col">
                <p>
                  <strong>{tCrossborder("transferSection.capital")}:</strong> {selectedCountry?.countryInfo.capital}
                </p>
                <p>
                  <strong>{tCrossborder("transferSection.population")}:</strong>{" "}
                  {selectedCountry?.countryInfo.population.toLocaleString()}
                </p>
                <p>
                  <strong>{tCrossborder("transferSection.currency")}:</strong>{" "}
                  {selectedCountry?.countryInfo.currency[Symbol.for(selectedCountry?.countryInfo.currency)]}
                </p>
                <p className={`${selectedCountry?.countryInfo.gdp ? "" : "hidden"}`}>
                  <strong>{tCrossborder("transferSection.gdp")}:</strong> {selectedCountry?.countryInfo.gdp}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
