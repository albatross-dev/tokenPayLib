import { useTranslation } from "next-i18next";
import React, { useContext, useEffect, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useActiveAccount } from "thirdweb/react";
import { api, AuthContext, sendErrorReport } from "../../../context/UserContext";
import { Country, PaymentTypesArray } from "../../types/payload-types";
import { sortMethodByCurrencyDeposit } from "../../utilities/crossborder/sortMethodByCurrency";
import BalanceOverview from "../crossborder/BalanceOverview";
import ErrorPopup from "../Modals/ErrorPopup";
import Banner from "../UI/Banner";
import Loader from "../UI/Loader";
import Maintenance from "../UI/Maintenance";

// Import slide components
import { FiatCodes } from "../../types/derivedPayload.types";
import CryptoSelectionSlide from "./slides/CryptoSelectionSlide";
import DepositDetailsSlide from "./slides/DepositDetailsSlide";
import { QuotePaymentType } from "./slides/DepositMethodSelector";
import DepositSlide from "./slides/DepositSlide";
import FiatSelectionSlide from "./slides/FiatSelectionSlide";

interface MaintenanceProps {
  deposit?: {
    page?: boolean;
    message?: string;
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
  const account = useActiveAccount();

  // The country of the user
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  // A object mapping available currencies to an array of methods for the specific currency
  const [methodsByCurrency, setMethodsByCurrency] = useState<Record<string, PaymentTypesArray>>({});
  // The method the user selected for its deposit
  const [selectedMethod, setSelectedMethod] = useState<QuotePaymentType | null>(null);
  // The currency the user wants to receive
  const [preferredStableCoin, setPreferredStableCoin] = useState<string | null>(null);
  // The currency in which the user wants to pay
  const [preferredFiatCurrency, setPreferredFiatCurrency] = useState<FiatCodes>();
  // The amount the user wants to receive
  const [amount, setAmount] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [state, setState] = useState<string>("loading");
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  const { t: tCrossborder } = useTranslation("crossborder");

  // The swiper instance
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Methods that are available for the preferred stable coin
  const availableMethodsForStableCoin = preferredStableCoin ? methodsByCurrency[preferredStableCoin] : null;

  // All fiat currencies that are available for the available Methods
  const availableFiatCurrencies = availableMethodsForStableCoin
    ? Array.from(
        new Set(
          availableMethodsForStableCoin
            .map((method) => method.currencies)
            .flat()
            .map(({ currency }) => currency)
        )
      )
    : [];

  // All deposit methods that support the preferredStableCoin and the prefferedFiatTransaction
  const availableDepositMethods = preferredFiatCurrency
    ? availableMethodsForStableCoin?.filter((method) =>
        method.currencies.find(({ currency }) => currency === preferredFiatCurrency)
      ) || []
    : [];

  // ###################
  // # Component Logic #
  // ###################

  // Handle amount input
  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const inputAmount = parseFloat(e.target.value);

    if (Number.isNaN(inputAmount) || inputAmount < 0) {
      setAmount("");
      setError("");
    } else {
      setAmount(inputAmount.toString());
      setError("");
    }
  }

  useEffect(() => {
    async function getCountryData() {
      try {
        const countryRes = await api.get(
          `/api/countries?where[countryCode][equals]=${user?.vendorCountry || user?.billingAddress?.country}`
        );

        if (countryRes.data.docs.length === 0) {
          setErrorMessage({
            message: tCrossborder("depositPage.errors.countryNotFound"),
            component: (
              <Banner href="/settings" color="bg-red-400" rounded="rounded">
                <div suppressHydrationWarning>{t("no_country")}</div>
              </Banner>
            ),
          });
          setIsErrorPopupOpen(true);
        } else {
          setSelectedCountry(countryRes.data.docs[0]);
          setMethodsByCurrency(sortMethodByCurrencyDeposit(countryRes.data.docs[0].paymentTypes));
          setState("loaded");
        }
      } catch (err) {
        sendErrorReport("DepositPage - Fetching country data failed", err);
        setErrorMessage({
          message: tCrossborder("depositPage.errors.fetchCountryData"),
          component: (
            <Banner href="/settings" color="bg-red-400" rounded="rounded">
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

  return (
    <>
      <ErrorPopup isOpen={isErrorPopupOpen} closeModal={() => setIsErrorPopupOpen(false)} errorMessage={errorMessage} />

      <div className="flex flex-col max-w-7xl w-full mx-auto p-4 md:p-10 gap-4">
        <div>
          <BalanceOverview />
          <h1 className="text-xl font-bold mt-4">{tCrossborder("depositPage.heading")}</h1>
        </div>

        <div className="border bg-white rounded w-full p-4 relative">
          {maintenance?.deposit?.page && <Maintenance text={maintenance?.deposit?.message} />}
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
                      onAmountChange={(e) => handleAmountChange(e)}
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
                      amount={Number(amount)}
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
