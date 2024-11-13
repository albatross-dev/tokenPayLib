import currencies, {
  currenciesArbitrum,
  currenciesAvax,
  currenciesBase,
  currenciesBSC,
  currenciesEthereum,
  currenciesOP,
} from "./currencies";
import {
  ethereum,
  optimism,
  arbitrum,
  base,
  polygon,
  avalanche,
  bsc,
} from "thirdweb/chains";
import { encodePacked } from "thirdweb/utils";
import polygonPaths from "./polygonPaths";

export const PATHS = {
  [polygon.id]: polygonPaths,
  [ethereum.id]: {
    USDT: {
      USDC: [        ["address", "uint24", "address"],
        [
          currenciesEthereum["USDT"].contractAddress,
          100, // Pool fee
          currenciesEthereum["USDC"].contractAddress,
        ]],
      EUROE: [        ["address", "uint24", "address", "uint24", "address"],
        [
          currenciesEthereum["USDT"].contractAddress,
          100, // Pool fee
          currenciesEthereum["USDC"].contractAddress,
          500, // Pool fee
          currenciesEthereum["EUROE"].contractAddress,
        ]],
    },
    EURS: {
      USDC: [        ["address", "uint24", "address"],
        [
          currenciesEthereum["EURS"].contractAddress,
          10500, // Pool fee
          currenciesEthereum["USDC"].contractAddress,
        ]],
      EUROE: [        ["address", "uint24", "address", "uint24", "address"],
        [
          currenciesEthereum["EURS"].contractAddress,
          10500, // Pool fee
          currenciesEthereum["USDC"].contractAddress,
          500, // Pool fee
          currenciesEthereum["EUROE"].contractAddress,
        ]],
    },
    EUROE: {
      USDC: [        ["address", "uint24", "address"],
        [
          currenciesEthereum["EUROE"].contractAddress,
          500, // Pool fee
          currenciesEthereum["USDC"].contractAddress,
        ]]
    }
  },
  [arbitrum.id]: {
    "USDC.E": {
      USDC: [        ["address", "uint24", "address"],
        [
          currenciesArbitrum["USDC.E"].contractAddress,
          100, // Pool fee
          currenciesArbitrum["USDC"].contractAddress,
        ]],
    },
    USDT: {
      USDC: [        ["address", "uint24", "address"],
        [
          currenciesArbitrum["USDT"].contractAddress,
          100, // Pool fee
          currenciesArbitrum["USDC"].contractAddress,
        ]],
    },
  },
  [optimism.id]: {
    USDT: {
      USDC: [        ["address", "uint24", "address"],
        [
          currenciesOP["USDT"].contractAddress,
          100, // Pool fee
          currenciesOP["USDC"].contractAddress,
        ]],
    },
  },
  [avalanche.id]: {
    USDT: {
      USDC: [        ["address", "uint24", "address"],
        [
          currenciesAvax["USDT"].contractAddress,
          100, // Pool fee
          currenciesAvax["USDC"].contractAddress,
        ]],
    },
  },
  [bsc.id]: {
    USDT: {
      USDC: [        ["address", "uint24", "address"],
        [
          currenciesBSC["USDT"].contractAddress,
          100, // Pool fee
          currenciesBSC["USDC"].contractAddress,
        ]],
    },
  },
};

export default function getPath(tokenSymbol, chain, targetTokenSymbol) {
  console.log("getPath", tokenSymbol.toUpperCase(), chain, targetTokenSymbol.toUpperCase());
  console.log("paths", PATHS[chain.id.toString()][tokenSymbol.toUpperCase()][targetTokenSymbol.toUpperCase()])
  let result = PATHS[chain.id.toString()][tokenSymbol.toUpperCase()][targetTokenSymbol.toUpperCase()];
  return result;
}

export function getEncodedPath(tokenSymbol, chain, targetTokenSymbol) {
  console.log("getPath", tokenSymbol.toUpperCase(), chain, targetTokenSymbol.toUpperCase());
  console.log("paths", PATHS[chain.id.toString()][tokenSymbol.toUpperCase()][targetTokenSymbol.toUpperCase()])
  const resPath = PATHS[chain.id.toString()][tokenSymbol.toUpperCase()][targetTokenSymbol.toUpperCase()]
  let result = encodePacked(resPath[0], resPath[1]);
  return result;
}
