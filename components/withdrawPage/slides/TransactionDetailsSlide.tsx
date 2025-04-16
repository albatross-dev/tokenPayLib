import React from "react";
import { useTranslation } from "next-i18next";
import { FiArrowLeft } from "react-icons/fi";
import Image from "next/image";
import { TransactionDetailsSlideProps } from "../types";
import {
  getFiatInfo,
  getFiatInfoForStableCoin,
  STANDARD_STABLE_MAP,
} from "../../../utilities/stableCoinsMaps";
import CurrencyDisplay from "../../crossborder/CurrencySelector";
import MethodSelector from "../../crossborder/transfer/components/MethodSelector";
import { CdnMedia } from "../../../types/payload-types";
import { FiatCodes } from "../../../types/derivedPayload.types";

const TransactionDetailsSlide: React.FC<TransactionDetailsSlideProps> = ({
  selectedCountry,
  selectedCurrency,
  preferredStableCoin,
  maxAmount,
  setMaxAmount,
  payoutCurrency,
  amount,
  handleAmountChange,
  error,
  availableMethods,
  exchangeRate,
  loadedExchangeRate,
  setSelectedMethod,
  goToSlide,
  selectedMethod,
  clearData,
  back,
}) => {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="relative p-4">
      <div className="relative z-[10] text-darkBlue flex flex-col gap-4 max-w-4xl mx-auto">
        <button
          onClick={() => {
            if (clearData) {
              clearData();
            }
            back();
          }}
          className="flex relative z-[10] items-center text-uhuBlue hover:text-blue-700 mb-4"
        >
          <FiArrowLeft className="mr-2" />
          {tCrossborder("withdrawPage.backButton")}
        </button>

        <h2 className="text-2xl">
          {tCrossborder("withdrawPage.transactionDetails.selectedCountry")}{" "}
          {selectedCountry?.countryInfo.name}{" "}
          {tCrossborder("withdrawPage.transactionDetails.selectedCountry2")}
        </h2>

        <p className="text-xl font-bold">
          {tCrossborder("withdrawPage.transactionDetails.balance")}
        </p>
        <CurrencyDisplay
          selectedCurrency={selectedCurrency}
          mainCurrencySymbol={preferredStableCoin}
          onCurrencySelected={(currency, max) => {
            setMaxAmount(max);
          }}
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">
            {tCrossborder("withdrawPage.transactionDetails.selectAmount")}
          </h2>
          <div className="relative">
            <input
              type="number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              min="0"
              max={maxAmount}
              value={amount}
              onChange={handleAmountChange}
            />

            <div className="absolute right-10 top-0 h-14 flex items-center justify-center font-bold text-xl">
              {selectedMethod?.type === "crypto"
                ? getFiatInfoForStableCoin[preferredStableCoin]?.symbol
                : getFiatInfoForStableCoin(selectedCurrency?.id.toUpperCase())
                ? getFiatInfoForStableCoin(selectedCurrency?.id.toUpperCase())
                    ?.symbol
                : selectedCurrency?.name}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {selectedMethod?.type !== "crypto" && (
          <MethodSelector
            methods={availableMethods}
            selectable={availableMethods && Number(amount) > 0}
            amount={Number(amount)}
            exchangeRate={exchangeRate}
            loadedExchangeRate={loadedExchangeRate}
            setSelectedMethod={setSelectedMethod}
            selectedMethod={selectedMethod}
            sendingCurrency={STANDARD_STABLE_MAP[preferredStableCoin]}
            finalCurrency={getFiatInfo(payoutCurrency as FiatCodes)}
          />
        )}

        <div className="flex justify-end">
          <button
            className={`${
              selectedMethod ? "bg-uhuBlue" : "bg-gray-300"
            } text-white font-bold py-2 px-4 rounded-lg mt-4`}
            disabled={!selectedMethod}
            onClick={() => goToSlide(4)}
          >
            {tCrossborder("withdrawPage.transactionDetails.next")}
          </button>
        </div>

        <div className="border rounded-lg overflow-hidden bg-white/90 shadow-md w-full my-16">
          <div className="h-72 w-full relative">
            {selectedCountry?.countryInfo.background && (
              <div className="absolute top-0 z-[1] left-0 w-full h-72">
                <Image
                  src={
                    (selectedCountry?.countryInfo.background as CdnMedia).url
                  }
                  fill={true}
                  objectFit="cover"
                  alt="Country background"
                />
              </div>
            )}
            <div className="h-24 absolute bottom-0 left-0 z-[2] w-full bg-gradient-to-t from-black"></div>

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
                  <strong>
                    {tCrossborder("withdrawPage.transactionDetails.capital")}
                  </strong>{" "}
                  {selectedCountry?.countryInfo.capital}
                </p>
                <p>
                  <strong>
                    {tCrossborder("withdrawPage.transactionDetails.population")}
                  </strong>{" "}
                  {selectedCountry?.countryInfo.population?.toLocaleString()}
                </p>
                <p>
                  <strong>
                    {tCrossborder("withdrawPage.transactionDetails.currency")}
                  </strong>{" "}
                  {
                    selectedCountry?.countryInfo.currency[
                      Symbol.for(selectedCountry?.countryInfo.currency)
                    ]
                  }
                </p>
                <p>
                  <strong>
                    {tCrossborder("withdrawPage.transactionDetails.gdp")}
                  </strong>{" "}
                  {selectedCountry?.countryInfo.gdp?.toLocaleString()} USD
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsSlide;
