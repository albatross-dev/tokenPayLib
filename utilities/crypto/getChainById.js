import {
  polygon,
  ethereum,
  optimism,
  arbitrum,
  base,
  avalanche,
  bsc,
} from "thirdweb/chains";

export default function getChainById(id) {
  switch (id) {
    case 137:
      return polygon;
    case 1:
      return ethereum;
    case 10:
      return optimism;
    case 42161:
      return arbitrum;
    case 8453:
      return base;
    case 43114:
      return avalanche;
    case 56:
      return bsc;
    default:
      return null;
  }
}