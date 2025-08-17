## How to install

run all the following commands in the root of your project.

the library will be at the following position:

```bash
project-root/
│
├── src/
│   └── tokenPayLib/  <-- the submodule will live here
└── other project files
```

to install the library, run the following command:

```bash
git submodule add https://github.com/albatross-dev/tokenPayLib.git src/tokenPayLib
```

Commit the Submodule Configuration

```bash
git add .gitmodules src/tokenPayLib
git commit -m "Add tokenPayLib as a submodule in src/"
```

Push Changes to the Project Repository

```bash
git push origin main // or beta
```


## Required Packages

To use `tokenPayLib`, your project must install the following peer dependencies (based on actual imports across the library):

- thirdweb (v4+)
- @tanstack/react-query (v4+)
- react (v18+) and next (13+)
- next-i18next and i18next
- axios
- qs
- swiper (and include its CSS)
- moment
- react-icons
- ethers (v5 or v6)
- clsx
- @headlessui/react

Install packages (example):

```bash
npm i thirdweb @tanstack/react-query axios qs swiper moment react-icons ethers clsx @headlessui/react next-i18next i18next
```

And ensure React/Next are present in your app (not included above).

### Environment variables

Define these in your environment (e.g., `.env.local`):

- `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
- `NEXT_PUBLIC_BACKEND_URL`
- `NEXT_PUBLIC_LOCAL_URL`
- `NEXT_PUBLIC_EXCHANGE_TYPE` → "internal" | "external"
- `NEXT_PUBLIC_GATEFI_PARTNER_ACCOUNT_ID` (Unlimit/GateFi)
- `NEXT_PUBLIC_ONRAMP_APP_ID` (Onramp.money)

### Host app requirements (imports expected from the host)

The library expects these modules from the host app:

- `@/utilities/thirdweb-client`
  - Default export: a thirdweb client instance created via `createThirdwebClient({ clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID })`.

- `@/pages/_app`
  - Named export: `queryClient` (a configured `QueryClient` from `@tanstack/react-query`).

- `context/UserContext` (imported from various relative levels and occasionally `@/context/UserContext`)
  - Expected named exports:
    - `api`: configured Axios instance using your `NEXT_PUBLIC_BACKEND_URL`
    - `sendErrorReport(error: unknown, context?: Record<string, any>): void`
    - `AuthContext`: React context with auth state
    - `useAuth`: hook to access auth state

- `@/assets/realusdcabi.json` and `@/assets/realusdtabi.json`
  - JSON ABIs used by currency helpers.

### Project aliases (tsconfig/jsconfig)

Configure the `@/*` alias to point to your `src/*` so host-level imports resolve correctly:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Styles

If you use any pages that import Swiper, include its CSS once in your app:

```ts
import "swiper/css";
```

# Documentation

root/
├── [assets](docs/assets.md) // icons for crypto chains and tokens, plus key contract ABIs
├── [components](docs/components/overview.md) // main UI components of the library
│ ├── [contexts](docs/components/contexts.md) // shared React contexts (e.g., UhuConfig)
│ │ └── UhuConfigContext.tsx // the context for the UhuConfig used across projects
│ ├── crossborder/ // cross-border transfer UI flows and partner integrations
│ ├── Modals/ // reusable modal components (exchange, bridge, universal, etc.)
│ ├── Modules/ // higher-level feature sections (language switcher, token swap, etc.)
│ ├── transaction/ // transaction details and partner-specific panels
│ ├── UI/ // shared UI elements (tables, loaders, tooltips, etc.)
│ ├── wallet/ // wallet-related components (send, balance overview)
│ └── withdrawPage/ // withdraw flow slides and types
├── [hooks](docs/hooks.md)
├── [types](docs/types.md)
└── [utilities](docs/utilities/overview.md)