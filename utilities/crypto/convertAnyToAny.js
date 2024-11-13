import {
  getContract,
  readContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import SwapRouterAbi from "@/tokenPayLib/assets/swapRouterAbi.json";
import CustomRouterAbi from "@/tokenPayLib/assets/customSwapRouterAbi.json";
import QuoteV2Abi from "@/tokenPayLib/assets/quoteV2Abi.json";
import { client } from "@/pages/_app";
import { encodePacked } from "thirdweb/utils";

import { ethereum, optimism, arbitrum, base, polygon } from "thirdweb/chains";
import getPath, {getEncodedPath} from "./getPath";
import { EXCHANGE_TYPE_EXTERNAL, EXCHANGE_TYPE_INTERNAL } from "@/tokenPayLib/utilities/exchangeTypes";

import { ERC20ABI } from "./currencies";

const exchangeType = process.env.NEXT_PUBLIC_EXCHANGE_TYPE;

export const uniswapAddresses = {
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

export const uniswapAddressesPublic = {
  [polygon.id]: {
    router: "0xADf0359c1491434955D8a9A4FEdDECf4424e2C1A",
    quote: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  },
}

export function getQuoteContract(chain) {
  return getContract({
    client: client,
    chain: chain,
    address: uniswapAddresses[chain.id].quote,
    abi: QuoteV2Abi,
  });
}

export async function convertAnyToAnyDirect(token, amount, account, success, error, chain, target) {

  console.log("convertAnyToAnyDirect", token, amount, account, chain, target, exchangeType);

  try {
    const swapRouterContract = getContract({
      client: client,
      chain: chain,
      address: (exchangeType===EXCHANGE_TYPE_INTERNAL?uniswapAddresses:uniswapAddresses)[chain.id].router,
      abi: (exchangeType===EXCHANGE_TYPE_INTERNAL?SwapRouterAbi:CustomRouterAbi),
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
        (exchangeType===EXCHANGE_TYPE_INTERNAL?uniswapAddresses:uniswapAddresses)[chain.id].router, // Router Address
        BigInt(amount),
      ],
    });

    await sendAndConfirmTransaction({
      account,
      transaction: approveToken,
    });

    let path = getPath(token.id.toUpperCase(), chain, target.id.toUpperCase());
    let encodedPath = getEncodedPath(token.id.toUpperCase(), chain, target.id.toUpperCase());
    console.log("path", path, encodedPath);

    // Quote the exchange
    const quote = await readContract({
      contract: quoteContract,
      method: "quoteExactInput",
      params: [encodedPath, BigInt(amount)],
    });

    console.log("quote", quote);

    let exactInputCall = {};

    if(exchangeType===EXCHANGE_TYPE_INTERNAL){
      const exactInputParams = {
        path: encodedPath,
        recipient: account.address,
        amountIn: BigInt(amount),
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
          amountIn: BigInt(amount),
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
            BigInt(amount),
            path[1][0],
            path[1][2],
            path[1][1],
            BigInt(0)
          ],
          maxFeePerGas: 250000
        });
      }else{
        const exactInputParams = {
          amountIn: BigInt(amount),
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
            BigInt(amount),
            path[1][0],
            path[1][2],
            path[1][4],
            path[1][1],
            path[1][3],
            BigInt(0)
          ],
          maxFeePerGas: 250000
        });
      }
    }

    const res = await sendAndConfirmTransaction({
      account,
      transaction: exactInputCall,
    });

    success();
  } catch (e) {
    console.error(`Error converting ${amount} ${token.id} to ${target.id}`, e);
    error(e);
  }
}

async function convertAnyToAny(token, amount, account, success, error, chain, target, internal=false) {

  console.log("convertAnyToAny", token, amount, account, success, error, chain, target);

  try {
    const swapRouterContract = getContract({
      client: client,
      chain: chain,
      address: ((exchangeType===EXCHANGE_TYPE_INTERNAL||internal)?uniswapAddresses:uniswapAddressesPublic)[chain.id].router,
      abi: ((exchangeType===EXCHANGE_TYPE_INTERNAL||internal)?SwapRouterAbi:CustomRouterAbi),
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
        ((exchangeType===EXCHANGE_TYPE_INTERNAL||internal)?uniswapAddresses:uniswapAddressesPublic)[chain.id].router, // Router Address
        BigInt(amount),
      ],
    });

    await sendAndConfirmTransaction({
      account,
      transaction: approveToken,
    });

    let path = getPath(token.symbol || token.id, chain, target);
    let encodedPath = getEncodedPath(token.symbol || token.id, chain, target);

    console.log("path", path, encodedPath);

    // Quote the exchange
    const quote = await readContract({
      contract: quoteContract,
      method: "quoteExactInput",
      params: [encodedPath, BigInt(amount)],
    });

    console.log("quote", quote);

    // Prepare and send the exactInput transaction
   

    let exactInputCall = {};

    if((exchangeType===EXCHANGE_TYPE_INTERNAL||internal)){
      const exactInputParams = {
        path: encodedPath,
        recipient: account.address,
        amountIn: BigInt(amount),
        amountOutMinimum: 0,
      };

      console.log("exactInputParams", exactInputParams, swapRouterContract)

      exactInputCall = prepareContractCall({
        contract: swapRouterContract,
        method: "exactInput",
        params: [exactInputParams],
      });
    }else{
      if(path.length === 3){
        const exactInputParams = {
          amountIn: BigInt(amount),
          tokenIn: path[0],
          tokenOut: path[2],
          poolFee: path[1],
          amountOutMinimum: 0,
        };
  
        exactInputCall = prepareContractCall({
          contract: swapRouterContract,
          method: "swapExactInputSingle",
          params: [
            BigInt(amount),
            path[0],
            path[2],
            path[1],
            BigInt(0)
          ],
        });
      }else{
        const exactInputParams = {
          amountIn: BigInt(amount),
          tokenIn: path[0],
          tokenInBetween: path[2],
          tokenOut: path[4],
          poolFee0: path[1],
          poolFee1: path[3],
          amountOutMinimum: 0,
        };
  
        exactInputCall = prepareContractCall({
          contract: swapRouterContract,
          method: "swapExactInputMulti",
          params: [
            BigInt(amount),
            path[0],
            path[2],
            path[4],
            path[1],
            path[3],
            BigInt(0)
          ],
        });
      }
    }

    console.log("exactInputCall", exactInputCall);

    const res = await sendAndConfirmTransaction({
      account,
      transaction: exactInputCall,
    });

    success();
  } catch (e) {
    console.error(`Error converting ${amount} ${token.symbol || token.id} to ${target}`, e);
    error(e);
  }
}

export default convertAnyToAny;
