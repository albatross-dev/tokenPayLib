# tokenPayLib Documentation

Welcome to the comprehensive documentation for tokenPayLib - a powerful TypeScript/React library for token payments and cross-border transactions.

## Table of Contents

- [Quick Start](#quick-start)
- [Module Documentation](#module-documentation)
- [Architecture Overview](#architecture-overview)
- [Installation Guide](#installation-guide)
- [Contributing](#contributing)

## Quick Start

tokenPayLib is designed to make cryptocurrency payments and cross-border transactions simple and secure. Here's how to get started:

### 1. Installation

Add tokenPayLib to your project as a git submodule:

```bash
# Add the submodule to your src/ directory
git submodule add https://github.com/albatross-dev/tokenPayLib.git src/tokenPayLib

# Commit the submodule configuration
git add .gitmodules src/tokenPayLib
git commit -m "Add tokenPayLib as a submodule in src/"

# Push changes
git push origin main
```

### 2. Basic Usage

```tsx
import React from "react";
import { UhuConfigProvider } from "src/tokenPayLib/components/contexts/UhuConfigContext";
import { WalletQRCode } from "src/tokenPayLib/components/UI/WalletQRCode";
import { useSendCryptoForm } from "src/tokenPayLib/hooks/useSendCryptoForm";

function App() {
  return (
    <UhuConfigProvider>
      <YourPaymentInterface />
    </UhuConfigProvider>
  );
}
```

### 3. Key Features

- 🔗 **Multi-chain Support** - Ethereum, Polygon, Optimism, Arbitrum, Base
- 💰 **Token Operations** - Send, receive, swap cryptocurrencies
- 🌍 **Cross-border Payments** - International fiat-to-crypto transactions
- 🛡️ **Security First** - Built-in error handling and validation
- 📱 **UI Components** - Ready-to-use React components
- 🔧 **TypeScript** - Full type safety and IntelliSense support

## Module Documentation

### 📦 [Assets](./assets.md)
Icons, contract ABIs, and visual assets for building payment interfaces.

**Key Features:**
- Cryptocurrency and chain icons
- Smart contract ABIs (ERC-20, swap routers, etc.)
- Payment method and wallet icons
- TokenPay abstraction layer

**Quick Links:**
- [CryptoIcon Component](./assets.md#crypto-icons)
- [Contract ABIs](./assets.md#contract-abis)
- [Usage Examples](./assets.md#usage-examples)

---

### 🧩 [Components](./components.md)
React components for building token payment and transaction interfaces.

**Key Features:**
- UI components (buttons, loaders, displays)
- Context providers for global state
- Form components with validation
- Transaction and wallet components

**Popular Components:**
- [AddressDisplay](./components.md#addressdisplay) - Display addresses with copy functionality
- [LoadingButton](./components.md#loadingbutton) - Multi-state async buttons  
- [WalletQRCode](./components.md#walletqrcode) - QR codes for wallet addresses
- [UhuConfigContext](./components.md#uhuconfigcontext) - Global configuration provider

---

### 🎣 [Hooks](./hooks.md)
Custom React hooks for stateful payment operations.

**Key Features:**
- Form validation logic
- State management for complex flows
- Reusable patterns for crypto operations

**Main Hook:**
- [useSendCryptoForm](./hooks.md#usesendcryptoform) - Complete form validation for crypto transfers

---

### 📝 [Types](./types.md)
TypeScript type definitions for all library operations.

**Key Features:**
- Token and chain types
- Payment and transaction types
- Auto-generated Payload CMS types
- Form and validation types

**Core Types:**
- [SimpleToken](./types.md#simpletoken) - Basic token information
- [ChainDetails](./types.md#chaindetails) - Blockchain network data
- [PaymentTypesArray](./types.md#paymenttypesarray) - Payment method configurations

---

### 🛠️ [Utilities](./utilities.md)
Helper functions for crypto operations, form handling, and data processing.

**Key Features:**
- Crypto operations (transfers, balance fetching)
- Cross-border payment utilities
- Math and string manipulation
- Storage and error handling

**Popular Utilities:**
- [TokenPayAbstraction](./utilities.md#tokenpayabstraction) - Simplified token operations
- [retry](./utilities.md#retry) - Retry failed async operations
- [truncate](./utilities.md#truncate) - String truncation for addresses
- [fetchBalanceRaw](./utilities.md#balance-fetching) - Get token balances

## Architecture Overview

tokenPayLib follows a modular architecture designed for flexibility and reusability:

```
tokenPayLib/
├── assets/          # Icons, ABIs, visual assets
├── components/      # React components
│   ├── UI/         # Reusable UI components
│   ├── contexts/   # React context providers
│   ├── Forms/      # Form components
│   ├── Modals/     # Modal components
│   └── ...         # Feature-specific components
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
└── utilities/      # Helper functions
    ├── crypto/     # Blockchain operations
    ├── forms/      # Form processing
    ├── math/       # Math utilities
    └── ...         # Other utilities
```

### Design Principles

1. **Modularity** - Each module can be used independently
2. **Type Safety** - Full TypeScript coverage
3. **Error Resilience** - Built-in error handling and retry logic
4. **Performance** - Optimized for real-world usage
5. **Developer Experience** - Clear APIs and comprehensive documentation

### Integration Points

The modules work together seamlessly:

- **Components** use **Types** for props and state
- **Hooks** leverage **Utilities** for business logic
- **Components** display **Assets** (icons, etc.)
- **Utilities** perform operations using contract **Assets** (ABIs)

## Installation Guide

### Prerequisites

- Node.js 16+ and npm/yarn
- React 18+
- TypeScript 4.5+
- Next.js (recommended)

### Step-by-Step Setup

1. **Add as Submodule**
   ```bash
   git submodule add https://github.com/albatross-dev/tokenPayLib.git src/tokenPayLib
   ```

2. **Install Peer Dependencies**
   ```bash
   npm install thirdweb react-qr-code react-icons next-i18next
   ```

3. **Configure TypeScript**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "tokenPayLib/*": ["src/tokenPayLib/*"]
       }
     }
   }
   ```

4. **Setup Provider**
   ```tsx
   // pages/_app.tsx
   import { UhuConfigProvider } from "tokenPayLib/components/contexts/UhuConfigContext";
   
   export default function App({ Component, pageProps }) {
     return (
       <UhuConfigProvider>
         <Component {...pageProps} />
       </UhuConfigProvider>
     );
   }
   ```

5. **Environment Variables**
   ```env
   NEXT_PUBLIC_BACKEND_URL=your-backend-url
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your-thirdweb-client-id
   ```

### Project Structure

Your project structure should look like:

```
project-root/
├── src/
│   ├── tokenPayLib/          # ← submodule here
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utilities/
│   │   └── assets/
│   ├── pages/               # Your Next.js pages
│   └── components/          # Your custom components
├── package.json
└── tsconfig.json
```

## Development Workflow

### Making Changes

Since tokenPayLib is included as a submodule, development follows this pattern:

1. **Update the Library**
   ```bash
   cd src/tokenPayLib
   git pull origin main
   cd ../..
   git add src/tokenPayLib
   git commit -m "Update tokenPayLib to latest version"
   ```

2. **Use in Your Code**
   ```tsx
   import { LoadingButton } from "tokenPayLib/components/UI/LoadingButton";
   import { useSendCryptoForm } from "tokenPayLib/hooks/useSendCryptoForm";
   ```

3. **Override Styles** (if needed)
   ```css
   /* Your custom CSS */
   .tokenPayLib-override {
     /* Custom styling */
   }
   ```

### Testing Your Integration

```tsx
// Example test component
import React from "react";
import { WalletQRCode } from "tokenPayLib/components/UI/WalletQRCode";
import { UhuConfigProvider } from "tokenPayLib/components/contexts/UhuConfigContext";

export default function TestTokenPayLib() {
  return (
    <UhuConfigProvider>
      <div className="p-8">
        <h1>tokenPayLib Test</h1>
        <WalletQRCode />
      </div>
    </UhuConfigProvider>
  );
}
```

## Contributing

We welcome contributions to tokenPayLib! Please follow these guidelines:

### Reporting Issues

1. Check existing issues first
2. Provide clear reproduction steps
3. Include environment details (Node.js version, React version, etc.)

### Contributing Code

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

### Documentation

Help improve this documentation by:
- Fixing typos or unclear explanations
- Adding more usage examples
- Updating outdated information
- Translating to other languages

## Support

- 📖 **Documentation**: You're reading it!
- 🐛 **Issues**: [GitHub Issues](https://github.com/albatross-dev/tokenPayLib/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/albatross-dev/tokenPayLib/discussions)

---

## Module Cross-References

Modules are designed to work together. Here are the main integration points:

### Components → Other Modules
- [AddressDisplay](./components.md#addressdisplay) uses [truncate](./utilities.md#truncate) utility
- [WalletQRCode](./components.md#walletqrcode) uses thirdweb types from [Types](./types.md)
- [LoadingButton](./components.md#loadingbutton) accepts [ErrorMessage](./types.md#errormessage) types

### Hooks → Other Modules  
- [useSendCryptoForm](./hooks.md#usesendcryptoform) validates [SimpleToken](./types.md#simpletoken) types
- Form hooks use validation utilities from [Utilities](./utilities.md#form-utilities)

### Utilities → Other Modules
- [TokenPayAbstraction](./utilities.md#tokenpayabstraction) uses contract ABIs from [Assets](./assets.md#contract-abis)
- [fetchBalanceRaw](./utilities.md#balance-fetching) operates on [Token](./types.md#token) types
- Crypto utilities work with [ChainDetails](./types.md#chaindetails) types

### Types → Other Modules
- All modules depend on types for consistency
- [payload-types](./types.md#payload-types) are auto-generated and used throughout
- Component props and utility function parameters use these types

This interconnected design ensures consistency and type safety across your entire payment application.
