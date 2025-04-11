import realusdcabi from "@/assets/realusdcabi.json";
import weth from "@/tokenPayLib/assets/payment-icons/arbitrum/weth.svg";
import usdt from "@/tokenPayLib/assets/payment-icons/arbitrum/usdt.svg";
import usdc from "@/tokenPayLib/assets/payment-icons/arbitrum/usdc.svg";
import arb from "@/tokenPayLib/assets/payment-icons/arbitrum/arb.png";
import dai from "@/tokenPayLib/assets/payment-icons/arbitrum/dai.svg";
import wbtc from "@/tokenPayLib/assets/payment-icons/arbitrum/wbtc.svg";
import gmx from "@/tokenPayLib/assets/payment-icons/arbitrum/gmx.png";
import link from "@/tokenPayLib/assets/payment-icons/arbitrum/link.svg";
import magic from "@/tokenPayLib/assets/payment-icons/arbitrum/magic.png";
import pendle from "@/tokenPayLib/assets/payment-icons/arbitrum/pendle.png";
import wsteth from "@/tokenPayLib/assets/payment-icons/arbitrum/wsteth.png";
import uni from "@/tokenPayLib/assets/payment-icons/arbitrum/uni.svg";
import rdnt from "@/tokenPayLib/assets/payment-icons/arbitrum/rdnt.png";
import lusd from "@/tokenPayLib/assets/payment-icons/arbitrum/lusd.png";
import gns from "@/tokenPayLib/assets/payment-icons/arbitrum/gns.png";
import usds from "@/tokenPayLib/assets/payment-icons/arbitrum/usds.png";
import gohm from "@/tokenPayLib/assets/payment-icons/arbitrum/gohm.png";
import umami from "@/tokenPayLib/assets/payment-icons/arbitrum/umami.png";
import frax from "@/tokenPayLib/assets/payment-icons/arbitrum/frax.svg";
import pepe from "@/tokenPayLib/assets/payment-icons/arbitrum/pepe.png";
import ldo from "@/tokenPayLib/assets/payment-icons/arbitrum/ldo.png";
import crv from "@/tokenPayLib/assets/payment-icons/arbitrum/crv.svg";
import boop from "@/tokenPayLib/assets/payment-icons/arbitrum/boop.png";
import stg from "@/tokenPayLib/assets/payment-icons/arbitrum/stg.png";
import sushi from "@/tokenPayLib/assets/payment-icons/arbitrum/sushi.svg";
import grt from "@/tokenPayLib/assets/payment-icons/arbitrum/grt.svg";
import aidoge from "@/tokenPayLib/assets/payment-icons/arbitrum/aidoge.png";
import spa from "@/tokenPayLib/assets/payment-icons/arbitrum/spa.png";
import ram from "@/tokenPayLib/assets/payment-icons/arbitrum/ram.png";
import lpt from "@/tokenPayLib/assets/payment-icons/arbitrum/lpt.png";
import ageur from "@/tokenPayLib/assets/payment-icons/arbitrum/ageur.png";
import spell from "@/tokenPayLib/assets/payment-icons/arbitrum/spell.png";
import mim from "@/tokenPayLib/assets/payment-icons/arbitrum/mim.png";
import zro from "@/tokenPayLib/assets/payment-icons/arbitrum/zro.png";
import ox from "@/tokenPayLib/assets/payment-icons/arbitrum/ox.png";
import vela from "@/tokenPayLib/assets/payment-icons/arbitrum/vela.png";
import grail from "@/tokenPayLib/assets/payment-icons/arbitrum/grail.png";
import vsta from "@/tokenPayLib/assets/payment-icons/arbitrum/vsta.png";
import next from "@/tokenPayLib/assets/payment-icons/arbitrum/next.png";
import joe from "@/tokenPayLib/assets/payment-icons/arbitrum/joe.png";
import reth from "@/tokenPayLib/assets/payment-icons/arbitrum/reth.png";
import pogai from "@/tokenPayLib/assets/payment-icons/arbitrum/pogai.png";
import fxs from "@/tokenPayLib/assets/payment-icons/arbitrum/fxs.png";
import ohm from "@/tokenPayLib/assets/payment-icons/arbitrum/ohm.png";
import xai from "@/tokenPayLib/assets/payment-icons/arbitrum/xai.png";
import usdplus from "@/tokenPayLib/assets/payment-icons/arbitrum/usdplus.png";

const arbitrumCurrencies: Record<string, SimpleToken> = {
  WETH: {
    name: "Wrapped Ethereum",
    decimals: 18,
    contractAddress: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    abi: realusdcabi,
    icon: weth,
    id: "WETH",
  },
  USDT: {
    name: "Tether USD",
    decimals: 6,
    contractAddress: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    abi: realusdcabi,
    icon: usdt,
    id: "USDT",
  },
  "USDC.E": {
    name: "Bridged USD Coin",
    decimals: 6,
    contractAddress: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    abi: realusdcabi,
    icon: usdc,
    id: "USDC.E",
  },
  USDC: {
    name: "USD Coin",
    decimals: 6,
    contractAddress: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    abi: realusdcabi,
    icon: usdc,
    id: "USDC",
  },
  DAI: {
    name: "Dai Stablecoin",
    decimals: 18,
    contractAddress: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    abi: realusdcabi,
    icon: dai,
    id: "DAI",
  },
  WBTC: {
    name: "Wrapped BTC",
    decimals: 8,
    contractAddress: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
    abi: realusdcabi,
    icon: wbtc,
    id: "WBTC",
  },
  GMX: {
    name: "GMX",
    decimals: 18,
    contractAddress: "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
    abi: realusdcabi,
    icon: gmx,
    id: "GMX",
  },
  LINK: {
    name: "ChainLink Token",
    decimals: 18,
    contractAddress: "0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
    abi: realusdcabi,
    icon: link,
    id: "LINK",
  },
  MAGIC: {
    name: "MAGIC",
    decimals: 18,
    contractAddress: "0x539bde0d7dbd336b79148aa742883198bbf60342",
    abi: realusdcabi,
    icon: magic,
    id: "MAGIC",
  },
  PENDLE: {
    name: "Pendle",
    decimals: 18,
    contractAddress: "0x0c880f6761f1af8d9aa9c466984b80dab9a8c9e8",
    abi: realusdcabi,
    icon: pendle,
    id: "PENDLE",
  },
  wstETH: {
    name: "Wrapped liquid staked Ether 2.0",
    decimals: 18,
    contractAddress: "0x5979d7b546e38e414f7e9822514be443a4800529",
    abi: realusdcabi,
    icon: wsteth,
    id: "wstETH",
  },
  UNI: {
    name: "Uniswap",
    decimals: 18,
    contractAddress: "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
    abi: realusdcabi,
    icon: uni,
    id: "UNI",
  },
  RDNT: {
    name: "Radiant",
    decimals: 18,
    contractAddress: "0x3082cc23568ea640225c2467653db90e9250aaa0",
    abi: realusdcabi,
    icon: rdnt,
    id: "RDNT",
  },
  LUSD: {
    name: "LUSD Stablecoin",
    decimals: 18,
    contractAddress: "0x93b346b6bc2548da6a1e7d98e9a421b42541425b",
    abi: realusdcabi,
    icon: lusd,
    id: "LUSD",
  },
  GNS: {
    name: "Gains Network",
    decimals: 18,
    contractAddress: "0x18c11fd286c5ec11c3b683caa813b77f5163a122",
    abi: realusdcabi,
    icon: gns,
    id: "GNS",
  },
  USDs: {
    name: "Sperax USD",
    decimals: 18,
    contractAddress: "0xd74f5255d557944cf7dd0e45ff521520002d5748",
    abi: realusdcabi,
    icon: usds,
    id: "USDs",
  },
  gOHM: {
    name: "Governance OHM",
    decimals: 18,
    contractAddress: "0x8d9ba570d6cb60c7e3e0f31343efe75ab8e65fb1",
    abi: realusdcabi,
    icon: gohm,
    id: "gOHM",
  },
  UMAMI: {
    name: "Umami",
    decimals: 9,
    contractAddress: "0x1622bf67e6e5747b81866fe0b85178a93c7f86e3",
    abi: realusdcabi,
    icon: umami,
    id: "UMAMI",
  },
  FRAX: {
    name: "Frax",
    decimals: 18,
    contractAddress: "0x17fc002b466eec40dae837fc4be5c67993ddbd6f",
    abi: realusdcabi,
    icon: frax,
    id: "FRAX",
  },
  PEPE: {
    name: "Pepe",
    decimals: 18,
    contractAddress: "0x25d887ce7a35172c62febfd67a1856f20faebb00",
    abi: realusdcabi,
    icon: pepe,
    id: "PEPE",
  },
  LDO: {
    name: "Lido DAO Token",
    decimals: 18,
    contractAddress: "0x13ad51ed4f1b7e9dc168d8a00cb3f4ddd85efa60",
    abi: realusdcabi,
    icon: ldo,
    id: "LDO",
  },
  CRV: {
    name: "Curve DAO Token",
    decimals: 18,
    contractAddress: "0x11cdb42b0eb46d95f990bedd4695a6e3fa034978",
    abi: realusdcabi,
    icon: crv,
    id: "CRV",
  },
  Boop: {
    name: "Boop",
    decimals: 18,
    contractAddress: "0x13a7dedb7169a17be92b0e3c7c2315b46f4772b3",
    abi: realusdcabi,
    icon: boop,
    id: "Boop",
  },
  STG: {
    name: "StargateToken",
    decimals: 18,
    contractAddress: "0x6694340fc020c5e6b96567843da2df01b2ce1eb6",
    abi: realusdcabi,
    icon: stg,
    id: "STG",
  },
  SUSHI: {
    name: "SushiToken",
    decimals: 18,
    contractAddress: "0xd4d42f0b6def4ce0383636770ef773390d85c61a",
    abi: realusdcabi,
    icon: sushi,
    id: "SUSHI",
  },
  GRT: {
    name: "Graph Token",
    decimals: 18,
    contractAddress: "0x9623063377ad1b27544c965ccd7342f7ea7e88c7",
    abi: realusdcabi,
    icon: grt,
    id: "GRT",
  },
  AIDOGE: {
    name: "AIDOGE",
    decimals: 6,
    contractAddress: "0x09e18590e8f76b6cf471b3cd75fe1a1a9d2b2c2b",
    abi: realusdcabi,
    icon: aidoge,
    id: "AIDOGE",
  },
  SPA: {
    name: "Sperax",
    decimals: 18,
    contractAddress: "0x5575552988a3a80504bbaeb1311674fcfd40ad4b",
    abi: realusdcabi,
    icon: spa,
    id: "SPA",
  },
  RAM: {
    name: "Ramses",
    decimals: 18,
    contractAddress: "0xaaa6c1e32c55a7bfa8066a6fae9b42650f262418",
    abi: realusdcabi,
    icon: ram,
    id: "RAM",
  },
  LPT: {
    name: "Livepeer Token",
    decimals: 18,
    contractAddress: "0x289ba1701c2f088cf0faf8b3705246331cb8a839",
    abi: realusdcabi,
    icon: lpt,
    id: "LPT",
  },
  agEUR: {
    name: "agEUR",
    decimals: 18,
    contractAddress: "0xfa5ed56a203466cbbc2430a43c66b9d8723528e7",
    abi: realusdcabi,
    icon: ageur,
    id: "agEUR",
  },
  SPELL: {
    name: "Spell Token",
    decimals: 18,
    contractAddress: "0x3e6648c5a70a150a88bce65f4ad4d506fe15d2af",
    abi: realusdcabi,
    icon: spell,
    id: "SPELL",
  },
  MIM: {
    name: "Magic Internet Money",
    decimals: 18,
    contractAddress: "0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a",
    abi: realusdcabi,
    icon: mim,
    id: "MIM",
  },
  ZRO: {
    name: "LayerZero",
    decimals: 18,
    contractAddress: "0x6985884c4392d348587b19cb9eaaf157f13271cd",
    abi: realusdcabi,
    icon: zro,
    id: "ZRO",
  },
  OX: {
    name: "OX Coin",
    decimals: 18,
    contractAddress: "0xba0dda8762c24da9487f5fa026a9b64b695a07ea",
    abi: realusdcabi,
    icon: ox,
    id: "OX",
  },
  VELA: {
    name: "VelaToken",
    decimals: 18,
    contractAddress: "0x088cd8f5ef3652623c22d48b1605dcfe860cd704",
    abi: realusdcabi,
    icon: vela,
    id: "VELA",
  },
  GRAIL: {
    name: "Camelot token",
    decimals: 18,
    contractAddress: "0x3d9907f9a368ad0a51be60f7da3b97cf940982d8",
    abi: realusdcabi,
    icon: grail,
    id: "GRAIL",
  },
  VSTA: {
    name: "Vesta",
    decimals: 18,
    contractAddress: "0xa684cd057951541187f288294a1e1c2646aa2d24",
    abi: realusdcabi,
    icon: vsta,
    id: "VSTA",
  },
  NEXT: {
    name: "Everclear",
    decimals: 18,
    contractAddress: "0x58b9cb810a68a7f3e1e4f8cb45d1b9b3c79705e8",
    abi: realusdcabi,
    icon: next,
    id: "NEXT",
  },
  JOE: {
    name: "JoeToken",
    decimals: 18,
    contractAddress: "0x371c7ec6d8039ff7933a2aa28eb827ffe1f52f07",
    abi: realusdcabi,
    icon: joe,
    id: "JOE",
  },
  rETH: {
    name: "Rocket Pool ETH",
    decimals: 18,
    contractAddress: "0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8",
    abi: realusdcabi,
    icon: reth,
    id: "rETH",
  },
  pogai: {
    name: "poor guy",
    decimals: 18,
    contractAddress: "0x6fd58f5a2f3468e35feb098b5f59f04157002407",
    abi: realusdcabi,
    icon: pogai,
    id: "pogai",
  },
  FXS: {
    name: "Frax Share",
    decimals: 18,
    contractAddress: "0x9d2f299715d94d8a7e6f5eaa8e654e8c74a988a7",
    abi: realusdcabi,
    icon: fxs,
    id: "FXS",
  },
  OHM: {
    name: "Olympus",
    decimals: 9,
    contractAddress: "0xf0cb2dc0db5e6c66b9a70ac27b06b878da017028",
    abi: realusdcabi,
    icon: ohm,
    id: "OHM",
  },
  XAI: {
    name: "Xai",
    decimals: 18,
    contractAddress: "0x4cb9a7ae498cedcbb5eae9f25736ae7d428c9d66",
    abi: realusdcabi,
    icon: xai,
    id: "XAI",
  },
  "USD+": {
    name: "USD+",
    decimals: 6,
    contractAddress: "0xe80772eaf6e2e18b651f160bc9158b2a5cafca65",
    abi: realusdcabi,
    icon: usdplus,
    id: "USD+",
  },
};

export default arbitrumCurrencies;
