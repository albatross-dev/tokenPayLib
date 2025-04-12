import React, { Fragment, useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "next-i18next";
import countriesISO from "i18n-iso-countries";
import { ALL_COUNTRIES, ALL_COUNTRIES_N } from "../../utilities/CountriesConfig";
import Tooltip from "@/tokenPayLib/components/UI/ToolTip";

interface Country {
  name: string;
  flag: string;
  iso: string;
  restrictions?: boolean;
}

interface CountryDictionary {
  [key: string]: Country;
}

export const SupportedCountries: CountryDictionary = {
  DE: { name: "Deutschland", flag: "🇩🇪", iso: "DE" },
  AT: { name: "Österreich", flag: "🇦🇹", iso: "AT" },
  BE: { name: "Belgien", flag: "🇧🇪", iso: "BE" },
  CY: { name: "Zypern", flag: "🇨🇾", iso: "CY" },
  EE: { name: "Estland", flag: "🇪🇪", iso: "EE" },
  ES: { name: "Spanien", flag: "🇪🇸", iso: "ES" },
  FI: { name: "Finnland", flag: "🇫🇮", iso: "FI" },
  FR: { name: "Frankreich", flag: "🇫🇷", iso: "FR" },
  GR: { name: "Griechenland", flag: "🇬🇷", iso: "GR" },
  IE: { name: "Irland", flag: "🇮🇪", iso: "IE" },
  IT: { name: "Italien", flag: "🇮🇹", iso: "IT" },
  LT: { name: "Litauen", flag: "🇱🇹", iso: "LT" },
  LU: { name: "Luxemburg", flag: "🇱🇺", iso: "LU" },
  LV: { name: "Lettland", flag: "🇱🇻", iso: "LV" },
  MT: { name: "Malta", flag: "🇲🇹", iso: "MT" },
  NL: { name: "Niederlande", flag: "🇳🇱", iso: "NL" },
  PT: { name: "Portugal", flag: "🇵🇹", iso: "PT" },
  SI: { name: "Slowenien", flag: "🇸🇮", iso: "SI" },
  SK: { name: "Slowakei", flag: "🇸🇰", iso: "SK" },
};

interface CountrySelectorProps {
  countries?: CountryDictionary;
  selectedCountry?: Country | string;
  onSelect: (country: Country | string) => void;
  onlyIso?: boolean;
  disabled?: boolean;
  validCountries?: string[];
}

/**
 * CountrySelector component renders a dropdown menu for selecting a country.
 * 
 * important! included this in the _app.js

import countriesISO from 'i18n-iso-countries';

// Register a locale (e.g., English)
import enLocale from "i18n-iso-countries/langs/en.json";
import deLocale from "i18n-iso-countries/langs/de.json";
import frLocale from "i18n-iso-countries/langs/fr.json";

countriesISO.registerLocale(enLocale); // Register the language you need
countriesISO.registerLocale(deLocale); // Register the language you need
countriesISO.registerLocale(frLocale); // Register the language you need
 * 
 * @param {CountrySelectorProps} props - The component props.
 * @returns {JSX.Element} The rendered CountrySelector component.
 */
export default function CountrySelector({
  countries = ALL_COUNTRIES_N,
  selectedCountry,
  onSelect,
  onlyIso = false,
  disabled,
  validCountries,
}: CountrySelectorProps): JSX.Element {
  const { t, i18n } = useTranslation("common");
  const [displayCountries, setDisplayCountries] = useState<CountryDictionary>(countries);

  // if selectedCountry is a string then we need to find the country object
  let selectedCountryObj: Country | undefined;
  if (typeof selectedCountry === "string") {
    selectedCountryObj = countries[selectedCountry];
  } else {
    selectedCountryObj = selectedCountry;
  }

  useEffect(() => {
    if (countries && Array.isArray(validCountries)) {
      const filteredCountries = Object.keys(countries).reduce<CountryDictionary>((acc, key) => {
        if (validCountries.includes(countries[key].iso)) {
          acc[key] = countries[key];
        }
        return acc;
      }, {});
      setDisplayCountries(filteredCountries);
    } else {
      setDisplayCountries(countries);
    }
  }, [validCountries, countries]);

  function select(country: string | null): void {
    if (onlyIso) {
      onSelect(country || "");
    } else {
      onSelect(country ? countries[country] : "");
    }
  }

  return disabled ? (
    <div className="inline-flex justify-start items-center w-full rounded-md border border-gray-200 px-2 py-2 bg-gray-50 text-sm font-medium text-gray-500">
      <div className="mr-2">{selectedCountryObj?.flag}</div>
      <div>{selectedCountryObj?.iso && countriesISO.getName(selectedCountryObj.iso, i18n.language)}</div>
      <div></div>
    </div>
  ) : (
    <Menu as="div" className="relative inline-block text-left w-full">
      <MenuButton
        className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <div className="flex items-center">
          {selectedCountryObj ? (
            <>
              <span className="mr-2">{selectedCountryObj.flag}</span>
              <span>
                {countriesISO.getName(selectedCountryObj.iso, i18n.language)}
              </span>
            </>
          ) : (
            <>
              <span className="h-6 w-6 mr-2 bg-gray-200 rounded-full" />
              <span>{t("selectCountry")}</span>
            </>
          )}
        </div>
        <BiChevronDown className="h-6 w-6 text-gray-700" />
      </MenuButton>
      <MenuItems className="origin-top-right absolute right-0 z-[30] mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="h-72 overflow-auto">
          {Object.keys(displayCountries).map((countryId) => (
            <MenuItem key={displayCountries[countryId].name} as={Fragment}>
              <button
                className="hover:bg-gray-100 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                onClick={() => select(countryId)}
              >
                <span className="mr-2">{displayCountries[countryId].flag}</span>
                <span>{countriesISO.getName(countryId, i18n.language)}</span>
                {displayCountries[countryId].restrictions && (
                  <Tooltip text="Restrictions Apply"></Tooltip>
                )}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
} 