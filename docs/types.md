# Types

- [Overview](#overview)
- [Token Types](#token-types)
  - [Token](#token)
  - [SimpleToken](#simpletoken)
- [Chain Types](#chain-types)
  - [ChainDetails](#chaindetails)
- [Currency Types](#currency-types)
  - [Currency](#currency)
  - [FiatCodes](#fiatcodes)
- [Payload Types](#payload-types)
  - [PaymentTypesArray](#paymenttypesarray)
  - [Country](#country)
  - [Router](#router)
  - [UhuConfig](#uhuconfig)
  - [Maintenance](#maintenance)
- [Derived Types](#derived-types)
  - [FiatTransactionRequest](#fiattransactionrequest)
  - [CountryCodesSupported](#countrycodessupported)
- [Error Types](#error-types)
  - [ErrorMessage](#errormessage)
- [Usage Examples](#usage-examples)

## Overview

The types folder contains comprehensive TypeScript type definitions for the tokenPayLib. These types ensure type safety across all components, utilities, and API interactions. Many types are auto-generated from Payload CMS configurations.

## Token Types

### Token

Standard token interface with complete contract information.

```typescript
import { Token } from "tokenPayLib/types/token.types";

interface Token {
  contractAddress: string;
  abi: any[];
  id: string;
  symbol: string;
  decimals: number;
  name: string;
  contract?: {
    contractAddress: string;
    abi: any[];
  };
}
```

**Usage:**
```typescript
const ethereumToken: Token = {
  contractAddress: "0xA0b86a33E6441d5c93",
  abi: ERC20ABI,
  id: "ethereum",
  symbol: "ETH",
  decimals: 18,
  name: "Ethereum",
  contract: {
    contractAddress: "0xA0b86a33E6441d5c93",
    abi: ERC20ABI
  }
};
```

### SimpleToken

Simplified token interface for basic operations.

```typescript
import { SimpleToken } from "tokenPayLib/types/token.types";
import { StaticImageData } from "next/image";

interface SimpleToken {
  name: string;
  id: string;
  decimals: number;
  contractAddress: string;
  abi: any[];
  icon: string | StaticImageData;
}
```

**Usage:**
```typescript
const usdcToken: SimpleToken = {
  name: "USD Coin",
  id: "usdc",
  decimals: 6,
  contractAddress: "0xA0b86a33E6441d5c93",
  abi: ERC20ABI,
  icon: "/icons/usdc.svg"
};
```

## Chain Types

### ChainDetails

Complete blockchain network information.

```typescript
import { ChainDetails } from "tokenPayLib/types/chainDetails.types";
import { Chain } from "thirdweb";

interface ChainDetails {
  chainId: number;
  name: string;
  chain: Chain;
  logo: string;
  main?: boolean;
}
```

**Usage:**
```typescript
import { ETHEREUM_CHAIN } from "tokenPayLib/utilities/crypto/chains";

const ethereumDetails: ChainDetails = {
  chainId: 1,
  name: "Ethereum",
  chain: ETHEREUM_CHAIN,
  logo: "/chain-icons/ethereum.svg",
  main: true
};
```

## Currency Types

### Currency

Fiat currency information.

```typescript
import { Currency } from "tokenPayLib/types/currency.types";

interface Currency {
  symbol: string;
  code: FiatCodes;
  name: string;
  icon?: string;
}
```

**Usage:**
```typescript
const usdCurrency: Currency = {
  symbol: "$",
  code: "USD",
  name: "US Dollar",
  icon: "/currency-icons/usd.svg"
};
```

### FiatCodes

Supported fiat currency codes (auto-generated from Payload).

```typescript
type FiatCodes = "USD" | "EUR" | "GBP" | "JPY" | "CAD" | "AUD" | ...;
```

## Payload Types

These types are auto-generated from the Payload CMS configuration and represent the backend data structures.

### PaymentTypesArray

Payment method configuration array.

```typescript
type PaymentTypesArray = {
  acceptedCrypto?: ("USDC" | "EURS") | null;
  name: string;
  useWhiteListPaymentMethod?: boolean | null;
  whiteList?: (string | Country)[] | null;
  blackList?: (string | Country)[] | null;
  type:
    | "unlimit"
    | "onramp_money"
    | "bitcoin_vn"
    | "bitcoin_vn_helpdesk"
    | "koywe_helpdesk"
    | "kotanipay_helpdesk"
    | "coinhako_helpdesk"
    | "swypt"
    | "crypto"
    | "ovex"
    | "roma"
    | "stasis"
    | "stasis_crypto_only"
    | "koywe_crypto_only"
    | "koywe";
  supportDeposit?: boolean | null;
  onrampModality?: ("mobile_money" | "credit_card" | "bank_account") | null;
  onrampFee?: number | null;
  onrampCommission?: number | null;
  // ... additional fields
}[];
```

### Country

Country information for compliance and localization.

```typescript
interface Country {
  countryCode: string;
  name: string;
  // ... additional country fields
}
```

### Router

Routing configuration for different environments.

```typescript
interface Router {
  routerType: "a" | "b";
  useAfter: string;
  // ... additional router fields
}
```

### UhuConfig

Global application configuration.

```typescript
interface UhuConfig {
  // Configuration fields (auto-generated)
}
```

### Maintenance

Maintenance mode configuration.

```typescript
interface Maintenance {
  isActive: boolean;
  message?: string;
  // ... additional maintenance fields
}
```

## Derived Types

### FiatTransactionRequest

Transaction request type without generated fields.

```typescript
import { FiatTransactionRequest } from "tokenPayLib/types/derivedPayload.types";

type FiatTransactionRequest = Omit<
  FiatTransaction,
  "id" | "createdAt" | "updatedAt"
>;
```

**Usage:**
```typescript
const transactionRequest: FiatTransactionRequest = {
  amount: 100,
  currency: "USD",
  recipient: "0x...",
  // ... other transaction fields (without id, createdAt, updatedAt)
};
```

### CountryCodesSupported

Union type of all supported country codes.

```typescript
type CountryCodesSupported = Country["countryCode"];
// Results in: "US" | "CA" | "GB" | "DE" | ...
```

## Error Types

### ErrorMessage

Standard error message structure.

```typescript
import { ErrorMessage } from "tokenPayLib/types/errorMessage.types";

interface ErrorMessage {
  message: string;
  error: Error;
}
```

**Usage:**
```typescript
const handleError = (errorMessage: ErrorMessage) => {
  console.error(errorMessage.message, errorMessage.error);
};
```

## Usage Examples

### Type Guards

```typescript
import { Token, SimpleToken } from "tokenPayLib/types/token.types";

// Type guard for Token
function isToken(obj: any): obj is Token {
  return obj &&
    typeof obj.contractAddress === 'string' &&
    typeof obj.symbol === 'string' &&
    typeof obj.decimals === 'number' &&
    Array.isArray(obj.abi);
}

// Type guard for SimpleToken
function isSimpleToken(obj: any): obj is SimpleToken {
  return obj &&
    typeof obj.name === 'string' &&
    typeof obj.id === 'string' &&
    typeof obj.decimals === 'number' &&
    typeof obj.contractAddress === 'string' &&
    Array.isArray(obj.abi);
}

// Usage
if (isToken(unknownObject)) {
  // TypeScript knows this is a Token
  console.log(unknownObject.contractAddress);
}
```

### Generic Type Usage

```typescript
import { ChainDetails } from "tokenPayLib/types/chainDetails.types";
import { SimpleToken } from "tokenPayLib/types/token.types";

// Generic function with token types
function processTokens<T extends SimpleToken | Token>(
  tokens: T[],
  chainDetails: ChainDetails
): T[] {
  return tokens.filter(token => {
    // Process tokens for specific chain
    return token.contractAddress !== "";
  });
}

// Usage
const simpleTokens: SimpleToken[] = [...];
const processedTokens = processTokens(simpleTokens, ethereumChain);
```

### Form Data Types

```typescript
import { Currency } from "tokenPayLib/types/currency.types";
import { SimpleToken } from "tokenPayLib/types/token.types";
import { CountryCodesSupported } from "tokenPayLib/types/derivedPayload.types";

interface SendFormData {
  fromToken: SimpleToken;
  toToken: SimpleToken;
  amount: string;
  recipient: string;
  fromCountry: CountryCodesSupported;
  toCountry: CountryCodesSupported;
  fromCurrency: Currency;
  toCurrency: Currency;
}

// Form validation
function validateSendForm(data: SendFormData): boolean {
  return (
    data.fromToken &&
    data.toToken &&
    parseFloat(data.amount) > 0 &&
    data.recipient.startsWith('0x') &&
    data.fromCountry &&
    data.toCountry
  );
}
```

### API Response Types

```typescript
import { PaymentTypesArray } from "tokenPayLib/types/payload-types";

// API response wrapper
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Payment methods API
type PaymentMethodsResponse = ApiResponse<PaymentTypesArray>;

// Usage
async function fetchPaymentMethods(): Promise<PaymentMethodsResponse> {
  const response = await fetch('/api/payment-methods');
  return response.json();
}
```

### Component Props with Types

```typescript
import React from 'react';
import { SimpleToken } from "tokenPayLib/types/token.types";
import { ChainDetails } from "tokenPayLib/types/chainDetails.types";

interface TokenSelectorProps {
  tokens: SimpleToken[];
  selectedToken: SimpleToken | null;
  chainDetails: ChainDetails;
  onSelect: (token: SimpleToken) => void;
  disabled?: boolean;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  tokens,
  selectedToken,
  chainDetails,
  onSelect,
  disabled = false
}) => {
  return (
    <select 
      value={selectedToken?.id || ""} 
      onChange={(e) => {
        const token = tokens.find(t => t.id === e.target.value);
        if (token) onSelect(token);
      }}
      disabled={disabled}
    >
      <option value="">Select Token</option>
      {tokens.map(token => (
        <option key={token.id} value={token.id}>
          {token.name} ({token.symbol})
        </option>
      ))}
    </select>
  );
};
```

### Utility Function Types

```typescript
import { Token, SimpleToken } from "tokenPayLib/types/token.types";
import { ChainDetails } from "tokenPayLib/types/chainDetails.types";

// Utility function signatures
type TokenConverter = (token: Token) => SimpleToken;
type BalanceFetcher = (token: SimpleToken, chainDetails: ChainDetails) => Promise<bigint>;
type AddressValidator = (address: string) => boolean;

// Implementation
const convertToSimpleToken: TokenConverter = (token) => ({
  name: token.name,
  id: token.id,
  decimals: token.decimals,
  contractAddress: token.contractAddress,
  abi: token.abi,
  icon: `/icons/${token.symbol.toLowerCase()}.svg`
});

const fetchTokenBalance: BalanceFetcher = async (token, chainDetails) => {
  // Implementation for fetching balance
  return BigInt(0);
};

const isValidAddress: AddressValidator = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};
```

## Related Modules

- [Components](./components.md) - React components that use these types
- [Hooks](./hooks.md) - React hooks that work with these types
- [Utilities](./utilities.md) - Utility functions that operate on these types
- [Assets](./assets.md) - Assets and contracts that implement these types