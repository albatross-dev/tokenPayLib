/* eslint-disable */

import { FiatCodes } from "../types/derivedPayload.types";
export interface FiatInfo {
  id: FiatCodes;
  symbol: string;
}

/**
 * Maps fiat currency codes to their respective currency symbols.
 */
const FIAT_INFO_MAP: {
  [key: string]: FiatInfo;
} = {
  USD: { id: "USD", symbol: "$" },
  EUR: { id: "EUR", symbol: "€" },
  VND: { id: "VND", symbol: "₫" },
  AED: { id: "AED", symbol: "د.إ" },
  ARS: { id: "ARS", symbol: "$" },
  AUD: { id: "AUD", symbol: "$" },
  BGN: { id: "BGN", symbol: "лв" },
  BOL: { id: "BOL", symbol: "Bs." },
  BRL: { id: "BRL", symbol: "R$" },
  BWP: { id: "BWP", symbol: "P" },
  CAD: { id: "CAD", symbol: "$" },
  CHF: { id: "CHF", symbol: "Fr." },
  CLP: { id: "CLP", symbol: "$" },
  COP: { id: "COP", symbol: "$" },
  CRC: { id: "CRC", symbol: "₡" },
  CZK: { id: "CZK", symbol: "Kč" },
  DKK: { id: "DKK", symbol: "kr" },
  ETB: { id: "ETB", symbol: "Br" },
  GBP: { id: "GBP", symbol: "£" },
  GHS: { id: "GHS", symbol: "GH₵" },
  GTQ: { id: "GTQ", symbol: "Q" },
  HKD: { id: "HKD", symbol: "$" },
  IDR: { id: "IDR", symbol: "Rp" },
  INR: { id: "INR", symbol: "₹" },
  KES: { id: "KES", symbol: "KSh" },
  MKW: { id: "MKW", symbol: "MK" },
  MXN: { id: "MXN", symbol: "$" },
  MYR: { id: "MYR", symbol: "RM" },
  NGN: { id: "NGN", symbol: "₦" },
  OMR: { id: "OMR", symbol: "﷼" },
  PEN: { id: "PEN", symbol: "S/." },
  PHP: { id: "PHP", symbol: "₱" },
  PLN: { id: "PLN", symbol: "zł" },
  RON: { id: "RON", symbol: "lei" },
  SGD: { id: "SGD", symbol: "$" },
  TRY: { id: "TRY", symbol: "₺" },
  TZS: { id: "TZS", symbol: "TSh" },
  UGX: { id: "UGX", symbol: "USh" },
  XOF: { id: "XOF", symbol: "Fr" },
  XAF: { id: "XAF", symbol: "Fr" },
  ZAR: { id: "ZAR", symbol: "R" },
  ZMW: { id: "ZMW", symbol: "ZK" },
};

/**
 * Maps stablecoin ticker symbols to their corresponding fiat currency codes.
 */
const STABLE_FIAT_MAP: {
  [key: string]: FiatInfo;
} = {
  USDC: { id: "USD", symbol: "$" },
  USDT: { id: "USD", symbol: "$" },
  EURS: { id: "EUR", symbol: "€" },
};

/**
 * Maps stablecoin ticker symbols to their corresponding fiat currency codes.
 * The type annotation enforces the allowed keys and values.
 */
const STABLECOIN_TO_FIAT_MAP: { [key: string]: "USD" | "EUR" } = {
  USDC: "USD",
  USDT: "USD",
  EURS: "EUR",
};

/**
 * Maps fiat currency codes to their respective currency symbols.
 * The type annotation enforces that the values are strings.
 */
const FIAT_SYMBOLS_MAP: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  VND: "₫",
  AED: "د.إ",
  ARS: "$",
  AUD: "$",
  BGN: "лв",
  BOL: "Bs.",
  BRL: "R$",
  BWP: "P",
  CAD: "$",
  CHF: "Fr.",
  CLP: "$",
  COP: "$",
  CRC: "₡",
  CZK: "Kč",
  DKK: "kr",
  ETB: "Br",
  GBP: "£",
  GHS: "GH₵",
  GTQ: "Q",
  HKD: "$",
  IDR: "Rp",
  INR: "₹",
  KES: "KSh",
  MKW: "MK",
  MXN: "$",
  MYR: "RM",
  NGN: "₦",
  OMR: "﷼",
  PEN: "S/.",
  PHP: "₱",
  PLN: "zł",
  RON: "lei",
  SGD: "$",
  TRY: "₺",
  TZS: "TSh",
  UGX: "USh",
  XOF: "Fr",
  XAF: "Fr",
  ZAR: "R",
  ZMW: "ZK",
};

export const STANDARD_STABLE_MAP: { [key: string]: FiatInfo } = {
  USDC: getFiatInfo("USD")!,
  EURS: getFiatInfo("EUR")!,
  USDT: getFiatInfo("USD")!,
  UHU: getFiatInfo("EUR")!,
};

export const getFiatInfoForStableCoin = (stableCoin: string): FiatInfo | undefined => {
  return STANDARD_STABLE_MAP[stableCoin.toUpperCase()];
};

export function getFiatInfo(fiatCode: FiatCodes): FiatInfo | undefined {
  if (fiatCode === null || fiatCode === undefined) return undefined;
  return FIAT_INFO_MAP[fiatCode];
}

/**
 * Retrieves the fiat currency code for a given stablecoin ticker.
 *  Handles case-insensitivity.
 */
export function getFiatCurrencyCode(stablecoin: string): "USD" | "EUR" | undefined {
  return STABLECOIN_TO_FIAT_MAP[stablecoin];
}

/**
 * Retrieves the currency symbol for a given fiat currency code.
 * Handles case-insensitivity.
 */
export function getFiatCurrencySymbol(fiatCode: FiatCodes): string | undefined {
  if (fiatCode === null || fiatCode === undefined) return undefined;
  return FIAT_SYMBOLS_MAP[fiatCode];
}
