import ContinentsMap from "@/tokenPayLib/components/UI/ContinentMap";
import React, { useContext, useEffect, useRef, useState } from "react";
import TransferCountries from "./TransferCountries";
import { FiArrowLeft } from "react-icons/fi";
import MethodSelector from "./MethodSelector";
import QueryString from "qs";
import axios from "axios";
import Loader from "@/tokenPayLib/components/UI/Loader";
import Image from "next/image";
import CurrencyDisplay, { STANDARD_STABLE_MAP } from "./CurrencySelector";
import { useActiveAccount } from "thirdweb/react";
import { AuthContext, sendErrorReport } from "@/context/UserContext";
import TransferPanel from "./TransferPanel";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FiatBalanceSelector from "./FiatBalanceSelector";
import FiatReceivingSelector from "./FiatReceivingSelector";
import { useRouter } from "next/router";
import filterCountryData from "../../utilities/crossborder/filterCountryData";
import { useTranslation } from "next-i18next";
import { FIAT_INFO_MAP } from "@/tokenPayLib/utilities/stableCoinsMaps";

const isDevelopment = process.env.NEXT_PUBLIC_NEXT_ENV === "development"

export default function TransferSection() {
  // Next.js router for query parameter handling
  const router = useRouter();
  const { continent, country, stableCoin, payoutCoin } = router.query;

  const [selectedContinent, setSelectedContinent] = useState(
    continent || "europe"
  );
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null); // Swiper instance
  const [countryData, setCountryData] = useState(null);

  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [maxAmount, setMaxAmount] = useState(0);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payoutCurrency, setPayoutCurrency] = useState(null);

  const [availableMethods, setAvailableMethods] = useState([]);
  const [preferredStableCoin, setPreferredStableCoin] = useState("");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loadedExchangeRate, setLoadedExchangeRate] = useState(false);

  const { t: tCrossborder } = useTranslation("crossborder");

  useEffect(() => {
    let selectedFiatSymbol = STANDARD_STABLE_MAP[preferredStableCoin]?.symbol;
    if (
      selectedFiatSymbol &&
      payoutCurrency &&
      payoutCurrency !== "crypto" &&
      selectedFiatSymbol !== payoutCurrency
    ) {
      // Fetch exchange rate
      console.log("Fetching exchange rate", selectedFiatSymbol, payoutCurrency);

      async function fetchExchangeRate() {
        try {
          const response = await axios.post(
            `/api/fiatTransaction/exchangeRate`,
            {
              startCurrency: selectedFiatSymbol,
              endCurrency: payoutCurrency,
            }
          );

          console.log("Exchange rate response", response.data);
          setExchangeRate(response.data.rate);
        } catch (error) {
          sendErrorReport("TransferSection - Fetching exchange rate failed", error);
          console.error("Error fetching exchange rate:", error);
          return;
        }
        setLoadedExchangeRate(true);
      }
      fetchExchangeRate();
    } else {
      if (payoutCurrency === "crypto") {
        setExchangeRate(1);
        setLoadedExchangeRate(true);
      } else if (
        selectedFiatSymbol &&
        payoutCurrency &&
        selectedFiatSymbol === payoutCurrency
      ) {
        setExchangeRate(1);
        setLoadedExchangeRate(true);
      } else {
        setExchangeRate(0);
        setLoadedExchangeRate(false);
      }
    }
  }, [preferredStableCoin, payoutCurrency]);

  const { user } = useContext(AuthContext);

  const account = useActiveAccount();

  const containerRef = useRef(null);
  const countrySelectRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    async function loadCountryData() {
      setLoading(true);
      const query = {
        where: {
          and: [
            {
              "countryInfo.region": {
                equals: selectedContinent,
              },
            },
          ],
        },
      };
      const countriesResponse = await axios(
        `/api/countries?${QueryString.stringify(query)}`
      );

      let filteredList = filterCountryData(
        user?.vendorCountry || user?.country,
        countriesResponse.data.docs
      );

      // sort filtered list by country name in countryInfo.name
      filteredList.sort((a, b) => {
        if (a?.countryInfo?.name < b?.countryInfo?.name) {
          return -1;
        }
        if (a?.countryInfo?.name > b?.countryInfo?.name) {
          return 1;
        }
        return 0;
      });

      setCountryData(filteredList);

      if (clicked) {
        const top =
          countrySelectRef.current.getBoundingClientRect().top +
          window.scrollY -
          100;
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }

      if (country) {
        let foundCountry = filteredList.find((c) => c.countryCode === country);
        setSelectedCountry(foundCountry);
        swiperInstance.slideTo(1);
      }

      setLoading(false);
    }
    if (selectedContinent && swiperInstance) {
      loadCountryData();
    }
  }, [selectedContinent, swiperInstance]);

  // ####################
  // # Helper Functions #
  // ####################

  function handleSetPayoutCurrency(currency) {
    setPayoutCurrency(currency);
    handlePayoutCurrencyUrlParam(currency);
  }

  function handlePayoutCurrencyUrlParam(currency) {
    let query = { ...router.query, payoutCoin: currency || undefined };
    router.push(
      {
        pathname: router.pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    );
  }

  function handlePreferedStableCoin(coin) {
    if (coin) {
      setPreferredStableCoin(coin);
      setPreferredStableCoinUrlParam(coin);
    }
  }

  function setPreferredStableCoinUrlParam(coin) {
    let query = { ...router.query, stableCoin: coin || undefined };
    delete query.payoutCoin;
    router.push(
      {
        pathname: router.pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    );
  }

  function handleContinentSelect(continent) {
    setSelectedContinent(continent);
    handleUrlContinentSelect(continent);
    setClicked(true);
  }

  function handleUrlContinentSelect(continent) {
    let query = { ...router.query, continent: continent || undefined };
    // remove country query parameter
    delete query.country;
    delete query.stableCoin;
    delete query.payoutCoin;
    router.push(
      {
        pathname: router.pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    );
  }

  function handleSlideChange() {
    // Scroll to the top of the container or page
    if (containerRef.current) {
      const top =
        containerRef.current.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleCountrySelected(country) {
    setSelectedCountry(country);
    handleUrlCountrySelect(country?.countryCode);
    setSelectedMethod(null);
    setError("");
    if (swiperInstance) {
      swiperInstance.slideTo(1); // Go to Slide 2
    }
  }

  function handleUrlCountrySelect(countryCode) {
    let query = { ...router.query, country: countryCode || undefined };
    delete query.stableCoin;
    delete query.payoutCoin;
    router.push(
      {
        pathname: router.pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    );
  }

  function clearData() {
    setSelectedMethod(null);
    setAmount("");
    setError("");
  }

  // Handle amount input
  function handleAmountChange(e) {
    let inputAmount = parseFloat(e.target.value);

    if (selectedMethod?.type !== "crypto") {
      setSelectedMethod(null);
    }

    if (isNaN(inputAmount) || inputAmount < 0) {
      setAmount("");
      setError("");
    } else if (inputAmount > maxAmount) {
      setAmount(inputAmount);
      setError(
        `${tCrossborder("transferSection.select_amount_to_much")} ${maxAmount} ${
          STANDARD_STABLE_MAP[selectedCurrency.symbol]
            ? STANDARD_STABLE_MAP[selectedCurrency.symbol]?.icon
            : selectedCurrency.name
        }`
      );
    } else {
      setAmount(inputAmount);
      setError("");
    }
  }

  // #####################
  // # Helper Components #
  // #####################

  function BackButton({ clearData }) {
    return (
      <button
        onClick={() => {
          if (clearData) {
            clearData();
          }
          swiperInstance.slideTo(swiperInstance.activeIndex - 1);
        }}
        className="flex relative z-[10] items-center text-uhuBlue hover:text-blue-700 mb-4"
      >
        <FiArrowLeft className="mr-2" />
        {tCrossborder("transferSection.back")}
      </button>
    );
  }

  // ####################
  // # Render Functions #
  // ####################

  function renderContinentSelection() {
    return (
      <>
        <div className="p-4">
          <div className="text-darkBlue flex flex-col items-center gap-4 mt-12">
            <h2 className="text-2xl font-bold">
              {tCrossborder("transferSection.welcome")}
            </h2>
            <p className="text-sm">
              {tCrossborder("transferSection.region_select")}
            </p>
          </div>
          <div className="max-w-4xl w-full h-92 mx-auto mb-8">
            <ContinentsMap
              onClick={handleContinentSelect}
              selectedContinent={selectedContinent}
            />
          </div>

          <div className="w-full" ref={countrySelectRef}>
            {loading ? (
              <div className="flex w-full items-center justify-center">
                <Loader />
              </div>
            ) : (
              <TransferCountries
                countries={countryData}
                selectedContinent={selectedContinent}
                selectedCountry={selectedCountry}
                countrySelected={handleCountrySelected}
              />
            )}
          </div>
        </div>
      </>
    );
  }

  function renderBalanceSelection() {
    return (
      <div className="relative z-[10] p-4  flex flex-col gap-4 mt-12 max-w-4xl mx-auto">
        <BackButton></BackButton>
        <h2 className="text-2xl">
          {tCrossborder("transferSection.ask_for_balance")}
        </h2>
        {selectedCountry && (
          <FiatBalanceSelector
            availableMethods={selectedCountry?.paymentTypes}
            setAvailableMethods={setAvailableMethods}
            setPreferredStableCoin={handlePreferedStableCoin}
            swiperInstance={swiperInstance}
            nextSlide={2}
          ></FiatBalanceSelector>
        )}
      </div>
    );
  }

  function renderCurrencyConversionSelection() {
    return (
      <div className="relative z-[10] p-4 flex flex-col gap-4 mt-12 max-w-4xl mx-auto">
        <BackButton></BackButton>
        {selectedCountry && (
          <FiatReceivingSelector
            availableMethods={availableMethods}
            allMethods={selectedCountry?.paymentTypes}
            setSelectedMethod={setSelectedMethod}
            setAvailableMethods={setAvailableMethods}
            setPayoutCurrency={handleSetPayoutCurrency}
            swiperInstance={swiperInstance}
            nextSlide={3}
          ></FiatReceivingSelector>
        )}
      </div>
    );
  }

  function renderTransactionDetailsForm() {
    return (
      <div className="relative p-4">
        <div className="relative z-[10] text-darkBlue flex flex-col gap-4 mt-12 max-w-4xl mx-auto">
          <BackButton clearData={clearData}></BackButton>

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
              setSelectedCurrency(currency);
              setMaxAmount(max);
              setError(""); // Clear any existing error
            }}
          />

          {/* Betrag auswählen, nur erlauben wenn Währung ausgewählt ist */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">
            {tCrossborder("transferSection.select_amount")}
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
                disabled={!selectedCurrency}
              />
              <div className="absolute right-10 top-0 h-14 flex items-center justify-center font-bold text-xl">
                {STANDARD_STABLE_MAP[selectedCurrency?.symbol]
                  ? STANDARD_STABLE_MAP[selectedCurrency?.symbol]?.icon
                  : selectedCurrency?.name}
              </div>
              <div></div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {!selectedCurrency && (
              <p className="text-red-500 text-sm">
                 {tCrossborder("transferSection.select_amount_first")}
              </p>
            )}
          </div>

          {selectedMethod?.type !== "crypto" && (
            <MethodSelector
              methods={availableMethods}
              selectable={availableMethods && amount > 0}
              amount={amount}
              exchangeRate={exchangeRate}
              loadedExchangeRate={loadedExchangeRate}
              setSelectedMethod={setSelectedMethod}
              selectedMethod={selectedMethod}
              sendingCurrency={STANDARD_STABLE_MAP[preferredStableCoin]}
              finalCurrency={FIAT_INFO_MAP[payoutCurrency]}
            ></MethodSelector>
          )}

          <div className="flex justify-end">
            <button
              className={`${
                selectedMethod && (!error || isDevelopment) ? "bg-uhuBlue" : "bg-gray-300"
              } text-white font-bold py-2 px-4 rounded-lg mt-4`}
              disabled={!selectedMethod || (error && !isDevelopment)}
              onClick={() => swiperInstance.slideTo(4)}
            >
                {tCrossborder("transferSection.next")}
            </button>
          </div>

          <div className="border rounded-lg overflow-hidden  bg-white/90 shadow-md w-full my-16">
            <div className="h-72 w-full relative">
              {selectedCountry?.countryInfo.background && (
                <div className="absolute top-0 z-[1] left-0 w-full h-72">
                  <Image
                    src={selectedCountry?.countryInfo.background?.url}
                    fill={true}
                    objectFit="cover"
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
                    <strong>{tCrossborder("transferSection.capital")}:</strong>{" "}
                    {selectedCountry?.countryInfo.capital}
                  </p>
                  <p>
                    <strong>{tCrossborder("transferSection.population")}:</strong>{" "}
                    {selectedCountry?.countryInfo.population.toLocaleString()}
                  </p>
                  <p>
                    <strong>{tCrossborder("transferSection.currency")}:</strong>{" "}
                    {selectedCountry?.countryInfo.currency}
                  </p>
                  <p className={`${selectedCountry?.countryInfo.gdp ? "" : "hidden"}`}>
                    <strong>{tCrossborder("transferSection.gdp")}:</strong>{" "}
                    {selectedCountry?.countryInfo.gdp}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderPartnerPanel() {
    return (
      <div>
        <div className="relative z-[10] text-darkBlue flex flex-col gap-4 mt-12 max-w-4xl mx-auto">
          <div className="p-4">
            <BackButton></BackButton>
          </div>
          <TransferPanel
            method={selectedMethod}
            amount={amount}
            account={account}
            user={user}
            selectedCountry={selectedCountry}
            selectedMethod={selectedMethod}
            preferredStableCoin={preferredStableCoin}
          ></TransferPanel>
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-y-hidden w-full mx-auto relative"
      ref={containerRef}
    >
      <Swiper
        onSwiper={setSwiperInstance} // Set Swiper instance for programmatic control
        onSlideChange={handleSlideChange} // Triggered when slide changes
        allowTouchMove={false} // Disable swipe gestures
        spaceBetween={50}
        slidesPerView={1}
      >
        {/* Slide 1: Welcome and Continent Selection */}
        <SwiperSlide>
          {({ isActive }) => (isActive ? renderContinentSelection() : null)}
        </SwiperSlide>

        {/* Slide 2: Select fiat currency to send (we act like all the crypto stable coins are one) */}
        <SwiperSlide>
          {({ isActive }) => (isActive ? renderBalanceSelection() : null)}
        </SwiperSlide>

        {/* Slide 3: Select currency for receiving party */}
        <SwiperSlide>
          {({ isActive }) =>
            isActive ? renderCurrencyConversionSelection() : null
          }
        </SwiperSlide>

        {/* Slide 4: Country Details */}
        <SwiperSlide>
          {({ isActive }) => (isActive ? renderTransactionDetailsForm() : null)}
        </SwiperSlide>

        {/* Slide 5: Partner */}
        <SwiperSlide>
          {({ isActive }) => (isActive ? renderPartnerPanel() : null)}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
