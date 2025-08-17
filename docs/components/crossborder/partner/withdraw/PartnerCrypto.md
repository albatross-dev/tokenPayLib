## PartnerCrypto

- **Path**: `src/tokenPayLib/components/crossborder/partner/withdraw/PartnerCrypto.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import PartnerCrypto from 'src/tokenPayLib/components/crossborder/partner/withdraw/PartnerCrypto';

export default function Example() {
  return (
    <div>
      <PartnerCrypto />
    </div>
  );
}

```

### Dependencies
- External: `react`, `thirdweb`, `thirdweb/chains`, `thirdweb/react`, `@/tokenPayLib/assets/quoteV2Abi.json`, `react-icons/io`, `next-i18next`, `thirdweb/utils`
- Internal: `../../../../../context/UserContext`, `../../../../utilities/math/numberWithZeros`, `../../../../utilities/crypto/currencies`, `../../../../types/token.types`, `../../../../utilities/crypto/convertAnyToAny`, `../../../../utilities/crypto/getPath`, `../../../../utilities/crypto/TokenPayAbstraction`, `../../../../utilities/stableCoinsMaps`, `../../../../types/payload-types`, `../../../../types/derivedPayload.types`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/partner/withdraw/PartnerCrypto.tsx`
