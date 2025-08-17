## BalanceOverview

- **Path**: `src/tokenPayLib/components/wallet/BalanceOverview.tsx`
- **Category**: wallet
- **Summary**: Wallet-related components (send, dialog, balance overview).

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import BalanceOverview from 'src/tokenPayLib/components/wallet/BalanceOverview';

export default function Example() {
  return (
    <div>
      <BalanceOverview />
    </div>
  );
}

```

### Dependencies
- External: `next/image`, `react`, `next-i18next`, `next/link`, `thirdweb`, `thirdweb/chains`, `thirdweb/react`
- Internal: `../UI/MiniLoader`, `../../utilities/crypto/currencies`, `../../../utilities/currencies`, `../../../context/UserContext`, `../../utilities/crypto/fetchBalance`, `../../utilities/math/numberWithZeros`, `../contexts/UhuConfigContext`, `../crossborder/CurrencySelector`

### Related
Other components in `wallet`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/wallet/BalanceOverview.tsx`
