## crypto/convertAnyToAny

Implements token swapping via Uniswap V3-style routers using thirdweb.

Env
- NEXT_PUBLIC_EXCHANGE_TYPE: "internal" | "external" – selects router/ABI set.

Functions
- convertAnyToAnyDirect(token, amount, account, success, error, chain, target, path?)
  - Approves token to router, quotes via QuoteV2, executes swap.
  - Params:
    - token: SimpleToken
    - amount: number (integer raw units expected)
    - account: thirdweb Account
    - chain: thirdweb Chain
    - target: SimpleToken
    - path?: [types: string[], values: any[]] encoded route tuple
  - Returns: Promise<void>
  - Behavior: Uses getEncodedPath if no path provided; calls success() or error(e); reports via sendErrorReport.
- default export convertAnyToAny(token, amount, account, success, error, chain, targetSymbol, internal?)
  - Same flow, but derives route using getPath(symbol, chain, targetSymbol) and getEncodedPath.
  - internal?: boolean to force internal router.

Notes
- Uses thirdweb getContract, prepareContractCall, sendAndConfirmTransaction, readContract.
- Quote method: quoteExactInput(path, amountIn) → expected output.
- See also: getPath.md for route resolution.
