import React, { useState, useEffect, Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useActiveWalletChain, useSwitchActiveWalletChain, useIsAutoConnecting } from "thirdweb/react";
import { Chain, polygon, ethereum, optimism, arbitrum, base, avalanche, bsc } from "thirdweb/chains";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "next-i18next";

// Import chain logos
import POLYGON_LOGO from "@/tokenPayLib/assets/chain-icons/polygon-matic-logo.svg";
import ETHEREUM_LOGO from "@/tokenPayLib/assets/chain-icons/eth-logo.svg";
import OPTIMISM_LOGO from "@/tokenPayLib/assets/chain-icons/op-logo.svg";
import ARBITRUM_LOGO from "@/tokenPayLib/assets/chain-icons/arb-logo.svg";
import BASE_LOGO from "@/tokenPayLib/assets/chain-icons/base-logo.svg";
import AVALANCHE_LOGO from "@/tokenPayLib/assets/chain-icons/avax-logo.svg";
import BSC_LOGO from "@/tokenPayLib/assets/chain-icons/bsc-logo.svg";
import { CheckoutSession, Router } from "../../types/payload-types";
import { ChainDetails } from "../../types/chaindetails.types";
import { ExchangeType } from "../../utilities/exchangeTypes";

const chains: ChainDetails[] = [
  { chainId: 137, name: "Polygon", chain: polygon, logo: POLYGON_LOGO },
  { chainId: 1, name: "Ethereum", chain: ethereum, logo: ETHEREUM_LOGO },
  { chainId: 10, name: "Optimism", chain: optimism, logo: OPTIMISM_LOGO },
  { chainId: 42161, name: "Arbitrum", chain: arbitrum, logo: ARBITRUM_LOGO },
  { chainId: 8453, name: "Base", chain: base, logo: BASE_LOGO },
  //{ chainId: 43114, name: "Avalanche", chain: avalanche, logo: AVALANCHE_LOGO },
  //{ chainId: 56, name: "BSC", chain: bsc, logo: BSC_LOGO },
];

export const chainsBridge: ChainDetails[] = [
  { chainId: 137, name: "Polygon", chain: polygon, logo: POLYGON_LOGO },
  { chainId: 1, name: "Ethereum", chain: ethereum, logo: ETHEREUM_LOGO },
  { chainId: 10, name: "Optimism", chain: optimism, logo: OPTIMISM_LOGO },
  { chainId: 42161, name: "Arbitrum", chain: arbitrum, logo: ARBITRUM_LOGO },
  { chainId: 8453, name: "Base", chain: base, logo: BASE_LOGO },
  //{ chainId: 43114, name: "Avalanche", chain: avalanche, logo: AVALANCHE_LOGO },
  //{ chainId: 56, name: "BSC", chain: bsc, logo: BSC_LOGO },
];

const chainsPublic: ChainDetails[] = [
  { chainId: 137, name: "Polygon", chain: polygon, logo: POLYGON_LOGO },
   { chainId: 1, name: "Ethereum", chain: ethereum, logo: ETHEREUM_LOGO },
   { chainId: 10, name: "Optimism", chain: optimism, logo: OPTIMISM_LOGO },
   { chainId: 42161, name: "Arbitrum", chain: arbitrum, logo: ARBITRUM_LOGO },
   { chainId: 8453, name: "Base", chain: base, logo: BASE_LOGO },
  //{ chainId: 43114, name: "Avalanche", chain: avalanche, logo: AVALANCHE_LOGO },
  //{ chainId: 56, name: "BSC", chain: bsc, logo: BSC_LOGO },
];

const exchangeType: ExchangeType = process.env.NEXT_PUBLIC_EXCHANGE_TYPE as ExchangeType;

type ChainSelectorProps = {
  checkoutSession?: CheckoutSession | undefined;
  chain?: ChainDetails | undefined;
  chainList?: ChainDetails[] | undefined;
  returnOnly?: boolean | undefined;
  onChain?: (chain: ChainDetails) => void | undefined;
};

/**
 * ChainSelector component allows users to select a blockchain network from a dropdown menu.
 */
const ChainSelector: React.FC<ChainSelectorProps> = ({
  checkoutSession,
  chain,
  chainList = (exchangeType === "external" ? chainsPublic : chains),
  returnOnly = false,
  onChain = null
}) => {
  const [activeChainDetails, setActiveChainDetails] = useState<ChainDetails | null>(chain);
  const switchChain = useSwitchActiveWalletChain();
  const isAutoConnecting = useIsAutoConnecting();
  const walletChain = useActiveWalletChain();
  const { t } = useTranslation("common");
  const router = checkoutSession?.router as Router;

  useEffect(() => {
    if (!isAutoConnecting && walletChain) {
      setActiveChainDetails(chainList.find(chain => chain.chainId === walletChain.id) || null);
    }
  }, [isAutoConnecting, walletChain, chainList]);

  return (
    <Menu as="div" className="relative inline-block text-left w-full mt-4">
      <MenuButton className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
        <div className="flex items-center">
          {activeChainDetails ? (
            <>
               <Image src={activeChainDetails.logo} alt={activeChainDetails.name} className="h-6 w-6 mr-2" />
              <span className={`${activeChainDetails.main ? 'font-bold' : ''} `}>{activeChainDetails.name}</span>
              {activeChainDetails.chainId === router?.chainId && (
                <span className="ml-2 text-xs text-green-500 font-bold">({t("pay")})</span>
              )}
            </>
          ) : (
            <span>{returnOnly ? t("select") : t("loading")}</span>
          )}
        </div>
        <BiChevronDown className="h-6 w-6 text-gray-700" />
      </MenuButton>
      <MenuItems className="origin-top-right absolute right-0 mt-2 w-full z-[30] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        {chainList.map((chain) => {
          return <MenuItem key={chain.name} as={Fragment}>
            <button
              className={`hover:bg-gray-100 group flex rounded-md items-center w-full px-2 py-2 text-sm ${router?.chainId === chain.chainId ? 'font-bold' : ''}`}
              onClick={() => {
                if (chain.chainId !== walletChain?.id && !returnOnly) {
                  switchChain(chain.chain);
                }
                if (onChain) {
                  setActiveChainDetails(chain);
                  onChain(chain);
                }
              }}
            >
              <Image src={chain.logo} alt={chain.name} className="h-6 w-6 mr-2" />
              <span>{chain.name}</span>
              {router?.chainId === chain.chainId && (
                <span className="ml-2 text-xs text-green-500">({t("pay")})</span>
              )}
            </button>
          </MenuItem>
        })}
      </MenuItems>
    </Menu>
  );
};

export default ChainSelector; 