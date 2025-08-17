## DepositMethodSelector

- **Path**: `src/tokenPayLib/components/depositPage/slides/DepositMethodSelector.tsx`
- **Category**: depositPage
- **Summary**: Deposit page container and slide components.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import DepositMethodSelector from 'src/tokenPayLib/components/depositPage/slides/DepositMethodSelector';

export default function Example() {
  return (
    <div>
      <DepositMethodSelector />
    </div>
  );
}

```

### Dependencies
- External: `next-i18next`, `react`, `react-icons/io5`
- Internal: `../../../../context/UserContext`, `../../../types/derivedPayload.types`, `../../../types/payload-types`, `../../../utilities/crossborder/duplicateByPaymentModality`, `../../../utilities/partner/bitcoinvn`, `../../../utilities/stableCoinsMaps`, `../../crossborder/partner/universal/koyweUtils`, `../../crossborder/partner/universal/swyptUtils`, `../../UI/MiniLoader`

### Related
Other components in `depositPage`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/depositPage/slides/DepositMethodSelector.tsx`
