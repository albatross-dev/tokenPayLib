import { getContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { client } from "../../../../../pages/_app";

const swyptAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amountPlusfee",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_exchangeRate",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_feeAmount",
        type: "uint256"
      }
    ],
    name: "withdrawToEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

export const swyptContractAddress = "0x980b2f387bbecd67d94b2b6eebd4fd238946466a";

export const swyptContract = getContract({
  client,
  chain: polygon,
  address: swyptContractAddress,
  abi: swyptAbi,
}); 