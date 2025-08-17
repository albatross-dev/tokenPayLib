## DepositDetailsSlide

- **Path**: `src/tokenPayLib/components/depositPage/slides/DepositDetailsSlide.tsx`
- **Category**: depositPage
- **Summary**: Deposit page container and slide components.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import DepositDetailsSlide from 'src/tokenPayLib/components/depositPage/slides/DepositDetailsSlide';

export default function Example() {
  return (
    <div>
      <DepositDetailsSlide />
    </div>
  );
}

```

### Dependencies
- External: `react`, `next-i18next`, `react-icons/fi`
- Internal: `../../../utilities/stableCoinsMaps`, `../../../types/payload-types`, `./DepositMethodSelector`, `../../../types/derivedPayload.types`

### Related
Other components in `depositPage`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/depositPage/slides/DepositDetailsSlide.tsx`
