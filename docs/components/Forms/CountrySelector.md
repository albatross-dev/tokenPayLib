## CountrySelector

- **Path**: `src/tokenPayLib/components/Forms/CountrySelector.tsx`
- **Category**: Forms
- **Summary**: Form inputs, field renderers, and related helpers.

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import CountrySelector from 'src/tokenPayLib/components/Forms/CountrySelector';

export default function Example() {
  return (
    <div>
      <CountrySelector />
    </div>
  );
}

```

### Dependencies
- External: `react`, `@headlessui/react`, `react-icons/bi`, `next-i18next`, `i18n-iso-countries`, `react-icons/bs`, `i18n-iso-countries`, `i18n-iso-countries/langs/en.json`, `i18n-iso-countries/langs/de.json`, `i18n-iso-countries/langs/fr.json`
- Internal: `../../utilities/CountriesConfig`

### Related
Other components in `Forms`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/Forms/CountrySelector.tsx`
