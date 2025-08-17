## BalanceOverview

- **Path**: `src/tokenPayLib/components/crossborder/BalanceOverview.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import BalanceOverview from 'src/tokenPayLib/components/crossborder/BalanceOverview';

export default function Example() {
  return (
    <div>
      <BalanceOverview />
    </div>
  );
}

```

### Dependencies
- External: `react`, `thirdweb`, `thirdweb/chains`, `thirdweb/react`, `next-i18next`, `react-icons/hi2`, `next/router`, `next/link`
- Internal: `../Modals/UniversalModal`, `../contexts/UhuConfigContext`, `../../utilities/math/numberWithZeros`, `../../utilities/crypto/currencies`, `./ConverterPopup`, `../../types/token.types`, `../../utilities/crypto/fetchBalance`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/BalanceOverview.tsx`
