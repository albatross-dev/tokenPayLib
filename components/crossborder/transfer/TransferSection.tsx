import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useContext, useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { useTranslation } from "next-i18next";
import { ParsedUrlQuery } from "node:querystring";
import filterCountryData from "../../../utilities/crossborder/filterCountryData";
import { RouterQuery } from "./types";

// Import slide components
import { api, AuthContext, sendErrorReport } from "../../../../context/UserContext";
import { FiatCodes } from "../../../types/derivedPayload.types";
import { Country, PaymentTypesArray } from "../../../types/payload-types";
import { getFiatInfoForStableCoin, STANDARD_STABLE_MAP } from "../../../utilities/stableCoinsMaps";
import { Balance } from "../CurrencySelector";
import BalanceSelection from "./slides/BalanceSelection";
import ContinentSelection from "./slides/ContinentSelection";
import CurrencyConversionSelection from "./slides/CurrencyConversionSelection";
import PartnerPanel from "./slides/PartnerPanel";
import TransactionDetailsForm from "./slides/TransactionDetailsForm";

export default function TransferSection() {
  // Next.js router for query parameter handling
  const router = useRouter();
  const { continent, country } = router.query as RouterQuery;

  const [selectedContinent, setSelectedContinent] = useState<string>(continent || "europe");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [countryData, setCountryData] = useState<Country[] | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState<Balance | null>(null);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentTypesArray[number] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [payoutCurrency, setPayoutCurrency] = useState<FiatCodes | "crypto" | null>(null);

  const [availableMethods, setAvailableMethods] = useState<PaymentTypesArray>([]);
  const [preferredStableCoin, setPreferredStableCoin] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [loadedExchangeRate, setLoadedExchangeRate] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const countrySelectRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState<boolean>(false);

  const { t: tCrossborder } = useTranslation("crossborder");

  async function fetchExchangeRate(selectedFiatSymbol: FiatCodes) {
    try {
      console.log("Fetching exchange rate", selectedFiatSymbol, payoutCurrency);
      const response = await api.post(`/api/fiatTransaction/exchangeRate`, {
        startCurrency: selectedFiatSymbol,
        endCurrency: payoutCurrency,
      });

      console.log("Exchange rate response", response.data);
      setExchangeRate(response.data.rate);
    } catch (e) {
      sendErrorReport("TransferSection - Fetching exchange rate failed", e);
      console.error("Error fetching exchange rate:", e);
      return;
    }
    setLoadedExchangeRate(true);
  }

  useEffect(() => {
    const selectedFiatSymbol: FiatCodes | null = getFiatInfoForStableCoin(preferredStableCoin)?.id;
    if (selectedFiatSymbol && payoutCurrency && payoutCurrency !== "crypto" && selectedFiatSymbol !== payoutCurrency) {
      // Fetch exchange rate
      console.log("Fetching exchange rate", selectedFiatSymbol, payoutCurrency);

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
      const countriesResponse = await api.get(`/api/countries?${QueryString.stringify(query)}&limit=1000`);

      console.log("countriesResponse", countriesResponse.data);

      const filteredList = filterCountryData(
        user?.vendorCountry || user?.billingAddress?.country,
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
        const top = (countrySelectRef.current?.getBoundingClientRect().top || 0) + window.scrollY - 100;
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }

      if (country) {
        const foundCountry = filteredList.find((c) => c.countryCode === country);
        if (foundCountry) {
          setSelectedCountry(foundCountry);
          swiperInstance?.slideTo(1);
        }
      }

      setLoading(false);
    }
    if (selectedContinent && swiperInstance) {
      loadCountryData();
    }
  }, [selectedContinent, swiperInstance]);


  function handlePayoutCurrencyUrlParam(currency: string | null) {
    const query = { ...router.query, payoutCoin: currency || undefined };
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  }


  function handleSetPayoutCurrency(currency: FiatCodes) {
    setPayoutCurrency(currency);
    handlePayoutCurrencyUrlParam(currency);
  }

  function setPreferredStableCoinUrlParam(coin: string) {
    const query: RouterQuery = { ...router.query, stableCoin: coin || undefined };
    delete query.payoutCoin;
    router.push(
      {
        pathname: router.pathname,
        query: query as ParsedUrlQuery,
      },
      undefined,
      { shallow: true }
    );
  }

  function handlePreferredStableCoin(coin: string) {
    if (coin) {
      setPreferredStableCoin(coin);
      setPreferredStableCoinUrlParam(coin);
    }
  }

  function handleUrlContinentSelect(continentParam: string) {
    const query: RouterQuery = {
      ...router.query,
      continent: continentParam || undefined,
    };
    // remove country query parameter
    delete query.country;
    delete query.stableCoin;
    delete query.payoutCoin;
    router.push(
      {
        pathname: router.pathname,
        query: query as ParsedUrlQuery,
      },
      undefined,
      { shallow: true }
    );
  }

  function handleContinentSelect(continentParam: string) {
    setSelectedContinent(continentParam);
    handleUrlContinentSelect(continentParam);
    setClicked(true);
  }



  function handleSlideChange() {
    // Scroll to the top of the container or page
    if (containerRef.current) {
      const top = containerRef.current.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleUrlCountrySelect(countryCode: string | undefined) {
    const query: RouterQuery = {
      ...router.query,
      country: countryCode || undefined,
    };
    delete query.stableCoin;
    delete query.payoutCoin;
    router.push(
      {
        pathname: router.pathname,
        query: query as ParsedUrlQuery,
      },
      undefined,
      { shallow: true }
    );
  }

  function handleCountrySelected(countryParam: Country | null) {
    setSelectedCountry(countryParam);
    handleUrlCountrySelect(countryParam?.countryCode);
    setSelectedMethod(null);
    setError("");
    if (swiperInstance) {
      swiperInstance.slideTo(1); // Go to Slide 2
    }
  }



  function clearData() {
    setSelectedMethod(null);
    setAmount("");
    setError("");
  }

  // Handle amount input
  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    
    const inputAmount = parseFloat(e.target.value);

    console.log("handleAmountChange", inputAmount, selectedCurrency?.balance, inputAmount > selectedCurrency?.balance);

    if (selectedMethod?.type !== "crypto") {
      setSelectedMethod(null);
    }

    if (!selectedCurrency) {
      return;
    }

    if (isNaN(inputAmount) || inputAmount < 0) {
      setAmount("");
      setError("");
    } else if (inputAmount > selectedCurrency?.balance) {
      setAmount(e.target.value);
      setError(
        `${tCrossborder("withdrawPage.errors.amountExceedsBalance")} ${selectedCurrency?.balance} ${
          STANDARD_STABLE_MAP[selectedCurrency.currency.toUpperCase()]
            ? STANDARD_STABLE_MAP[selectedCurrency.currency.toUpperCase()]?.symbol
            : selectedCurrency.symbol
        }`
      );
    } else {
      setAmount(e.target.value);
      setError("");
    }
  }

  return (
    <div className="overflow-y-hidden w-full mx-auto relative p-4" ref={containerRef}>
      <Swiper
        onSwiper={setSwiperInstance}
        onSlideChange={()=>handleSlideChange()}
        allowTouchMove={false}
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide>
          {({ isActive }) =>
            isActive ? (
              <ContinentSelection
                loading={loading}
                selectedContinent={selectedContinent}
                countryData={countryData}
                selectedCountry={selectedCountry}
                handleContinentSelect={(c)=>handleContinentSelect(c)}
                handleCountrySelected={(c)=>handleCountrySelected(c)}
              />
            ) : null
          }
        </SwiperSlide>

        <SwiperSlide>
          {({ isActive }) =>
            isActive ? (
              <BalanceSelection
                selectedCountry={selectedCountry}
                availableMethods={availableMethods}
                setAvailableMethods={setAvailableMethods}
                handlePreferredStableCoin={(c)=>handlePreferredStableCoin(c)}
                swiperInstance={swiperInstance}
              />
            ) : null
          }
        </SwiperSlide>

        <SwiperSlide>
          {({ isActive }) =>
            isActive ? (
              <CurrencyConversionSelection
                selectedCountry={selectedCountry}
                availableMethods={availableMethods}
                setSelectedMethod={(m)=>setSelectedMethod(m)}
                setAvailableMethods={setAvailableMethods}
                handleSetPayoutCurrency={(c)=>handleSetPayoutCurrency(c as FiatCodes)}
                swiperInstance={swiperInstance}
              />
            ) : null
          }
        </SwiperSlide>

        <SwiperSlide>
          {({ isActive }) =>
            isActive ? (
              <TransactionDetailsForm
                selectedCountry={selectedCountry}
                selectedCurrency={selectedCurrency}
                selectedMethod={selectedMethod}
                availableMethods={availableMethods}
                preferredStableCoin={preferredStableCoin}
                amount={amount}
                error={error}
                setError={setError}
                maxAmount={maxAmount}
                setMaxAmount={setMaxAmount}
                exchangeRate={exchangeRate}
                loadedExchangeRate={loadedExchangeRate}
                payoutCurrency={payoutCurrency}
                swiperInstance={swiperInstance}
                setSelectedCurrency={setSelectedCurrency}
                handleAmountChange={(e)=>handleAmountChange(e)}
                setSelectedMethod={setSelectedMethod}
                clearData={()=>clearData()}
              />
            ) : null
          }
        </SwiperSlide>

        <SwiperSlide>
          {({ isActive }) =>
            isActive ? (
              <PartnerPanel
                selectedMethod={selectedMethod}
                amount={Number(amount)}
                selectedCountry={selectedCountry}
                preferredStableCoin={preferredStableCoin}
                onBack={() => {
                  if (swiperInstance) {
                    swiperInstance.slideTo(3);
                  }
                }}
              />
            ) : null
          }
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
