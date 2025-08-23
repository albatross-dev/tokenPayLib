import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { arbitrum, base, ethereum, polygon } from "thirdweb/chains";
import { useActiveWalletChain, useIsAutoConnecting, useSwitchActiveWalletChain } from "thirdweb/react";

// Import chain logos
import ARBITRUM_LOGO from "@/tokenPayLib/assets/chain-icons/arb-logo.svg";
import BASE_LOGO from "@/tokenPayLib/assets/chain-icons/base-logo.svg";
import ETHEREUM_LOGO from "@/tokenPayLib/assets/chain-icons/eth-logo.svg";
import OPTIMISM_LOGO from "@/tokenPayLib/assets/chain-icons/op-logo.svg";
import POLYGON_LOGO from "@/tokenPayLib/assets/chain-icons/polygon-matic-logo.svg";
import { Router } from "../../types/payload-types";
import {
  ARBITRUM_CHAIN,
  BASE_CHAIN,
  ETHEREUM_CHAIN,
  OPTIMISM_CHAIN,
  POLYGON_CHAIN,
} from "../../utilities/crypto/chains";
import { ExchangeType } from "../../utilities/exchangeTypes";
import { showErrorPopup } from "../Modals/ErrorPrompt";
import { ChainDetails, ChainSelectorProps } from "./types";

export type ChainID = 137 | 1 | 10 | 42161 | 8453 | 43114 | 56;

const chains: ChainDetails[] = [
  { chainId: 137, name: "Polygon", chain: POLYGON_CHAIN, logo: POLYGON_LOGO },
  { chainId: 1, name: "Ethereum", chain: ETHEREUM_CHAIN, logo: ETHEREUM_LOGO },
  {
    chainId: 10,
    name: "Optimism",
    chain: OPTIMISM_CHAIN,
    logo: OPTIMISM_LOGO,
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    chain: ARBITRUM_CHAIN,
    logo: ARBITRUM_LOGO,
  },
  { chainId: 8453, name: "Base", chain: BASE_CHAIN, logo: BASE_LOGO },
  // { chainId: 43114, name: "Avalanche", chain: avalanche, logo: AVALANCHE_LOGO },
  // { chainId: 56, name: "BSC", chain: bsc, logo: BSC_LOGO },
];

export const chainsBridge: ChainDetails[] = [
  { chainId: 137, name: "Polygon", chain: POLYGON_CHAIN, logo: POLYGON_LOGO },
  { chainId: 1, name: "Ethereum", chain: ETHEREUM_CHAIN, logo: ETHEREUM_LOGO },
  {
    chainId: 10,
    name: "Optimism",
    chain: OPTIMISM_CHAIN,
    logo: OPTIMISM_LOGO,
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    chain: ARBITRUM_CHAIN,
    logo: ARBITRUM_LOGO,
  },
  { chainId: 8453, name: "Base", chain: BASE_CHAIN, logo: BASE_LOGO },
  // { chainId: 43114, name: "Avalanche", chain: avalanche, logo: AVALANCHE_LOGO },
  // { chainId: 56, name: "BSC", chain: bsc, logo: BSC_LOGO },
];

const chainsPublic: ChainDetails[] = [
  { chainId: 137, name: "Polygon", chain: polygon, logo: POLYGON_LOGO },
  { chainId: 1, name: "Ethereum", chain: ethereum, logo: ETHEREUM_LOGO },
  {
    chainId: 10,
    name: "Optimism",
    chain: OPTIMISM_CHAIN,
    logo: OPTIMISM_LOGO,
  },
  { chainId: 42161, name: "Arbitrum", chain: arbitrum, logo: ARBITRUM_LOGO },
  { chainId: 8453, name: "Base", chain: base, logo: BASE_LOGO },
  // { chainId: 43114, name: "Avalanche", chain: avalanche, logo: AVALANCHE_LOGO },
  // { chainId: 56, name: "BSC", chain: bsc, logo: BSC_LOGO },
];

const exchangeType: ExchangeType = process.env.NEXT_PUBLIC_EXCHANGE_TYPE as ExchangeType;

/**
 * ChainSelector component allows users to select a blockchain network from a dropdown menu.
 */
const ChainSelector: React.FC<ChainSelectorProps> = ({
  checkoutSession,
  chain = null,
  chainList = exchangeType === "external" ? chainsPublic : chains,
  returnOnly = false,
  onChain = null,
  disabled = false,
}) => {
  const [activeChainDetails, setActiveChainDetails] = useState<ChainDetails | null>(chain || null);
  const switchChain = useSwitchActiveWalletChain();
  const isAutoConnecting = useIsAutoConnecting();
  const walletChain = useActiveWalletChain();
  const { t } = useTranslation("common");
  const router = checkoutSession?.router as Router;

  useEffect(() => {
    if (!isAutoConnecting && walletChain) {
      setActiveChainDetails(chainList.find((chain) => chain.chainId === walletChain.id) || null);
    }
  }, [isAutoConnecting, walletChain, chainList]);

  async function handleSwitchChain(chain: ChainDetails, retryCounter = 0) {
    if (chain.chainId !== walletChain?.id && !returnOnly) {
      try {
        await switchChain(chain.chain);
        if (onChain) {
          setActiveChainDetails(chain);
          onChain(chain);
        }
      } catch (error) {
        console.log("error", error);
        if (error instanceof Error && error.message.includes("User rejected the request")) {
          return;
        }
        showErrorPopup({
          titleKey: t("wallet.switchChainError"),
          messageKeyOrText: t("wallet.switchChainErrorDescription"),
          details: {
            error: error instanceof Error ? error : new Error(String(error)),
          },
          action: {
            buttonText: t("wallet.switchChainErrorButton"),
            onAction: () => {
              if (retryCounter > 2) {
                showErrorPopup({
                  titleKey: t("tooManyRetries.title"),
                  messageKeyOrText: t("tooManyRetries.description"),
                });
                return;
              }
              handleSwitchChain(chain, retryCounter + 1);
            },
          },
        });
      }
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left w-full mt-4">
      <MenuButton
        disabled={disabled}
        className={`inline-flex w-full justify-between items-center rounded-md border shadow-sm px-2 py-2 text-sm font-medium focus:outline-none ${
          disabled
            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center">
          {activeChainDetails ? (
            <>
              <Image src={activeChainDetails.logo} alt={activeChainDetails.name} className="h-6 w-6 mr-2" />
              <span className={`${activeChainDetails.main ? "font-bold" : ""} `}>{activeChainDetails.name}</span>
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
        {chainList.map((chain: ChainDetails) => (
            <MenuItem key={chain.name} as={Fragment}>
              <button
                className={`hover:bg-gray-100 group flex rounded-md items-center w-full px-2 py-2 text-sm ${
                  router?.chainId === chain.chainId ? "font-bold" : ""
                }`}
                onClick={() => handleSwitchChain(chain)}
              >
                <Image src={chain.logo} alt={chain.name} className="h-6 w-6 mr-2" />
                <span>{chain.name}</span>
                {router?.chainId === chain.chainId && <span className="ml-2 text-xs text-green-500">({t("pay")})</span>}
              </button>
            </MenuItem>
          ))}
      </MenuItems>
    </Menu>
  );
};

export default ChainSelector;
