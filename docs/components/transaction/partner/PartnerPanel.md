## PartnerPanel

- **Path**: `src/tokenPayLib/components/transaction/partner/PartnerPanel.tsx`
- **Category**: transaction
- **Summary**: Transaction details views and partner-specific panels.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import PartnerPanel from 'src/tokenPayLib/components/transaction/partner/PartnerPanel';

export default function Example() {
  return (
    <div>
      <PartnerPanel />
    </div>
  );
}

```

### Dependencies
- External: `next-i18next`
- Internal: `../../../types/payload-types`, `./koywe/KoyweDepositPanel`, `./koywe/KoyweWithdrawPanel`, `./stasis/StasisDepositPanel`, `./helpDesk/deposit/HelpDeskDepositPanel`

### Related
Other components in `transaction`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/transaction/partner/PartnerPanel.tsx`
