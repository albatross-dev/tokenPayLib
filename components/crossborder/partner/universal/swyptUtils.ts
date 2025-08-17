import { getContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import client from "@/utilities/thirdweb-client";
import { api, sendErrorReport } from "../../../../../context/UserContext";

const swyptAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountPlusfee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_exchangeRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_feeAmount",
        type: "uint256",
      },
    ],
    name: "withdrawToEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const swyptContractAddress =
  "0x980b2f387bbecd67d94b2b6eebd4fd238946466a";

export const swyptContract = getContract({
  client,
  chain: polygon,
  address: swyptContractAddress,
  abi: swyptAbi,
});

export interface SwyptQuoteResponse {
  inputAmount: string;
  outputAmount: number;
  inputCurrency: string;
  outputCurrency: string;
  exchangeRate: number;
  type: "onramp" | "offramp";
  network: string;
  fee?: {
    amount: number;
    currency: string;
    details?: {
      feeInKES: number;
      estimatedOutputKES: number;
    };
  };
}

/**
 * Get a quote for a Swypt onramp transaction (Fiat to Crypto)
 */
export async function getSwyptQuote(
  amount: number | string,
  fiatCurrency: string = "KES",
  cryptoCurrency: string = "USDC",
  network: string = "Polygon",
  type: string = "offramp"
): Promise<SwyptQuoteResponse> {
  try {
    const result = await api.post("/api/fiatTransaction/swypt/quote", {
      type,
      amount: String(amount),
      fiatCurrency,
      cryptoCurrency,
      network,
    });
    return result.data as SwyptQuoteResponse;
  } catch (error) {
    sendErrorReport("SwyptQuote - Fetching quote failed", error);
    console.error("Error fetching Swypt quote:", error);
    throw error;
  }
}
