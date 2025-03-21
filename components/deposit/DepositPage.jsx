import Loader from "@/tokenPayLib/components/UI/Loader";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import ErrorPopup from "@/tokenPayLib/components/Modals/ErrorPopup";
import { useActiveAccount, useIsAutoConnecting } from "thirdweb/react";
import axios from "axios";
import { AuthContext, sendErrorReport } from "@/context/UserContext";
import BalanceOverview from "@/tokenPayLib/components/crossborder/BalanceOverview";
import { FiArrowLeft } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import currencies from "@/tokenPayLib/utilities/crypto/currencies";
import Image from "next/image";
import DepositPanel from "@/tokenPayLib/components/deposit/DepositPanel";
import DepositMethodSelector from "@/tokenPayLib/components/deposit/DepositMethodSelector";
import { getFiatCurrencySymbol } from "@/tokenPayLib/utilities/stableCoinsMaps";
import { STANDARD_STABLE_MAP } from "@/tokenPayLib/components/crossborder/CurrencySelector";
import Maintainance from "@/tokenPayLib/components/UI/Maintainance";
import { sortMethodByCurrencyDeposit } from "@/tokenPayLib/utilities/crossborder/sortMethodByCurrency";
import Banner from "../UI/Banner";

export default function DepositPage({ maintenance }) {
  const { t } = useTranslation("common");
  const { user } = useContext(AuthContext);
  // TW hooks
  const isAutoConnecting = useIsAutoConnecting();
  const account = useActiveAccount();

  // The country of the user
  const [selectedCountry, setSelectedCountry] = useState({});
  // A object mapping available currencies to an array of methods for the specific currency
  const [methodsByCurrency, setMethodsByCurrency] = useState({});
  // The method the user selected for its deposit
  const [selectedMethod, setSelectedMethod] = useState(null);
  // The currency the user wants to receive
  const [preferredStableCoin, setPreferredStableCoin] = useState(null);
  // The currency in which the user wants to pay
  const [preferredFiatCurrency, setPreferredFiatCurrency] = useState("");
  // The amount the user wants to receive
  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");
  const [state, setState] = useState("loading");
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { t: tCrossborder } = useTranslation("crossborder");

  // The swiper instance
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Methods that are available for the preferred stable coin
  const availableMethodsForStableCoin = preferredStableCoin
    ? methodsByCurrency[preferredStableCoin]
    : null;

  // All fiat currencies that are available for the available Methods
  const availableFiatCurrencies = availableMethodsForStableCoin
    ? [
        ...new Set(
          availableMethodsForStableCoin
            .map((method) => method.currencies)
            .flat()
            .map(({ currency }) => currency)
        ),
      ]
    : null;

  // All deposit methods that support the preferredStableCoin and the prefferedFiatTransaction
  const availableDepositMethods = preferredFiatCurrency
    ? availableMethodsForStableCoin.filter((method) =>
        method.currencies.find(
          ({ currency }) => currency === preferredFiatCurrency
        )
      )
    : null;

  // ###################
  // # Component Logic #
  // ###################

  // Handle amount input
  function handleAmountChange(e) {
    let inputAmount = parseFloat(e.target.value);

    if (isNaN(inputAmount) || inputAmount < 0) {
      setAmount("");
      setError("");
    } else {
      setAmount(inputAmount);
      setError("");
    }
  }

  useEffect(() => {
    async function getCountryData() {
      try {
        let countryRes = await axios.get(
          `/api/countries?where[countryCode][equals]=${user?.vendorCountry || user?.billingAddress?.country}`
        );

        if (countryRes.data.docs.length === 0) {
          setErrorMessage({
            message: tCrossborder("depositPage.errors.countryNotFound"),
            component: (
              <Banner
                href={"/settings"}
                color={"bg-red-400"}
                rounded={"rounded"}
              >
                <div suppressHydrationWarning>{t("no_country")}</div>
              </Banner>
            ),
          });
          setIsErrorPopupOpen(true);
        } else {
          setSelectedCountry(countryRes.data.docs[0]);
          setMethodsByCurrency(
            sortMethodByCurrencyDeposit(countryRes.data.docs[0].paymentTypes)
          );
          setState("loaded");
        }
      } catch (err) {
        sendErrorReport("DepositPage - Fetching country data failed", err);
        setErrorMessage({
          message: tCrossborder("depositPage.errors.fetchCountryData"),
          component: (
            <Banner
              href={"/settings"}
              color={"bg-red-400"}
              rounded={"rounded"}
            >
              <div suppressHydrationWarning>{t("no_country")}</div>
            </Banner>
          ),
        });
        setIsErrorPopupOpen(true);
      }
    }

    if (user !== "loading") {
      getCountryData();
    }
  }, [user]);

  // ####################
  // # Render Functions #
  // ####################

  const renderCryptoSelectionSlide = () => (
    <div className="relative z-[10] p-4 flex flex-col gap-4  max-w-4xl mx-auto">
      <h2 className="text-2xl">
        {tCrossborder("depositPage.cryptoSelection.heading")}
      </h2>
      {Object.keys(methodsByCurrency).map((currency) => {
        console.log("/deposit::index.jsx currency: ", currency);
        let currencyDetails = currencies[currency];
        return (
          <div
            key={currency}
            onClick={() => {
              setPreferredStableCoin(currency);
              goToSlide(1);
            }}
            className="flex items-center border justify-between gap-4 hover:bg-gray-100 p-4 rounded-lg cursor-pointer"
          >
            {STANDARD_STABLE_MAP[currency] ? (
              <div className="flex items-center justify-center bg-uhuBlue text-xl rounded-full text-white font-bold w-10 h-10">
                {STANDARD_STABLE_MAP[currency].icon}
              </div>
            ) : (
              currencyDetails?.icon && <Image
                src={currencyDetails?.icon}
                fill={true}
                alt="currency icon"
              />
            )}
            <h2 className="text-xl font-bold">
              {STANDARD_STABLE_MAP[currency]
                ? STANDARD_STABLE_MAP[currency].symbol
                : currencyDetails?.name.toUpperCase()}
            </h2>
          </div>
        );
      })}
    </div>
  );

  const renderFiatSelectionSlide = () => (
    <div className="relative p-4 z-[10] flex flex-col gap-4  max-w-4xl mx-auto">
      <button
        onClick={back}
        className="flex items-center text-uhuBlue hover:text-blue-700 mb-4"
      >
        <FiArrowLeft className="mr-2" />
        {tCrossborder("depositPage.fiatSelection.back")}
      </button>
      <h2 className="text-2xl">
        {tCrossborder("depositPage.fiatSelection.heading")}
      </h2>
      {/* TODO: Show selection of possible fiat transactions */}
      {availableFiatCurrencies.map((currency) => {
        return (
          <div
            key={currency}
            onClick={() => {
              setPreferredFiatCurrency(currency);
              goToSlide(2);
            }}
            className="flex items-center border justify-between gap-4 hover:bg-gray-100 p-4 rounded-lg cursor-pointer"
          >
            <div className="flex items-center justify-center bg-uhuBlue text-xl rounded-full text-white font-bold w-10 h-10">
              {getFiatCurrencySymbol(currency)}
            </div>
            <h3 className="text-xl font-bold">{currency}</h3>
          </div>
        );
      })}
    </div>
  );

  const renderDepositDetailsSlide = () => (
    <div className="relative z-[10] p-4 flex flex-col gap-4  max-w-4xl mx-auto">
      <button
        onClick={back}
        className="flex items-center text-uhuBlue hover:text-blue-700 mb-4"
      >
        <FiArrowLeft className="mr-2" />
        {tCrossborder("depositPage.fiatSelection.back")}
      </button>
      <h2 className="text-2xl">
        {tCrossborder("depositPage.depositDetails.heading")}{" "}
        {selectedCountry?.countryInfo.name}
      </h2>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">
          {tCrossborder("depositPage.depositDetails.selectAmount")}
        </h2>
        <div className="relative">
          <input
            type="number"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            min="0"
            value={amount}
            onChange={handleAmountChange}
          />
          <div className="absolute right-10 top-0 text-xl font-bold flex items-center justify-center h-full">
            {getFiatCurrencySymbol(preferredFiatCurrency)}
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <DepositMethodSelector
        methods={availableDepositMethods}
        amount={amount}
        setSelectedMethod={setSelectedMethod}
        selectedMethod={selectedMethod}
        startCurrency={preferredFiatCurrency}
        endCurrency={preferredStableCoin}
      />

      <div className="flex justify-end">
        <button
          className={`${
            selectedMethod ? "bg-uhuBlue" : "bg-gray-300"
          } text-white font-bold py-2 px-4 rounded-lg mt-4`}
          disabled={!selectedMethod}
          onClick={() => goToSlide(3)}
        >
          {tCrossborder("depositPage.depositDetails.next")}
        </button>
      </div>
    </div>
  );

  const renderDepositSlide = () => (
    <div className="relative z-[10]  flex flex-col gap-4  max-w-4xl mx-auto">
      <button
        onClick={back}
        className="flex items-center text-uhuBlue hover:text-blue-700 mb-4"
      >
        <FiArrowLeft className="mr-2" />
        {tCrossborder("depositPage.fiatSelection.back")}
      </button>
      <DepositPanel
        method={selectedMethod}
        amount={amount}
        startCurrency={preferredFiatCurrency}
        endCurrency={preferredStableCoin}
        account={account}
        user={user}
        country={selectedCountry}
      ></DepositPanel>
    </div>
  );

  // Check if a wallet is available
  if (!account && !isAutoConnecting) {
    return (
      <div className="p-10 bg-white w-full flex flex-col">
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
          {t("no_wallet")}
        </div>
      </div>
    );
  }

  // Programmatic slide navigation
  const goToSlide = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const back = () => {
    // go back one slide until slide 0
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  console.log("/deposit::index.jsx selectedCountry: ", selectedCountry);
  console.log("/deposit::index.jsx methodsByCurrency: ", methodsByCurrency);
  console.log(
    "/deposit::index.jsx availableMethodsForStableCoin: ",
    availableMethodsForStableCoin
  );
  console.log(
    "/deposit::index.jsx availableFiatCurrencies: ",
    availableFiatCurrencies
  );
  console.log(
    "/deposit::index.js availableDepositMethods:",
    availableDepositMethods
  );
  console.log("/deposit::index.jsx selectedMethod: ", selectedMethod);
  console.log("/deposit::index.jsx preferredStableCoin: ", preferredStableCoin);
  console.log(
    "/deposit::index.jsx preferredFiatCurrency: ",
    preferredFiatCurrency
  );
  console.log("/deposit::index.jsx amount: ", amount);

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
          <h1 className="text-xl font-bold mt-4">
            {tCrossborder("depositPage.heading")}
          </h1>
        </div>

        <div className="border bg-white rounded w-full p-4 relative">
          {maintenance?.deposit?.page && <Maintainance></Maintainance>}
          {state === "loading" && (
            <div className="flex h-full items-center justify-center my-16 w-full">
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
              {/* Slide 1: Select crypto to deposit */}
              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? renderCryptoSelectionSlide() : null
                }
              </SwiperSlide>

              {/* Slide 2: Select fiat to pay with*/}
              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? renderFiatSelectionSlide() : null
                }
              </SwiperSlide>

              {/* Slide 3: Country Details */}
              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? renderDepositDetailsSlide() : null
                }
              </SwiperSlide>

              {/* Slide 4: Deposit Process*/}
              <SwiperSlide>
                {({ isActive }) => (isActive ? renderDepositSlide() : null)}
              </SwiperSlide>
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
}
