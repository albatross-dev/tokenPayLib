## Hooks

### `useSendCryptoForm`
- Path: hooks/useSendCryptoForm.ts
- Purpose: Manages state and validation for the Send Crypto flow.
- Returns: Form state, handlers, and submission helpers.

Basic usage:
```ts
import { useSendCryptoForm } from 'src/tokenPayLib/hooks/useSendCryptoForm';

const form = useSendCryptoForm({ /* initial config */ });

// form.values, form.errors, form.handleChange, form.submit, ...
```


