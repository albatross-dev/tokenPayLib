## misc

delay(ms): Promise<void>
- Promise-based sleep.

retry(fn, retries=3, delayMs=1000): Promise<T>
- Retries async function with delay; logs warnings; rethrows last error.
