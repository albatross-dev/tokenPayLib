import React, { useState, Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "next-i18next";

export default function TokenSelector({ tokens, selectedToken, onSelect }) {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tokens by name or id based on the search term
  const filteredTokens = Object.keys(tokens).filter((tokenId) => {
    const token = tokens[tokenId];
    return (
      tokenId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (token.name && token.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <Menu as="div" className="relative inline-block text-left w-full mt-4">
      <MenuButton
        className={`inline-flex w-full justify-between items-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none`}
      >
        <div className="flex items-center">
          {selectedToken ? (
            <>
              <Image src={selectedToken.icon} alt={selectedToken.name} className="h-6 w-6 mr-2" />
              <span>{selectedToken.name}</span>
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

        {/* Scrollable Token List */}
        <div className="max-h-60 overflow-y-auto">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((tokenId) => (
              <MenuItem key={tokenId} as={Fragment}>
                <button
                  className="hover:bg-gray-100 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                  onClick={() => onSelect(tokens[tokenId])}
                >
                  {tokens[tokenId].icon?<Image src={tokens[tokenId].icon} alt={tokens[tokenId].name} className="h-6 w-6 mr-2" />:<div className="h-6 w-6 mr-2 bg-gray-500 rounded-full"></div>}
                  <span>{tokens[tokenId]?.name || tokenId}</span>
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
}

