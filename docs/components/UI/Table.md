## Table

- **Path**: `src/tokenPayLib/components/UI/Table.tsx`
- **Category**: UI
- **Summary**: Shared UI elements (tables, loaders, tooltips, banners, etc.).

### Purpose
Describe what this component does in the product flow and when to use it.

### Props
Document props and types here. If props are inferred from TypeScript, see the source file.

### Usage
Basic import and render example:


```tsx
import Table from 'src/tokenPayLib/components/UI/Table';

export default function Example() {
  return (
    <div>
      <Table />
    </div>
  );
}

```

### Dependencies
- External: `react`, `qs`, `@tanstack/react-query`, `@tanstack/react-table`, `moment`, `next-i18next`
- Internal: `../../../context/UserContext`, `../../types/derivedPayload.types`, `./SimpleList`, `./Loader`

### Related
Other components in `UI`

### Notes
- Edge cases, loading/empty states, accessibility, i18n keys, etc.

### Source
See `src/tokenPayLib/components/UI/Table.tsx`
