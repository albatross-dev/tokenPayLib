import axios from "axios";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useActiveAccount } from "thirdweb/react";
import { sendErrorReport, useAuth } from "../../../context/UserContext";
import currencies from "../../../utilities/currencies";
import { FiatCodes } from "../../types/derivedPayload.types";
import { Consumer, Country, PaymentTypesArray, Vendor } from "../../types/payload-types";
import { SimpleToken } from "../../types/token.types";
import { STANDARD_STABLE_MAP } from "../../utilities/stableCoinsMaps";
import BalanceOverview from "../crossborder/BalanceOverview";
import ErrorPopup from "../Modals/ErrorPopup";
import Banner from "../UI/Banner";
import Loader from "../UI/Loader";
import BalanceSelectionSlide from "./slides/BalanceSelectionSlide";
import CurrencyConversionSlide from "./slides/CurrencyConversionSlide";
import PartnerPanelSlide from "./slides/PartnerPanelSlide";
import TransactionDetailsSlide from "./slides/TransactionDetailsSlide";
import { WithdrawPageProps } from "./types";
import Maintenance from "../UI/Maintenance";

function WithdrawPage({ maintenance }: WithdrawPageProps) {
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");
  const { user } = useAuth() as { user: Consumer | Vendor | null | "loading" };
  const account = useActiveAccount();

  const [state, setState] = useState<"loading" | "loaded">("loading");
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    component: React.ReactNode;
  } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<SimpleToken | null>();
  const [availableMethods, setAvailableMethods] = useState<PaymentTypesArray>([]);
  const [preferredStableCoin, setPreferredStableCoin] = useState<string>("");
  const [payoutCurrency, setPayoutCurrency] = useState<FiatCodes | "crypto" | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [loadedExchangeRate, setLoadedExchangeRate] = useState<boolean>(false);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentTypesArray[number] | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    async function getCountryData() {
      try {
        const countryRes = await axios.get(
          `/api/countries?where[countryCode][equals]=${
            (user as Vendor)?.vendorCountry || (user as Consumer)?.billingAddress?.country
          }`
        );

        if (countryRes.data.docs.length === 0) {
          setErrorMessage({
            message: tCrossborder("withdrawPage.errors.countryNotFound"),
            component: (
              <Banner href="/settings" color="bg-red-400" rounded="rounded">
                <div suppressHydrationWarning>{t("no_country")}</div>
              </Banner>
            ),
          });
          setIsErrorPopupOpen(true);
        } else {
          setSelectedCountry(countryRes.data.docs[0]);
          setState("loaded");
        }
      } catch (err) {
        setErrorMessage({
          message: tCrossborder("withdrawPage.errors.fetchCountryData"),
          component: (
            <Banner href="/settings" color="bg-red-400" rounded="rounded">
              <div suppressHydrationWarning>{t("no_country")}</div>
            </Banner>
          ),
        });
        sendErrorReport("WithdrawPage - Fetching country data failed", err);
        setIsErrorPopupOpen(true);
      }
    }

    if (user !== "loading") {
      getCountryData();
    }
  }, [user, t, tCrossborder]);

  async function fetchExchangeRate(selectedFiatSymbol: FiatCodes) {
    try {
      const response = await axios.post("/api/fiatTransaction/exchangeRate", {
        startCurrency: selectedFiatSymbol,
        endCurrency: payoutCurrency,
      });

      console.log("Exchange rate response", response.data);
      setExchangeRate(response.data.rate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      sendErrorReport("WithdrawPage - Fetching exchange rate failed", error);
      return;
    }
    setLoadedExchangeRate(true);
  }

  useEffect(() => {
    const selectedFiatSymbol = STANDARD_STABLE_MAP[preferredStableCoin]?.id;
    if (selectedFiatSymbol && payoutCurrency && payoutCurrency !== "crypto" && selectedFiatSymbol !== payoutCurrency) {
      fetchExchangeRate(selectedFiatSymbol);
    } else if (payoutCurrency === "crypto") {
      setExchangeRate(1);
      setLoadedExchangeRate(true);
    } else if (selectedFiatSymbol && payoutCurrency && selectedFiatSymbol === payoutCurrency) {
      setExchangeRate(1);
      setLoadedExchangeRate(true);
    } else {
      setExchangeRate(0);
      setLoadedExchangeRate(false);
    }
  }, [preferredStableCoin, payoutCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(e.target.value);

    if (selectedMethod?.type !== "crypto") {
      setSelectedMethod(null);
    }

    if (!selectedCurrency) {
      return;
    }

    if (isNaN(inputAmount) || inputAmount < 0) {
      setAmount("");
      setError("");
    } else if (inputAmount > maxAmount) {
      setAmount(inputAmount.toString());
      setError(
        `${tCrossborder("withdrawPage.errors.amountExceedsBalance")} ${maxAmount} ${
          STANDARD_STABLE_MAP[selectedCurrency.id.toUpperCase()]
            ? STANDARD_STABLE_MAP[selectedCurrency.id.toUpperCase()]?.symbol
            : selectedCurrency.id
        }`
      );
    } else {
      setAmount(inputAmount.toString());
      setError("");
    }
  };

  const clearData = () => {
    setSelectedMethod(null);
    setAmount("");
    setError("");
  };

  const goToSlide = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const back = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  return (
    <>
      <ErrorPopup isOpen={isErrorPopupOpen} closeModal={() => setIsErrorPopupOpen(false)} errorMessage={errorMessage} />

      <div className="flex flex-col max-w-7xl w-full mx-auto p-4 md:p-10 gap-4">
        <div>
          <BalanceOverview />
          <h1 className="text-xl font-bold mt-4">{tCrossborder("withdrawPage.heading")}</h1>
        </div>

        <div className="border bg-white rounded w-full p-4 relative">
          {maintenance?.dashboard?.withdraw?.page && (
            <Maintenance text={maintenance?.dashboard?.withdraw?.message} fullPage />
          )}
          {state === "loading" && (
            <div className="flex h-full items-center justify-center my-16 w-full">
              <Loader />
            </div>
          )}
          {state === "loaded" && (
            <Swiper onSwiper={setSwiperInstance} allowTouchMove={false} spaceBetween={50} slidesPerView={1}>
              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? (
                    <BalanceSelectionSlide
                      selectedCountry={selectedCountry!}
                      setAvailableMethods={setAvailableMethods}
                      setPreferredStableCoin={(coin: string) => {
                        (setPreferredStableCoin(coin),
                          setSelectedCurrency(currencies[coin as keyof typeof currencies]));
                      }}
                      swiperInstance={swiperInstance}
                      goToSlide={goToSlide}
                      back={back}
                    />
                  ) : null
                }
              </SwiperSlide>

              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? (
                    <CurrencyConversionSlide
                      selectedCountry={selectedCountry!}
                      availableMethods={availableMethods}
                      setSelectedMethod={setSelectedMethod}
                      setAvailableMethods={setAvailableMethods}
                      setPayoutCurrency={setPayoutCurrency}
                      swiperInstance={swiperInstance}
                      goToSlide={goToSlide}
                      back={back}
                    />
                  ) : null
                }
              </SwiperSlide>

              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? (
                    <TransactionDetailsSlide
                      selectedCountry={selectedCountry!}
                      selectedCurrency={selectedCurrency}
                      preferredStableCoin={preferredStableCoin}
                      payoutCurrency={payoutCurrency}
                      maxAmount={maxAmount}
                      setMaxAmount={setMaxAmount}
                      amount={amount}
                      handleAmountChange={handleAmountChange}
                      error={error}
                      account={account}
                      availableMethods={availableMethods}
                      exchangeRate={exchangeRate}
                      loadedExchangeRate={loadedExchangeRate}
                      setSelectedMethod={setSelectedMethod}
                      selectedMethod={selectedMethod}
                      clearData={clearData}
                      swiperInstance={swiperInstance}
                      goToSlide={goToSlide}
                      back={back}
                    />
                  ) : null
                }
              </SwiperSlide>

              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? (
                    <PartnerPanelSlide
                      selectedMethod={selectedMethod!}
                      amount={amount}
                      account={account}
                      user={user as Consumer | Vendor}
                      selectedCountry={selectedCountry!}
                      preferredStableCoin={preferredStableCoin}
                      swiperInstance={swiperInstance}
                      goToSlide={goToSlide}
                      back={back}
                    />
                  ) : null
                }
              </SwiperSlide>
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
}

export default WithdrawPage;
