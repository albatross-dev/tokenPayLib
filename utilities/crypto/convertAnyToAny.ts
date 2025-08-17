import CustomRouterAbi from "@/tokenPayLib/assets/customSwapRouterAbi.json";
import QuoteV2Abi from "@/tokenPayLib/assets/quoteV2Abi.json";
import SwapRouterAbi from "@/tokenPayLib/assets/swapRouterAbi.json";
import client from "@/utilities/thirdweb-client";
import {
  Chain,
  ContractOptions,
  getContract,
  prepareContractCall,
  PreparedTransaction,
  readContract,
  sendAndConfirmTransaction,
} from "thirdweb";

import { TransactionReceipt } from "thirdweb/transaction";
import { encodePacked } from "thirdweb/utils";

import { arbitrum, base, ethereum, optimism, polygon } from "thirdweb/chains";
import { ExchangeType } from "../exchangeTypes";
import getPath, { getEncodedPath } from "./getPath";

import { sendErrorReport } from "../../../context/UserContext";
import { SimpleToken, Token } from "../../types/token.types";
import { ERC20ABI } from "./currencies";

const exchangeType: ExchangeType = process.env.NEXT_PUBLIC_EXCHANGE_TYPE as ExchangeType;
// const exchangeType: ExchangeType = "internal";

export const uniswapAddresses: Record<string, { router: string; quote: string }> = {
  [ethereum.id]: {
    router: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    quote: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  },
  [optimism.id]: {
    router: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    quote: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  },
  [arbitrum.id]: {
    router: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    quote: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  },
  [base.id]: {
    router: "0x2626664c2603336E57B271c5C0b26F421741e481",
    quote: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a",
  },
  [polygon.id]: {
    router: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    quote: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  },
};

export const uniswapAddressesPublic: Record<string, { router: string; quote: string }> = {
  [ethereum.id]: {
    router: "0x53e57D69737FC5Cc7E6DF1253c67d748E082938c",
    quote: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  },
  [optimism.id]: {
    router: "0x53e57D69737FC5Cc7E6DF1253c67d748E082938c",
    quote: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  },
  [arbitrum.id]: {
    router: "0x15f4660fC5532d20b79710F7CfaC47fc53244cd8",
    quote: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  },
  [base.id]: {
    router: "0x53e57D69737FC5Cc7E6DF1253c67d748E082938c",
    quote: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a",
  },
  [polygon.id]: {
    router: "0x224498FF598EcBCBde689b593E64Ac48e9b3BE15",
    quote: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  },
};

export function getQuoteContract(chain: Chain): ContractOptions<any[], `0x${string}`> {
  return getContract({
    client,
    chain,
    address: uniswapAddresses[chain.id].quote,
    abi: QuoteV2Abi as Array<any>,
  });
}

/**
 * Converts any token to any token directly
 */
export async function convertAnyToAnyDirect(
  token: SimpleToken,
  amount: number,
  account: any,
  success: () => void,
  error: (e: Error) => void,
  chain: any,
  target: SimpleToken,
  path?: Array<Array<string>>
) {
  const finalAmount = Number(amount.toFixed(0));

  console.log("convertAnyToAnyDirect", token, finalAmount, account, chain, target, exchangeType, path);

  try {
    // Log account details for debugging
    console.log("Account details:", {
      address: account?.address,
      type: account?.type,
      chain: account?.chain?.id,
    });

    const swapRouterContract = getContract({
      client,
      chain,
      address: (exchangeType === "internal" ? uniswapAddresses : uniswapAddressesPublic)[chain.id].router,
      abi: exchangeType === "internal" ? (SwapRouterAbi as Array<any>) : (CustomRouterAbi as Array<any>),
    });

    const quoteContract = getQuoteContract(chain);

    const tokenContract = getContract({
      client,
      chain,
      address: token.contractAddress,
      abi: token.abi,
    });

    console.log("swapRouterContract", swapRouterContract);

    // Approve token
    const approveToken = prepareContractCall({
      contract: tokenContract,
      method: "approve",
      params: [
        (exchangeType === "internal" ? uniswapAddresses : uniswapAddressesPublic)[chain.id].router, // Router Address
        BigInt(finalAmount),
      ],
    });

    console.log("Sending approval transaction...");
    await sendAndConfirmTransaction({
      account,
      transaction: approveToken,
    });
    console.log("Approval transaction successful");

    let encodedPath: string;

    if (!path) {
      encodedPath = getEncodedPath(token.id.toUpperCase(), chain, target.id.toUpperCase());
    } else {
      encodedPath = encodePacked(path[0], path[1]);
    }

    // Quote the exchange
    const quote = await readContract({
      contract: quoteContract,
      method: "quoteExactInput" as any,
      params: [encodedPath as any, BigInt(finalAmount)],
    });

    console.log("quote", quote);

    let exactInputCall: PreparedTransaction<any>;

    if (exchangeType === "internal") {
      const exactInputParams = {
        path: encodedPath,
        recipient: account.address,
        amountIn: BigInt(finalAmount),
        amountOutMinimum: 0,
      };

      exactInputCall = prepareContractCall({
        contract: swapRouterContract,
        method: "exactInput",
        params: [exactInputParams],
      });
    } else if (path[1].length === 3) {
      const exactInputParams = {
        amountIn: BigInt(finalAmount),
        tokenIn: path[1][0],
        tokenOut: path[1][2],
        poolFee: path[1][1],
        amountOutMinimum: BigInt(0),
      };

      console.log("swapExactInputSingle", exactInputParams, swapRouterContract);

      exactInputCall = prepareContractCall({
        contract: swapRouterContract,
        method: "swapExactInputSingle",
        params: [BigInt(finalAmount), path[1][0], path[1][2], path[1][1], BigInt(0)],
      });
    } else {
      const exactInputParams = {
        amountIn: BigInt(finalAmount),
        tokenIn: path[1][0],
        tokenInBetween: path[1][2],
        tokenOut: path[1][4],
        poolFee0: path[1][1],
        poolFee1: path[1][3],
        amountOutMinimum: BigInt(0),
      };

      console.log("swapExactInputMulti", exactInputParams);

      exactInputCall = prepareContractCall({
        contract: swapRouterContract,
        method: "swapExactInputMulti",
        params: [BigInt(finalAmount), path[1][0], path[1][2], path[1][4], path[1][1], path[1][3], BigInt(0)],
      });
    }

    console.log("Sending swap transaction...");
    const res: TransactionReceipt = await sendAndConfirmTransaction({
      account,
      transaction: exactInputCall,
    });

    console.log("swap done", res);

    success();
  } catch (e: any) {
    // Enhanced error logging for UserOp failures
    console.error("Detailed error information:", {
      message: e.message,
      name: e.name,
      stack: e.stack,
      code: e.code,
      data: e.data,
      transaction: e.transaction,
      receipt: e.receipt,
    });

    // Check if this is a UserOp failure
    if (e.message && e.message.includes("UserOp failed")) {
      console.error("UserOp failure detected. This might be due to:");
      console.error("1. Insufficient funds for gas sponsorship");
      console.error("2. Account abstraction infrastructure issues");
      console.error("3. Invalid transaction parameters");
      console.error("4. Network congestion");

      // Suggest disabling account abstraction
      console.error(
        "Consider disabling account abstraction by setting localStorage.setItem('useAccountAbstraction', 'false')"
      );
    }

    sendErrorReport("convertAnyToAnyDirect", e);
    console.error(`Error converting ${finalAmount} ${token.id} to ${target.id}`, e);
    error(e);
  }
}

async function convertAnyToAny(
  token: Token,
  amount: number,
  account: any,
  success: () => void,
  error: (e: Error) => void,
  chain: any,
  target: string,
  internal = false
) {
  const finalAmount = Number(amount.toFixed(0));

  console.log("convertAnyToAny", token, finalAmount, account, success, error, chain, target);

  if (!token.contract) {
    throw new Error("Token contract not found");
  }

  try {
    const swapRouterContract = getContract({
      client,
      chain,
      address: (exchangeType === "internal" || internal ? uniswapAddresses : uniswapAddressesPublic)[chain.id].router,
      abi: exchangeType === "internal" || internal ? (SwapRouterAbi as Array<any>) : (CustomRouterAbi as Array<any>),
    });

    const quoteContract = getQuoteContract(chain);

    const tokenContract = getContract({
      client,
      chain,
      address: token.contract.contractAddress,
      abi: ERC20ABI as Array<any>,
    });

    console.log("swapRouterContract", swapRouterContract);

    // Approve token
    const approveToken = prepareContractCall({
      contract: tokenContract,
      method: "approve",
      params: [
        (exchangeType === "internal" || internal ? uniswapAddresses : uniswapAddressesPublic)[chain.id].router, // Router Address
        BigInt(finalAmount),
      ],
    });

    await sendAndConfirmTransaction({
      account,
      transaction: approveToken,
    });

    const path = getPath(token.symbol || token.id, chain, target);
    const encodedPath = getEncodedPath(token.symbol || token.id, chain, target);

    console.log("path", path, encodedPath, token.symbol || token.id, chain, target);

    console.log("path", path, encodedPath);

    // Quote the exchange
    const quote = await readContract({
      contract: quoteContract,
      method: "quoteExactInput" as any,
      params: [encodedPath as any, BigInt(finalAmount)],
    });

    console.log("quote", quote);

    // Prepare and send the exactInput transaction

    let exactInputCall: PreparedTransaction<any>;

    if (exchangeType === "internal" || internal) {
      const exactInputParams = {
        path: encodedPath,
        recipient: account.address,
        amountIn: BigInt(finalAmount),
        amountOutMinimum: 0,
      };

      console.log("exactInputParams", exactInputParams);

      exactInputCall = prepareContractCall({
        contract: swapRouterContract,
        method: "exactInput",
        params: [exactInputParams],
      });
    } else if (path[1].length === 3) {
      const exactInputParams = {
        amountIn: BigInt(finalAmount),
        tokenIn: path[1][0],
        tokenOut: path[1][2],
        poolFee: path[1][1],
        amountOutMinimum: BigInt(0),
      };

      console.log("swapExactInputSingle", exactInputParams, swapRouterContract);

      exactInputCall = prepareContractCall({
        contract: swapRouterContract,
        method: "swapExactInputSingle",
        params: [BigInt(finalAmount), path[1][0], path[1][2], path[1][1], BigInt(0)],
      });
    } else {
      const exactInputParams = {
        amountIn: BigInt(finalAmount),
        tokenIn: path[1][0],
        tokenInBetween: path[1][2],
        tokenOut: path[1][4],
        poolFee0: path[1][1],
        poolFee1: path[1][3],
        amountOutMinimum: BigInt(0),
      };

      console.log("swapExactInputMulti", exactInputParams);

      exactInputCall = prepareContractCall({
        contract: swapRouterContract,
        method: "swapExactInputMulti",
        params: [BigInt(finalAmount), path[1][0], path[1][2], path[1][4], path[1][1], path[1][3], BigInt(0)],
      });
    }

    console.log("exactInputCall", exactInputCall);

    const res: TransactionReceipt = await sendAndConfirmTransaction({
      account,
      transaction: exactInputCall,
    });

    console.log("res", res);

    success();
  } catch (e: any) {
    sendErrorReport("convertAnyToAny", e);
    console.error(`Error converting ${finalAmount} ${token.symbol || token.id} to ${target}`, e);
    error(e);
  }
}

/**
 * Utility function to toggle account abstraction
 */
export function toggleAccountAbstraction(enabled: boolean) {
  if (typeof window !== "undefined") {
    localStorage.setItem("useAccountAbstraction", enabled.toString());
    // Reload the page to apply the change
    window.location.reload();
  }
}

/**
 * Check if account abstraction is currently enabled
 */
export function isAccountAbstractionEnabled(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("useAccountAbstraction") === "true";
  }
  return false;
}

export default convertAnyToAny;
