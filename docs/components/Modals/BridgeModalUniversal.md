## BridgeModalUniversal

- **Path**: `src/tokenPayLib/components/Modals/BridgeModalUniversal.tsx`
- **Category**: Modals
- **Summary**: Reusable modal components (exchange, bridge, universal, etc.).

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import BridgeModalUniversal from 'src/tokenPayLib/components/Modals/BridgeModalUniversal';

export default function Example() {
  return (
    <div>
      <BridgeModalUniversal />
    </div>
  );
}

```

### Dependencies
- External: `react`, `@headlessui/react`, `react-icons/fi`, `next-i18next`, `thirdweb/react`, `thirdweb`
- Internal: `../../utilities/math/numberWithZeros`, `../../../context/UserContext`, `../../utilities/crypto/bridgeUtils`, `../../types/token.types`, `../UI/Loader`, `../UI/MiniLoader`

### Related
Other components in `Modals`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/Modals/BridgeModalUniversal.tsx`
