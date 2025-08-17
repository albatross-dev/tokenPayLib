## DepositPage

- **Path**: `src/tokenPayLib/components/depositPage/DepositPage.tsx`
- **Category**: depositPage
- **Summary**: Deposit page container and slide components.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import DepositPage from 'src/tokenPayLib/components/depositPage/DepositPage';

export default function Example() {
  return (
    <div>
      <DepositPage />
    </div>
  );
}

```

### Dependencies
- External: `next-i18next`, `react`, `swiper`, `swiper/react`, `thirdweb/react`
- Internal: `../../../context/UserContext`, `../../types/payload-types`, `../../utilities/crossborder/sortMethodByCurrency`, `../crossborder/BalanceOverview`, `../Modals/ErrorPopup`, `../UI/Banner`, `../UI/Loader`, `../UI/Maintenance`, `../../types/derivedPayload.types`, `./slides/CryptoSelectionSlide`, `./slides/DepositDetailsSlide`, `./slides/DepositMethodSelector`, `./slides/DepositSlide`, `./slides/FiatSelectionSlide`

### Related
Other components in `depositPage`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/depositPage/DepositPage.tsx`
