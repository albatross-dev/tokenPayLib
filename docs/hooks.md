# Hooks

- [Overview](#overview)
- [useSendCryptoForm](#usesendcryptoform)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

## Overview

The hooks folder contains custom React hooks that provide reusable stateful logic for common operations in the tokenPayLib. These hooks encapsulate complex state management and validation logic to make it easy to build robust payment interfaces.

## useSendCryptoForm

A comprehensive form validation hook for cryptocurrency sending operations.

### Import

```typescript
import { useSendCryptoForm } from "tokenPayLib/hooks/useSendCryptoForm";
```

### Interface

```typescript
interface UseSendCryptoFormProps {
  tAccount: TFunction; // i18next translation function
}

interface UseSendCryptoFormReturn {
  errors: Errors;
  validate: (
    selectedToken: SimpleToken | null,
    amount: string | number,
    targetAddress: string,
    maxAmount?: number
  ) => boolean;
  setFieldError: (field: string, error: string) => void;
  clearFieldError: (field: string) => void;
}

interface Errors {
  selectedToken?: string;
  amount?: string;
  targetAddress?: string;
  [key: string]: string | undefined;
}
```

### Usage

```typescript
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { useSendCryptoForm } from "tokenPayLib/hooks/useSendCryptoForm";
import { SimpleToken } from "tokenPayLib/types/token.types";

function SendCryptoForm() {
  const { t } = useTranslation("account");
  const [selectedToken, setSelectedToken] = useState<SimpleToken | null>(null);
  const [amount, setAmount] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const [maxAmount, setMaxAmount] = useState<number | undefined>();

  const {
    errors,
    validate,
    setFieldError,
    clearFieldError
  } = useSendCryptoForm({ tAccount: t });

  const handleSubmit = () => {
    const isValid = validate(selectedToken, amount, targetAddress, maxAmount);
    
    if (isValid) {
      // Proceed with transaction
      console.log("Form is valid, sending transaction...");
    } else {
      console.log("Form has errors:", errors);
    }
  };

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    // Clear error when user starts typing
    if (errors.amount) {
      clearFieldError("amount");
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div>
        <label>Token</label>
        <TokenSelector 
          value={selectedToken}
          onChange={setSelectedToken}
          error={errors.selectedToken}
        />
      </div>

      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          className={errors.amount ? "error" : ""}
        />
        {errors.amount && <span className="error">{errors.amount}</span>}
      </div>

      <div>
        <label>Recipient Address</label>
        <input
          type="text"
          value={targetAddress}
          onChange={(e) => setTargetAddress(e.target.value)}
          className={errors.targetAddress ? "error" : ""}
        />
        {errors.targetAddress && <span className="error">{errors.targetAddress}</span>}
      </div>

      <button type="submit">Send Crypto</button>
    </form>
  );
}
```

### Validation Rules

The hook validates the following:

1. **Token Selection**: Ensures a token is selected
2. **Amount**: 
   - Must be provided
   - Must be greater than 0
   - Must not exceed maximum amount (if provided)
3. **Target Address**: 
   - Must be provided
   - Must be a valid Ethereum address format

### Error Handling

```typescript
// Set custom field errors
setFieldError("amount", "Custom amount error message");

// Clear specific field errors
clearFieldError("amount");

// Check if form has any errors
const hasErrors = Object.keys(errors).length > 0;

// Get specific error
const amountError = errors.amount;
```

### Advanced Usage

```typescript
function AdvancedSendForm() {
  const { t } = useTranslation("account");
  const { errors, validate, setFieldError, clearFieldError } = useSendCryptoForm({ tAccount: t });
  
  const [formData, setFormData] = useState({
    selectedToken: null,
    amount: "",
    targetAddress: "",
    gasPrice: "",
    memo: ""
  });

  // Custom validation for additional fields
  const validateAdvanced = () => {
    const basicValid = validate(
      formData.selectedToken,
      formData.amount,
      formData.targetAddress,
      maxAmount
    );

    // Add custom validations
    if (formData.gasPrice && Number(formData.gasPrice) < 1) {
      setFieldError("gasPrice", "Gas price too low");
      return false;
    }

    if (formData.memo && formData.memo.length > 100) {
      setFieldError("memo", "Memo too long");
      return false;
    }

    return basicValid;
  };

  return (
    <form>
      {/* Standard fields validated by hook */}
      <TokenInput 
        value={formData.selectedToken}
        onChange={(token) => setFormData(prev => ({ ...prev, selectedToken: token }))}
        error={errors.selectedToken}
      />
      
      <AmountInput
        value={formData.amount}
        onChange={(amount) => setFormData(prev => ({ ...prev, amount }))}
        error={errors.amount}
      />
      
      <AddressInput
        value={formData.targetAddress}
        onChange={(address) => setFormData(prev => ({ ...prev, targetAddress: address }))}
        error={errors.targetAddress}
      />

      {/* Additional fields with custom validation */}
      <GasPriceInput
        value={formData.gasPrice}
        onChange={(gasPrice) => {
          setFormData(prev => ({ ...prev, gasPrice }));
          clearFieldError("gasPrice");
        }}
        error={errors.gasPrice}
      />
      
      <MemoInput
        value={formData.memo}
        onChange={(memo) => {
          setFormData(prev => ({ ...prev, memo }));
          clearFieldError("memo");
        }}
        error={errors.memo}
      />

      <button onClick={validateAdvanced}>Send Transaction</button>
    </form>
  );
}
```

## Usage Examples

### Integration with UI Components

```typescript
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { useSendCryptoForm } from "tokenPayLib/hooks/useSendCryptoForm";
import LoadingButton from "tokenPayLib/components/UI/LoadingButton";
import AddressDisplay from "tokenPayLib/components/UI/AddressDisplay";

function IntegratedSendForm() {
  const { t } = useTranslation("account");
  const [isSubmitting, setIsSubmitting] = useState<"normal" | "processing" | "success" | "error">("normal");
  const [selectedToken, setSelectedToken] = useState(null);
  const [amount, setAmount] = useState("");
  const [targetAddress, setTargetAddress] = useState("");

  const { errors, validate } = useSendCryptoForm({ tAccount: t });

  const handleSubmit = async () => {
    const isValid = validate(selectedToken, amount, targetAddress);
    
    if (!isValid) {
      return;
    }

    setIsSubmitting("processing");
    
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting("success");
    } catch (error) {
      setIsSubmitting("error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold">Send Cryptocurrency</h2>
      
      {/* Token Selection */}
      <div>
        <label className="block text-sm font-medium mb-1">Token</label>
        <select 
          value={selectedToken?.id || ""}
          onChange={(e) => setSelectedToken(tokens.find(t => t.id === e.target.value))}
          className={`w-full p-2 border rounded ${errors.selectedToken ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select a token</option>
          {tokens.map(token => (
            <option key={token.id} value={token.id}>{token.name}</option>
          ))}
        </select>
        {errors.selectedToken && (
          <p className="text-red-500 text-sm mt-1">{errors.selectedToken}</p>
        )}
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full p-2 border rounded ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="0.00"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
        )}
      </div>

      {/* Address Input */}
      <div>
        <label className="block text-sm font-medium mb-1">Recipient Address</label>
        <input
          type="text"
          value={targetAddress}
          onChange={(e) => setTargetAddress(e.target.value)}
          className={`w-full p-2 border rounded ${errors.targetAddress ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="0x..."
        />
        {errors.targetAddress && (
          <p className="text-red-500 text-sm mt-1">{errors.targetAddress}</p>
        )}
        {targetAddress && !errors.targetAddress && (
          <div className="mt-2">
            <AddressDisplay value={targetAddress} />
          </div>
        )}
      </div>

      <LoadingButton
        isLoading={isSubmitting}
        onClick={handleSubmit}
        fullWidth={true}
        showSuccessColor={true}
      >
        Send Transaction
      </LoadingButton>
    </div>
  );
}
```

### Real-time Validation

```typescript
import React, { useState, useEffect } from "react";
import { useSendCryptoForm } from "tokenPayLib/hooks/useSendCryptoForm";

function RealTimeValidationForm() {
  const { t } = useTranslation("account");
  const { errors, validate, clearFieldError } = useSendCryptoForm({ tAccount: t });
  
  const [formData, setFormData] = useState({
    selectedToken: null,
    amount: "",
    targetAddress: ""
  });

  // Real-time validation on field changes
  useEffect(() => {
    if (formData.selectedToken || formData.amount || formData.targetAddress) {
      validate(formData.selectedToken, formData.amount, formData.targetAddress);
    }
  }, [formData, validate]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts editing
    if (errors[field]) {
      clearFieldError(field);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
                     formData.selectedToken && 
                     formData.amount && 
                     formData.targetAddress;

  return (
    <form className="space-y-4">
      <div>
        <TokenSelector
          value={formData.selectedToken}
          onChange={(token) => updateField("selectedToken", token)}
          error={errors.selectedToken}
          showValidation={true}
        />
      </div>
      
      <div>
        <AmountInput
          value={formData.amount}
          onChange={(amount) => updateField("amount", amount)}
          error={errors.amount}
          showValidation={true}
        />
      </div>
      
      <div>
        <AddressInput
          value={formData.targetAddress}
          onChange={(address) => updateField("targetAddress", address)}
          error={errors.targetAddress}
          showValidation={true}
        />
      </div>

      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isFormValid ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className={`text-sm ${isFormValid ? 'text-green-600' : 'text-red-600'}`}>
          {isFormValid ? 'Form is valid' : 'Please fix errors above'}
        </span>
      </div>
    </form>
  );
}
```

## Best Practices

### 1. Translation Setup

Ensure your application has proper i18next setup with translation keys for form errors:

```json
// locales/en/account.json
{
  "sendCrypto": {
    "errors": {
      "selectToken": "Please select a token",
      "enterAmount": "Please enter an amount",
      "insufficientBalance": "Insufficient balance",
      "invalidAddress": "Invalid address format"
    }
  }
}
```

### 2. Error Handling

Always handle errors gracefully and provide clear feedback:

```typescript
const { errors, validate, setFieldError } = useSendCryptoForm({ tAccount: t });

// Custom error handling
const handleCustomValidation = async () => {
  try {
    const result = await externalValidation();
    if (!result.valid) {
      setFieldError("amount", result.errorMessage);
    }
  } catch (error) {
    setFieldError("general", "Validation service unavailable");
  }
};
```

### 3. Performance Optimization

Use debouncing for real-time validation to avoid excessive validation calls:

```typescript
import { useMemo, useCallback } from "react";
import { debounce } from "lodash";

function OptimizedForm() {
  const { validate } = useSendCryptoForm({ tAccount: t });
  
  const debouncedValidate = useMemo(
    () => debounce(validate, 300),
    [validate]
  );

  const handleFieldChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    debouncedValidate(formData.selectedToken, formData.amount, formData.targetAddress);
  }, [debouncedValidate, formData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedValidate.cancel();
    };
  }, [debouncedValidate]);
}
```

### 4. Testing

Test your forms with the hook thoroughly:

```typescript
// Example test setup
import { renderHook, act } from "@testing-library/react";
import { useSendCryptoForm } from "tokenPayLib/hooks/useSendCryptoForm";

describe("useSendCryptoForm", () => {
  const mockT = (key: string) => key;

  it("should validate required fields", () => {
    const { result } = renderHook(() => useSendCryptoForm({ tAccount: mockT }));

    act(() => {
      const isValid = result.current.validate(null, "", "");
    });

    expect(result.current.errors.selectedToken).toBeTruthy();
    expect(result.current.errors.amount).toBeTruthy();
    expect(result.current.errors.targetAddress).toBeTruthy();
  });
});
```

## Related Modules

- [Components](./components.md) - UI components that work with these hooks
- [Types](./types.md) - TypeScript types used by hooks
- [Utilities](./utilities.md) - Utility functions used in hook logic