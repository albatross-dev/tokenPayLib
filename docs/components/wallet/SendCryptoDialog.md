## SendCryptoDialog

- **Path**: `src/tokenPayLib/components/wallet/SendCryptoDialog.tsx`
- **Category**: wallet
- **Summary**: Wallet-related components (send, dialog, balance overview).

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import SendCryptoDialog from 'src/tokenPayLib/components/wallet/SendCryptoDialog';

export default function Example() {
  return (
    <div>
      <SendCryptoDialog />
    </div>
  );
}

```

### Dependencies
- External: `react`, `@headlessui/react`, `react-icons/io5`, `@/tokenPayLib/types/token.types`, `i18next`, `@/tokenPayLib/hooks/useSendCryptoForm`
- Internal: `../UI/Loader`, `../Forms/TokenSelector`, `../../utilities/crypto/currencies`, `../UI/LoadingButton`

### Related
Other components in `wallet`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/wallet/SendCryptoDialog.tsx`
