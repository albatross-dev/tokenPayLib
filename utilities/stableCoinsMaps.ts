/**
 * This file defines two constant maps:
 * 1. `STABLECOIN_TO_FIAT_MAP`: Maps stablecoin ticker symbols to their corresponding fiat currency codes.  It handles both uppercase and lowercase stablecoin tickers.
 * 2. `FIAT_SYMBOLS_MAP`: Maps fiat currency codes to their respective currency symbols. It handles both uppercase and lowercase fiat codes.
 */

/**
 * Maps stablecoin ticker symbols to their corresponding fiat currency codes.
 * The type annotation enforces the allowed keys and values.
 *
 * @example
 * // Returns "USD"
 * STABLECOIN_TO_FIAT_MAP.USDC
 *
 * @example
 * // Also returns "USD" (case-insensitive)
 * STABLECOIN_TO_FIAT_MAP.usdc
 */
export const STABLECOIN_TO_FIAT_MAP: { [key: string]: "USD" | "EUR" } = {
  USDC: "USD",
  USDT: "USD",
  EURS: "EUR",
  EUROE: "EUR",
  usdc: "USD",
  usdt: "USD",
  eurs: "EUR",
  euroe: "EUR",
};

/**
 * Maps fiat currency codes to their respective currency symbols.
 * The type annotation enforces that the values are strings.
 *
 * @example
 * // Returns "$"
 * FIAT_SYMBOLS_MAP.USD
 *
 * @example
 * // Also returns "$" (case-insensitive)
 * FIAT_SYMBOLS_MAP.usd
 */
export const FIAT_SYMBOLS_MAP: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  VND: "₫",
  usd: "$",
  eur: "€",
  vnd: "₫",
};

/**
 * Retrieves the fiat currency code for a given stablecoin ticker.
 *  Handles case-insensitivity.
 *
 * @param stablecoin - The stablecoin ticker symbol (case-insensitive).
 * @returns The corresponding fiat currency code ("USD" or "EUR"), or undefined if not found.
 */
export function getFiatCurrencyCode(stablecoin: string): "USD" | "EUR" | undefined {
  return STABLECOIN_TO_FIAT_MAP[stablecoin];
}

/**
 * Retrieves the currency symbol for a given fiat currency code.
 * Handles case-insensitivity.
 *
 * @param fiatCode - The fiat currency code (case-insensitive).
 * @returns The currency symbol, or undefined if not found.
 */
export function getFiatCurrencySymbol(fiatCode: string): string | undefined {
  return FIAT_SYMBOLS_MAP[fiatCode];
}