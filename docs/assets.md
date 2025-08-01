# Assets

- [Overview](#overview)
- [Crypto Icons](#crypto-icons)
- [Chain Icons](#chain-icons)
- [Payment Icons](#payment-icons)
- [Wallet Icons](#wallet-icons)
- [Contract ABIs](#contract-abis)
- [Usage Examples](#usage-examples)

## Overview

The assets folder contains all the visual and contract assets used throughout the tokenPayLib. This includes cryptocurrency icons, blockchain network icons, payment method icons, wallet icons, and smart contract ABIs.

## Crypto Icons

The library includes a comprehensive collection of cryptocurrency icons to display various tokens and coins in your UI.

### CryptoIcon Component

A React component for displaying cryptocurrency icons with automatic fallback handling.

```tsx
import CryptoIcon from "tokenPayLib/assets/CryptoIcon";

// Basic usage
<CryptoIcon symbol="BTC" size={24} />

// With custom styling
<CryptoIcon 
  symbol="ETH" 
  size={32} 
  className="rounded-full border"
/>
```

### Available Icons

The icons are organized by cryptocurrency and include popular tokens like:
- Bitcoin (BTC)
- Ethereum (ETH) 
- USDC
- USDT
- WBTC
- And many more...

## Chain Icons

Network/blockchain icons for displaying supported chains in your application.

### Supported Chains

Icons are available for major blockchain networks:
- Ethereum
- Polygon
- Optimism
- Arbitrum
- Base
- And other EVM-compatible chains

### Usage

```tsx
// Import chain icons from the chain-icons folder
import EthereumIcon from "tokenPayLib/assets/chain-icons/ethereum.svg";

<img src={EthereumIcon} alt="Ethereum" className="w-6 h-6" />
```

## Payment Icons

Icons for various payment methods and financial services.

### Usage

```tsx
// Payment method icons
import BankIcon from "tokenPayLib/assets/payment-icons/bank.svg";
import CreditCardIcon from "tokenPayLib/assets/payment-icons/credit-card.svg";
```

## Wallet Icons

Icons for different cryptocurrency wallets and connection methods.

### Supported Wallets

- MetaMask
- WalletConnect
- Coinbase Wallet
- And other popular wallet providers

### Usage

```tsx
import MetaMaskIcon from "tokenPayLib/assets/wallet-icons/metamask.svg";

<img src={MetaMaskIcon} alt="MetaMask" className="w-8 h-8" />
```

## Contract ABIs

Smart contract Application Binary Interfaces (ABIs) for interacting with blockchain contracts.

### Available ABIs

- `ERC20ABI.json` - Standard ERC-20 token contract interface
- `customSwapRouterAbi.json` - Custom swap router contract
- `quoteV2Abi.json` - Price quotation contract
- `swapRouterAbi.json` - Standard swap router
- `swypt_abi.json` - Swypt protocol contract

### Usage

```typescript
import ERC20ABI from "tokenPayLib/assets/ERC20ABI.json";
import { getContract } from "thirdweb";

// Create contract instance
const tokenContract = getContract({
  client,
  chain,
  address: tokenAddress,
  abi: ERC20ABI,
});
```

### TokenPay Abstraction

The library includes a specialized abstraction layer for token operations:

```typescript
import { 
  getTokenPayAbstractionContract,
  tokenPayAbstractionSimpleTransfer 
} from "tokenPayLib/utilities/crypto/TokenPayAbstraction";

// Get the abstraction contract
const contract = getTokenPayAbstractionContract(client, chain);

// Perform a simple transfer
await tokenPayAbstractionSimpleTransfer(
  client,
  account,
  chain,
  amount,
  token,
  recipient
);
```

## Usage Examples

### Complete Icon Display Component

```tsx
import React from "react";
import CryptoIcon from "tokenPayLib/assets/CryptoIcon";

interface TokenDisplayProps {
  token: {
    symbol: string;
    name: string;
    chainId: number;
  };
}

export function TokenDisplay({ token }: TokenDisplayProps) {
  return (
    <div className="flex items-center space-x-2">
      <CryptoIcon symbol={token.symbol} size={24} />
      <div>
        <div className="font-medium">{token.symbol}</div>
        <div className="text-sm text-gray-500">{token.name}</div>
      </div>
    </div>
  );
}
```

### Contract Interaction

```typescript
import { ThirdwebClient } from "thirdweb";
import { Chain } from "thirdweb/chains";
import { Account } from "thirdweb/wallets";
import ERC20ABI from "tokenPayLib/assets/ERC20ABI.json";

async function checkTokenBalance(
  client: ThirdwebClient,
  chain: Chain,
  account: Account,
  tokenAddress: string
): Promise<bigint> {
  const contract = getContract({
    client,
    chain,
    address: tokenAddress,
    abi: ERC20ABI,
  });

  const balance = await contract.call("balanceOf", [account.address]);
  return balance;
}
```

## Related Modules

- [Components](./components.md) - React components that use these assets
- [Utilities](./utilities.md) - Utility functions for working with contracts
- [Types](./types.md) - TypeScript types for tokens and contracts