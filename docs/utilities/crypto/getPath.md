## crypto/getPath

Provides path resolution for swaps per chain and token, mapping to Uniswap V3 path tuples.

Exports
- PATHS: Record<chainId, tokenSymbol -> targetSymbol -> [types[], values[]]>
- default export getPath(tokenSymbol, chain, targetTokenSymbol): [types[], values[]]
- getEncodedPath(tokenSymbol, chain, targetTokenSymbol): string

Details
- Sources chain-specific path maps from crypto/paths/*.js (polygonPaths, ethereumPaths, arbitumPaths, optimismPaths, basePaths).
- Returns a tuple: [ ["address","uint24","address", ...], [tokenIn, fee, tokenOut, ...] ].
- getEncodedPath encodes via thirdweb encodePacked(types, values).

Usage
- Use getPath when needing raw tuple for custom router.
- Use getEncodedPath for quoteExactInput and exactInput on Uniswap V3 routers.
