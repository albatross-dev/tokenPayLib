import axios from "axios";
import { sendErrorReport } from "../../../../../context/UserContext";
import countriesISO from "i18n-iso-countries";

export interface KoyweQuoteResponse {
  quoteId?: string;
  amountIn?: number;
  amountOut?: number;
  symbolIn?: string;
  symbolOut?: string;
  paymentMethodId?: string;
  exchangeRate?: number;
  koyweFee?: number;
  networkFee?: number;
  co2?: number;
  validFor?: number;
  validUntil?: number;
}

type KoyweQuoteInput = {
  symbolIn: string;
  symbolOut: string;
  amountIn?: number;
  amountOut?: number;
  paymentMethodId?: string;
  executable?: boolean;
  deductFees?: boolean;
  includeClientId?: boolean;
};

export type FiatSymbol = "MXN" | "CLP" | "COP" | "PEN" | "ARS" | "BRL" | "BOB";

export const FIAT_SYMBOLS = [
  "MXN",
  "CLP",
  "COP",
  "PEN",
  "ARS",
  "BRL",
  "BOB",
] as const;

const koyweSymbolMap: Record<string, string> = {
  USDC: "USDC Polygon",
  USDT: "USDT Polygon",
};

export async function getKoyweQuote({
  symbolIn,
  symbolOut,
  amountIn,
  paymentMethodId,
  executable = false,
  deductFees = false,
  includeClientId = false,
}: KoyweQuoteInput): Promise<KoyweQuoteResponse> {
  if (
    !(
      Object.keys(koyweSymbolMap).includes(symbolIn) ||
      Object.keys(koyweSymbolMap).includes(symbolOut)
    )
  ) {
    throw new Error("Invalid symbol");
  }

  if (Object.keys(koyweSymbolMap).includes(symbolIn)) {
    symbolIn = koyweSymbolMap[symbolIn as keyof typeof koyweSymbolMap];
  }

  if (Object.keys(koyweSymbolMap).includes(symbolOut)) {
    symbolOut = koyweSymbolMap[symbolOut as keyof typeof koyweSymbolMap];
  }

  try {
    const response = await axios.post(`/api/fiatTransaction/koywe/getQuote`, {
      symbolIn,
      symbolOut,
      amountIn,
      paymentMethodId,
      executable,
      includeClientId,
    });
    if (deductFees) {
      response.data.amountOut =
        response.data.amountOut - response.data.amountOut * 0.004;
    }
    return response.data as KoyweQuoteResponse;
  } catch (error) {
    sendErrorReport("Koywe Quote", error);
    console.error("Error fetching Koywe quote:", error);
    throw error;
  }
}

export interface KoyweBankAccount {
  _id: string;
  bankCode: string;
  countryCode: string;
  currencySymbol: string;
  accountNumber: string;
  account: string;
  name: string;
}

export async function getBankAccounts({
  countryCode,
  currencySymbol,
}: {
  countryCode: string;
  currencySymbol: string;
}): Promise<KoyweBankAccount[]> {
  if (!FIAT_SYMBOLS.includes(currencySymbol as FiatSymbol)) {
    throw new Error("Invalid currency symbol");
  }
  countryCode = countriesISO.alpha2ToAlpha3(countryCode);

  try {
    const response = await axios.post(
      `/api/fiatTransaction/koywe/getBankAccounts`,
      {
        countryCode,
        currencySymbol,
      }
    );
    return response.data as KoyweBankAccount[];
  } catch (error) {
    sendErrorReport("Koywe Bank Accounts", error);
    console.error("Error fetching Koywe bank accounts:", error);
    throw error;
  }
}

export interface KoyweAccountState {
  canOperate: boolean;
}

export async function getKoyweAccountState(): Promise<KoyweAccountState> {
  try {
    const response = await axios.get(
      "/api/fiatTransaction/koywe/checkIfCanOperate"
    );
    return response.data as KoyweAccountState;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // 404 means no KYC exists yet - this is not an error state
      return { canOperate: false };
    }
    // For all other errors, log and report
    sendErrorReport("Koywe Account State", error);
    console.error("Error fetching Koywe account state:", error);
    throw error;
  }
}

export interface KoyweBankInfo {
  bankCode: string;
  name: string;
  institutionName: string;
  transferCode: string;
}

export async function getSupportedBanks({
  countryCode,
}: {
  countryCode: string;
}): Promise<KoyweBankInfo[]> {
  try {
    countryCode = countriesISO.alpha2ToAlpha3(countryCode);
    if (!["ARG", "CHL", "COL", "MEX", "PER"].includes(countryCode)) {
      throw new Error(`Invalid country code ${countryCode}`);
    }

    const response = await axios.get(
      `/api/fiatTransaction/koywe/getSupportedBanks`,
      {
        params: { countryCode },
      }
    );
    return response.data as KoyweBankInfo[];
  } catch (error) {
    sendErrorReport("Koywe Supported Banks", error);
    console.error("Error fetching Koywe supported banks:", error);
    throw error;
  }
}

export async function createKoyweBankAccount({
  bankCode,
  accountNumber,
  documentNumber,
  countryCode,
  currencySymbol,
}: {
  bankCode: string;
  accountNumber: string;
  documentNumber: string;
  countryCode: string;
  currencySymbol: string;
}): Promise<KoyweBankAccount> {
  if (!FIAT_SYMBOLS.includes(currencySymbol as FiatSymbol)) {
    throw new Error(`Invalid currency symbol ${currencySymbol}`);
  }
  countryCode = countriesISO.alpha2ToAlpha3(countryCode);

  try {
    const response = await axios.post(
      "/api/fiatTransaction/koywe/createBankAccount",
      {
        bankCode,
        accountNumber,
        documentNumber,
        countryCode,
        currencySymbol,
      }
    );
    return response.data as KoyweBankAccount;
  } catch (error) {
    sendErrorReport("Koywe Bank Account Creation", error);
    console.error("Error creating Koywe bank account:", error);
    throw error;
  }
}

export async function createKoyweDepositTransaction({
  quote,
  currency,
  currencyName,
  currencyDecimals,
  finalCurrency,
  destinationAddress,
  fiatOriginCurrency,
}: {
  quote: KoyweQuoteResponse;
  destinationAddress?: string;
  currency?: string;
  currencyName?: string;
  currencyDecimals?: number;
  finalCurrency?: string;
  fiatOriginCurrency?: string;
}): Promise<string> {
  try {
    const response = await axios.post(
      "/api/fiatTransaction/koywe/createDepositTransaction",
      {
        quote,
        ...(destinationAddress && { destinationAddress }),
        currency,
        currencyName,
        currencyDecimals,
        finalCurrency,
        fiatOriginCurrency,
      }
    );
    return response.data.data as string;
  } catch (error) {
    sendErrorReport("Koywe Transaction Creation", error);
    console.error("Error creating Koywe transaction:", error);
    throw error;
  }
}

export async function createKoyweTransaction({
  quote,
  bankAccount,
  currency,
  currencyName,
  currencyDecimals,
  finalCurrency,
  destinationAddress,
}: {
  quote: KoyweQuoteResponse;
  bankAccount?: KoyweBankAccount;
  destinationAddress?: string;
  currency?: string;
  currencyName?: string;
  currencyDecimals?: number;
  finalCurrency?: string;
}): Promise<string> {
  try {
    const response = await axios.post(
      "/api/fiatTransaction/koywe/createTransaction",
      {
        quote,
        ...(bankAccount && { bankAccount }),
        ...(destinationAddress && { destinationAddress }),
        currency,
        currencyName,
        currencyDecimals,
        finalCurrency,
      }
    );
    return response.data.data as string;
  } catch (error) {
    sendErrorReport("Koywe Transaction Creation", error);
    console.error("Error creating Koywe transaction:", error);
    throw error;
  }
}

export interface KoywePaymentMethod {
  _id: string;
  name: string;
  description: string;
  image: string;
  fee: number;
  details: string;
}

export async function getKoywePaymentMethods({
  currencySymbol,
}: {
  currencySymbol: string;
}): Promise<KoywePaymentMethod[]> {
  try {
    const response = await axios.get(
      `/api/fiatTransaction/koywe/getPaymentMethods`,
      {
        params: { currencySymbol },
      }
    );
    return response.data as KoywePaymentMethod[];
  } catch (error) {
    sendErrorReport("Koywe Payment Methods", error);
    console.error("Error fetching Koywe payment methods:", error);
    throw error;
  }
}
