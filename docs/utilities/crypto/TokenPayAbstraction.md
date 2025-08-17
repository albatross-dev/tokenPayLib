## crypto/TokenPayAbstraction

Abstraction to approve and execute a simple token transfer through a custom router contract.

Constants
- TokenPayAbstractionAddress: 0x224498ff598ecbcbde689b593e64ac48e9b3be15
- TokenPayAbstractionAbi: customSwapRouterAbi.json

Functions
- getTokenPayAbstractionContract(client, chain)
  - Returns thirdweb contract instance.
- tokenPayAbstractionSimpleTransfer(client, account, chain, amount, token, recipient): Promise<{ transactionHash: string }>
  - Approves token to TokenPayAbstractionAddress; retries 3x with 1s delay.
  - Calls simpleTransfer(amount, tokenAddress, recipient) on abstraction; retries 3x.
  - Params
    - client: ThirdwebClient
    - account: Account
    - chain: Chain
    - amount: bigint (amount in raw units)
    - token: SimpleToken (contractAddress, abi)
    - recipient: string (EVM address)
  - Returns transaction result from thirdweb.

Notes
- Uses internal retry(ms=1000, attempts=3) utility.
