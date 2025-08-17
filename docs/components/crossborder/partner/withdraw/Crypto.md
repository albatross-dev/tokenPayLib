## Crypto

- **Path**: `src/tokenPayLib/components/crossborder/partner/withdraw/Crypto.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import Crypto from 'src/tokenPayLib/components/crossborder/partner/withdraw/Crypto';

export default function Example() {
  return (
    <div>
      <Crypto />
    </div>
  );
}

```

### Dependencies
- External: `react`, `thirdweb`, `thirdweb/chains`, `react-icons/io5`, `thirdweb/react`, `ethers/lib/utils`, `next/image`, `thirdweb/utils`, `next-i18next`, `thirdweb/wallets`, `@/tokenPayLib/components/Modules/TokenSwapSection`, `@/tokenPayLib/components/UI/LoadingButton`
- Internal: `../../../../../context/UserContext`, `../../../Forms/TokenSelector`, `../../../../utilities/crypto/currencies`, `../../../../utilities/crypto/getPath`, `../../../../assets/quoteV2Abi.json`, `../../../../utilities/crypto/convertAnyToAny`, `../../../../utilities/math/numberWithZeros`, `../../../UI/MiniLoader`, `../../../../types/token.types`, `../../../../types/derivedPayload.types`, `../../../../utilities/crypto/TokenPayAbstraction`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/partner/withdraw/Crypto.tsx`
