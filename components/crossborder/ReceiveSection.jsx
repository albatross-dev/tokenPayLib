import React, { use, useContext, useEffect, useRef, useState } from "react";
import QueryString from "qs";
import axios from "axios";
import Loader from "@/tokenPayLib/components/UI/Loader";
import ContinentsMap from "@/tokenPayLib/components/UI/ContinentMap";
import WalletQRCode from "@/tokenPayLib/components/UI/WalletQRCode";
import { useSprings, animated } from "@react-spring/web";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import AnimateHeight from "react-animate-height";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import UniversalModal from "@/tokenPayLib/components/Modals/UniversalModal";
import AddressDisplay from "@/tokenPayLib/components/UI/AddressDisplay";
import { useActiveAccount } from "thirdweb/react";
import { AuthContext, sendErrorReport } from "@/context/UserContext";
import { LogLevel } from "@/tokenPayLib/utilities/error-reporter/reporter";
import LoadingButton from "@/tokenPayLib/components/UI/LoadingButton";
import duplicateByPaymentModality from "@/tokenPayLib/utilities/crossborder/duplicateByPaymentModality";

function CountriesInfo({
  countries,
  selectedCountry,
  selectedContinent,
  countrySelected,
}) {
  const containerRefs = useRef({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [isCountryInfoOpen, setIsCountryInfoOpen] = useState(false);
  const [openCountry, setOpenCountry] = useState(
    countries?.length > 0 ? countries[0].countryInfo.name : null
  ); // Initialize with the first country by default

  const [modalSelectedCountry, setModalSelectedCountry] = useState(null);

  const [isLoading, setIsLoading] = useState("normal");

  const account = useActiveAccount();

  const { user } = useContext(AuthContext)
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder"); 
  

  useEffect(() => {
    setFilteredCountries(
      countries?.filter((country) =>
        country.countryInfo.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, countries]);

  useEffect(() => {
    if (containerRefs.current[selectedCountry]) {
      containerRefs.current[selectedCountry].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setOpenCountry(selectedCountry);
    }
  }, [selectedCountry]);

  // React Spring animations for the appear effect
  const springs = useSprings(
    filteredCountries?.length || 0,
    filteredCountries?.map(() => ({
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
      config: { tension: 220, friction: 20 },
    }))
  );

  /**
   * payment partner is a list of partners that contains the withdrawModality
   * and an array of fiat currencies (currencies with currency) that are supported by the partner
   * @param {Array} paymentPartners - an array of payment partners
   * @returns {Object} - an object with the withdrawModality as key and an array of fiat currencies as value
   */
  function aggregatePaymentTypeInfo(paymentPartners) {
    let filledInPartners = duplicateByPaymentModality(paymentPartners, "withdrawModality");
    const paymentTypes = filledInPartners.reduce((acc, partner) => {
      if (!acc[partner.withdrawModality]) {
        acc[partner.withdrawModality] = [];
      }
      // check if the currency is already in the array
      partner.currencies.forEach((currency) => {
        if (
          !acc[partner.withdrawModality].find((c) => c === currency.currency)
        ) {
          acc[partner.withdrawModality].push({
            currency: currency.currency,
            partner: partner,
          });
        }
      });
      return acc;
    }, {});
    return paymentTypes;
  }

  return (
    <>
      <UniversalModal
        isOpen={isCountryInfoOpen}
        closeModal={() => {
          setIsCountryInfoOpen(false);
        }}
        title={`Geld aus Zielland ${modalSelectedCountry?.countryInfo.name} empfangen`}
        message={<div className="my-4 flex flex-col gap-4">
          {tCrossborder("receiveSection.thankyou")}
          <AddressDisplay concat={false} value={account?.address} />
          <LoadingButton isLoading={isLoading} onClick={async()=>{
          try {
            setIsLoading("processing");
            let timeStamp = new Date().toISOString();
            await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/message`, {
              timestamp: timeStamp,
              loggerName: "Support Logger",
              level: LogLevel.INFO,
              message: `User ${user.email} requested a transaction support for country ${modalSelectedCountry?.countryInfo.name}`,
            });
            // set on success for 5 seconds
            setIsLoading("success");
            setTimeout(() => {
              setIsLoading("normal");
            }, 5000);
          } catch (error) {
            sendErrorReport("ReceiveSection - Requesting support failed", error);
            setIsLoading("error");
          }
        }}>{tCrossborder("receiveSection.helpRequested")}</LoadingButton>
        </div>}
      ></UniversalModal>
      <div className="w-full max-w-4xl mx-auto mb-16">
        <div className="bg-white shadow-md rounded-lg border">
          <div className="flex flex-row justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold">{t(selectedContinent)}</h2>

            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {filteredCountries?.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              {tCrossborder("receiveSection.notSupported")}
            </div>
          ) : (
            <div>
              {springs.map((style, index) => {
                const country = filteredCountries[index];
                const isOpen = openCountry === country.countryInfo.name;

                const aggregatedPaymentTypes = aggregatePaymentTypeInfo(
                  country.paymentTypes
                );

                return (
                  <animated.div style={style} key={country.countryInfo.name}>
                    <Disclosure defaultOpen={isOpen}>
                      {({ open }) => (
                        <div
                          ref={(el) =>
                            (containerRefs.current[country.countryInfo.name] =
                              el)
                          }
                          className="border-b"
                        >
                          <DisclosureButton
                            className="w-full flex items-center justify-between py-3 px-4 text-left font-medium"
                            onClick={() =>
                              setOpenCountry((prev) =>
                                prev === country.countryInfo.name
                                  ? null
                                  : country.countryInfo.name
                              )
                            }
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center rounded-full w-6 h-6 font-bold text-sm text-white bg-darkBlue">
                                {country.countryCode}
                              </div>
                              <div>{country.countryInfo.name}</div>
                            </div>
                            <FiChevronDown
                              className={`w-6 h-6 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </DisclosureButton>

                          <AnimateHeight
                            duration={300}
                            height={isOpen ? "auto" : 0}
                          >
                            <DisclosurePanel static>
                              <div className="flex flex-col p-4 bg-gray-100">
                                <div className="text-gray-700 flex flex-col gap-2">
                                  {Object.keys(aggregatedPaymentTypes).map(
                                    (withdrawModality, index) => {

                                      // Get the partner with the smallest fee
                                      const minimumFeePartner =
                                        aggregatedPaymentTypes[withdrawModality]
                                          ?.length
                                          ? aggregatedPaymentTypes[
                                              withdrawModality
                                            ].reduce((prev, current) =>
                                              prev.partner.fee <
                                              current.partner.fee
                                                ? prev
                                                : current
                                            )
                                          : null; // Return null if the array is empty

                                      // Get the partner with the smallest minAmount
                                      const minimumAmountPartner =
                                        aggregatedPaymentTypes[withdrawModality]
                                          ?.length
                                          ? aggregatedPaymentTypes[
                                              withdrawModality
                                            ].reduce((prev, current) =>
                                              prev.partner.minAmount <
                                              current.partner.minAmount
                                                ? prev
                                                : current
                                            )
                                          : null; // Return null if the array is empty

                                      // get unique currencies
                                      let currencies = [];
                                      aggregatedPaymentTypes[
                                        withdrawModality
                                      ].forEach((currency) => {
                                        if (
                                          !currencies.includes(
                                            currency.currency
                                          )
                                        ) {
                                          currencies.push(currency.currency);
                                        }
                                      });

                                      return (
                                        <div
                                          key={index}
                                          className="flex flex-row justify-between"
                                        >
                                          <div className="flex flex-col ">
                                            <div className="font-bold">
                                              {t(withdrawModality)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                              {currencies.map((currency) => (
                                                <span key={currency}>
                                                  {currency}{" "}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                          <div
                                            className={`flex flex-col `}
                                          >
                                            <div className={`${minimumFeePartner?"":"hidden"} `}>
                                            {tCrossborder("receiveSection.feeFrom")}
                                              
                                              <span className="text-gray-500 font-bold">
                                                {" "}
                                                {minimumFeePartner?.partner.fee}%
                                              </span>
                                            </div>
                                            <div className={`${minimumFeePartner?"":"hidden"} `}>
                                            {tCrossborder("receiveSection.min")}
                                              <span className="text-gray-500 font-bold">
                                                {" "}
                                                {
                                                  minimumAmountPartner?.partner.minAmount
                                                }
                                                {" "} {minimumAmountPartner?.currency}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                                <div className="flex justify-end">
                                  <button
                                    className="bg-uhuBlue rounded shadow py-1 px-4 text-white font-bold"
                                    onClick={() => {
                                      setModalSelectedCountry(country)
                                      console.log("country", country);
                                      setIsCountryInfoOpen(true);
                                    }}
                                  >
                                     {tCrossborder("receiveSection.selectReceivingCountry")}
                                    
                                  </button>
                                </div>
                              </div>
                            </DisclosurePanel>
                          </AnimateHeight>
                        </div>
                      )}
                    </Disclosure>
                  </animated.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function ReceiveSection() {
  const [selectedContinent, setSelectedContinent] = useState("europe");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countryData, setCountryData] = useState(null);

  const { t: tCrossborder } = useTranslation("crossborder");

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

      console.log("countriesResponse", countriesResponse.data.docs);

      // sort by countryInfo.name
      countriesResponse.data.docs.sort((a, b) => {
        if (a.countryInfo.name < b.countryInfo.name) {
          return -1;
        }
        if (a.countryInfo.name > b.countryInfo.name) {
          return 1;
        }
        return 0;
      });
      

      setCountryData(countriesResponse.data.docs);
      setLoading(false);
    }
    if (selectedContinent) {
      loadCountryData();
    }
  }, [selectedContinent]);

  function handleCountrySelect(continent) {
    setSelectedContinent(continent);
  }

  function handleCountrySelected(country) {
    setSelectedCountry(country);
    setAmount("");
    setSelectedMethod(null);
    setError("");
  }

  return (
    <div className="p-4 w-full">
      <div className="text-darkBlue flex flex-col items-center gap-4 mt-12">
        <h2 className="text-2xl font-bold">
        {tCrossborder("receiveSection.welcome")}
          
        </h2>
      </div>

      <TabGroup className="flex-1 flex flex-col mt-4">
        <TabList className="flex-wrap rounded-lg flex gap-2">
          <div className="relative flex-1">
            <Tab className="flex-1 data-[selected]:bg-uhuBlue rounded p-2 border-2 border-uhuBlue data-[selected]:text-white w-full h-full">
            {tCrossborder("receiveSection.receiveFiat")}
              
            </Tab>
          </div>
          <div className="relative flex-1">
            <Tab className="flex-1 data-[selected]:bg-uhuBlue rounded p-2 border-2 border-uhuBlue data-[selected]:text-white w-full h-full">
              
            {tCrossborder("receiveSection.receiveCrypto")}
            </Tab>
          </div>
        </TabList>
        <TabPanels className="overflow-hidden  mt-2 flex-1 flex flex-col">
          <TabPanel className="relative">
            <div className="text-darkBlue flex flex-col items-center gap-4 mt-12">
              <p className="text-sm">{tCrossborder("receiveSection.selectRegionFirst")}</p>
            </div>
            <div className="max-w-4xl w-full h-92 mx-auto mb-8">
              <ContinentsMap
                onClick={handleCountrySelect}
                selectedContinent={selectedContinent}
              />
            </div>

            {loading ? (
              <div className="flex w-full mb-16 items-center justify-center">
                <Loader />
              </div>
            ) : (
              <CountriesInfo
                countries={countryData}
                selectedContinent={selectedContinent}
                selectedCountry={selectedCountry}
                countrySelected={handleCountrySelected}
              />
            )}
          </TabPanel>
          <TabPanel className="relative">
            <WalletQRCode></WalletQRCode>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
