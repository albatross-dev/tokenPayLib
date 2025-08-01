# Utilities

- [Overview](#overview)
- [Crypto Utilities](#crypto-utilities)
  - [TokenPayAbstraction](#tokenpayabstraction)
  - [Chain Management](#chain-management)
  - [Balance Fetching](#balance-fetching)
  - [Currency Conversion](#currency-conversion)
- [Cross-border Utilities](#cross-border-utilities)
  - [Country Filtering](#country-filtering)
  - [Payment Method Sorting](#payment-method-sorting)
- [Math Utilities](#math-utilities)
  - [Truncate](#truncate)
  - [Number Formatting](#number-formatting)
- [Form Utilities](#form-utilities)
  - [Data Processing](#data-processing)
  - [File Handling](#file-handling)
  - [Date Formatting](#date-formatting)
- [Miscellaneous Utilities](#miscellaneous-utilities)
  - [Delay](#delay)
  - [Retry](#retry)
- [Storage Utilities](#storage-utilities)
  - [Local Storage](#local-storage)
- [KYC Utilities](#kyc-utilities)
- [Partner Integrations](#partner-integrations)
- [Error Reporting](#error-reporting)
- [Usage Examples](#usage-examples)

## Overview

The utilities folder contains a comprehensive collection of helper functions and utilities for cryptocurrency operations, form handling, data processing, and various other common tasks. These utilities are designed to be pure functions (where possible) that can be easily tested and reused across components.

## Crypto Utilities

### TokenPayAbstraction

Main abstraction layer for token operations using thirdweb.

```typescript
import { 
  getTokenPayAbstractionContract,
  tokenPayAbstractionSimpleTransfer,
  TokenPayAbstractionAddress 
} from "tokenPayLib/utilities/crypto/TokenPayAbstraction";

// Get the abstraction contract
const contract = getTokenPayAbstractionContract(client, chain);

// Simple transfer
const result = await tokenPayAbstractionSimpleTransfer(
  client,
  account,
  chain,
  BigInt("1000000"), // amount with decimals
  token,
  "0x..." // recipient address
);

console.log("Transaction hash:", result.transactionHash);
```

**Constants:**
- `TokenPayAbstractionAddress` - The contract address for the abstraction layer
- `TokenPayAbstractionAbi` - The ABI for the contract

### Chain Management

Predefined chain configurations for supported networks.

```typescript
import { 
  ETHEREUM_CHAIN,
  POLYGON_CHAIN,
  OPTIMISM_CHAIN,
  ARBITRUM_CHAIN,
  BASE_CHAIN 
} from "tokenPayLib/utilities/crypto/chains";

// Usage with thirdweb
const contract = getContract({
  client,
  chain: ETHEREUM_CHAIN,
  address: contractAddress,
  abi: contractAbi
});
```

**Available Chains:**
- Ethereum (Chain ID: 1)
- Polygon (Chain ID: 137)
- Optimism (Chain ID: 10)
- Arbitrum (Chain ID: 42161)
- Base (Chain ID: 8453)

### Balance Fetching

Utilities for fetching token balances from blockchain networks.

```typescript
import { fetchBalanceRaw } from "tokenPayLib/utilities/crypto/fetchBalance";

// Fetch balance for a specific token
const balance = await fetchBalanceRaw(
  client,
  chain,
  tokenContractAddress,
  tokenAbi,
  accountAddress
);

console.log("Balance:", balance.toString());
```

**Features:**
- Built-in error handling (returns 0n on error)
- Type-safe with bigint returns
- Optimized for performance

### Currency Conversion

Currency and token conversion utilities.

```typescript
import { convertAnyToAny } from "tokenPayLib/utilities/crypto/convertAnyToAny";
import { convertToStable } from "tokenPayLib/utilities/crypto/convertToStable";

// Convert between any supported tokens
const result = await convertAnyToAny(
  fromToken,
  toToken,
  amount,
  client,
  account
);

// Convert to stablecoin
const stableResult = await convertToStable(
  fromToken,
  amount,
  client,
  account
);
```

## Cross-border Utilities

### Country Filtering

Filter and manage country data for compliance.

```typescript
import { filterCountryData } from "tokenPayLib/utilities/crossborder/filterCountryData";

// Filter countries based on payment method support
const availableCountries = filterCountryData(
  allCountries,
  paymentMethod,
  userLocation
);
```

### Payment Method Sorting

Sort payment methods by currency and other criteria.

```typescript
import { sortMethodByCurrency } from "tokenPayLib/utilities/crossborder/sortMethodByCurrency";

// Sort payment methods for better UX
const sortedMethods = sortMethodByCurrency(
  paymentMethods,
  targetCurrency,
  userPreferences
);
```

## Math Utilities

### Truncate

Truncate strings with customizable separators.

```typescript
import truncate from "tokenPayLib/utilities/math/truncate";

// Truncate an address
const shortAddress = truncate(
  "0x1234567890abcdef1234567890abcdef12345678",
  16, // max length
  "..." // separator
);
// Result: "0x12345...12345678"

// Truncate with custom separator
const customTruncated = truncate(
  "very long string that needs truncation",
  20,
  " • "
);
// Result: "very lo • truncation"
```

**Parameters:**
- `fullStr: string` - The string to truncate
- `strLen: number` - Maximum length of result
- `separator?: string` - Separator to use (default: "...")

### Number Formatting

Format numbers with appropriate decimal places and zeros.

```typescript
import { numberWithZeros } from "tokenPayLib/utilities/math/numberWithZeros";

// Format numbers for display
const formatted = numberWithZeros(1234.567, 2);
// Result: "1,234.57"

const withZeros = numberWithZeros(42, 6);
// Result: "42.000000"
```

## Form Utilities

### Data Processing

Process and validate form data.

```typescript
import { preprocessData } from "tokenPayLib/utilities/forms/preprocessData";
import { processAndSet } from "tokenPayLib/utilities/forms/processAndSet";

// Preprocess form data before submission
const cleanedData = preprocessData(formData, validationRules);

// Process and set form state
processAndSet(formData, setFormState, validators);
```

### File Handling

Handle file uploads and form data operations.

```typescript
import { appendFilesInFormData } from "tokenPayLib/utilities/forms/appendFilesInFormData";
import { getFormData } from "tokenPayLib/utilities/forms/getFormData";

// Append files to FormData
const formData = new FormData();
appendFilesInFormData(formData, files, "documents");

// Extract form data
const extractedData = getFormData(formElement);
```

### Date Formatting

Format dates for form inputs.

```typescript
import { formatDateForInput } from "tokenPayLib/utilities/forms/formatDateForInput";

// Format date for HTML input
const formattedDate = formatDateForInput(new Date());
// Result: "2024-01-15" (YYYY-MM-DD format)

const customFormatted = formatDateForInput(date, "MM/DD/YYYY");
```

## Miscellaneous Utilities

### Delay

Simple promise-based delay function.

```typescript
import delay from "tokenPayLib/utilities/misc/delay";

// Wait for 2 seconds
await delay(2000);

// Use in async operations
async function processWithDelay() {
  console.log("Starting process...");
  await delay(1000);
  console.log("Process completed!");
}
```

### Retry

Retry failed async operations with configurable attempts and delays.

```typescript
import retry from "tokenPayLib/utilities/misc/retry";

// Retry a function up to 3 times
const result = await retry(
  async () => {
    const response = await fetch("/api/data");
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  },
  3, // max attempts
  1000 // delay between attempts (ms)
);

// Custom retry logic
const customRetry = await retry(
  async () => await riskyOperation(),
  5, // 5 attempts
  2000 // 2 second delay
);
```

**Parameters:**
- `fn: () => Promise<T>` - Async function to retry
- `retries: number` - Number of attempts (default: 3)
- `delayMs: number` - Delay between attempts in ms (default: 1000)

## Storage Utilities

### Local Storage

Safe local storage operations with error handling.

```typescript
import { getFromLocalStorage } from "tokenPayLib/utilities/storage/getFromLocalStorage";

// Get item from localStorage with fallback
const userPrefs = getFromLocalStorage("userPreferences", {
  theme: "light",
  currency: "USD"
});

// Type-safe storage operations
interface UserSettings {
  theme: "light" | "dark";
  notifications: boolean;
}

const settings = getFromLocalStorage<UserSettings>("settings", {
  theme: "light",
  notifications: true
});
```

## KYC Utilities

Know Your Customer utilities for compliance.

```typescript
import { requiredDocumentsInfo } from "tokenPayLib/utilities/kyc/requiredDocumentsInfo";

// Get required documents for a country
const requiredDocs = requiredDocumentsInfo(countryCode);

// Check document requirements
const isComplete = checkDocumentCompleteness(
  userDocuments,
  requiredDocs
);
```

## Partner Integrations

Utilities for integrating with various payment partners.

```typescript
// Bitcoin VN integration
import { bitcoinvn } from "tokenPayLib/utilities/partner/bitcoinvn";

// Stasis integration
import { fetchBankAccounts } from "tokenPayLib/utilities/partner/stasis/fetchBankAccounts";

// Get partner-specific data
const bankAccounts = await fetchBankAccounts(userId, credentials);
```

## Error Reporting

Centralized error reporting utilities.

```typescript
import { sendErrorReport } from "tokenPayLib/utilities/error-reporter";

// Report errors to monitoring service
try {
  await riskyOperation();
} catch (error) {
  sendErrorReport("Operation failed", error, {
    userId: user.id,
    context: "token-transfer"
  });
  throw error;
}
```

## Usage Examples

### Complete Token Transfer Flow

```typescript
import { 
  getTokenPayAbstractionContract,
  tokenPayAbstractionSimpleTransfer 
} from "tokenPayLib/utilities/crypto/TokenPayAbstraction";
import { fetchBalanceRaw } from "tokenPayLib/utilities/crypto/fetchBalance";
import { ETHEREUM_CHAIN } from "tokenPayLib/utilities/crypto/chains";
import retry from "tokenPayLib/utilities/misc/retry";
import truncate from "tokenPayLib/utilities/math/truncate";

async function transferTokens(
  client: ThirdwebClient,
  account: Account,
  token: SimpleToken,
  recipient: string,
  amount: string
) {
  try {
    // 1. Check balance first
    const balance = await fetchBalanceRaw(
      client,
      ETHEREUM_CHAIN,
      token.contractAddress,
      token.abi,
      account.address
    );

    const transferAmount = BigInt(amount);
    
    if (balance < transferAmount) {
      throw new Error("Insufficient balance");
    }

    // 2. Perform transfer with retry logic
    const result = await retry(
      () => tokenPayAbstractionSimpleTransfer(
        client,
        account,
        ETHEREUM_CHAIN,
        transferAmount,
        token,
        recipient
      ),
      3, // 3 attempts
      2000 // 2 second delay
    );

    // 3. Display success with truncated addresses
    console.log(`Transfer successful!
      From: ${truncate(account.address, 16)}
      To: ${truncate(recipient, 16)}
      Amount: ${amount} ${token.symbol}
      Tx: ${truncate(result.transactionHash, 20)}
    `);

    return result;

  } catch (error) {
    sendErrorReport("Token transfer failed", error, {
      token: token.symbol,
      amount,
      recipient: truncate(recipient, 10)
    });
    throw error;
  }
}
```

### Form Processing Pipeline

```typescript
import { preprocessData } from "tokenPayLib/utilities/forms/preprocessData";
import { formatDateForInput } from "tokenPayLib/utilities/forms/formatDateForInput";
import { appendFilesInFormData } from "tokenPayLib/utilities/forms/appendFilesInFormData";
import delay from "tokenPayLib/utilities/misc/delay";
import retry from "tokenPayLib/utilities/misc/retry";

interface KYCFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  documents: File[];
}

async function processKYCForm(formData: KYCFormData) {
  // 1. Preprocess data
  const cleanedData = preprocessData(formData, {
    firstName: (value) => value.trim().toLowerCase(),
    lastName: (value) => value.trim().toLowerCase(),
  });

  // 2. Format date for submission
  const formattedData = {
    ...cleanedData,
    dateOfBirth: formatDateForInput(cleanedData.dateOfBirth)
  };

  // 3. Prepare form data with files
  const submitData = new FormData();
  Object.entries(formattedData).forEach(([key, value]) => {
    if (key !== 'documents') {
      submitData.append(key, value.toString());
    }
  });

  // 4. Append documents
  appendFilesInFormData(submitData, formData.documents, "kyc_documents");

  // 5. Submit with retry logic
  const result = await retry(
    async () => {
      const response = await fetch("/api/kyc/submit", {
        method: "POST",
        body: submitData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return response.json();
    },
    3,
    1000
  );

  return result;
}
```

### Cross-border Payment Setup

```typescript
import { filterCountryData } from "tokenPayLib/utilities/crossborder/filterCountryData";
import { sortMethodByCurrency } from "tokenPayLib/utilities/crossborder/sortMethodByCurrency";
import { getFromLocalStorage } from "tokenPayLib/utilities/storage/getFromLocalStorage";

interface CrossBorderConfig {
  sourceCountry: string;
  targetCountry: string;
  currency: string;
  amount: number;
}

function setupCrossBorderPayment(
  allCountries: Country[],
  allPaymentMethods: PaymentMethod[],
  config: CrossBorderConfig
) {
  // 1. Get user preferences
  const userPrefs = getFromLocalStorage("crossBorderPrefs", {
    preferredMethods: [],
    lastUsedCountries: []
  });

  // 2. Filter available countries
  const availableCountries = filterCountryData(
    allCountries,
    config.sourceCountry,
    userPrefs
  );

  // 3. Sort payment methods by currency
  const sortedMethods = sortMethodByCurrency(
    allPaymentMethods,
    config.currency,
    {
      amount: config.amount,
      sourceCountry: config.sourceCountry,
      targetCountry: config.targetCountry
    }
  );

  return {
    availableCountries,
    recommendedMethods: sortedMethods.slice(0, 3),
    allMethods: sortedMethods
  };
}
```

## Best Practices

### Error Handling

Always use the retry utility for network operations:

```typescript
// Good
const balance = await retry(
  () => fetchBalanceRaw(client, chain, address, abi, account),
  3,
  1000
);

// Better - with custom error handling
const balance = await retry(
  async () => {
    const result = await fetchBalanceRaw(client, chain, address, abi, account);
    if (result === BigInt(0)) {
      throw new Error("Zero balance returned - might be network issue");
    }
    return result;
  },
  3,
  2000
);
```

### String Truncation

Use consistent truncation for addresses and transaction hashes:

```typescript
// Addresses - show enough to be identifiable
const displayAddress = truncate(address, 16); // "0x1234...5678"

// Transaction hashes - shorter for better UX
const displayTx = truncate(txHash, 12); // "0x123...890"

// Long text - preserve readability
const displayText = truncate(longText, 50, " ... ");
```

### Storage Operations

Always provide fallbacks for localStorage operations:

```typescript
// Good - with fallback
const settings = getFromLocalStorage("userSettings", {
  theme: "light",
  notifications: true
});

// Better - with type safety
interface UserSettings {
  theme: "light" | "dark";
  notifications: boolean;
}

const settings = getFromLocalStorage<UserSettings>("userSettings", {
  theme: "light",
  notifications: true
});
```

## Related Modules

- [Components](./components.md) - Components that use these utilities
- [Hooks](./hooks.md) - Hooks that leverage utility functions
- [Types](./types.md) - TypeScript types used by utilities
- [Assets](./assets.md) - Contract ABIs and assets used by crypto utilities