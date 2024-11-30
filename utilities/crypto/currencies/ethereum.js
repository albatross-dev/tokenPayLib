import weth from "@/tokenPayLib/assets/payment-icons/ethereum/weth.svg";
import usdc from "@/tokenPayLib/assets/payment-icons/ethereum/usdc.svg";
import usdt from "@/tokenPayLib/assets/payment-icons/ethereum/usdt.svg";
import dai from "@/tokenPayLib/assets/payment-icons/ethereum/dai.svg";
import wbtc from "@/tokenPayLib/assets/payment-icons/ethereum/wbtc.svg";
import pepe from "@/tokenPayLib/assets/payment-icons/ethereum/pepe.png";
import uni from "@/tokenPayLib/assets/payment-icons/ethereum/uni.svg";
import hex from "@/tokenPayLib/assets/payment-icons/ethereum/hex.png";
import wsteth from "@/tokenPayLib/assets/payment-icons/ethereum/wsteth.png";
import nfai from "@/tokenPayLib/assets/payment-icons/ethereum/nfai.png";
import elon from "@/tokenPayLib/assets/payment-icons/ethereum/elon.png";
import titanx from "@/tokenPayLib/assets/payment-icons/ethereum/titanx.png";
import shib from "@/tokenPayLib/assets/payment-icons/ethereum/shib.svg";
import frax from "@/tokenPayLib/assets/payment-icons/ethereum/frax.svg";
import link from "@/tokenPayLib/assets/payment-icons/ethereum/link.svg";
import ichi from "@/tokenPayLib/assets/payment-icons/ethereum/ichi.png";
import flc from "@/tokenPayLib/assets/payment-icons/ethereum/flc.png";
import crv from "@/tokenPayLib/assets/payment-icons/ethereum/crv.svg";
import lusd from "@/tokenPayLib/assets/payment-icons/ethereum/lusd.png";
import luna from "@/tokenPayLib/assets/payment-icons/ethereum/luna.svg";
import ohm from "@/tokenPayLib/assets/payment-icons/ethereum/ohm.png";
import sdex from "@/tokenPayLib/assets/payment-icons/ethereum/sdex.png";
import busd from "@/tokenPayLib/assets/payment-icons/ethereum/busd.svg";
import ape from "@/tokenPayLib/assets/payment-icons/ethereum/ape.png";
import rai from "@/tokenPayLib/assets/payment-icons/ethereum/rai.svg";
import oneinch from "@/tokenPayLib/assets/payment-icons/ethereum/1inch.png";
import ust from "@/tokenPayLib/assets/payment-icons/ethereum/ust.png";
import gohm from "@/tokenPayLib/assets/payment-icons/ethereum/gohm.png";
import xen from "@/tokenPayLib/assets/payment-icons/ethereum/xen.png";
import mim from "@/tokenPayLib/assets/payment-icons/ethereum/mim.png";
import aave from "@/tokenPayLib/assets/payment-icons/ethereum/aave.svg";
import metis from "@/tokenPayLib/assets/payment-icons/ethereum/metis.png";
import tsuka from "@/tokenPayLib/assets/payment-icons/ethereum/tsuka.png";
import eurt from "@/tokenPayLib/assets/payment-icons/ethereum/eurt.png";
import mkr from "@/tokenPayLib/assets/payment-icons/ethereum/mkr.png";
import hdrn from "@/tokenPayLib/assets/payment-icons/ethereum/hdrn.png";
import ampl from "@/tokenPayLib/assets/payment-icons/ethereum/ampl.png";
import fei from "@/tokenPayLib/assets/payment-icons/ethereum/fei.png";
import tribe from "@/tokenPayLib/assets/payment-icons/ethereum/tribe.png";
import comp from "@/tokenPayLib/assets/payment-icons/ethereum/comp.svg";
import ldo from "@/tokenPayLib/assets/payment-icons/ethereum/ldo.png";
import usdp from "@/tokenPayLib/assets/payment-icons/ethereum/usdp.svg";
import euroc from "@/tokenPayLib/assets/payment-icons/ethereum/euroc.png";
import verse from "@/tokenPayLib/assets/payment-icons/ethereum/verse.png";
import mog from "@/tokenPayLib/assets/payment-icons/ethereum/mog.webp";
import tusd from "@/tokenPayLib/assets/payment-icons/ethereum/tusd.svg";
import mm from "@/tokenPayLib/assets/payment-icons/ethereum/mm.png";
import toncoin from "@/tokenPayLib/assets/payment-icons/ethereum/toncoin.svg";

import realusdcabi from "@/assets/realusdcabi.json";

const ethereumCurrencies = {
  WETH: {
    name: "Wrapped Ether",
    decimals: 18,
    contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    abi: realusdcabi,
    icon: weth,
  },
  USDC: {
    name: "USD Coin",
    decimals: 6,
    contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    abi: realusdcabi,
    icon: usdc,
  },
  USDT: {
    name: "Tether USD",
    decimals: 6,
    contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    abi: realusdcabi,
    icon: usdt,
  },
  DAI: {
    name: "Dai Stablecoin",
    decimals: 18,
    contractAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    abi: realusdcabi,
    icon: dai,
  },
  WBTC: {
    name: "Wrapped BTC",
    decimals: 8,
    contractAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    abi: realusdcabi,
    icon: wbtc,
  },
  PEPE: {
    name: "Pepe",
    decimals: 18,
    contractAddress: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
    abi: realusdcabi,
    icon: pepe,
  },
  UNI: {
    name: "Uniswap",
    decimals: 18,
    contractAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    abi: realusdcabi,
    icon: uni,
  },
  HEX: {
    name: "HEX",
    decimals: 8,
    contractAddress: "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39",
    abi: realusdcabi,
    icon: hex,
  },
  wstETH: {
    name: "Wrapped liquid staked Ether 2.0",
    decimals: 18,
    contractAddress: "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
    abi: realusdcabi,
    icon: wsteth,
  },
  NFAi: {
    name: "Not Financial Advice",
    decimals: 18,
    contractAddress: "0x17c50d62e6e8d20d2dc18e9ad79c43263d0720d9",
    abi: realusdcabi,
    icon: nfai,
  },
  ELON: {
    name: "Dogelon",
    decimals: 18,
    contractAddress: "0x761d38e5ddf6ccf6cf7c55759d5210750b5d60f3",
    abi: realusdcabi,
    icon: elon,
  },
  TITANX: {
    name: "TITAN X",
    decimals: 18,
    contractAddress: "0xf19308f923582a6f7c465e5ce7a9dc1bec6665b1",
    abi: realusdcabi,
    icon: titanx,
  },
  SHIB: {
    name: "SHIBA INU",
    decimals: 18,
    contractAddress: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
    abi: realusdcabi,
    icon: shib,
  },
  FRAX: {
    name: "Frax",
    decimals: 18,
    contractAddress: "0x853d955acef822db058eb8505911ed77f175b99e",
    abi: realusdcabi,
    icon: frax,
  },
  LINK: {
    name: "ChainLink Token",
    decimals: 18,
    contractAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
    abi: realusdcabi,
    icon: link,
  },
  ICHI: {
    name: "ICHI",
    decimals: 18,
    contractAddress: "0x111111517e4929d3dcbdfa7cce55d30d4b6bc4d6",
    abi: realusdcabi,
    icon: ichi,
  },
  FLC: {
    name: "Flooring Lab Credit",
    decimals: 18,
    contractAddress: "0x102c776ddb30c754ded4fdcc77a19230a60d4e4f",
    abi: realusdcabi,
    icon: flc,
  },
  CRV: {
    name: "Curve DAO Token",
    decimals: 18,
    contractAddress: "0xd533a949740bb3306d119cc777fa900ba034cd52",
    abi: realusdcabi,
    icon: crv,
  },
  LUSD: {
    name: "LUSD Stablecoin",
    decimals: 18,
    contractAddress: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0",
    abi: realusdcabi,
    icon: lusd,
  },
  LUNA: {
    name: "Wrapped LUNA Token",
    decimals: 18,
    contractAddress: "0xd2877702675e6ceb975b4a1dff9fb7baf4c91ea9",
    abi: realusdcabi,
    icon: luna,
  },
  OHM: {
    name: "Olympus",
    decimals: 9,
    contractAddress: "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5",
    abi: realusdcabi,
    icon: ohm,
  },
  SDEX: {
    name: "SmarDex Token",
    decimals: 18,
    contractAddress: "0x5de8ab7e27f6e7a1fff3e5b337584aa43961beef",
    abi: realusdcabi,
    icon: sdex,
  },
  BUSD: {
    name: "Binance USD",
    decimals: 18,
    contractAddress: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
    abi: realusdcabi,
    icon: busd,
  },
  APE: {
    name: "ApeCoin",
    decimals: 18,
    contractAddress: "0x4d224452801aced8b2f0aebe155379bb5d594381",
    abi: realusdcabi,
    icon: ape,
  },
  RAI: {
    name: "Rai Reflex Index",
    decimals: 18,
    contractAddress: "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
    abi: realusdcabi,
    icon: rai,
  },
  "1INCH": {
    name: "1INCH Token",
    decimals: 18,
    contractAddress: "0x111111111117dc0aa78b770fa6a738034120c302",
    abi: realusdcabi,
    icon: oneinch,
  },
  UST: {
    name: "Wrapped UST Token",
    decimals: 18,
    contractAddress: "0xa47c8bf37f92abed4a126bda807a7b7498661acd",
    abi: realusdcabi,
    icon: ust,
  },
  gOHM: {
    name: "Governance OHM",
    decimals: 18,
    contractAddress: "0x0ab87046fbb341d058f17cbc4c1133f25a20a52f",
    abi: realusdcabi,
    icon: gohm,
  },
  XEN: {
    name: "XEN Crypto",
    decimals: 18,
    contractAddress: "0x06450dee7fd2fb8e39061434babcfc05599a6fb8",
    abi: realusdcabi,
    icon: xen,
  },
  MIM: {
    name: "Magic Internet Money",
    decimals: 18,
    contractAddress: "0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3",
    abi: realusdcabi,
    icon: mim,
  },
  AAVE: {
    name: "Aave Token",
    decimals: 18,
    contractAddress: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    abi: realusdcabi,
    icon: aave,
  },
  Metis: {
    name: "Metis Token",
    decimals: 18,
    contractAddress: "0x9e32b13ce7f2e80a01932b42553652e053d6ed8e",
    abi: realusdcabi,
    icon: metis,
  },
  TSUKA: {
    name: "Dejitaru Tsuka",
    decimals: 9,
    contractAddress: "0xc5fb36dd2fb59d3b98deff88425a3f425ee469ed",
    abi: realusdcabi,
    icon: tsuka,
  },
  EURT: {
    name: "Euro Tether",
    decimals: 6,
    contractAddress: "0xc581b735a1688071a1746c968e0798d642ede491",
    abi: realusdcabi,
    icon: eurt,
  },
  MKR: {
    name: "Maker",
    decimals: 18,
    contractAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    abi: realusdcabi,
    icon: mkr,
  },
  HDRN: {
    name: "Hedron",
    decimals: 9,
    contractAddress: "0x3819f64f282bf135d62168c1e513280daf905e06",
    abi: realusdcabi,
    icon: hdrn,
  },
  AMPL: {
    name: "Ampleforth",
    decimals: 9,
    contractAddress: "0xd46ba6d942050d489dbd938a2c909a5d5039a161",
    abi: realusdcabi,
    icon: ampl,
  },
  FEI: {
    name: "Fei USD",
    decimals: 18,
    contractAddress: "0x956f47f50a910163d8bf957cf5846d573e7f87ca",
    abi: realusdcabi,
    icon: fei,
  },
  TRIBE: {
    name: "Tribe",
    decimals: 18,
    contractAddress: "0xc7283b66eb1eb5fb86327f08e1b5816b0720212b",
    abi: realusdcabi,
    icon: tribe,
  },
  COMP: {
    name: "Compound",
    decimals: 18,
    contractAddress: "0xc00e94cb662c3520282e6f5717214004a7f26888",
    abi: realusdcabi,
    icon: comp,
  },
  LDO: {
    name: "Lido DAO Token",
    decimals: 18,
    contractAddress: "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
    abi: realusdcabi,
    icon: ldo,
  },
  USDP: {
    name: "Pax Dollar",
    decimals: 18,
    contractAddress: "0x8e870d67f660d95d5be530380d0ec0bd388289e1",
    abi: realusdcabi,
    icon: usdp,
  },
  EUROC: {
    name: "Euro Coin",
    decimals: 6,
    contractAddress: "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c",
    abi: realusdcabi,
    icon: euroc,
  },
  MM: {
    name: "Million",
    decimals: 18,
    contractAddress: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
    abi: realusdcabi,
    icon: mm,
  },
  VERSE: {
    name: "Verse",
    decimals: 18,
    contractAddress: "0x249ca82617ec3dfb2589c4c17ab7ec9765350a18",
    abi: realusdcabi,
    icon: verse,
  },
  TONCOIN: {
    name: "Wrapped TON Coin",
    decimals: 9,
    contractAddress: "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
    abi: realusdcabi,
    icon: toncoin,
  },
  Mog: {
    name: "Mog Coin",
    decimals: 18,
    contractAddress: "0xaaee1a9723aadb7afa2810263653a34ba2c21c7a",
    abi: realusdcabi,
    icon: mog,
  },
  TUSD: {
    name: "TrueUSD",
    decimals: 18,
    contractAddress: "0x0000000000085d4780b73119b644ae5ecd22b376",
    abi: realusdcabi,
    icon: tusd,
  },
};

export default ethereumCurrencies;
