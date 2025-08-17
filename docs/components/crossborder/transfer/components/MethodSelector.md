## MethodSelector

- **Path**: `src/tokenPayLib/components/crossborder/transfer/components/MethodSelector.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import MethodSelector from 'src/tokenPayLib/components/crossborder/transfer/components/MethodSelector';

export default function Example() {
  return (
    <div>
      <MethodSelector />
    </div>
  );
}

```

### Dependencies
- External: `next-i18next`, `react`, `react-icons/io5`
- Internal: `../../../../types/payload-types`, `../../../../utilities/stableCoinsMaps`, `../../../UI/MiniLoader`, `../../partner/universal/bitcoinVNUtils`, `../../partner/universal/koyweUtils`, `../../partner/universal/swyptUtils`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/transfer/components/MethodSelector.tsx`
