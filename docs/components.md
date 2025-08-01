# Components

- [Overview](#overview)
- [UI Components](#ui-components)
  - [AddressDisplay](#addressdisplay)
  - [Banner](#banner)
  - [Loader](#loader)
  - [LoadingButton](#loadingbutton)
  - [WalletQRCode](#walletqrcode)
  - [Other UI Components](#other-ui-components)
- [Context Providers](#context-providers)
  - [UhuConfigContext](#uhuconfigcontext)
- [Form Components](#form-components)
- [Modal Components](#modal-components)
- [Transaction Components](#transaction-components)
- [Wallet Components](#wallet-components)
- [Cross-border Components](#cross-border-components)
- [Module Components](#module-components)
- [Error Boundary](#error-boundary)
- [Usage Examples](#usage-examples)

## Overview

The components folder contains a comprehensive collection of React components for building token payment and cross-border transaction interfaces. All components are built with TypeScript and designed to work seamlessly with modern React applications.

## UI Components

### AddressDisplay

A component for displaying cryptocurrency addresses with copy functionality and optional truncation.

```tsx
import AddressDisplay from "tokenPayLib/components/UI/AddressDisplay";

// Basic usage
<AddressDisplay value="0x1234567890abcdef1234567890abcdef12345678" />

// Without truncation
<AddressDisplay 
  value="0x1234567890abcdef1234567890abcdef12345678"
  concat={false}
/>

// Custom truncation length
<AddressDisplay 
  value="0x1234567890abcdef1234567890abcdef12345678"
  concatVal={8}
  className="custom-styling"
/>
```

**Props:**
- `value: string` - The address to display
- `concat?: boolean` - Whether to truncate the address (default: true)
- `concatVal?: number` - Number of characters to show from start/end (default: 6)
- `className?: string` - Custom CSS classes

### Banner

A styled link component with an arrow icon for promotional content.

```tsx
import Banner from "tokenPayLib/components/UI/Banner";

<Banner 
  color="bg-blue-500" 
  href="/promotion"
  rounded="rounded-lg"
>
  Special Offer Available
</Banner>
```

**Props:**
- `color: string` - Background color classes
- `href: string` - Link destination
- `children: ReactNode` - Banner content
- `rounded?: string` - Border radius classes

### Loader

A processing animation component with rotating text slides.

```tsx
import Loader from "tokenPayLib/components/UI/Loader";

// Basic loader
<Loader />

// Custom processing animation
import { ProcessingAnimation } from "tokenPayLib/components/UI/Loader";

<ProcessingAnimation 
  textSlideC={{ textSlide, setTextSlide }}
  loading={true}
/>
```

**Features:**
- Automatic text rotation
- Internationalization support
- Smooth animations
- Customizable state control

### LoadingButton

A button component with multiple states for handling async operations.

```tsx
import LoadingButton from "tokenPayLib/components/UI/LoadingButton";

<LoadingButton
  isLoading="normal"
  onClick={handleClick}
  active={true}
  fullWidth={false}
  showSuccessColor={true}
>
  Submit Transaction
</LoadingButton>
```

**Props:**
- `isLoading: "processing" | "error" | "success" | "normal"` - Button state
- `onClick?: () => void` - Click handler
- `children: React.ReactNode` - Button content
- `active?: boolean` - Whether button is active (default: true)
- `fullWidth?: boolean` - Full width styling (default: false)
- `showSuccessColor?: boolean` - Show green color on success (default: false)
- `error?: LoadingButtonError` - Error details for error state

### WalletQRCode

Displays a QR code for the currently connected wallet address.

```tsx
import WalletQRCode from "tokenPayLib/components/UI/WalletQRCode";

// Must be used within a thirdweb provider context
<WalletQRCode />
```

**Features:**
- Automatic wallet detection via thirdweb
- QR code generation
- Copy address functionality
- Internationalization support
- Client-side rendering safe

### Other UI Components

The library includes many additional UI components:

- **ContinentMap** - Interactive continent selection
- **ConvertStateButton** - State conversion controls  
- **DatePicker** - Date selection component
- **LoadingScreen** - Full-screen loading overlay
- **Maintenance** - Maintenance mode display
- **MiniLoader** - Compact loading spinner
- **SimpleList** - Basic list component
- **StepSidebar** - Multi-step process navigation
- **Table** - Data table component
- **ToggleSection** - Collapsible content sections
- **Tooltip** - Hover information displays
- **TransferStateDisplay** - Transaction state indicators
- **UnlimitWidget** - Unlimit integration widget

## Context Providers

### UhuConfigContext

Provides global configuration and maintenance status throughout the application.

```tsx
import { UhuConfigProvider, useUhuConfig } from "tokenPayLib/components/contexts/UhuConfigContext";

// Wrap your app
function App() {
  return (
    <UhuConfigProvider>
      <YourComponents />
    </UhuConfigProvider>
  );
}

// Use in components
function MyComponent() {
  const { 
    uhuConfig, 
    currentRouter, 
    maintenance,
    isHelpModalOpen,
    setIsHelpModalOpen 
  } = useUhuConfig();

  if (maintenance?.isActive) {
    return <MaintenanceMode />;
  }

  return <div>Normal operation</div>;
}
```

**Context Value:**
- `uhuConfig: UhuConfig | "loading" | null` - Global configuration
- `currentRouter: Router | "loading" | null` - Current routing configuration
- `maintenance: Maintenance | "loading" | null` - Maintenance status
- `isHelpModalOpen: boolean` - Help modal state
- `setIsHelpModalOpen: (isOpen: boolean) => void` - Help modal controller

## Form Components

Form components for various input types and validation:

- **Address input fields**
- **Amount input with validation**
- **Token selection dropdowns**
- **KYC document upload forms**
- **Payment method selection**

```tsx
// Example form component usage
import { FormProvider } from "tokenPayLib/components/Forms";

<FormProvider>
  <AddressInput />
  <AmountInput />
  <TokenSelector />
</FormProvider>
```

## Modal Components

Modal components for various user interactions:

- **Transaction confirmation modals**
- **Error display modals**
- **Help and information modals**
- **Wallet connection modals**

```tsx
import { ErrorModal } from "tokenPayLib/components/Modals";

<ErrorModal 
  isOpen={showError}
  error={errorDetails}
  onClose={() => setShowError(false)}
/>
```

## Transaction Components

Components specifically designed for transaction flows:

- **Transaction status displays**
- **Gas fee estimation**
- **Transaction history**
- **Confirmation screens**

```tsx
import { TransactionStatus } from "tokenPayLib/components/transaction";

<TransactionStatus 
  txHash="0x..."
  status="pending"
  onConfirmation={handleConfirmation}
/>
```

## Wallet Components

Components for wallet interaction and management:

- **Wallet connection buttons**
- **Balance displays**
- **Network switching**
- **Account management**

```tsx
import { WalletConnector } from "tokenPayLib/components/wallet";

<WalletConnector 
  onConnect={handleWalletConnect}
  supportedWallets={["metamask", "walletconnect"]}
/>
```

## Cross-border Components

Components for international payment flows:

- **Country selection**
- **Currency conversion**
- **Compliance checks**
- **Payment method selection**

```tsx
import { CountrySelector } from "tokenPayLib/components/crossborder";

<CountrySelector 
  onSelect={handleCountrySelect}
  supportedCountries={supportedCountries}
/>
```

## Module Components

Reusable module components that can be composed together:

- **Payment modules**
- **KYC modules**
- **Exchange modules**
- **Reporting modules**

## Error Boundary

Error boundary component for graceful error handling:

```tsx
import { ErrorBoundary } from "tokenPayLib/components/ErrorBoundary";

<ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponents />
</ErrorBoundary>
```

## Usage Examples

### Complete Payment Form

```tsx
import React, { useState } from "react";
import { UhuConfigProvider } from "tokenPayLib/components/contexts/UhuConfigContext";
import AddressDisplay from "tokenPayLib/components/UI/AddressDisplay";
import LoadingButton from "tokenPayLib/components/UI/LoadingButton";
import WalletQRCode from "tokenPayLib/components/UI/WalletQRCode";

function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState<"normal" | "processing">("normal");
  const [recipientAddress, setRecipientAddress] = useState("");

  const handleSubmit = async () => {
    setIsProcessing("processing");
    try {
      // Process payment
      await processPayment();
      setIsProcessing("success");
    } catch (error) {
      setIsProcessing("error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Send Payment</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Your Address
        </label>
        <WalletQRCode />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Recipient Address
        </label>
        <AddressDisplay 
          value={recipientAddress || "No address selected"}
          concat={recipientAddress.length > 0}
        />
      </div>

      <LoadingButton
        isLoading={isProcessing}
        onClick={handleSubmit}
        fullWidth={true}
        showSuccessColor={true}
      >
        Send Payment
      </LoadingButton>
    </div>
  );
}

// Wrap with providers
export default function App() {
  return (
    <UhuConfigProvider>
      <PaymentForm />
    </UhuConfigProvider>
  );
}
```

### Error Handling Pattern

```tsx
import React from "react";
import { ErrorBoundary } from "tokenPayLib/components/ErrorBoundary";
import LoadingButton from "tokenPayLib/components/UI/LoadingButton";

function RiskyComponent() {
  const [buttonState, setButtonState] = useState<LoadingButtonStates>("normal");
  const [error, setError] = useState<LoadingButtonError | undefined>();

  const handleRiskyOperation = async () => {
    setButtonState("processing");
    try {
      await riskyOperation();
      setButtonState("success");
    } catch (err) {
      setError({
        title: "Operation Failed",
        message: "Please try again",
        error: err as ErrorDetails
      });
      setButtonState("error");
    }
  };

  return (
    <LoadingButton
      isLoading={buttonState}
      onClick={handleRiskyOperation}
      error={error}
    >
      Risky Operation
    </LoadingButton>
  );
}

export default function SafeApp() {
  return (
    <ErrorBoundary>
      <RiskyComponent />
    </ErrorBoundary>
  );
}
```

## Related Modules

- [Hooks](./hooks.md) - React hooks that work with these components
  - [useSendCryptoForm](./hooks.md#usesendcryptoform) - Form validation for crypto transfers
- [Types](./types.md) - TypeScript types used by components
  - [SimpleToken](./types.md#simpletoken) - Token type for UI components
  - [ErrorMessage](./types.md#errormessage) - Error handling in components
- [Utilities](./utilities.md) - Utility functions for component logic
  - [truncate](./utilities.md#truncate) - Used by AddressDisplay component
  - [TokenPayAbstraction](./utilities.md#tokenpayabstraction) - Crypto operations
- [Assets](./assets.md) - Icons and assets used in components
  - [CryptoIcon](./assets.md#crypto-icons) - Token and chain icons
  - [Contract ABIs](./assets.md#contract-abis) - Smart contract interfaces