import { ALL_COUNTRIES_N } from "../utilities/CountriesConfig";
import { Country, FiatTransaction, PaymentTypesArray } from "./payload-types";

export type FiatTransactionRequest = Omit<FiatTransaction, 'id' | 'createdAt' | 'updatedAt'>;
export type FiatCodes = PaymentTypesArray[number]["currencies"][number]["currency"]
export type CountryCodesSupported = Country["countryCode"]