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
  Chain,
} from "thirdweb/chains";
import { encodePacked } from "thirdweb/utils";
import polygonPaths from "./paths/polygonPaths";
import ethereumPaths from "./paths/ethereumPaths";
import arbitumPaths from "./paths/arbitumPaths";
import optimismPaths from "./paths/optimismPaths";
import basePaths from "./paths/basePaths";

// Define types for the path structure
type PathType = [string[], any[]];
type TokenPathsType = { [key: string]: PathType };
type ChainPathsType = { [key: string]: TokenPathsType };

// Use a more flexible type for PATHS to avoid type errors
export const PATHS: Record<string, any> = {
  [polygon.id]: polygonPaths,
  [ethereum.id]: ethereumPaths,
  [arbitrum.id]: arbitumPaths,
  [optimism.id]: optimismPaths,
  [avalanche.id]: {
    USDT: {
      USDC: [["address", "uint24", "address"],
        [
          currenciesAvax["USDT"].contractAddress,
          100, // Pool fee
          currenciesAvax["USDC"].contractAddress,
        ]],
    },
  },
  [base.id]: basePaths,
};

/**
 * Gets the path for a token conversion
 * @param tokenSymbol - The source token symbol
 * @param chain - The blockchain chain
 * @param targetTokenSymbol - The target token symbol
 * @returns The path for the token conversion
 */
export default function getPath(
  tokenSymbol: string, 
  chain: Chain, 
  targetTokenSymbol: string
): PathType {
  console.log("getPath", tokenSymbol.toUpperCase(), chain, targetTokenSymbol.toUpperCase());
  console.log("paths", PATHS[chain.id.toString()][tokenSymbol.toUpperCase()][targetTokenSymbol.toUpperCase()]);
  const result = PATHS[chain.id.toString()][tokenSymbol.toUpperCase()][targetTokenSymbol.toUpperCase()];
  return result;
}

/**
 * Gets the encoded path for a token conversion
 * @param tokenSymbol - The source token symbol
 * @param chain - The blockchain chain
 * @param targetTokenSymbol - The target token symbol
 * @returns The encoded path for the token conversion
 */
export function getEncodedPath(
  tokenSymbol: string, 
  chain: Chain, 
  targetTokenSymbol: string
): string {
  console.log("getPath", tokenSymbol.toUpperCase(), chain, targetTokenSymbol.toUpperCase());
  console.log("paths", PATHS[chain.id.toString()][tokenSymbol.toUpperCase()][targetTokenSymbol.toUpperCase()]);
  const resPath = PATHS[chain.id.toString()][tokenSymbol.toUpperCase()][targetTokenSymbol.toUpperCase()];
  const result = encodePacked(resPath[0], resPath[1]);
  return result;
} 