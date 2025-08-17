## CurrencySelector

- **Path**: `src/tokenPayLib/components/crossborder/CurrencySelector.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import CurrencySelector from 'src/tokenPayLib/components/crossborder/CurrencySelector';

export default function Example() {
  return (
    <div>
      <CurrencySelector />
    </div>
  );
}

```

### Dependencies
- External: `react`, `next/image`, `thirdweb`, `thirdweb/chains`, `thirdweb/react`, `next-i18next`, `react-icons/hi2`
- Internal: `./ConverterPopup`, `../../utilities/stableCoinsMaps`, `../Modals/UniversalModal`, `../contexts/UhuConfigContext`, `../../utilities/crypto/currencies`, `../UI/MiniLoader`, `../../types/token.types`, `../../utilities/math/numberWithZeros`, `../Modules/TokenSwapSection`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/CurrencySelector.tsx`
