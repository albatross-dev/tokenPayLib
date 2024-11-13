import {
  polygon,
  ethereum,
  optimism,
  arbitrum,
  base,
  avalanche,
  bsc,
} from "thirdweb/chains";

import currencies, {
  ChainLogoByChainId,
  currenciesArbitrum,
  currenciesAvax,
  currenciesBase,
  currenciesBSC,
  currenciesEthereum,
  currenciesOP,
  ERC20ABI,
  formatCrypto,
  LogoByShortName,
  UHU,
} from "@/tokenPayLib/utilities/crypto/currencies";

const tokenyByChain = {
  [polygon.id]: {
    chain: polygon,
    tokens: [
      {
        symbol: "USDC",
        contract: currencies["USDC"],
        logo: LogoByShortName["USDC"],
      },
      {
        symbol: "USDC.E",
        contract: currencies["USDC.E"],
        logo: LogoByShortName["USDC.E"],
      },
      {
        symbol: "USDT",
        contract: currencies["USDT"],
        logo: LogoByShortName["USDT"],
      },
      {
        symbol: "EURS",
        contract: currencies["EURS"],
        logo: LogoByShortName["EURS"],
      },
      {
        symbol: "EUROE",
        contract: currencies["EUROE"],
        logo: LogoByShortName["EUROE"],
      },
    ],
  },
  [base.id]: {
    chain: base,
    spokePool: "0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64",
    tokens: [
      {
        symbol: "USDC",
        contract: currenciesBase["USDC"],
        logo: LogoByShortName["USDC"],
      },
    ],
  },
  [arbitrum.id]: {
    chain: arbitrum,
    spokePool: "0xe35e9842fceaca96570b734083f4a58e8f7c5f2a",
    tokens: [
      {
        symbol: "USDC",
        contract: currenciesArbitrum["USDC"],
        logo: LogoByShortName["USDC"],
      },
      {
        symbol: "USDC.E",
        contract: currenciesArbitrum["USDC.E"],
        logo: LogoByShortName["USDC.E"],
      },
      {
        symbol: "USDT",
        contract: currenciesArbitrum["USDT"],
        logo: LogoByShortName["USDT"],
      },
    ],
  },
  [ethereum.id]: {
    chain: ethereum,
    spokePool: "0x5c7BCd6E7De5423a257D81B442095A1a6ced35C5",
    tokens: [
      {
        symbol: "USDC",
        contract: currenciesEthereum["USDC"],
        logo: LogoByShortName["USDC"],
      },
      {
        symbol: "USDT",
        contract: currenciesEthereum["USDT"],
        logo: LogoByShortName["USDT"],
      },
      {
        symbol: "EURS",
        contract: currenciesEthereum["EURS"],
        logo: LogoByShortName["EURS"],
      },
      //{ symbol: "EUROE", contract: currenciesEthereum["EUROE"], logo: EUROE_Logo },
    ],
  },
  [optimism.id]: {
    chain: optimism,
    spokePool: "0x6f26Bf09B1C792e3228e5467807a900A503c0281",
    tokens: [
      {
        symbol: "USDC",
        contract: currenciesOP["USDC"],
        logo: LogoByShortName["USDC"],
      },
      //{ symbol: "USDC.E", contract: currenciesOP["USDC.E"], logo: USDC_Logo },
      {
        symbol: "USDT",
        contract: currenciesOP["USDT"],
        logo: LogoByShortName["USDT"],
      },
      //{ symbol: "EUROE", contract: currenciesOP["EUROE"], logo: EUROE_Logo },
    ],
  },
  [avalanche.id]: {
    chain: avalanche,
    tokens: [
      {
        symbol: "USDC",
        contract: currenciesAvax["USDC"],
        logo: LogoByShortName["USDC"],
      },
      //{ symbol: "USDC.E", contract: currenciesAvax["USDC.E"], logo: USDC_Logo },
      {
        symbol: "USDT",
        contract: currenciesAvax["USDT"],
        logo: LogoByShortName["USDT"],
      },
      //{ symbol: "EUROE", contract: currenciesAvax["EUROE"], logo: EUROE_Logo },
    ],
  },
  [bsc.id]: {
    chain: bsc,
    tokens: [
      {
        symbol: "USDC",
        contract: currenciesBSC["USDC"],
        logo: LogoByShortName["USDC"],
      },
      {
        symbol: "USDT",
        contract: currenciesBSC["USDT"],
        logo: LogoByShortName["USDT"],
      },
    ],
  },
};

export default tokenyByChain;