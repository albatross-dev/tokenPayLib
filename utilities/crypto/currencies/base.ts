import weth from "@/tokenPayLib/assets/payment-icons/base/weth.svg";
import usdc from "@/tokenPayLib/assets/payment-icons/base/usdc.svg";
import degen from "@/tokenPayLib/assets/payment-icons/base/degen.png";
import brett from "@/tokenPayLib/assets/payment-icons/base/brett.png";
import dai from "@/tokenPayLib/assets/payment-icons/base/dai.svg";
import cbbtc from "@/tokenPayLib/assets/payment-icons/base/wbtc.svg";
import cbeth from "@/tokenPayLib/assets/payment-icons/base/weth.svg";
import tbtc from "@/tokenPayLib/assets/payment-icons/base/tbtc.png";
import eurc from "@/tokenPayLib/assets/payment-icons/base/eurc.png";
import spx from "@/tokenPayLib/assets/payment-icons/base/spx.png";
import usdplus from "@/tokenPayLib/assets/payment-icons/base/usdplus.png";
import wsteth from "@/tokenPayLib/assets/payment-icons/base/wsteth.png";
import zro from "@/tokenPayLib/assets/payment-icons/base/zro.png";

import realusdcabi from "@/assets/realusdcabi.json";
import { SimpleToken } from "../../../types/token.types";

const baseCurrencies: Record<string, SimpleToken> = {
  WETH: {
    name: "Wrapped Ether",
    decimals: 18,
    contractAddress: "0x4200000000000000000000000000000000000006",
    abi: realusdcabi,
    icon: weth,
    id: "weth",
  },
  USDC: {
    name: "USD Coin",
    decimals: 6,
    contractAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    abi: realusdcabi,
    icon: usdc,
    id: "usdc",
  },
  USDbC: {
    name: "USD Base Coin",
    decimals: 6,
    contractAddress: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    abi: realusdcabi,
    icon: usdc,
    id: "usdbc",
  },
  DEGEN: {
    name: "Degen",
    decimals: 18,
    contractAddress: "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
    abi: realusdcabi,
    icon: degen,
    id: "degen",
  },
  BRETT: {
    name: "Brett",
    decimals: 18,
    contractAddress: "0x532f27101965dd16442e59d40670faf5ebb142e4",
    abi: realusdcabi,
    icon: brett,
    id: "brett",
  },
  DAI: {
    name: "Dai Stablecoin",
    decimals: 18,
    contractAddress: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
    abi: realusdcabi,
    icon: dai,
    id: "dai",
  },
  cbBTC: {
    name: "Coinbase Wrapped BTC",
    decimals: 8,
    contractAddress: "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf",
    abi: realusdcabi,
    icon: cbbtc,
    id: "cbbtc",
  },
  cbETH: {
    name: "Coinbase Wrapped Staked ETH",
    decimals: 18,
    contractAddress: "0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22",
    abi: realusdcabi,
    icon: cbeth,
    id: "cbeth",
  },
  tBTC: {
    name: "Base tBTC v2",
    decimals: 18,
    contractAddress: "0x236aa50979d5f3de3bd1eeb40e81137f22ab794b",
    abi: realusdcabi,
    icon: tbtc,
    id: "tbtc",
  },
  EURC: {
    name: "EURC",
    decimals: 6,
    contractAddress: "0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42",
    abi: realusdcabi,
    icon: eurc,
    id: "eurc",
  },
  SPX: {
    name: "SPX6900",
    decimals: 8,
    contractAddress: "0x50da645f148798f68ef2d7db7c1cb22a6819bb2c",
    abi: realusdcabi,
    icon: spx,
    id: "spx",
  },
  "USD+": {
    name: "USD+",
    decimals: 6,
    contractAddress: "0xb79dd08ea68a908a97220c76d19a6aa9cbde4376",
    abi: realusdcabi,
    icon: usdplus,
    id: "usdplus",
  },
  wstETH: {
    name: "Wrapped liquid staked Ether 2.0",
    decimals: 18,
    contractAddress: "0xc1cba3fcea344f92d9239c08c0568f6f2f0ee452",
    abi: realusdcabi,
    icon: wsteth,
    id: "wsteth",
  },
  ZRO: {
    name: "LayerZero",
    decimals: 18,
    contractAddress: "0x6985884c4392d348587b19cb9eaaf157f13271cd",
    abi: realusdcabi,
    icon: zro,
    id: "zro",
  },
};

export default baseCurrencies;
