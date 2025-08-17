## CountriesConfig

Exports
- AllCountryCode: union of ISO codes used internally
- CRYPTOS: SimpleToken[] (currently [EUROE]) available to all
- CountryWithAvailability: Country + { available: Availability }
- Availability: { [TYPE_FIAT|TYPE_CRYPTO]: SimpleToken[] }
- ALL_COUNTRIES_N: Record<ISO, Country> with name, flag, restrictions
- ALL_COUNTRIES: Record<ISO, CountryWithAvailability> (adds availableToAll)
- countries: Record<originISO, Record<destISO, CountryWithAvailability>> (currently same mapping across ISO codes)
- TYPE_CRYPTO, TYPE_FIAT constants

Use cases
- Determine availability and restrictions per origin/destination country.
