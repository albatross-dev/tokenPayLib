## CryptoSelectionSlide

- **Path**: `src/tokenPayLib/components/depositPage/slides/CryptoSelectionSlide.tsx`
- **Category**: depositPage
- **Summary**: Deposit page container and slide components.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import CryptoSelectionSlide from 'src/tokenPayLib/components/depositPage/slides/CryptoSelectionSlide';

export default function Example() {
  return (
    <div>
      <CryptoSelectionSlide />
    </div>
  );
}

```

### Dependencies
- External: `react`, `next-i18next`, `next/image`, `next/router`
- Internal: `../../../utilities/crypto/currencies`, `../../../types/payload-types`, `../../../utilities/stableCoinsMaps`, `../../crossborder/transfer/components/BackButton`

### Related
Other components in `depositPage`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/depositPage/slides/CryptoSelectionSlide.tsx`
