import CustomRouterAbi from "@/tokenPayLib/assets/customSwapRouterAbi.json";
import { getContract, prepareContractCall, sendAndConfirmTransaction } from "thirdweb";

export const TokenPayAbstractionAddress = "0x224498ff598ecbcbde689b593e64ac48e9b3be15"
export const TokenPayAbstractionAbi = CustomRouterAbi

/**
 * gets the current token pay abstraction contract
 */
export function getTokenPayAbstractionContract(client, chain){
  return getContract({
    client: client,
    chain: chain,
    address: TokenPayAbstractionAddress,
    abi: TokenPayAbstractionAbi,
  })
}

/**
 * abstracts the simple transfer function
 * amount has to be with decimals
 */
export async function tokenPayAbstractionSimpleTransfer(client, account, chain, amount, token, recipient){
  console.log("tokenPayAbstractionSimpleTransfer", amount)
  let contract = getTokenPayAbstractionContract(client, chain)

  // get token contract and approve transaction
  const tokenContract = getContract({
    client: client,
    chain: chain,
    address: token.contractAddress,
    abi: token.abi,
  });

  const approveToken = prepareContractCall({
    contract: tokenContract,
    method: "approve",
    params: [
      TokenPayAbstractionAddress,
      amount
    ],
  });

  await sendAndConfirmTransaction({
    account,
    transaction: approveToken,
  });

  let transferCall = prepareContractCall({
    contract: contract,
    method: "simpleTransfer",
    params: [
      amount,
      token.contractAddress,
      recipient
    ]
  })
  let result = await sendAndConfirmTransaction({
    account: account,
    transaction: transferCall
  })
  return result;
} 