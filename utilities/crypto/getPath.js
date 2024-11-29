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
import polygonPaths from "./paths/polygonPaths";
import ethereumPaths from "./paths/ethereumPaths";
import arbitumPaths from "./paths/arbitumPaths";
import optimismPaths from "./paths/optimismPaths";
import basePaths from "./paths/basePaths";

export const PATHS = {
  [polygon.id]: polygonPaths,
  [ethereum.id]: ethereumPaths,
  [arbitrum.id]: arbitumPaths,
  [optimism.id]: optimismPaths,
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
  [base.id]: basePaths,
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
