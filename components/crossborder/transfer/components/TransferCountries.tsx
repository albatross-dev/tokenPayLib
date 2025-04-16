import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import React from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import AnimateHeight from "react-animate-height";
import { useEffect, useRef, useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useTranslation } from "react-i18next";
import duplicateByPaymentModality from "../../../../utilities/crossborder/duplicateByPaymentModality";
import { Country, PaymentTypesArray } from "../../../../types/payload-types";

interface TransferCountriesProps {
  countries: Country[] | null;
  selectedCountry: Country | null;
  selectedContinent: string;
  countrySelected: (country: Country) => void;
}

export default function TransferCountries({
  countries,
  selectedCountry,
  selectedContinent,
  countrySelected,
}: TransferCountriesProps) {
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<Country[] | null>(
    countries
  );
  const [openCountry, setOpenCountry] = useState<string | null>(
    countries?.length > 0 ? countries[0].countryInfo.name : null
  );

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
    if (
      selectedCountry &&
      containerRefs.current[selectedCountry.countryInfo.name]
    ) {
      containerRefs.current[selectedCountry.countryInfo.name]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setOpenCountry(selectedCountry.countryInfo.name);
    }
  }, [selectedCountry]);

  // React Spring animations for the appear effect
  const springs = useSprings(
    filteredCountries?.length || 0,
    (filteredCountries || []).map(() => ({
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
      config: { tension: 220, friction: 20 },
    }))
  );

  /**
   * payment partner is a list of partners that contains the withdrawModality
   * and an array of fiat currencies (currencies with currency) that are supported by the partner
   * @param {PaymentPartner[]} paymentPartners - an array of payment partners
   * @returns {PaymentTypes} - an object with the withdrawModality as key and an array of fiat currencies as value
   */
  function aggregatePaymentTypeInfo(
    paymentPartners: PaymentTypesArray
  ): PaymentTypesArray {
    let filledInPartners = duplicateByPaymentModality(
      paymentPartners,
      "withdrawModality"
    );
    const paymentTypes = filledInPartners.reduce(
      (acc: PaymentTypesArray[number], partner) => {
        if (!acc[partner.withdrawModality]) {
          acc[partner.withdrawModality] = [];
        }
        // check if the currency is already in the array
        partner.currencies.forEach((currency) => {
          if (
            !acc[partner.withdrawModality].find((c) => c === currency.currency)
          ) {
            acc[partner.withdrawModality].push(currency.currency);
          }
        });
        return acc;
      },
      {}
    );

    return paymentTypes;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg border">
        <div className="flex flex-row justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">{t(selectedContinent)}</h2>

          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={tCrossborder(
                "transferCountries.searchCountryPlaceholder"
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {!filteredCountries || filteredCountries.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {tCrossborder("transferCountries.noSupportedCountries")}
          </div>
        ) : (
          <div>
            {springs.map((style, index) => {
              const country = filteredCountries[index];
              const isOpen = openCountry === country.countryInfo.name;

              const aggregatedPaymentTypes = aggregatePaymentTypeInfo(
                country.paymentTypes as PaymentTypesArray
              );

              return (
                <animated.div style={style} key={country.countryInfo.name}>
                  <Disclosure defaultOpen={isOpen}>
                    {({ open }) => (
                      <div
                        ref={(el) => {
                          if (el)
                            containerRefs.current[country.countryInfo.name] =
                              el;
                        }}
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
                                  (withdrawModality, index) => (
                                    <div key={index}>
                                      <div className="font-bold">
                                        {t(withdrawModality)}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {aggregatedPaymentTypes[
                                          withdrawModality
                                        ].map((currency) => (
                                          <span key={currency}>
                                            {currency}{" "}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="flex justify-end">
                                <button
                                  className="bg-uhuBlue rounded shadow py-1 px-4 text-white font-bold"
                                  onClick={() => countrySelected(country)}
                                >
                                  {tCrossborder(
                                    "transferCountries.selectCountry"
                                  )}
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
  );
}
