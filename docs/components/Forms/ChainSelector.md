## ChainSelector

- **Path**: `src/tokenPayLib/components/Forms/ChainSelector.tsx`
- **Category**: Forms
- **Summary**: Form inputs, field renderers, and related helpers.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import ChainSelector from 'src/tokenPayLib/components/Forms/ChainSelector';

export default function Example() {
  return (
    <div>
      <ChainSelector />
    </div>
  );
}

```

### Dependencies
- External: `@headlessui/react`, `next-i18next`, `next/image`, `react`, `react-icons/bi`, `thirdweb/chains`, `thirdweb/react`, `@/tokenPayLib/assets/chain-icons/arb-logo.svg`, `@/tokenPayLib/assets/chain-icons/base-logo.svg`, `@/tokenPayLib/assets/chain-icons/eth-logo.svg`, `@/tokenPayLib/assets/chain-icons/op-logo.svg`, `@/tokenPayLib/assets/chain-icons/polygon-matic-logo.svg`
- Internal: `../../types/payload-types`, `../../utilities/crypto/chains`, `../../utilities/exchangeTypes`, `../Modals/ErrorPrompt`, `./types`

### Related
Other components in `Forms`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/Forms/ChainSelector.tsx`
