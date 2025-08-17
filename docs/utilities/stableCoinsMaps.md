## stableCoinsMaps

Exports
- getFiatInfoForStableCoin(stableCoin): FiatInfo | undefined
- getFiatInfo(fiatCode): FiatInfo | undefined
- getFiatCurrencyCode(stablecoin): "USD" | "EUR" | undefined
- getFiatCurrencySymbol(fiatCode): string | undefined
- STANDARD_STABLE_MAP: { [ticker]: FiatInfo }

Notes
- Handles case-insensitive inputs where relevant.
- Maps stable tickers (USDC, USDT, EURS, UHU) to fiat metadata.
