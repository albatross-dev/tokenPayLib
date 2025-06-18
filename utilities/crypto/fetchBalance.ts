import {
  Chain,
  ContractOptions,
  getContract,
  readContract,
  ThirdwebClient,
} from "thirdweb";
import { sendErrorReport } from "../../../context/UserContext";
import { queryClient } from "@/pages/_app";

// Custom error types to distinguish between different failure scenarios
class ZeroBalanceError extends Error {
  constructor(message: string = "Balance is 0") {
    super(message);
    this.name = "ZeroBalanceError";
  }
}

class ContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContractError";
  }
}

/**
 * Fetches the balance of a given account address from a specified contract on a specified blockchain.
 *
 * @param {Object} client - The client to interact with the blockchain network from thridweb
 * @param {Object} chain - The blockchain network to interact with.
 * @param {string} contractAddress - The address of the contract to interact with.
 * @param {Array} abi - The ABI (Application Binary Interface) of the contract.
 * @param {string} accountAddress - The address of the account to fetch the balance for.
 * @returns {Promise<bigint>} - The balance of the account in the contract, or 0 in case of an error.
 * @throws {Error} - Throws an error if the balance could not be fetched.
 */
async function fetchBalanceRaw(
  client: ThirdwebClient,
  chain: Chain,
  contractAddress: string,
  abi: any[],
  accountAddress: string
): Promise<bigint> {
  try {
    if (process.env.NEXT_PUBLIC_NEXT_ENV === "development") {
      console.log("fetchBalance RAW");
    }

    const contract: Readonly<ContractOptions<any[]>> = getContract({
      client: client,
      chain,
      address: contractAddress,
      abi,
    });

    const result: bigint = await readContract({
      contract,
      method: "function balanceOf(address) view returns (uint256)",
      params: [accountAddress],
    });

    if (typeof result !== "bigint") {
      return BigInt(0);
    }

    return result;
  } catch (error) {
    console.log("fetchBalance RAW error", error);
    return BigInt(0);
  }
}

// Generate a consistent cache key for the balance query
function getBalanceQueryKey(
  chainId: number,
  contractAddress: string,
  accountAddress: string
): string[] {
  return [
    "balance",
    chainId.toString(),
    contractAddress.toLowerCase(),
    accountAddress.toLowerCase(),
  ];
}

// Cached version using QueryClient
export default async function fetchBalance(
  client: ThirdwebClient,
  chain: Chain,
  contractAddress: string,
  abi: any[],
  accountAddress: string,
  options?: {
    staleTime?: number; // How long data stays fresh (default: 30 seconds)
  }
): Promise<bigint> {
  if (!accountAddress) {
    return BigInt(0);
  }

  const queryKey = getBalanceQueryKey(
    chain.id,
    contractAddress,
    accountAddress
  );

  const defaultOptions = {
    staleTime: 30 * 1000, // 30 seconds
    ...options,
  };

  let lastResult = queryClient.getQueryData<bigint>(queryKey);

  if (lastResult === BigInt(0)) {
    defaultOptions.staleTime = 5 * 60 * 1000; // 5 minutes
  } else if (lastResult === null) {
    defaultOptions.staleTime = Infinity; // Never stale
  }

  const result = await queryClient.fetchQuery<bigint>({
    queryKey,
    queryFn: () => {
      return fetchBalanceRaw(
        client,
        chain,
        contractAddress,
        abi,
        accountAddress
      );
    },
    staleTime: defaultOptions.staleTime,
  });

  return result;
}

export async function fetchTotalSupply(
  client: ThirdwebClient,
  chain: Chain,
  contractAddress: string,
  abi: any[]
): Promise<bigint> {
  try {
    const contract: Readonly<ContractOptions<any[]>> = getContract({
      client: client,
      chain,
      address: contractAddress,
      abi,
    });

    const result: bigint = await readContract({
      contract,
      method: "function totalSupply() view returns (uint256)",
    });

    return result;
  } catch (error) {
    sendErrorReport(
      `Error fetching total supply for ${contractAddress} on ${chain.name}`,
      error
    );
    return BigInt(0); // Return zero balance in case of an error
  }
}
