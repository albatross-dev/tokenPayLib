import CustomRouterAbi from "../../assets/customSwapRouterAbi.json";
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
  ThirdwebClient,
} from "thirdweb";
import { Chain } from "thirdweb/chains";
import { Account } from "thirdweb/wallets";
import { SimpleToken } from "../../types/token.types";

export interface TransactionResult {
  transactionHash: string;
}

export interface TokenContract {
  approve: (address: string, amount: bigint) => Promise<any>;
}

export const TokenPayAbstractionAddress =
  "0x224498ff598ecbcbde689b593e64ac48e9b3be15";
export const TokenPayAbstractionAbi = CustomRouterAbi;

/**
 * Gets the current token pay abstraction contract
 */
export function getTokenPayAbstractionContract(
  client: ThirdwebClient,
  chain: Chain
) {
  return getContract({
    client,
    chain,
    address: TokenPayAbstractionAddress,
    abi: TokenPayAbstractionAbi as Array<any>,
  });
}

/**
 * Abstracts the simple transfer function
 * @param client - Thirdweb client instance
 * @param account - User's account
 * @param chain - Chain instance
 * @param amount - Amount to transfer (with decimals)
 * @param token - Token details
 * @param recipient - Recipient address
 * @returns Transaction result with hash
 */
export async function tokenPayAbstractionSimpleTransfer(
  client: ThirdwebClient,
  account: Account,
  chain: Chain,
  amount: bigint,
  token: SimpleToken,
  recipient: string
): Promise<TransactionResult> {
  console.log("tokenPayAbstractionSimpleTransfer", amount);
  const contract = getTokenPayAbstractionContract(client, chain);

  // get token contract and approve transaction
  const tokenContract = getContract({
    client,
    chain,
    address: token.contractAddress,
    abi: token.abi,
  });

  const approveToken = prepareContractCall({
    contract: tokenContract,
    method: "approve",
    params: [TokenPayAbstractionAddress, amount],
  });

  await sendAndConfirmTransaction({
    account,
    transaction: approveToken,
  });

  const transferCall = prepareContractCall({
    contract: contract,
    method: "simpleTransfer",
    params: [amount, token.contractAddress, recipient],
  });

  const result = await sendAndConfirmTransaction({
    account,
    transaction: transferCall,
  });

  return result;
}
