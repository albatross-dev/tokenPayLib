## crypto/fetchBalance

Token balance/supply utilities with built-in caching.

Functions
- fetchBalanceRaw(client, chain, contractAddress, abi, accountAddress): Promise<bigint>
  - Reads balanceOf(address) via thirdweb readContract.
  - Returns 0n on error.
- default export fetchBalance(client, chain, contractAddress, abi, accountAddress, options?): Promise<bigint>
  - Cached using queryClient.
  - Key: ["balance", chainId, contract, account].
  - If last result was 0n → staleTime 5 min; if null → Infinity.
  - options?: { staleTime?: number }
- fetchTotalSupply(client, chain, contractAddress, abi): Promise<bigint>
  - Reads totalSupply(); returns 0n on failure.

Parameters
- client: ThirdwebClient
- chain: Chain
- contractAddress: string
- abi: any[]
- accountAddress: string
- options?: { staleTime?: number }
