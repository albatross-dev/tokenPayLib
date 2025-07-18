import { Country } from "../../types/payload-types";

/**
 * Filter the country data based on the origin country
 * and also the payment methods
 */
export default function filterCountryData(
  originCountryISO: string,
  countries: Country[]
): Country[] {
  // if no origin country is set, return no countries
  if (!originCountryISO) {
    return [];
  }

  // filter the countries by black and whitelist
  let newCountries = countries.filter((country) => {
    if (country.useWhiteList) {
      return country.receivingFromCountryWhiteList?.some(
        (whiteCountry) =>
          (whiteCountry as Country).countryCode === originCountryISO
      );
    } else {
      return !country.receivingFromCountryBlackList?.some(
        (blackCountry) =>
          (blackCountry as Country).countryCode === originCountryISO
      );
    }
  });

  // filter payment methods by black and whitelist
  newCountries = newCountries.map((country) => {
    country.paymentTypes = country.paymentTypes.filter((method) => {
      if (method.withdrawOnly) return false;
      if (method.useWhiteListPaymentMethod) {
        return method.whiteList?.some(
          (whiteCountry) =>
            (whiteCountry as Country).countryCode === originCountryISO
        );
      } else {
        return !method.blackList?.some(
          (blackCountry) =>
            (blackCountry as Country).countryCode === originCountryISO
        );
      }
    });
    return country;
  });

  // filter the countries by black and whitelist
  return newCountries;
}
