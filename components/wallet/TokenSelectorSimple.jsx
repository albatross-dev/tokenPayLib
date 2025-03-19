import React, { useState, useEffect, Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi"; // Import the chevron icon

export default function TokenSelectorSimple({tokens,selectedToken, onSelect}) {

  return (
    <Menu as="div" className="relative inline-block text-left w-full mt-4">
      <MenuButton className={`inline-flex w-full justify-between items-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none`}>
        <div className="flex items-center">
          {selectedToken ?     <>
              <Image src={selectedToken.icon} alt={selectedToken.name} className="h-6 w-6 mr-2" />
              <span className={``}>{selectedToken.name}</span>
            </>: 
                <>
                <div className="h-6 w-6 mr-2 bg-gray-200 rounded-full" />
                <span className={``}>Auswählen</span>
              </>}
    
        </div>
        <BiChevronDown className="h-6 w-6 text-gray-700" /> {/* Chevron Icon */}
      </MenuButton>
      <MenuItems className="origin-top-right absolute right-0 z-[30] mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        {Object.keys(tokens).map((tokenId) => (
          <MenuItem key={tokens[tokenId].name} as={Fragment}>
            <button
              className={`hover:bg-gray-100 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              onClick={() => onSelect(tokens[tokenId])}
            >
              <Image src={tokens[tokenId].icon} alt={tokens[tokenId].name} className="h-6 w-6 mr-2" />
              <span>{tokens[tokenId].name}</span>
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
