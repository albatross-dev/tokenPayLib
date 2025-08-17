## BitcoinVN

- **Path**: `src/tokenPayLib/components/crossborder/partner/withdraw/BitcoinVN/BitcoinVN.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import BitcoinVN from 'src/tokenPayLib/components/crossborder/partner/withdraw/BitcoinVN/BitcoinVN';

export default function Example() {
  return (
    <div>
      <BitcoinVN />
    </div>
  );
}

```

### Dependencies
- External: `@/utilities/thirdweb-client`, `next-i18next`, `react`, `thirdweb/chains`, `thirdweb/react`
- Internal: `../../../../../utilities/crypto/currencies`, `./slides/Error`, `./slides/Loading`, `./slides/QuoteForm`, `./slides/Success`, `./slides/TransactionCreated`, `../../../../../../context/UserContext`, `../../../../../types/payload-types`, `../../../../../utilities/crypto/TokenPayAbstraction`, `../../../../UI/LoadingButton`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/partner/withdraw/BitcoinVN/BitcoinVN.tsx`
