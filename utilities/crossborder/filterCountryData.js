/**
 * Filter the country data based on the origin country
 * and also the payment methods
 * @param {*} originCountryISO 
 * @param {*} countries 
 * @returns 
 */
export default function filterCountryData(originCountryISO, countries) {

  // if no origin country is set, return no countries
  if (!originCountryISO) {
    return [];
  }

  // filter the countries by black and whitelist
  let newCountries = countries.filter((country) => {
    if (country.useWhiteList) {
      return country.receivingFromCountryWhiteList.some(
        (whiteCountry) => whiteCountry.countryCode === originCountryISO
      );
    } else {
      return !country.receivingFromCountryBlackList?.some(
        (blackCountry) => blackCountry.countryCode === originCountryISO
      );
    }
  });

  // filter payment methods by black and whitelist
  newCountries = newCountries.map((country) => {
    country.paymentTypes = country.paymentTypes.filter((method) => {
      if (method.withdrawOnly) return false;
      if (method.useWhiteListPaymentMethod) {
        return method.whiteList.some(
          (whiteCountry) => whiteCountry.countryCode === originCountryISO
        );
      } else {
        return !method.blackList?.some(
          (blackCountry) => blackCountry.countryCode === originCountryISO
        );
      }
    });
    return country;
  });

  // filter the countries by black and whitelist
  return newCountries;
}