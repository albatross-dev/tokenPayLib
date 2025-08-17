## currencies and formatting

Exports
- default currencies (Polygon), and chain-specific maps: currenciesBase, currenciesArbitrum, currenciesEthereum, currenciesOP, currenciesAvax, currenciesBSC.
- TokensByChainId: Record<chainId, Record<symbol, SimpleToken>>
- ChainLogoByChainId: Record<chainId, logoPath>
- LogoByShortName: short token symbol to image
- ERC20ABI: shared ABI
- formatNumberWithCurrency(number, currency?, includeSymbol=true): string
- numberFormatter: Intl.NumberFormat preset (EUR)
- formatCrypto(amount, decimals, fractionDigits=2): string
- ALPHA, UHU: predefined SimpleToken entries

Usage
- Use TokensByChainId[chainId][symbol] to resolve ERC-20 contract data.
- Use formatCrypto for human readable on-chain amounts (amount/10^decimals).
