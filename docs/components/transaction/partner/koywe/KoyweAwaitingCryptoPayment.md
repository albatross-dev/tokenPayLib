## KoyweAwaitingCryptoPayment

- **Path**: `src/tokenPayLib/components/transaction/partner/koywe/KoyweAwaitingCryptoPayment.tsx`
- **Category**: transaction
- **Summary**: Transaction details views and partner-specific panels.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import KoyweAwaitingCryptoPayment from 'src/tokenPayLib/components/transaction/partner/koywe/KoyweAwaitingCryptoPayment';

export default function Example() {
  return (
    <div>
      <KoyweAwaitingCryptoPayment />
    </div>
  );
}

```

### Dependencies
- External: `@/utilities/thirdweb-client`, `next-i18next`, `react`, `react-icons/bs`, `thirdweb/chains`, `thirdweb/react`
- Internal: `../../../../../context/UserContext`, `../../../../types/payload-types`, `../../../../utilities/crypto/currencies`, `../../../../utilities/crypto/TokenPayAbstraction`, `../../../UI/AddressDisplay`, `../../../UI/LoadingButton`

### Related
Other components in `transaction`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/transaction/partner/koywe/KoyweAwaitingCryptoPayment.tsx`
