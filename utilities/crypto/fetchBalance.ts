import { Chain, ContractOptions, getContract, readContract, ThirdwebClient } from "thirdweb";
import { sendErrorReport } from "../../../context/UserContext";

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
export default async function fetchBalance(
  client: ThirdwebClient,
  chain: Chain,
  contractAddress: string,
  abi: any[],
  accountAddress: string
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
      method: "function balanceOf(address) view returns (uint256)",
      params: [accountAddress],
    });

    console.log("fetchBalance result", typeof result, result);

     if (typeof result !== "bigint") {
      throw new Error("Failed to fetch balance");
    }

    return result;
  } catch (error) {
    sendErrorReport(`Error fetching balance for ${accountAddress} ${contractAddress} on ${chain.name}`, error);
    return BigInt(0); // Return zero balance in case of an error
  }
} 