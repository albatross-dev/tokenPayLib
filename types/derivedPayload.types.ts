import {
  Config,
  Country,
  FiatTransaction,
  PaymentTypesArray,
} from "./payload-types";

export type FiatTransactionRequest = Omit<
  FiatTransaction,
  "id" | "createdAt" | "updatedAt"
>;
export type FiatCodes = NonNullable<
  PaymentTypesArray[number]["currencies"]
>[number]["currency"];

export type CountryCodesSupported = Country["countryCode"];
export type Collection = keyof Config["collections"];
