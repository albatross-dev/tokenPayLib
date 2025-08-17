## Swypt

- **Path**: `src/tokenPayLib/components/crossborder/partner/withdraw/Swypt/Swypt.tsx`
- **Category**: crossborder
- **Summary**: Cross-border transfer flows, partner integrations, and slides.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import Swypt from 'src/tokenPayLib/components/crossborder/partner/withdraw/Swypt/Swypt';

export default function Example() {
  return (
    <div>
      <Swypt />
    </div>
  );
}

```

### Dependencies
- External: `react`, `thirdweb`, `thirdweb/chains`, `@/utilities/thirdweb-client`
- Internal: `../../universal/swyptUtils`, `../../../../../../context/UserContext`, `./types`, `./slides/InputSlide`, `./slides/LoadingSlide`, `./slides/SuccessSlide`, `./slides/ErrorSlide`, `../../../../../utilities/crypto/currencies`

### Related
Other components in `crossborder`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/crossborder/partner/withdraw/Swypt/Swypt.tsx`
