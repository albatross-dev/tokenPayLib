import Loader from "@/tokenPayLib/components/UI/Loader";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import ErrorPopup from "@/tokenPayLib/components/Modals/ErrorPopup";
import { useActiveAccount, useIsAutoConnecting } from "thirdweb/react";
import axios from "axios";
import { AuthContext } from "@/context/UserContext";
import BalanceOverview from "@/tokenPayLib/components/crossborder/BalanceOverview";
import CurrencyDisplay, {
  STANDARD_STABLE_MAP,
} from "@/tokenPayLib/components/crossborder/CurrencySelector";
import MethodSelector from "@/tokenPayLib/components/crossborder/MethodSelector";
import { FiArrowLeft } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import TransferPanel from "@/tokenPayLib/components/crossborder/TransferPanel";
import FiatReceivingSelector, {
  FIAT_INFO_MAP,
} from "@/tokenPayLib/components/crossborder/FiatReceivingSelector";
import FiatBalanceSelector from "@/tokenPayLib/components/crossborder/FiatBalanceSelector";
import Maintainance from "@/tokenPayLib/components/UI/Maintainance";
import { useUhuConfig } from "@/context/UhuConfigContext";

export default function WithdrawPage({maintenance}) {
  const [state, setState] = useState("loading");
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation("common");
  const { user } = useContext(AuthContext);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [availableMethods, setAvailableMethods] = useState([]);
  const [preferredStableCoin, setPreferredStableCoin] = useState("");
  const [payoutCurrency, setPayoutCurrency] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loadedExchangeRate, setLoadedExchangeRate] = useState(false);

  // TW hooks
  const isAutoConnecting = useIsAutoConnecting();
  const account = useActiveAccount();

  const [maxAmount, setMaxAmount] = useState(0);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null); // Swiper instance


  useEffect(() => {
    async function getCountryData() {
      try {
        let countryRes = await axios.get(
          `/api/countries?where[countryCode][equals]=${user.vendorCountry}`
        );

        if (countryRes.data.docs.length === 0) {
          setErrorMessage({message: "Country not found"});
          setIsErrorPopupOpen(true);
        } else {
          setSelectedCountry(countryRes.data.docs[0]);
          setState("loaded");
        }
      } catch (err) {
        setErrorMessage({ message: "Failed to fetch country data"});
        setIsErrorPopupOpen(true);
      }
    }

    if (user !== "loading") {
      getCountryData();
    }
  }, [user]);

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

  // ####################
  // # Helper Functions #
  // ####################

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
        `Der ausgewählte Betrag übersteigt ihr Guthaben von ${maxAmount} ${
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

  function clearData() {
    setSelectedMethod(null);
    setAmount("");
    setError("");
  }

  // ####################
  // # Render Functions #
  // ####################

  function renderBalanceSelection() {
    return (
      <div className="relative z-[10] p-4  flex flex-col gap-4 mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl">Welches Guthaben möchten Sie auszahlen?</h2>
        {selectedCountry && (
          <FiatBalanceSelector
            availableMethods={selectedCountry?.paymentTypes}
            setAvailableMethods={setAvailableMethods}
            setPreferredStableCoin={(coin) => {
              if (coin) {
                setPreferredStableCoin(coin);
              }
            }}
            swiperInstance={swiperInstance}
            transfer={false}
            nextSlide={1}
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
            setPayoutCurrency={setPayoutCurrency}
            swiperInstance={swiperInstance}
            nextSlide={2}
          ></FiatReceivingSelector>
        )}
      </div>
    );
  }

  function renderTransactionDetailsForm() {
    console.log("selectedMethod", selectedMethod);
    return (
      <div className="relative p-4">
        <div className="relative z-[10] text-darkBlue flex flex-col gap-4 mt-12 max-w-4xl mx-auto">
          <BackButton clearData={clearData}></BackButton>

          <h2 className="text-2xl">
            Sie haben als Zielland {selectedCountry?.countryInfo.name}{" "}
            ausgewählt
          </h2>

          <p className="text-xl font-bold">Guthaben</p>
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
              Bitte wählen Sie einen Betrag aus
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
                Bitte wählen Sie zuerst eine Währung aus.
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
                selectedMethod ? "bg-uhuBlue" : "bg-gray-300"
              } text-white font-bold py-2 px-4 rounded-lg mt-4`}
              disabled={!selectedMethod}
              onClick={() => swiperInstance.slideTo(4)}
            >
              Weiter
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
                    <strong>Hauptstadt:</strong>{" "}
                    {selectedCountry?.countryInfo.capital}
                  </p>
                  <p>
                    <strong>Bevölkerung:</strong>{" "}
                    {selectedCountry?.countryInfo.population.toLocaleString()}
                  </p>
                  <p>
                    <strong>Währung:</strong>{" "}
                    {selectedCountry?.countryInfo.currency}
                  </p>
                  <p>
                    <strong>Bruttoinlandsprodukt:</strong>{" "}
                    {selectedCountry?.countryInfo.gdp.toLocaleString()} USD
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
        Zurück
      </button>
    );
  }

  // ################
  // # Render Logic #
  // ################

  if (!account && !isAutoConnecting) {
    return (
      <div className="p-10 bg-white w-full flex flex-col">
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
          {t("no_wallet")}
        </div>
      </div>
    );
  }

  return (
    <>
      <ErrorPopup
        isOpen={isErrorPopupOpen}
        closeModal={() => setIsErrorPopupOpen(false)}
        errorMessage={errorMessage}
      ></ErrorPopup>

      <div className="flex flex-col max-w-7xl w-full mx-auto p-4 md:p-10 gap-4">
        <div>
          <BalanceOverview></BalanceOverview>
          <h1 className="text-xl font-bold mt-4">Guthaben auszahlen</h1>
        </div>

        <div className="border rounded w-full p-4 relative">
          {maintenance?.withdraw?.page && (
            <Maintainance></Maintainance>
          )}
          {state === "loading" && (
            <div className="flex h-full items-center justify-center mb-16 w-full">
              <Loader></Loader>
            </div>
          )}
          {state === "loaded" && (
            <Swiper
              onSwiper={setSwiperInstance} // Capture Swiper instance
              allowTouchMove={false} // Disable swipe gestures
              spaceBetween={50}
              slidesPerView={1}
            >
              {/* Slide 1: Select fiat currency to send (we act like all the crypto stable coins are one) */}
              <SwiperSlide>
                {({ isActive }) => (isActive ? renderBalanceSelection() : null)}
              </SwiperSlide>

              {/* Slide 2: Select currency for receiving party */}
              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? renderCurrencyConversionSelection() : null
                }
              </SwiperSlide>

              {/* Slide 3: Country Details */}
              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? renderTransactionDetailsForm() : null
                }
              </SwiperSlide>

              {/* Slide 4: Partner */}
              <SwiperSlide>
                {({ isActive }) => (isActive ? renderPartnerPanel() : null)}
              </SwiperSlide>
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
}
