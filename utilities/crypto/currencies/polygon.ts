import weth from "@/tokenPayLib/assets/payment-icons/polygon/weth.svg";
import bnb from "@/tokenPayLib/assets/payment-icons/polygon/bnb.svg";
import dai from "@/tokenPayLib/assets/payment-icons/polygon/dai.svg";
import uni from "@/tokenPayLib/assets/payment-icons/polygon/uni.svg";
import link from "@/tokenPayLib/assets/payment-icons/polygon/link.svg";
import matic from "@/tokenPayLib/assets/payment-icons/polygon/matic.svg";
import shib from "@/tokenPayLib/assets/payment-icons/polygon/shib.svg";
import aave from "@/tokenPayLib/assets/payment-icons/polygon/aave.svg";
import mxen from "@/tokenPayLib/assets/payment-icons/polygon/mxen.png";
import crv from "@/tokenPayLib/assets/payment-icons/polygon/crv.svg";
import oneInch from "@/tokenPayLib/assets/payment-icons/polygon/1inch.png";
import sushi from "@/tokenPayLib/assets/payment-icons/polygon/sushi.svg";
import bonsai from "@/tokenPayLib/assets/payment-icons/polygon/bonsai.webp";
import rndr from "@/tokenPayLib/assets/payment-icons/polygon/rndr.svg";
import luna from "@/tokenPayLib/assets/payment-icons/polygon/luna.svg";
import sol from "@/tokenPayLib/assets/payment-icons/polygon/sol.png";
import ldo from "@/tokenPayLib/assets/payment-icons/polygon/ldo.png";
import usdn from "@/tokenPayLib/assets/payment-icons/polygon/usdn.svg";
import sand from "@/tokenPayLib/assets/payment-icons/polygon/sand.svg";
import mana from "@/tokenPayLib/assets/payment-icons/polygon/mana.svg";
import polydoge from "@/tokenPayLib/assets/payment-icons/polygon/polydoge.png";
import elon from "@/tokenPayLib/assets/payment-icons/polygon/elon.png";
import paxg from "@/tokenPayLib/assets/payment-icons/polygon/paxg.svg";
import mkr from "@/tokenPayLib/assets/payment-icons/polygon/mkr.png";
import ageur from "@/tokenPayLib/assets/payment-icons/polygon/ageur.png";
import gone from "@/tokenPayLib/assets/payment-icons/polygon/gone.png";
import gns from "@/tokenPayLib/assets/payment-icons/polygon/gns.png";
import frax from "@/tokenPayLib/assets/payment-icons/polygon/frax.svg";
import snx from "@/tokenPayLib/assets/payment-icons/polygon/snx.svg";
import quick from "@/tokenPayLib/assets/payment-icons/polygon/quick.svg";
import cou from "@/tokenPayLib/assets/payment-icons/polygon/cou.png";
import grt from "@/tokenPayLib/assets/payment-icons/polygon/grt.svg";
import jpyc from "@/tokenPayLib/assets/payment-icons/polygon/jpyc.svg";
import ust from "@/tokenPayLib/assets/payment-icons/polygon/ust.png";
import busd from "@/tokenPayLib/assets/payment-icons/polygon/busd.svg";
import bal from "@/tokenPayLib/assets/payment-icons/polygon/bal.svg";
import agix from "@/tokenPayLib/assets/payment-icons/polygon/agix.png";
import comp from "@/tokenPayLib/assets/payment-icons/polygon/comp.svg";
import amp from "@/tokenPayLib/assets/payment-icons/polygon/amp.svg";
import eure from "@/tokenPayLib/assets/payment-icons/polygon/eure.png";
import ghst from "@/tokenPayLib/assets/payment-icons/polygon/ghst.png";
import dinero from "@/tokenPayLib/assets/payment-icons/polygon/dinero.png";
import rai from "@/tokenPayLib/assets/payment-icons/polygon/rai.svg";
import ape from "@/tokenPayLib/assets/payment-icons/polygon/ape.png";
import cro from "@/tokenPayLib/assets/payment-icons/polygon/cro.png";
import dimo from "@/tokenPayLib/assets/payment-icons/polygon/dimo.png";
import ankr from "@/tokenPayLib/assets/payment-icons/polygon/ankr.svg";
import pointless from "@/tokenPayLib/assets/payment-icons/polygon/pointless.webp";
import fet from "@/tokenPayLib/assets/payment-icons/polygon/fet.png";
import jeur from "@/tokenPayLib/assets/payment-icons/polygon/jeur.png";
import xsgd from "@/tokenPayLib/assets/payment-icons/polygon/xsgd.png";
import wgc from "@/tokenPayLib/assets/payment-icons/polygon/wgc.png";
import plunc from "@/tokenPayLib/assets/payment-icons/polygon/plunc.png";
import pyr from "@/tokenPayLib/assets/payment-icons/polygon/pyr.svg";
import stg from "@/tokenPayLib/assets/payment-icons/polygon/stg.png";
import mdxn from "@/tokenPayLib/assets/payment-icons/polygon/mdxn.png";
import avax from "@/tokenPayLib/assets/payment-icons/polygon/avax.png";

import alpha from "@/tokenPayLib/assets/payment-icons/polygon/alpha.png";
import tether from "@/tokenPayLib/assets/payment-icons/polygon/tether.png";
import usdc from "@/tokenPayLib/assets/payment-icons/polygon/usdc.png";
import euroe from "@/tokenPayLib/assets/payment-icons/polygon/euroe.png";
import eurs from "@/tokenPayLib/assets/payment-icons/polygon/eurs.webp";
import wbtc from "@/tokenPayLib/assets/payment-icons/polygon/wbtc.svg";

import realusdtabi from "@/assets/realusdtabi.json";
import realusdcabi from "@/assets/realusdcabi.json";
import erc20abi from "@/tokenPayLib/assets/ERC20ABI.json";
import ETHEREUM_LOGO from "@/tokenPayLib/assets/chain-icons/eth-logo.svg";
import { SimpleToken } from "../../../types/token.types";

const polygonCurrencies: Record<string, SimpleToken> = {
  USDC: {
    name: "USDC",
    id: "usdc",
    decimals: 6,
    contractAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    abi: realusdcabi,
    icon: usdc,
  },
  "USDC.E": {
    name: "USDC.E",
    id: "usdc.e",
    decimals: 6,
    contractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    abi: realusdcabi,
    icon: usdc,
  },
  USDT: {
    name: "USDT",
    id: "usdt",
    decimals: 6,
    contractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    abi: realusdtabi,
    icon: tether,
  },
  EUROE: {
    name: "EUROE",
    id: "euroe",
    decimals: 6,
    contractAddress: "0x820802Fa8a99901F52e39acD21177b0BE6EE2974",
    abi: realusdtabi as Array<any>,
    icon: euroe,
  },
  UHU: {
    name: "UHU",
    id: "uhu",
    decimals: 18,
    contractAddress: "0x8d5482c83bb5b49e2b4b97bcf264342eac164c00",
    abi: erc20abi as Array<any>,
    icon: alpha,
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
  WMATIC: {
    name: "Wrapped Matic",
    id: "wmatic",
    decimals: 18,
    contractAddress: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    abi: realusdcabi as Array<any>,
    icon: matic,
  },
  DAI: {
    id: "dai",
    name: "(PoS) Dai Stablecoin",
    decimals: 18,
    contractAddress: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    abi: realusdcabi as Array<any>,
    icon: dai,
  },
  UNI: {
    name: "Uniswap (PoS)",
    id: "uni",
    decimals: 18,
    contractAddress: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
    abi: realusdcabi as Array<any>,
    icon: uni,
  },
  NSFW: {
    name: "Pleasure Coin",
    id: "nsfw",
    decimals: 18,
    contractAddress: "0x8f006d1e1d9dc6c98996f50a4c810f17a47fbf19",
    abi: realusdcabi as Array<any>,
    icon: null,
  },
  LINK: {
    name: "ChainLink Token",
    id: "link",
    decimals: 18,
    contractAddress: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
    abi: realusdcabi as Array<any> as Array<any>,
    icon: link,
  },
  MATIC: {
    name: "Matic Token",
    id: "matic",
    decimals: 18,
    contractAddress: "0x0000000000000000000000000000000000001010",
    abi: realusdcabi,
    icon: matic,
  },
  SHIB: {
    name: "SHIBA INU (PoS)",
    id: "shib",
    decimals: 18,
    contractAddress: "0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
    abi: realusdcabi,
    icon: shib,
  },
  AAVE: {
    name: "Aave (PoS)",
    id: "aave",
    decimals: 18,
    contractAddress: "0xd6df932a45c0f255f85145f286ea0b292b21c90b",
    abi: realusdcabi,
    icon: aave,
  },
  mXEN: {
    name: "XEN Crypto",
    id: "mxen",
    decimals: 18,
    contractAddress: "0x2ab0e9e4ee70fff1fb9d67031e44f6410170d00e",
    abi: realusdcabi,
    icon: mxen,
  },
  CRV: {
    name: "CRV (PoS)",
    id: "crv",
    decimals: 18,
    contractAddress: "0x172370d5cd63279efa6d502dab29171933a610af",
    abi: realusdcabi,
    icon: crv,
  },
  "1INCH": {
    name: "1Inch (PoS)",
    id: "1inch",
    decimals: 18,
    contractAddress: "0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
    abi: realusdcabi,
    icon: oneInch,
  },
  SUSHI: {
    name: "SushiToken (PoS)",
    id: "sushi",
    decimals: 18,
    contractAddress: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
    abi: realusdcabi,
    icon: sushi,
  },
  BONSAI: {
    name: "Bonsai Token",
    id: "bonsai",
    decimals: 18,
    contractAddress: "0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
    abi: realusdcabi,
    icon: bonsai,
  },
  RNDR: {
    name: "Render Token",
    id: "rndr",
    decimals: 18,
    contractAddress: "0x61299774020da444af134c82fa83e3810b309991",
    abi: realusdcabi,
    icon: rndr,
  },
  SOL: {
    name: "Wrapped SOL (Wormhole)",
    id: "sol",
    decimals: 9,
    contractAddress: "0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
    abi: realusdcabi,
    icon: sol,
  },
  LDO: {
    name: "Lido DAO Token (PoS)",
    id: "ldo",
    decimals: 18,
    contractAddress: "0xc3c7d422809852031b44ab29eec9f1eff2a58756",
    abi: realusdcabi,
    icon: ldo,
  },
  USDN: {
    name: "USDN",
    id: "usdn",
    decimals: 3,
    contractAddress: "0x11c0a9a9341469aff95b7ec33cab8f9a027bdf67",
    abi: realusdcabi,
    icon: usdn,
  },
  SAND: {
    name: "SAND",
    id: "sand",
    decimals: 18,
    contractAddress: "0xbbba073c31bf03b8acf7c28ef0738decf3695683",
    abi: realusdcabi,
    icon: sand,
  },
  stMATIC: {
    name: "Staked MATIC (PoS)",
    id: "stmatic",
    decimals: 18,
    contractAddress: "0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
    abi: realusdcabi,
    icon: matic,
  },
  wstETH: {
    name: "Wrapped liquid staked Ether 2.0 (PoS)",
    id: "wsteth",
    decimals: 18,
    contractAddress: "0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
    abi: realusdcabi,
    icon: ETHEREUM_LOGO,
  },
  miMATIC: {
    name: "miMATIC",
    id: "mimatic",
    decimals: 18,
    contractAddress: "0xa3fa99a148fa48d14ed51d610c367c61876997f1",
    abi: realusdcabi,
    icon: matic,
  },
  MANA: {
    name: "(PoS) Decentraland MANA",
    id: "mana",
    decimals: 18,
    contractAddress: "0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
    abi: realusdcabi,
    icon: mana,
  },
  PolyDoge: {
    name: "PolyDoge",
    id: "polydoge",
    decimals: 18,
    contractAddress: "0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
    abi: realusdcabi,
    icon: polydoge,
  },
  ELON: {
    name: "Dogelon (PoS)",
    id: "elon",
    decimals: 18,
    contractAddress: "0xe0339c80ffde91f3e20494df88d4206d86024cdf",
    abi: realusdcabi,
    icon: elon,
  },
  PAXG: {
    name: "Paxos Gold (PoS)",
    id: "paxg",
    decimals: 18,
    contractAddress: "0x553d3d295e0f695b9228246232edf400ed3560b5",
    abi: realusdcabi,
    icon: paxg,
  },
  MKR: {
    name: "MAKER (PoS)",
    id: "mkr",
    decimals: 18,
    contractAddress: "0x6f7c932e7684666c9fd1d44527765433e01ff61d",
    abi: realusdcabi,
    icon: mkr,
  },
  agEUR: {
    name: "agEUR",
    id: "ageur",
    decimals: 18,
    contractAddress: "0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
    abi: realusdcabi,
    icon: ageur,
  },
  GONE: {
    name: "GONE",
    id: "gone",
    decimals: 18,
    contractAddress: "0x162539172b53e9a93b7d98fb6c41682de558a320",
    abi: realusdcabi,
    icon: gone,
  },
  GNS: {
    name: "Gains Network",
    id: "gns",
    decimals: 18,
    contractAddress: "0xe5417af564e4bfda1c483642db72007871397896",
    abi: realusdcabi,
    icon: gns,
  },
  CNT: {
    name: "Cryption Network Token",
    id: "cnt",
    decimals: 18,
    contractAddress: "0xd1e6354fb05bf72a8909266203dab80947dceccf",
    abi: realusdcabi,
    icon: null,
  },
  FRAX: {
    name: "Frax",
    id: "frax",
    decimals: 18,
    contractAddress: "0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
    abi: realusdcabi,
    icon: frax,
  },
  SNX: {
    name: "Synthetix Network Token (PoS)",
    id: "snx",
    decimals: 18,
    contractAddress: "0x50b728d8d964fd00c2d0aad81718b71311fef68a",
    abi: realusdcabi,
    icon: snx,
  },
  QUICK: {
    name: "QuickSwap",
    id: "quick",
    decimals: 18,
    contractAddress: "0xb5c064f955d8e7f38fe0460c556a72987494ee17",
    abi: realusdcabi,
    icon: quick,
  },
  COU: {
    name: "Couchain (PoS)",
    id: "cou",
    decimals: 18,
    contractAddress: "0xb6027769f15bde8cfb29f3b14de2e5622405aa4c",
    abi: realusdcabi,
    icon: cou,
  },
  GRT: {
    name: "Graph Token (PoS)",
    id: "grt",
    decimals: 18,
    contractAddress: "0x5fe2b58c013d7601147dcdd68c143a77499f5531",
    abi: realusdcabi,
    icon: grt,
  },
  JPYC: {
    name: "JPY Coin",
    id: "jpyc",
    decimals: 18,
    contractAddress: "0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
    abi: realusdcabi,
    icon: jpyc,
  },
  BUSD: {
    name: "(PoS) Binance USD",
    id: "busd",
    decimals: 18,
    contractAddress: "0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
    abi: realusdcabi,
    icon: busd,
  },
  BAL: {
    name: "Balancer (PoS)",
    id: "bal",
    decimals: 18,
    contractAddress: "0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
    abi: realusdcabi,
    icon: bal,
  },
  AGIX: {
    name: "SingularityNET Token (PoS)",
    id: "agix",
    decimals: 8,
    contractAddress: "0x190eb8a183d22a4bdf278c6791b152228857c033",
    abi: realusdcabi,
    icon: agix,
  },
  UST: {
    name: "Wrapped UST Token (PoS)",
    id: "ust",
    decimals: 18,
    contractAddress: "0x692597b009d13c4049a947cab2239b7d6517875f",
    abi: realusdcabi,
    icon: ust,
  },
  LUNA: {
    name: "Wrapped LUNA Token (PoS)",
    id: "luna",
    decimals: 18,
    contractAddress: "0x24834bbec7e39ef42f4a75eaf8e5b6486d3f0e57",
    abi: realusdcabi,
    icon: luna,
  },
  COMP: {
    name: "(PoS) Compound",
    id: "comp",
    decimals: 18,
    contractAddress: "0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
    abi: realusdcabi,
    icon: comp,
  },
  stGHST: {
    name: "stGHST",
    id: "stghst",
    decimals: 18,
    contractAddress: "0xee33801cfe238e5f235f6b4a5c9e28fab2a5bed5",
    abi: realusdcabi,
    icon: ghst,
  },
  AMP: {
    name: "Amp Token (PoS)",
    id: "amp",
    decimals: 18,
    contractAddress: "0x0621d647cecbfb64b79e44302c1933cb4f27054d",
    abi: realusdcabi,
    icon: amp,
  },
  EURe: {
    name: "Monerium EUR emoney",
    id: "eure",
    decimals: 18,
    contractAddress: "0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
    abi: realusdcabi,
    icon: eure,
  },
  GHST: {
    name: "Aavegotchi GHST Token (PoS)",
    id: "ghst",
    decimals: 18,
    contractAddress: "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
    abi: realusdcabi,
    icon: ghst,
  },
  DINERO: {
    name: "DINERO",
    id: "dinero",
    decimals: 18,
    contractAddress: "0x601c9bb91223b376abb34c7f7365c3b59a69b0f7",
    abi: realusdcabi,
    icon: dinero,
  },
  RAI: {
    name: "Rai Reflex Index (PoS)",
    id: "rai",
    decimals: 18,
    contractAddress: "0x00e5646f60ac6fb446f621d146b6e1886f002905",
    abi: realusdcabi,
    icon: rai,
  },
  APE: {
    name: "ApeCoin (PoS)",
    id: "ape",
    decimals: 18,
    contractAddress: "0xb7b31a6bc18e48888545ce79e83e06003be70930",
    abi: realusdcabi,
    icon: ape,
  },
  CRO: {
    name: "CRO (PoS)",
    id: "cro",
    decimals: 8,
    contractAddress: "0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
    abi: realusdcabi,
    icon: cro,
  },
  DIMO: {
    name: "Dimo",
    id: "dimo",
    decimals: 18,
    contractAddress: "0xe261d618a959afffd53168cd07d12e37b26761db",
    abi: realusdcabi,
    icon: dimo,
  },
  MaticX: {
    name: "Liquid Staking Matic (PoS)",
    id: "maticx",
    decimals: 18,
    contractAddress: "0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
    abi: realusdcabi,
    icon: matic,
  },
  ANKR: {
    name: "Ankr (PoS)",
    id: "ankr",
    decimals: 18,
    contractAddress: "0x101a023270368c0d50bffb62780f4afd4ea79c35",
    abi: realusdcabi,
    icon: ankr,
  },
  pointless: {
    name: "pointless",
    id: "pointless",
    decimals: 18,
    contractAddress: "0x9b8cc6320f22325759b7d2ca5cd27347bb4ecd86",
    abi: realusdcabi,
    icon: pointless,
  },
  FET: {
    name: "Fetch (PoS)",
    id: "fet",
    decimals: 18,
    contractAddress: "0x7583feddbcefa813dc18259940f76a02710a8905",
    abi: realusdcabi,
    icon: fet,
  },
  BNB: {
    name: "Binance",
    id: "bnb",
    decimals: 18,
    contractAddress: "0xa649325aa7c5093d12d6f98eb4378deae68ce23f",
    abi: realusdcabi,
    icon: bnb,
  },
  jEUR: {
    name: "Jarvis Synthetic Euro",
    id: "jeur",
    decimals: 18,
    contractAddress: "0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
    abi: realusdcabi,
    icon: jeur,
  },
  XSGD: {
    name: "XSGD",
    id: "xsgd",
    decimals: 6,
    contractAddress: "0xdc3326e71d45186f113a2f448984ca0e8d201995",
    abi: realusdcabi,
    icon: xsgd,
  },
  WGC: {
    name: "Wild Goat Coin",
    id: "wgc",
    decimals: 6,
    contractAddress: "0x382586651f043cbdec7bb586e367d77b26d7d149",
    abi: realusdcabi,
    icon: wgc,
  },
  PLUNC: {
    name: "Poly Luna Classic ",
    id: "plunc",
    decimals: 18,
    contractAddress: "0x3eae5bd24b2038fb40688e5f0b4682a773db3733",
    abi: realusdcabi,
    icon: plunc,
  },
  PYR: {
    name: "PYR Token",
    id: "pyr",
    decimals: 18,
    contractAddress: "0x430ef9263e76dae63c84292c3409d61c598e9682",
    abi: realusdcabi,
    icon: pyr,
  },
  STG: {
    name: "StargateToken",
    id: "stg",
    decimals: 18,
    contractAddress: "0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
    abi: realusdcabi,
    icon: stg,
  },
  mDXN: {
    name: "DBXen Token on Polygon",
    id: "mdxn",
    decimals: 18,
    contractAddress: "0x47dd60fa40a050c0677de19921eb4cc512947729",
    abi: realusdcabi,
    icon: mdxn,
  },
  AVAX: {
    name: "Avalanche Token",
    id: "avax",
    decimals: 18,
    contractAddress: "0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
    abi: realusdcabi,
    icon: avax,
  },
};

export default polygonCurrencies;
