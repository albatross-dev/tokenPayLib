import {
  getContract,
  readContract,
  prepareContractCall,
  sendAndConfirmTransaction,
  Chain,
  PreparedTransaction,
  ContractOptions,
} from "thirdweb";
import SwapRouterAbi from "@/tokenPayLib/assets/swapRouterAbi.json";
import CustomRouterAbi from "@/tokenPayLib/assets/customSwapRouterAbi.json";
import QuoteV2Abi from "@/tokenPayLib/assets/quoteV2Abi.json";
import { client } from "../../../pages/_app";

import { ethereum, optimism, arbitrum, base, polygon } from "thirdweb/chains";
import getPath, {getEncodedPath} from "./getPath";
import { ExchangeType } from "../../utilities/exchangeTypes";

import { ERC20ABI } from "./currencies";
import { sendErrorReport } from "../../../context/UserContext";
import { SimpleToken, Token } from "../../types/token.types";
import { TransactionReceipt } from "thirdweb/transaction";

const exchangeType: ExchangeType = process.env.NEXT_PUBLIC_EXCHANGE_TYPE as ExchangeType;

export const uniswapAddresses: Record<string, {router: string, quote: string}> = {
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
}

export const uniswapAddressesPublic: Record<string, {router: string, quote: string}> = {
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
}

export function getQuoteContract(chain: Chain): ContractOptions {
  return getContract({
    client: client,
    chain: chain,
    address: uniswapAddresses[chain.id].quote,
    abi: QuoteV2Abi,
  });
}

export async function convertAnyToAnyDirect(token: SimpleToken, amount: number, account: any, success: () => void, error: (e: Error) => void, chain: any, target: Token) {

  const finalAmount = Number(amount.toFixed(0));

  console.log("convertAnyToAnyDirect", token, finalAmount, account, chain, target, exchangeType);

  try {
    const swapRouterContract = getContract({
      client: client,
      chain: chain,
      address: (exchangeType==="internal"?uniswapAddresses:uniswapAddressesPublic)[chain.id].router,
      abi: (exchangeType==="internal"?SwapRouterAbi:CustomRouterAbi),
    });

    const quoteContract = getQuoteContract(chain);

    const tokenContract = getContract({
      client: client,
      chain: chain,
      address: token.contractAddress,
      abi: token.abi,
    });

    console.log("swapRouterContract", swapRouterContract);

    // Approve token
    const approveToken = prepareContractCall({
      contract: tokenContract,
      method: "approve",
      params: [
        (exchangeType==="internal"?uniswapAddresses:uniswapAddressesPublic)[chain.id].router, // Router Address
        BigInt(finalAmount),
      ],
    });

    await sendAndConfirmTransaction({
      account,
      transaction: approveToken,
    });

    let path = getPath(token.id.toUpperCase(), chain, target.id.toUpperCase());
    let encodedPath: string = getEncodedPath(token.id.toUpperCase(), chain, target.id.toUpperCase());
    console.log("path", path, encodedPath);

    // Quote the exchange
    const quote = await readContract({
      contract: quoteContract,
      method: "quoteExactInput" as any,
      params: [encodedPath as any, BigInt(finalAmount)],
    });

    console.log("quote", quote);

    let exactInputCall: PreparedTransaction<any>;

    if(exchangeType==="internal"){
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
    }else{
      if(path[1].length === 3){
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
          params: [
            BigInt(finalAmount),
            path[1][0],
            path[1][2],
            path[1][1],
            BigInt(0)
          ],
        });
      }else{
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
          params: [
            BigInt(finalAmount),
            path[1][0],
            path[1][2],
            path[1][4],
            path[1][1],
            path[1][3],
            BigInt(0)
          ],
        });
      }
    }
    let res: TransactionReceipt = await sendAndConfirmTransaction({
      account,
      transaction: exactInputCall,
    });

    console.log("swap done", res);

    success();
  } catch (e) {
    sendErrorReport("convertAnyToAnyDirect", e);
    console.error(`Error converting ${finalAmount} ${token.id} to ${target.id}`, e);
    error(e);
  }
}

async function convertAnyToAny(token: Token, amount: number, account: any, success: () => void, error: (e: Error) => void, chain: any, target: string, internal=false) {

  const finalAmount = Number(amount.toFixed(0));


  console.log("convertAnyToAny", token, finalAmount, account, success, error, chain, target);

  console.log("swap router contract address", ((exchangeType==="internal"||internal)?uniswapAddresses:uniswapAddressesPublic)[chain.id].router)

  try {
    const swapRouterContract = getContract({
      client: client,
      chain: chain,
      address: ((exchangeType==="internal"||internal)?uniswapAddresses:uniswapAddressesPublic)[chain.id].router,
      abi: ((exchangeType==="internal"||internal)?SwapRouterAbi:CustomRouterAbi),
    });

    const quoteContract = getQuoteContract(chain);

    const tokenContract = getContract({
      client: client,
      chain: chain,
      address: token.contract.contractAddress,
      abi: ERC20ABI,
    });

    console.log("swapRouterContract", swapRouterContract);

    // Approve token
    const approveToken = prepareContractCall({
      contract: tokenContract,
      method: "approve",
      params: [
        ((exchangeType==="internal"||internal)?uniswapAddresses:uniswapAddressesPublic)[chain.id].router, // Router Address
        BigInt(finalAmount),
      ],
    });

    await sendAndConfirmTransaction({
      account,
      transaction: approveToken,
    });

    let path = getPath(token.symbol || token.id, chain, target);
    let encodedPath = getEncodedPath(token.symbol || token.id, chain, target);

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

    if((exchangeType==="internal"||internal)){
      const exactInputParams = {
        path: encodedPath,
        recipient: account.address,
        amountIn: BigInt(finalAmount),
        amountOutMinimum: 0,
      };

      console.log("exactInputParams", exactInputParams)

      exactInputCall = prepareContractCall({
        contract: swapRouterContract,
        method: "exactInput",
        params: [exactInputParams],
      });
    }else{
      if(path[1].length === 3){
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
          params: [
            BigInt(finalAmount),
            path[1][0],
            path[1][2],
            path[1][1],
            BigInt(0)
          ],
        });
      }else{
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
          params: [
            BigInt(finalAmount),
            path[1][0],
            path[1][2],
            path[1][4],
            path[1][1],
            path[1][3],
            BigInt(0)
          ],
        });
      }
    }

    console.log("exactInputCall", exactInputCall);

    
    let res: TransactionReceipt = await sendAndConfirmTransaction({
      account,
      transaction: exactInputCall,
    });
   
    console.log("res", res);

    success();
  } catch (e) {
    sendErrorReport("convertAnyToAny", e);
    console.error(`Error converting ${finalAmount} ${token.symbol || token.id} to ${target}`, e);
    error(e);
  }
}

export default convertAnyToAny;
