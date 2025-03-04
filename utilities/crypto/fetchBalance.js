
import { getContract, readContract } from "thirdweb";

/**
 * Fetches the balance of a given account address from a specified contract on a specified blockchain.
 *
 * @param {Object} client - The client to interact with the blockchain network from thridweb
 * @param {Object} chain - The blockchain network to interact with.
 * @param {string} contractAddress - The address of the contract to interact with.
 * @param {Array} abi - The ABI (Application Binary Interface) of the contract.
 * @param {string} accountAddress - The address of the account to fetch the balance for.
 * @returns {Promise<number>} - The balance of the account in the contract, or 0 in case of an error.
 * @throws {Error} - Throws an error if the balance could not be fetched.
 */
export default async function fetchBalance(client, chain, contractAddress, abi, accountAddress) {

  try {
    const contract = getContract({
      client: client,
      chain,
      address: contractAddress,
      abi,
    });

    const result = await readContract({
      contract,
      method: "function balanceOf(address) view returns (uint256)",
      params: [accountAddress],
    });

    if (!result) {
      throw new Error("Failed to fetch balance");
    }

    return result;
  } catch (error) {
    console.error(`Error fetching balance for ${accountAddress} ${name} ${contractAddress} on ${chain.name}:`, error);
    return 0; // Return zero balance in case of an error
  }
}