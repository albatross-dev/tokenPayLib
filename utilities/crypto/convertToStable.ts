import {
  getContract,
  readContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { polygon } from "thirdweb/chains";
import SwapRouterAbi from "@/assets/swapRouterAbi.json";
import QuoteV2Abi from "@/tokenPayLib/assets/quoteV2Abi.json";
import { client } from "../../../pages/_app";
import getPath from "./getPath";
import { sendErrorReport } from "../../../context/UserContext";
import { Account } from "thirdweb/wallets";
import { Token } from "../../types/token.types";
// Addresses
const SwapRouterAddressPolygon = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const QuoteV2AddressPolygon = "0x61fFE014bA17989E743c5F6cB21bF9697530B21e";

async function convertToStablePolygon(token: Token, amount: number, account: Account, success: () => void, error: (e: Error) => void, targetToken: string): Promise<void> {
  console.log(
    `Converting ${amount} ${token.symbol} ${token.contract.contractAddress} to EUROE`
  );
  console.log("account", account);

  try {
    const swapRouterContract = getContract({
      client: client,
      chain: polygon,
      address: SwapRouterAddressPolygon,
      abi: SwapRouterAbi,
    });

    const quoteContract = getContract({
      client: client,
      chain: polygon,
      address: QuoteV2AddressPolygon,
      abi: QuoteV2Abi,
    });

    const tokenContract = getContract({
      client: client,
      chain: polygon,
      address: token.contract.contractAddress,
      abi: token.contract.abi,
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

    let path = getPath(token.symbol, polygon, targetToken);

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

    const res = await sendAndConfirmTransaction({
      account,
      transaction: exactInputCall,
    });

    success();
  } catch (e) {
    sendErrorReport(
      `Error converting ${amount} ${token.symbol} to EUROE`,
      e
    );
    console.error(`Error converting ${amount} ${token.symbol} to EUROE`, e);
    error(e);
  }
}

export default convertToStablePolygon;
