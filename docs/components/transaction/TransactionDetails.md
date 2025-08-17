## TransactionDetails

- **Path**: `src/tokenPayLib/components/transaction/TransactionDetails.tsx`
- **Category**: transaction
- **Summary**: Transaction details views and partner-specific panels.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import TransactionDetails from 'src/tokenPayLib/components/transaction/TransactionDetails';

export default function Example() {
  return (
    <div>
      <TransactionDetails />
    </div>
  );
}

```

### Dependencies
- External: `react`, `react-icons/bs`, `next/link`, `next-i18next`, `@tanstack/react-query`, `@/tokenPayLib/utilities/stableCoinsMaps`
- Internal: `./partner/PartnerPanel`, `../../../context/UserContext`, `../../types/payload-types`

### Related
Other components in `transaction`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/transaction/TransactionDetails.tsx`
