## ConverterPopup

- **Path**: `src/tokenPayLib/components/crossborder/ConverterPopup.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import ConverterPopup from 'src/tokenPayLib/components/crossborder/ConverterPopup';

export default function Example() {
  return (
    <div>
      <ConverterPopup />
    </div>
  );
}

```

### Dependencies
- External: `@headlessui/react`, `react`, `next-i18next`, `react-icons/io5`, `react-icons/rx`, `thirdweb/react`, `react-icons/io`, `thirdweb`, `thirdweb/utils`, `@/utilities/thirdweb-client`
- Internal: `../../utilities/crypto/convertAnyToAny`, `../../assets/quoteV2Abi.json`, `../../types/token.types`, `../../utilities/crypto/currencies`, `../../utilities/crypto/fetchBalance`, `../../utilities/crypto/getPath`, `../../utilities/math/numberWithZeros`, `../../utilities/stableCoinsMaps`, `../contexts/UhuConfigContext`, `../UI/ConvertStateButton`, `../UI/Maintenance`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/ConverterPopup.tsx`
