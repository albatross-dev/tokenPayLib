## SendCrypto

- **Path**: `src/tokenPayLib/components/wallet/SendCrypto.tsx`
- **Category**: wallet
- **Summary**: Wallet-related components (send, dialog, balance overview).

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import SendCrypto from 'src/tokenPayLib/components/wallet/SendCrypto';

export default function Example() {
  return (
    <div>
      <SendCrypto />
    </div>
  );
}

```

### Dependencies
- External: `@/tokenPayLib/types/payload-types`, `@/tokenPayLib/types/token.types`, `react`, `next-i18next`, `thirdweb`, `thirdweb/chains`, `thirdweb/react`
- Internal: `../../../context/UserContext`, `../../hooks/useSendCryptoForm`, `../../types/derivedPayload.types`, `../../utilities/crypto/currencies`, `../../utilities/crypto/fetchBalance`, `../../utilities/crypto/TokenPayAbstraction`, `../../utilities/math/numberWithZeros`, `../UI/LoadingButton`, `../UI/SimpleList`, `./sendCryptoColumns`, `./SendCryptoDialog`

### Related
Other components in `wallet`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/wallet/SendCrypto.tsx`
