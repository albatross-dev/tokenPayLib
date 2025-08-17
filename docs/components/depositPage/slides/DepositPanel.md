## DepositPanel

- **Path**: `src/tokenPayLib/components/depositPage/slides/DepositPanel.tsx`
- **Category**: depositPage
- **Summary**: Deposit page container and slide components.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import DepositPanel from 'src/tokenPayLib/components/depositPage/slides/DepositPanel';

export default function Example() {
  return (
    <div>
      <DepositPanel />
    </div>
  );
}

```

### Dependencies
- External: `thirdweb/wallets`
- Internal: `../../../types/payload-types`, `../../crossborder/partner/deposit/BitcoinVN/BitcoinVN`, `../../crossborder/partner/deposit/Helpdesks/HelpDesk`, `../../crossborder/partner/deposit/Koywe/Koywe`, `../../crossborder/partner/deposit/OnRamp`, `../../crossborder/partner/deposit/Stasis/Stasis`, `../../crossborder/partner/deposit/Swypt/Swypt`, `../../crossborder/partner/deposit/Unlimit`, `../DepositError`, `./DepositMethodSelector`

### Related
Other components in `depositPage`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/depositPage/slides/DepositPanel.tsx`
