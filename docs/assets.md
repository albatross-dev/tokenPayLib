## Assets

Located at `src/tokenPayLib/assets/`.

- `chain-icons/` — SVG logos for supported chains.
- `payment-icons/` — Token logos by chain (subdirectories per chain).
- `wallet-icons/` — Wallet brand icons.
- `CryptoIcon.tsx` — Component for rendering token/chain icons.
- `*.json` ABIs — Common contract ABIs used internally (e.g., `ERC20ABI.json`, `swapRouterAbi.json`, `customSwapRouterAbi.json`, `quoteV2Abi.json`, `swypt_abi.json`).

Usage tips:
- Prefer importing icons via `CryptoIcon.tsx` where possible for consistency.
- ABIs are intended for internal utilities; avoid importing directly unless extending functionality.


