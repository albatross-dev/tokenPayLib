import { defineChain } from "thirdweb/chains";

export const OPTIMISM_CHAIN = defineChain({
  id: 10,
  rpc: "https://mainnet.optimism.io",
});

export const POLYGON_CHAIN = defineChain({
  id: 137,
  rpc: "https://polygon-rpc.com",
});

export const ETHEREUM_CHAIN = defineChain({
  id: 1,
  rpc: "https://1rpc.io/eth",
});

export const ARBITRUM_CHAIN = defineChain({
  id: 42161,
  rpc: "https://arb1.arbitrum.io/rpc",
});

export const BASE_CHAIN = defineChain({
  id: 8453,
  rpc: "https://base-rpc.publicnode.com",
});
