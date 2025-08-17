## crypto/bridgeUtils

Helpers for ERC-20 approvals and Across-style bridge deposits using thirdweb.

Environment
- Uses NEXT_PUBLIC_LOCAL_URL for backend proxy endpoints.

Functions
- approveTokens({ spokePoolAddress, tokenContractAddress, chain, amount, account }): Promise<any>
  - Approves `amount` for `spokePoolAddress` on `tokenContractAddress` via ERC-20 approve.
  - Params
    - spokePoolAddress: string
    - tokenContractAddress: string
    - chain: Chain
    - amount: number (raw units)
    - account: Account
  - Returns: thirdweb transaction result from sendAndConfirmTransaction.
- deposit(params): Promise<void>
  - Invokes either custom wrapper contract `bridge(...)` or SpokePool `depositV3(...)` based on `isCustomWrapper`.
  - Params
    - spokePoolAddress: string
    - isCustomWrapper: boolean
    - depositor: string
    - recipient: string
    - inputToken: string
    - outputToken: string
    - inputAmount: number
    - outputAmount: number
    - destinationChainId: number
    - exclusiveRelayer: string
    - quoteTimestamp: number
    - fillDeadline: number
    - exclusivityDeadline: number
    - account: Account
    - chain: Chain
- acrossBridgeDeposit(params): Promise<boolean>
  - Orchestrates: limit fetch → quote fetch → approve → deposit.
  - Params
    - tokenAddress: string
    - originChainId: number
    - destinationChainId: number
    - amount: number (floored to integer raw amount)
    - account: Account
    - token: SimpleToken
    - chain: Chain
    - quoteData: { totalRelayFee: { total: number }, timestamp: number, exclusiveRelayer: string, exclusivityDeadline: number }
    - limits: { maxDeposit: number, code?: string, message?: string, status?: number }
    - spokePool: string
    - spokePoolWrapper?: string (enables custom wrapper path)
  - Returns true on success; catches and reports errors (sendErrorReport) and returns false.
- fetchLimitsAndQuote(tokenAddress, originChainId, destinationChainId, amount, tokenDecimals): Promise<{ limits: Limits|null, quote: QuoteData|null }>
  - Fetches limits from `${NEXT_PUBLIC_LOCAL_URL}/api/limits` and quote from `${NEXT_PUBLIC_LOCAL_URL}/api/quotes`.
  - amount is scaled to raw string by 10^tokenDecimals.
  - On error, returns shaped error object with { code, message, status } in place of failed fetch.

Notes
- All contract interactions via thirdweb getContract, prepareContractCall, sendAndConfirmTransaction, readContract.
- SpokePool ABI for depositV3 is defined inline.


