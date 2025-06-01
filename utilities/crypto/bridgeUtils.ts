import {
  Chain,
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { client } from "../../../pages/_app";
import { Account } from "thirdweb/wallets";
import currencies from "../crypto/currencies";
import CustomWrapperABI from "../../assets/customSwapRouterAbi.json";
import { api, sendErrorReport } from "../../../context/UserContext";
import { SimpleToken } from "../../types/token.types";

// Define the ABI for the depositV3 function
const SpokePoolAbi = [
  {
    inputs: [
      { internalType: "address", name: "depositor", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "address", name: "inputToken", type: "address" },
      { internalType: "address", name: "outputToken", type: "address" },
      { internalType: "uint256", name: "inputAmount", type: "uint256" },
      { internalType: "uint256", name: "outputAmount", type: "uint256" },
      { internalType: "uint256", name: "destinationChainId", type: "uint256" },
      { internalType: "address", name: "exclusiveRelayer", type: "address" },
      { internalType: "uint32", name: "quoteTimestamp", type: "uint32" },
      { internalType: "uint32", name: "fillDeadline", type: "uint32" },
      { internalType: "uint32", name: "exclusivityDeadline", type: "uint32" },
      { internalType: "bytes", name: "message", type: "bytes" },
    ],
    name: "depositV3",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
];

// Define interfaces for function parameters
export interface ApproveTokensParams {
  spokePoolAddress: string;
  tokenContractAddress: string;
  chain: Chain;
  amount: number;
  account: Account;
}

export interface DepositParams {
  spokePoolAddress: string;
  isCustomWrapper: boolean;
  depositor: string;
  recipient: string;
  inputToken: string;
  outputToken: string;
  inputAmount: number;
  outputAmount: number;
  destinationChainId: number;
  exclusiveRelayer: string;
  quoteTimestamp: number;
  fillDeadline: number;
  exclusivityDeadline: number;
  account: Account;
  chain: Chain;
}

export interface AcrossBridgeDepositParams {
  tokenAddress: string;
  originChainId: number;
  destinationChainId: number;
  amount: number;
  account: Account;
  token: SimpleToken;
  chain: Chain;
  quoteData: QuoteData;
  limits: Limits;
  spokePool: string;
  spokePoolWrapper?: string;
}

export interface QuoteData {
  totalRelayFee: {
    total: number;
  };
  timestamp: number;
  exclusiveRelayer: string;
  exclusivityDeadline: number;
  status?: number;
  code?: string;
}

export interface Limits {
  maxDepositInstant: number;
  maxDepositShortDelay: number;
  maxDeposit: number;
  code?: string;
  message?: string;
  status?: number;
}

/**
 * Approves tokens for the bridge operation
 */
export async function approveTokens(params: ApproveTokensParams) {
  const { spokePoolAddress, tokenContractAddress, chain, amount, account } =
    params;

  console.log("approveTokens", params);

  const tokenContract = getContract({
    client: client,
    chain: chain,
    address: tokenContractAddress,
    abi: currencies["USDC"].abi,
  });

  const approveCall = prepareContractCall({
    contract: tokenContract,
    method: "approve",
    params: [spokePoolAddress, amount],
  });

  console.log("approveCall", approveCall);

  let res = await sendAndConfirmTransaction({
    account,
    transaction: approveCall,
  });

  return res;
}

/**
 * Initiates the deposit operation
 */
export async function deposit(params: DepositParams): Promise<void> {
  const {
    spokePoolAddress,
    isCustomWrapper,
    depositor,
    recipient,
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    destinationChainId,
    exclusiveRelayer,
    quoteTimestamp,
    fillDeadline,
    exclusivityDeadline,
    account,
    chain,
  } = params;

  let depositCall: ReturnType<typeof prepareContractCall>;

  if (isCustomWrapper) {
    const spokePoolContract = getContract({
      client: client,
      chain: chain,
      address: spokePoolAddress,
      abi: CustomWrapperABI as Array<any>,
    });

    depositCall = prepareContractCall({
      contract: spokePoolContract,
      method: "bridge",
      params: [
        depositor,
        recipient,
        inputToken,
        outputToken,
        inputAmount,
        outputAmount,
        destinationChainId,
        exclusiveRelayer,
        quoteTimestamp,
        fillDeadline,
        exclusivityDeadline,
      ],
    });
  } else {
    const spokePoolContract = getContract({
      client: client,
      chain: chain,
      address: spokePoolAddress,
      abi: SpokePoolAbi as any,
    });

    depositCall = prepareContractCall({
      contract: spokePoolContract,
      method: "depositV3",
      params: [
        depositor,
        recipient,
        inputToken,
        outputToken,
        inputAmount,
        outputAmount,
        destinationChainId,
        exclusiveRelayer,
        quoteTimestamp,
        fillDeadline,
        exclusivityDeadline,
        "0x",
      ],
    });
  }

  let res = await sendAndConfirmTransaction({
    account,
    transaction: depositCall,
  });

  console.log("depositCall", res);
}

/**
 * Complete bridge deposit flow
 */
export async function acrossBridgeDeposit(
  params: AcrossBridgeDepositParams
): Promise<boolean> {
  const {
    tokenAddress,
    destinationChainId,
    amount,
    account,
    chain,
    quoteData,
    limits,
    spokePoolWrapper,
    spokePool,
  } = params;

  console.log("acrossBridgeDeposit", params);

  try {
    // Step 1: Get a Quote
    const { totalRelayFee, timestamp } = quoteData;

    // Step 2: Check Limits
    const { maxDepositInstant, maxDepositShortDelay, maxDeposit } = limits;

    if (amount > maxDeposit) {
      throw new Error("Deposit amount exceeds maximum allowed limit.");
    }

    // Step 3: Approve Tokens
    let spokePoolAddress: string;
    let isCustomWrapper: boolean;
    if (spokePoolWrapper) {
      spokePoolAddress = spokePoolWrapper;
      isCustomWrapper = true;
    } else {
      spokePoolAddress = spokePool;
      isCustomWrapper = false;
    }

    console.log("acrossBridgeDeposit usedAddress", spokePoolAddress);

    let res = await approveTokens({
      spokePoolAddress,
      tokenContractAddress: tokenAddress,
      chain,
      amount,
      account,
    });
    console.log("res", res);
    console.log("totalRelayFee.total", totalRelayFee.total);

    // Step 4: Initiate Deposit
    const depositor = account.address;
    const recipient = account.address;
    const outputToken = "0x0000000000000000000000000000000000000000"; // Auto-resolve the destination equivalent token
    const outputAmount = amount - totalRelayFee.total;
    const fillDeadline = Math.floor(Date.now() / 1000) + 18000; // 5 hours
    const exclusiveRelayer = quoteData.exclusiveRelayer;
    const exclusivityDeadline = quoteData.exclusivityDeadline;

    await deposit({
      spokePoolAddress,
      isCustomWrapper,
      depositor,
      recipient,
      inputToken: tokenAddress,
      outputToken,
      inputAmount: amount,
      outputAmount,
      destinationChainId,
      exclusiveRelayer,
      quoteTimestamp: timestamp,
      fillDeadline,
      exclusivityDeadline,
      account,
      chain,
    });

    console.log("Deposit successful!");
    return true;
  } catch (error) {
    sendErrorReport("acrossBridgeDeposit - Error depositing tokens", error);
    console.error("Error in acrossBridgeDeposit:", error);
    return false;
  }
}

/**
 * Fetches limits and quote data for bridge operations
 */
export async function fetchLimitsAndQuote(
  tokenAddress: string,
  originChainId: number,
  destinationChainId: number,
  amount: number,
  tokenDecimals: number
): Promise<{ limits: Limits | null; quote: QuoteData | null }> {
  console.log(
    "fetchLimitsAndQuote",
    tokenAddress,
    originChainId,
    destinationChainId,
    amount,
    tokenDecimals
  );

  const rawAmount = (amount * Math.pow(10, tokenDecimals)).toString();

  let limits = null;
  let quote = null;

  // Fetch limits
  try {
    const limitsResponse = await api.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/limits`,
      {
        params: { token: tokenAddress, originChainId, destinationChainId },
      }
    );

    limits = limitsResponse.data;
  } catch (error) {
    sendErrorReport("BridgeUtils - Error fetching limits", error);
    console.log("Error fetching limits:", error);

    const errorData = {
      code: error.response?.data?.code || "UNKNOWN_ERROR",
      message: error.response?.data?.message || "An unknown error occurred",
      status: error.response?.status || 500,
    };

    limits = errorData;
  }

  // Fetch quote
  try {
    const quoteResponse = await api.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/quotes`,
      {
        params: {
          token: tokenAddress,
          originChainId: originChainId,
          destinationChainId: destinationChainId,
          amount: rawAmount,
        },
      }
    );

    let quoteData = quoteResponse.data;
    quoteData.status = 200;

    quote = quoteData;
  } catch (error) {
    sendErrorReport("BridgeUtils - Error fetching quote", error);
    console.log("Error fetching quote:", error);

    const errorData = {
      code: error.response?.data?.code || "UNKNOWN_ERROR",
      message: error.response?.data?.message || "An unknown error occurred",
      status: error.response?.status || 500,
    };

    quote = errorData;
  }

  return { limits, quote };
}
