## partner utils

bitcoinvn.ts
- getQuote({ depositMethod, depositAmount?, settleMethod, settleAmount? }): Promise<object | null>
  - POST api/fiatTransaction/bitcoinVN/v2/quote
  - On error, logs detailed Axios error and reports via sendErrorReport.
- getMetaData({ depositMethod, settleMethod }): Promise<object | null>
  - POST /api/fiatTransaction/bitcoinVN/v2/meta

stasis/fetchBankAccounts.ts
- default export fetchBankAccounts({ setBankAccounts, user })
  - GET /api/fiatTransaction/stasis/getBankAccounts
  - Requires user.stasisClientUUID; sets state via setBankAccounts; throws on error after reporting.
