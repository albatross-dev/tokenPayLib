## Transfer

- **Path**: `src/tokenPayLib/components/crossborder/Transfer.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import Transfer from 'src/tokenPayLib/components/crossborder/Transfer';

export default function Example() {
  return (
    <div>
      <Transfer />
    </div>
  );
}

```

### Dependencies
- External: `react`, `moment`, `next-i18next`, `react-icons/bs`, `@tanstack/react-table`, `next/link`, `qs`, `@/tokenPayLib/utilities/stableCoinsMaps`
- Internal: `../../../context/UserContext`, `../Modules/ExportPopover`, `./TransactionModal`, `./TypePopover`, `../UI/AddressDisplay`, `../UI/SimpleList`, `../../types/payload-types`, `../../../context/UserContext`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/Transfer.tsx`
