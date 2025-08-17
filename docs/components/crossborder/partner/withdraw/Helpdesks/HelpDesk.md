## HelpDesk

- **Path**: `src/tokenPayLib/components/crossborder/partner/withdraw/Helpdesks/HelpDesk.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import HelpDesk from 'src/tokenPayLib/components/crossborder/partner/withdraw/Helpdesks/HelpDesk';

export default function Example() {
  return (
    <div>
      <HelpDesk />
    </div>
  );
}

```

### Dependencies
- External: `react`, `@/utilities/thirdweb-client`, `thirdweb/chains`, `next-i18next`
- Internal: `./StateViews/Transaction/TransactionNone`, `./StateViews/Transaction/TransactionStarted`, `./StateViews/Transaction/TransactionPending`, `./StateViews/Transaction/TransactionDone`, `./StateViews/HelpDesk/HelpDeskVerificationForm`, `./StateViews/HelpDesk/HelpDeskRequestForm`, `./StateViews/HelpDesk/VerificationInProgress`, `./StateViews/HelpDesk/LoadingHelpDesk`, `./StateViews/HelpDesk/VerificationRequestError`, `./StateViews/Transaction/TransactionManuel`, `./StateViews/Transaction/TransactionPaymentPending`, `./types`, `../../../../../../context/UserContext`, `../../../../../utilities/forms/preprocessData`, `../../../../../utilities/crypto/currencies`, `../../../../../utilities/forms/getFormData`, `../../../../../types/payload-types`, `../../../../../types/errorMessage.types`, `../../../../UI/LoadingButton`, `../../../../../utilities/crypto/TokenPayAbstraction`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/partner/withdraw/Helpdesks/HelpDesk.tsx`
