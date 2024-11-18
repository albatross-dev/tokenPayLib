
import React, { useState, Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "next-i18next";
import { useFormContext, Controller } from "react-hook-form";

/**
 * CurrencySelector component allows users to select a currency from a dropdown menu.
 * It supports searching and filtering currencies by their symbol or code.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the form field.
 * @param {Array} props.currencies - The list of available currencies.
 * @param {Object} props.control - The control object from react-hook-form.
 * @returns {JSX.Element} The CurrencySelector component.
 */
export default function CurrencySelector({ name, currencies, control }) {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter currencies by symbol or code based on the search term
  const filteredCurrencies = currencies.filter((currency) =>
    currency.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.cCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const selectedCurrency = currencies.find(currency => currency.id === value?.id);

        return (
          <Menu as="div" className="relative inline-block text-left w-full">
            <MenuButton
              className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <div className="flex items-center">
                {selectedCurrency ? (
                  <>
                   <div className="h-6 w-6 font-bold pt-[0.125rem] mr-2 bg-uhuBlue text-white rounded-full items-center justify-center">{selectedCurrency.symbol}</div>
                    <span>{selectedCurrency.cCode}</span>
                  </>
                ) : (
                  <>
                    <div className="h-6 w-6 mr-2 bg-gray-200 rounded-full" />
                    <span>{t("select")}</span>
                  </>
                )}
              </div>
              <BiChevronDown className="h-6 w-6 text-gray-700" />
            </MenuButton>

            <MenuItems className="origin-top-right absolute right-0 z-[30] mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {/* Search Input */}
              <div className="p-2">
                <input
                  type="text"
                  placeholder={t("search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Scrollable Currency List */}
              <div className="max-h-60 overflow-y-auto">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((currency) => (
                    <MenuItem key={currency.id} as={Fragment}>
                      <button
                        className="hover:bg-gray-100 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                        onClick={() => onChange(currency)} // update form field value
                      >
                         <div className="h-6 w-6 font-bold pt-[0.125rem] mr-2 bg-uhuBlue text-white rounded-full items-center justify-center">{currency.symbol}</div>
                        <span> {currency.cCode}</span>
                      </button>
                    </MenuItem>
                  ))
                ) : (
                  <div className="px-2 py-2 text-sm text-gray-500">{t("no_results")}</div>
                )}
              </div>
            </MenuItems>
          </Menu>
        );
      }}
    />
  );
}