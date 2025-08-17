## crossborder helpers

duplicateByPaymentModality(paymentPartners, key): any[]
- Normalizes a partner list so that modalities in partner[key] yield separate entries.

filterCountryData(originCountryISO, countries): Country[]
- Filters destination countries and their paymentTypes using whitelist/blacklist semantics.
- Removes withdrawOnly methods; respects useWhiteListPaymentMethod vs blackList.

sortMethodByCurrencyWithdraw(methods, transfer): Record<string, PaymentTypesArray>
- Categorizes methods by acceptedCrypto (splitting comma lists) and filters out noWithdraw or withdrawOnly based on transfer.

sortMethodByCurrencyDeposit(methods): Record<string, PaymentTypesArray>
- Categorizes by acceptedCrypto; only includes supportDeposit == true; normalizes acceptedCrypto per entry.
