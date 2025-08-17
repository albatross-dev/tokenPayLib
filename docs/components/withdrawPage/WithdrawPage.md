## WithdrawPage

- **Path**: `src/tokenPayLib/components/withdrawPage/WithdrawPage.tsx`
- **Category**: withdrawPage
- **Summary**: Withdraw page container and slide components.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import WithdrawPage from 'src/tokenPayLib/components/withdrawPage/WithdrawPage';

export default function Example() {
  return (
    <div>
      <WithdrawPage />
    </div>
  );
}

```

### Dependencies
- External: `axios`, `next-i18next`, `react`, `swiper/react`, `thirdweb/react`
- Internal: `../../../context/UserContext`, `../../../utilities/currencies`, `../../types/derivedPayload.types`, `../../types/payload-types`, `../../types/token.types`, `../../utilities/stableCoinsMaps`, `../crossborder/BalanceOverview`, `../Modals/ErrorPopup`, `../UI/Banner`, `../UI/Loader`, `../UI/Maintenance`, `./slides/BalanceSelectionSlide`, `./slides/CurrencyConversionSlide`, `./slides/PartnerPanelSlide`, `./slides/TransactionDetailsSlide`, `./types`

### Related
Other components in `withdrawPage`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/withdrawPage/WithdrawPage.tsx`
