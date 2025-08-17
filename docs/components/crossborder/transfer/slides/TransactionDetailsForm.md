## TransactionDetailsForm

- **Path**: `src/tokenPayLib/components/crossborder/transfer/slides/TransactionDetailsForm.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import TransactionDetailsForm from 'src/tokenPayLib/components/crossborder/transfer/slides/TransactionDetailsForm';

export default function Example() {
  return (
    <div>
      <TransactionDetailsForm />
    </div>
  );
}

```

### Dependencies
- External: `next-i18next`, `next/image`, `react`, `swiper/react`
- Internal: `../../../../types/derivedPayload.types`, `../../../../types/payload-types`, `../../../../utilities/stableCoinsMaps`, `../../CurrencySelector`, `../components/BackButton`, `../components/MethodSelector`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/transfer/slides/TransactionDetailsForm.tsx`
