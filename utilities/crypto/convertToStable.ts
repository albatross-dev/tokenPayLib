import QuoteV2Abi from "@/tokenPayLib/assets/quoteV2Abi.json";
import SwapRouterAbi from "@/tokenPayLib/assets/swapRouterAbi.json";
import client from "@/utilities/thirdweb-client";
import { getContract, prepareContractCall, readContract, sendAndConfirmTransaction } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { Account } from "thirdweb/wallets";
import { sendErrorReport } from "../../../context/UserContext";
import { Token } from "../../types/token.types";
import getPath from "./getPath";
// Addresses
const SwapRouterAddressPolygon = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const QuoteV2AddressPolygon = "0x61fFE014bA17989E743c5F6cB21bF9697530B21e";

async function convertToStablePolygon(
  token: Token,
  amount: number,
  account: Account,
  success: () => void,
  error: (e: Error) => void,
  targetToken: string
): Promise<void> {
  if (!token.contract) {
    throw new Error("Token contract not found");
  }

  try {
    const swapRouterContract = getContract({
      client,
      chain: polygon,
      address: SwapRouterAddressPolygon,
      abi: SwapRouterAbi as Array<any>,
    });

    const quoteContract = getContract({
      client,
      chain: polygon,
      address: QuoteV2AddressPolygon,
      abi: QuoteV2Abi as Array<any>,
    });

    const tokenContract = getContract({
      client,
      chain: polygon,
      address: token.contract.contractAddress,
      abi: token.contract.abi as Array<any>,
    });

    // Approve token
    const approveToken = prepareContractCall({
      contract: tokenContract,
      method: "approve",
      params: [
        SwapRouterAddressPolygon, // Router Address
        BigInt(amount),
      ],
    });

    await sendAndConfirmTransaction({
      account,
      transaction: approveToken,
    });

    const path = getPath(token.symbol, polygon, targetToken);

    // Quote the exchange
    const quote = await readContract({
      contract: quoteContract,
      method: "quoteExactInput",
      params: [path, BigInt(amount)],
    });

    console.log("quote", quote);

    // Prepare and send the exactInput transaction
    const exactInputParams = {
      path,
      recipient: account.address,
      amountIn: BigInt(amount),
      amountOutMinimum: 0,
    };

    const exactInputCall = prepareContractCall({
      contract: swapRouterContract,
      method: "exactInput",
      params: [exactInputParams],
    });

    await sendAndConfirmTransaction({
      account,
      transaction: exactInputCall,
    });

    success();
  } catch (e: any) {
    sendErrorReport(`Error converting ${amount} ${token.symbol} to Stablecoin`, e);
    console.error(`Error converting ${amount} ${token.symbol} to Stablecoin`, e);
    error(e);
  }
}

export default convertToStablePolygon;
