import Loader from "../UI/Loader";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import ErrorPopup from "../Modals/ErrorPopup";
import { useActiveAccount, useIsAutoConnecting } from "thirdweb/react";
import axios from "axios";
import { AuthContext, sendErrorReport } from "../../../context/UserContext";
import BalanceOverview from "../crossborder/BalanceOverview";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { sortMethodByCurrencyDeposit } from "../../utilities/crossborder/sortMethodByCurrency";
import { Country, PaymentTypesArray } from "../../types/payload-types";
import { Swiper as SwiperType } from 'swiper';
import Banner from "../UI/Banner";
import Maintenance from "../UI/Maintenance";

// Import slide components
import CryptoSelectionSlide from "./slides/CryptoSelectionSlide";
import FiatSelectionSlide from "./slides/FiatSelectionSlide";
import DepositDetailsSlide from "./slides/DepositDetailsSlide";
import DepositSlide from "./slides/DepositSlide";

interface MaintenanceProps {
  deposit?: {
    page?: boolean;
  };
}

interface DepositPageProps {
  maintenance?: MaintenanceProps;
}

interface ErrorMessage {
  message: string;
  component: React.ReactNode;
}

export default function DepositPage({ maintenance }: DepositPageProps) {
  const { t } = useTranslation("common");
  const { user } = useContext(AuthContext);
  // TW hooks
  const isAutoConnecting = useIsAutoConnecting();
  const account = useActiveAccount();

  // The country of the user
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  // A object mapping available currencies to an array of methods for the specific currency
  const [methodsByCurrency, setMethodsByCurrency] = useState<Record<string, PaymentTypesArray>>({});
  // The method the user selected for its deposit
  const [selectedMethod, setSelectedMethod] = useState<PaymentTypesArray[number] | null>(null);
  // The currency the user wants to receive
  const [preferredStableCoin, setPreferredStableCoin] = useState<string | null>(null);
  // The currency in which the user wants to pay
  const [preferredFiatCurrency, setPreferredFiatCurrency] = useState<string>("");
  // The amount the user wants to receive
  const [amount, setAmount] = useState<number>(0);

  const [error, setError] = useState<string>("");
  const [state, setState] = useState<string>("loading");
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  const { t: tCrossborder } = useTranslation("crossborder");

  // The swiper instance
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Methods that are available for the preferred stable coin
  const availableMethodsForStableCoin = preferredStableCoin
    ? methodsByCurrency[preferredStableCoin]
    : null;

  // All fiat currencies that are available for the available Methods
  const availableFiatCurrencies = availableMethodsForStableCoin
    ? Array.from(new Set(
        availableMethodsForStableCoin
          .map((method) => method.currencies)
          .flat()
          .map(({ currency }) => currency)
      ))
    : [];

  // All deposit methods that support the preferredStableCoin and the prefferedFiatTransaction
  const availableDepositMethods = preferredFiatCurrency
    ? availableMethodsForStableCoin?.filter((method) =>
        method.currencies.find(
          ({ currency }) => currency === preferredFiatCurrency
        )
      ) || []
    : [];

  // ###################
  // # Component Logic #
  // ###################

  // Handle amount input
  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>): void {
    let inputAmount = parseFloat(e.target.value);

    if (isNaN(inputAmount) || inputAmount < 0) {
      setAmount(0);
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
  }, [user, t, tCrossborder]);

  // Programmatic slide navigation
  const goToSlide = (index: number): void => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const back = (): void => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

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

  return (
    <>
      <ErrorPopup
        isOpen={isErrorPopupOpen}
        closeModal={() => setIsErrorPopupOpen(false)}
        errorMessage={errorMessage}
      />

      <div className="flex flex-col max-w-7xl w-full mx-auto p-4 md:p-10 gap-4">
        <div>
          <BalanceOverview />
          <h1 className="text-xl font-bold mt-4">
            {tCrossborder("depositPage.heading")}
          </h1>
        </div>

        <div className="border bg-white rounded w-full p-4 relative">
          {maintenance?.deposit?.page && <Maintenance />}
          {state === "loading" && (
            <div className="flex h-full items-center justify-center my-16 w-full">
              <Loader />
            </div>
          )}
          {state === "loaded" && (
            <Swiper
              onSwiper={setSwiperInstance}
              allowTouchMove={false}
              spaceBetween={50}
              slidesPerView={1}
            >
              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? (
                    <CryptoSelectionSlide
                      methodsByCurrency={methodsByCurrency}
                      onSelectCurrency={(currency) => {
                        setPreferredStableCoin(currency);
                        goToSlide(1);
                      }}
                    />
                  ) : null
                }
              </SwiperSlide>

              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? (
                    <FiatSelectionSlide
                      availableFiatCurrencies={availableFiatCurrencies}
                      onSelectCurrency={(currency) => {
                        setPreferredFiatCurrency(currency);
                        goToSlide(2);
                      }}
                      onBack={back}
                    />
                  ) : null
                }
              </SwiperSlide>

              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? (
                    <DepositDetailsSlide
                      selectedCountry={selectedCountry}
                      amount={amount}
                      onAmountChange={handleAmountChange}
                      error={error}
                      availableDepositMethods={availableDepositMethods}
                      selectedMethod={selectedMethod}
                      setSelectedMethod={setSelectedMethod}
                      preferredFiatCurrency={preferredFiatCurrency}
                      preferredStableCoin={preferredStableCoin}
                      onBack={back}
                      onNext={() => goToSlide(3)}
                    />
                  ) : null
                }
              </SwiperSlide>

              <SwiperSlide>
                {({ isActive }) =>
                  isActive ? (
                    <DepositSlide
                      selectedMethod={selectedMethod}
                      amount={amount}
                      preferredFiatCurrency={preferredFiatCurrency}
                      preferredStableCoin={preferredStableCoin}
                      account={account}
                      user={user}
                      selectedCountry={selectedCountry}
                      onBack={back}
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