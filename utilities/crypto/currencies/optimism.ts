import realusdcabi from "@/assets/realusdcabi.json";

import weth from "@/tokenPayLib/assets/payment-icons/optimism/weth.svg";
import usdc from "@/tokenPayLib/assets/payment-icons/optimism/usdc.svg";
import usdt from "@/tokenPayLib/assets/payment-icons/optimism/usdt.svg";
import dai from "@/tokenPayLib/assets/payment-icons/optimism/dai.svg";
import wbtc from "@/tokenPayLib/assets/payment-icons/optimism/wbtc.svg";
import susd from "@/tokenPayLib/assets/payment-icons/optimism/susd.png";
import wsteth from "@/tokenPayLib/assets/payment-icons/optimism/wsteth.png";
import snx from "@/tokenPayLib/assets/payment-icons/optimism/snx.svg";
import uni from "@/tokenPayLib/assets/payment-icons/optimism/uni.svg";
import link from "@/tokenPayLib/assets/payment-icons/optimism/link.svg";
import lusd from "@/tokenPayLib/assets/payment-icons/optimism/lusd.png";
import rai from "@/tokenPayLib/assets/payment-icons/optimism/rai.svg";
import velo from "@/tokenPayLib/assets/payment-icons/optimism/velo.png";
import wld from "@/tokenPayLib/assets/payment-icons/optimism/wld.svg";
import aave from "@/tokenPayLib/assets/payment-icons/optimism/aave.svg";
import crv from "@/tokenPayLib/assets/payment-icons/optimism/crv.svg";
import reth from "@/tokenPayLib/assets/payment-icons/optimism/reth.png";
import frax from "@/tokenPayLib/assets/payment-icons/optimism/frax.svg";
import thales from "@/tokenPayLib/assets/payment-icons/optimism/thales.png";
import hai from "@/tokenPayLib/assets/payment-icons/optimism/hai.png";
import perp from "@/tokenPayLib/assets/payment-icons/optimism/perp.png";
import ldo from "@/tokenPayLib/assets/payment-icons/optimism/ldo.png";
import stg from "@/tokenPayLib/assets/payment-icons/optimism/stg.png";
import ageur from "@/tokenPayLib/assets/payment-icons/optimism/ageur.png";
import usdplus from "@/tokenPayLib/assets/payment-icons/optimism/usdplus.png";
import tbtc from "@/tokenPayLib/assets/payment-icons/optimism/tbtc.png";
import dola from "@/tokenPayLib/assets/payment-icons/optimism/dola.png";
import zro from "@/tokenPayLib/assets/payment-icons/optimism/zro.png";
import bal from "@/tokenPayLib/assets/payment-icons/optimism/bal.svg";

const optimismCurrencies: Record<string, SimpleToken> = {
  WETH: {
    name: "Wrapped Ether",
    decimals: 18,
    contractAddress: "0x4200000000000000000000000000000000000006",
    abi: realusdcabi,
    icon: weth,
    id: "WETH",
  },
  "USDC.E": {
    name: "Bridged USD Coin",
    decimals: 6,
    contractAddress: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    abi: realusdcabi,
    icon: usdc,
    id: "USDC.E",
  },
  USDC: {
    name: "USD Coin",
    decimals: 6,
    contractAddress: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
    abi: realusdcabi,
    icon: usdc,
    id: "USDC",
  },
  USDT: {
    name: "Tether USD",
    decimals: 6,
    contractAddress: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    abi: realusdcabi,
    icon: usdt,
    id: "USDT",
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
    contractAddress: "0x68f180fcce6836688e9084f035309e29bf0a2095",
    abi: realusdcabi,
    icon: wbtc,
    id: "WBTC",
  },
  sUSD: {
    name: "Synth sUSD",
    decimals: 18,
    contractAddress: "0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9",
    abi: realusdcabi,
    icon: susd,
    id: "sUSD",
  },
  wstETH: {
    name: "Wrapped liquid staked Ether 2.0",
    decimals: 18,
    contractAddress: "0x1f32b1c2345538c0c6f582fcb022739c4a194ebb",
    abi: realusdcabi,
    icon: wsteth,
    id: "wstETH",
  },
  SNX: {
    name: "Synthetix Network Token",
    decimals: 18,
    contractAddress: "0x8700daec35af8ff88c16bdf0418774cb3d7599b4",
    abi: realusdcabi,
    icon: snx,
    id: "SNX",
  },
  UNI: {
    name: "Uniswap",
    decimals: 18,
    contractAddress: "0x6fd9d7ad17242c41f7131d257212c54a0e816691",
    abi: realusdcabi,
    icon: uni,
    id: "UNI",
  },
  LINK: {
    name: "ChainLink Token",
    decimals: 18,
    contractAddress: "0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6",
    abi: realusdcabi,
    icon: link,
    id: "LINK",
  },
  LUSD: {
    name: "LUSD Stablecoin",
    decimals: 18,
    contractAddress: "0xc40f949f8a4e094d1b49a23ea9241d289b7b2819",
    abi: realusdcabi,
    icon: lusd,
    id: "LUSD",
  },
  RAI: {
    name: "Rai Reflex Index",
    decimals: 18,
    contractAddress: "0x7fb688ccf682d58f86d7e38e03f9d22e7705448b",
    abi: realusdcabi,
    icon: rai,
    id: "RAI",
  },
  VELO: {
    name: "VelodromeV2",
    decimals: 18,
    contractAddress: "0x9560e827af36c94d2ac33a39bce1fe78631088db",
    abi: realusdcabi,
    icon: velo,
    id: "VELO",
  },
  WLD: {
    name: "Worldcoin",
    decimals: 18,
    contractAddress: "0xdc6ff44d5d932cbd77b52e5612ba0529dc6226f1",
    abi: realusdcabi,
    icon: wld,
    id: "WLD",
  },
  AAVE: {
    name: "Aave Token",
    decimals: 18,
    contractAddress: "0x76fb31fb4af56892a25e32cfc43de717950c9278",
    abi: realusdcabi,
    icon: aave,
    id: "AAVE",
  },
  CRV: {
    name: "Curve DAO Token",
    decimals: 18,
    contractAddress: "0x0994206dfe8de6ec6920ff4d779b0d950605fb53",
    abi: realusdcabi,
    icon: crv,
    id: "CRV",
  },
  rETH: {
    name: "Rocket Pool ETH",
    decimals: 18,
    contractAddress: "0x9bcef72be871e61ed4fbbc7630889bee758eb81d",
    abi: realusdcabi,
    icon: reth,
    id: "rETH",
  },
  FRAX: {
    name: "Frax",
    decimals: 18,
    contractAddress: "0x2e3d870790dc77a83dd1d18184acc7439a53f475",
    abi: realusdcabi,
    icon: frax,
    id: "FRAX",
  },
  THALES: {
    name: "Optimistic Thales Token",
    decimals: 18,
    contractAddress: "0x217d47011b23bb961eb6d93ca9945b7501a5bb11",
    abi: realusdcabi,
    icon: thales,
    id: "THALES",
  },
  HAI: {
    name: "HAI Index Token",
    decimals: 18,
    contractAddress: "0x10398abc267496e49106b07dd6be13364d10dc71",
    abi: realusdcabi,
    icon: hai,
    id: "HAI",
  },
  PERP: {
    name: "Perpetual",
    decimals: 18,
    contractAddress: "0x9e1028f5f1d5ede59748ffcee5532509976840e0",
    abi: realusdcabi,
    icon: perp,
    id: "PERP",
  },
  LDO: {
    name: "Lido DAO Token",
    decimals: 18,
    contractAddress: "0xfdb794692724153d1488ccdbe0c56c252596735f",
    abi: realusdcabi,
    icon: ldo,
    id: "LDO",
  },
  STG: {
    name: "StargateToken",
    decimals: 18,
    contractAddress: "0x296f55f8fb28e498b858d0bcda06d955b2cb3f97",
    abi: realusdcabi,
    icon: stg,
    id: "STG",
  },
  agEUR: {
    name: "agEUR",
    decimals: 18,
    contractAddress: "0x9485aca5bbbe1667ad97c7fe7c4531a624c8b1ed",
    abi: realusdcabi,
    icon: ageur,
    id: "agEUR",
  },
  "USD+": {
    name: "USD+",
    decimals: 6,
    contractAddress: "0x73cb180bf0521828d8849bc8cf2b920918e23032",
    abi: realusdcabi,
    icon: usdplus,
    id: "USD+",
  },
  tBTC: {
    name: "Optimism tBTC v2",
    decimals: 18,
    contractAddress: "0x6c84a8f1c29108f47a79964b5fe888d4f4d0de40",
    abi: realusdcabi,
    icon: tbtc,
    id: "tBTC",
  },
  DOLA: {
    name: "Dola USD Stablecoin",
    decimals: 18,
    contractAddress: "0x8ae125e8653821e851f12a49f7765db9a9ce7384",
    abi: realusdcabi,
    icon: dola,
    id: "DOLA",
  },
  ZRO: {
    name: "LayerZero",
    decimals: 18,
    contractAddress: "0x6985884c4392d348587b19cb9eaaf157f13271cd",
    abi: realusdcabi,
    icon: zro,
    id: "ZRO",
  },
  BAL: {
    name: "Balancer",
    decimals: 18,
    contractAddress: "0xfe8b128ba8c78aabc59d4c64cee7ff28e9379921",
    abi: realusdcabi,
    icon: bal,
    id: "BAL",
  },
};

export default optimismCurrencies;
