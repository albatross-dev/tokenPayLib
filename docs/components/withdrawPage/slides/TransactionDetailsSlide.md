## TransactionDetailsSlide

- **Path**: `src/tokenPayLib/components/withdrawPage/slides/TransactionDetailsSlide.tsx`
- **Category**: withdrawPage
- **Summary**: Withdraw page container and slide components.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import TransactionDetailsSlide from 'src/tokenPayLib/components/withdrawPage/slides/TransactionDetailsSlide';

export default function Example() {
  return (
    <div>
      <TransactionDetailsSlide />
    </div>
  );
}

```

### Dependencies
- External: `react`, `next-i18next`, `react-icons/fi`, `next/image`
- Internal: `../types`, `../../../utilities/stableCoinsMaps`, `../../crossborder/CurrencySelector`, `../../crossborder/transfer/components/MethodSelector`, `../../../types/payload-types`, `../../../types/derivedPayload.types`

### Related
Other components in `withdrawPage`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/withdrawPage/slides/TransactionDetailsSlide.tsx`
