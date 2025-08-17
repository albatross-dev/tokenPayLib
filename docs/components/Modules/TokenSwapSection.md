## TokenSwapSection

- **Path**: `src/tokenPayLib/components/Modules/TokenSwapSection.tsx`
- **Category**: Modules
- **Summary**: Feature-level modules (token swap, language switcher, export popover, etc.).

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import TokenSwapSection from 'src/tokenPayLib/components/Modules/TokenSwapSection';

export default function Example() {
  return (
    <div>
      <TokenSwapSection />
    </div>
  );
}

```

### Dependencies
- External: `react`, `next-i18next`, `@/tokenPayLib/utilities/misc/delay`, `thirdweb`, `thirdweb/react`, `thirdweb/utils`, `qs`, `react-icons/rx`, `@/utilities/thirdweb-client`
- Internal: `../Modals/ErrorPrompt`, `../Modals/ExchangeModal`, `../../utilities/crypto/fetchBalance`, `../../utilities/crypto/tokenByChain`, `../Forms/TokenSelector`, `../UI/ConvertStateButton`, `../../utilities/math/numberWithZeros`, `../../assets/quoteV2Abi.json`, `../../../context/UserContext`, `../../types/payload-types`, `../../types/token.types`, `../../utilities/crypto/convertAnyToAny`, `../../utilities/crypto/currencies`, `../../utilities/exchangeTypes`, `../Forms/ChainSelector`, `../Modals/UniversalModal`, `../UI/MiniLoader`

### Related
Other components in `Modules`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/Modules/TokenSwapSection.tsx`
