import realusdtabi from "@/assets/realusdtabi.json";
import realusdcabi from "@/assets/realusdcabi.json";
import erc20abi from "@/tokenPayLib/assets/ERC20ABI.json";

import alpha from "@/tokenPayLib/assets/payment-icons/polygon/alpha.png";
import tether from "@/tokenPayLib/assets/payment-icons/polygon/tether.png";
import usdc from "@/tokenPayLib/assets/payment-icons/polygon/usdc.png";
import eurs from "@/tokenPayLib/assets/payment-icons/polygon/eurs.webp";
import wbtc from "@/tokenPayLib/assets/payment-icons/polygon/wbtc.svg";
import numberWithZeros from "../math/numberWithZeros";

import POLYGON_LOGO from "@/tokenPayLib/assets/chain-icons/polygon-matic-logo.svg";
import ETHEREUM_LOGO from "@/tokenPayLib/assets/chain-icons/eth-logo.svg";
import OPTIMISM_LOGO from "@/tokenPayLib/assets/chain-icons/op-logo.svg";
import ARBITRUM_LOGO from "@/tokenPayLib/assets/chain-icons/arb-logo.svg";
import BASE_LOGO from "@/tokenPayLib/assets/chain-icons/base-logo.svg";
import AVALANCHE_LOGO from "@/tokenPayLib/assets/chain-icons/avax-logo.svg";
import BSC_LOGO from "@/tokenPayLib/assets/chain-icons/bsc-logo.svg";

import polygonCurrencies from "./currencies/polygon";
import baseCurrencies from "./currencies/base";
import arbitrumCurrencies from "./currencies/arbitrum";
import ethereumCurrencies from "./currencies/ethereum";
import optimismCurrencies from "./currencies/optimism";
import { SimpleToken } from "../../types/token.types";
import { StaticImageData } from "next/image";

export const LogoByShortName: Record<string, string | StaticImageData> = {
  USDC: usdc,
  "USDC.E": usdc,
  USDT: tether,
  EURS: eurs,
  UHU: alpha,
};

export const ChainLogoByChainId: Record<string, string> = {
  137: POLYGON_LOGO,
  1: ETHEREUM_LOGO,
  10: OPTIMISM_LOGO,
  42161: ARBITRUM_LOGO,
  8453: BASE_LOGO,
  43114: AVALANCHE_LOGO,
  56: BSC_LOGO,
};

export const ERC20ABI = erc20abi;

export function formatNumberWithCurrency(number: number, currency?: string, includeSymbol: boolean = true): string {
  if (includeSymbol) {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  } else {
    return new Intl.NumberFormat("de-DE", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  }
}

export const numberFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export function formatCrypto(amount: number, decimals: number, fractionDigits = 2): string {
  return new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: fractionDigits,
  }).format(Number(amount || 0) / numberWithZeros(decimals));
}

// polygon
const currencies: Record<string, SimpleToken> = polygonCurrencies;

export const currenciesBase: Record<string, SimpleToken> = baseCurrencies;

export const currenciesArbitrum: Record<string, SimpleToken> = arbitrumCurrencies;

export const currenciesEthereum: Record<string, SimpleToken> = ethereumCurrencies;

export const currenciesOP: Record<string, SimpleToken> = optimismCurrencies;

export const currenciesAvax: Record<string, SimpleToken> = {
  USDC: {
    name: "USDC",
    id: "usdc",
    decimals: 6,
    contractAddress: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    abi: realusdcabi,
    icon: usdc,
  },
  "USDC.E": {
    name: "USDC.E",
    id: "usdc.e",
    decimals: 6,
    contractAddress: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    abi: realusdcabi,
    icon: usdc,
  },
  USDT: {
    name: "USDT",
    id: "usdt",
    decimals: 6,
    contractAddress: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    abi: realusdtabi,
    icon: tether,
  },
};

export const currenciesBSC: Record<string, SimpleToken> = {
  USDC: {
    name: "USDC",
    id: "usdc",
    decimals: 6,
    contractAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    abi: realusdcabi,
    icon: usdc,
  },
  USDT: {
    name: "USDT",
    id: "usdt",
    decimals: 6,
    contractAddress: "0x55d398326f99059fF775485246999027B3197955",
    abi: realusdtabi,
    icon: tether,
  },
};

export default currencies;

export const ALPHA: SimpleToken = {
  name: "ALPHA",
  id: "alpha",
  decimals: 18,
  contractAddress: "0x6Fd7c66784508cdE319F80c54fC760C42eC400b7",
  abi: erc20abi as Array<any>,
  icon: alpha,
};

export const UHU: SimpleToken = {
  name: "UHU",
  id: "uhu",
  decimals: 18,
  contractAddress: "0x8d5482c83bb5b49e2b4b97bcf264342eac164c00",
  abi: erc20abi as Array<any>,
  icon: alpha,
};

const currenciesStable: Record<string, SimpleToken> = {
  USDC: {
    name: "USDC",
    id: "usdc",
    decimals: 6,
    contractAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    abi: realusdcabi as Array<any>,
    icon: usdc,
  },
  "USDC.E": {
    name: "USDC.E",
    id: "usdc.e",
    decimals: 6,
    contractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    abi: realusdcabi as Array<any>,
    icon: usdc,
  },
  USDT: {
    name: "USDT",
    id: "usdt",
    decimals: 6,
    contractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    abi: realusdtabi as Array<any>,
    icon: tether,
  },
  EURS: {
    name: "EURS",
    id: "eurs",
    decimals: 2,
    contractAddress: "0xE111178A87A3BFf0c8d18DECBa5798827539Ae99",
    abi: erc20abi as Array<any>,
    icon: eurs,
  },
  WBTC: {
    name: "WBTC",
    id: "wbtc",
    decimals: 8,
    contractAddress: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    abi: erc20abi as Array<any>,
    icon: wbtc,
  },
  WETH: {
    name: "WETH",
    id: "weth",
    decimals: 18,
    contractAddress: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    abi: erc20abi as Array<any>,
    icon: ETHEREUM_LOGO,
  },
};

export type chainTypesIds = 1 | 10 | 42161 | 8453 | 43114 | 56 | 137;

export const TokensByChainId: Record<chainTypesIds, Record<string, SimpleToken>> = {
  137: currencies,
  1: currenciesEthereum,
  10: currenciesOP,
  42161: currenciesArbitrum,
  8453: currenciesBase,
  43114: currenciesAvax,
  56: currenciesBSC,
};
