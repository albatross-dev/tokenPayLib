## BridgeModal

- **Path**: `src/tokenPayLib/components/Modals/BridgeModal.tsx`
- **Category**: Modals
- **Summary**: Reusable modal components (exchange, bridge, universal, etc.).

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import BridgeModal from 'src/tokenPayLib/components/Modals/BridgeModal';

export default function Example() {
  return (
    <div>
      <BridgeModal />
    </div>
  );
}

```

### Dependencies
- External: `react`, `@headlessui/react`, `react-icons/fi`, `next-i18next`, `thirdweb/react`, `thirdweb`
- Internal: `../../utilities/math/numberWithZeros`, `../../../context/UserContext`, `../../utilities/crypto/bridgeUtils`, `../../types/token.types`

### Related
Other components in `Modals`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/Modals/BridgeModal.tsx`
