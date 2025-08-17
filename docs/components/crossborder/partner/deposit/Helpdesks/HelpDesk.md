## HelpDesk

- **Path**: `src/tokenPayLib/components/crossborder/partner/deposit/Helpdesks/HelpDesk.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import HelpDesk from 'src/tokenPayLib/components/crossborder/partner/deposit/Helpdesks/HelpDesk';

export default function Example() {
  return (
    <div>
      <HelpDesk />
    </div>
  );
}

```

### Dependencies
- External: `@/context/UserContext`, `@/tokenPayLib/components/depositPage/slides/DepositMethodSelector`, `@/tokenPayLib/types/payload-types`, `@/tokenPayLib/utilities/crypto/currencies`, `next-i18next`, `next/router`, `react`
- Internal: `../../withdraw/Helpdesks/HelpDesk`, `../../withdraw/Helpdesks/StateViews/HelpDesk/HelpDeskVerificationForm`, `../../withdraw/Helpdesks/StateViews/HelpDesk/LoadingHelpDesk`, `../../withdraw/Helpdesks/StateViews/HelpDesk/VerificationInProgress`, `../../withdraw/Helpdesks/StateViews/HelpDesk/VerificationRequestError`, `../../withdraw/Helpdesks/types`, `./StateViews/HelpDeskDepositRequestForm`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/partner/deposit/Helpdesks/HelpDesk.tsx`
