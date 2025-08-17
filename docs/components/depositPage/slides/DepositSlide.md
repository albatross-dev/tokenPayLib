## DepositSlide

- **Path**: `src/tokenPayLib/components/depositPage/slides/DepositSlide.tsx`
- **Category**: depositPage
- **Summary**: Deposit page container and slide components.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import DepositSlide from 'src/tokenPayLib/components/depositPage/slides/DepositSlide';

export default function Example() {
  return (
    <div>
      <DepositSlide />
    </div>
  );
}

```

### Dependencies
- External: `react`, `react-icons/fi`, `thirdweb/wallets`
- Internal: `../../../types/payload-types`, `../../UI/Loader`, `./DepositPanel`, `./DepositMethodSelector`

### Related
Other components in `depositPage`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/depositPage/slides/DepositSlide.tsx`
