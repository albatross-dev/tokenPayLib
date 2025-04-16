import { Country } from "../components/Forms/types";
import { SimpleToken } from "../types/token.types";
import currencies from "../utilities/crypto/currencies";

export const TYPE_CRYPTO = "crypto";
export const TYPE_FIAT = "fiat";

export type AllCountryCode =
  | "DE"
  | "GB"
  | "US"
  | "AF"
  | "AL"
  | "DZ"
  | "AD"
  | "AO"
  | "AG"
  | "AR"
  | "AM"
  | "AU"
  | "AT"
  | "AZ"
  | "BS"
  | "BH"
  | "BD"
  | "BB"
  | "BE"
  | "BZ"
  | "BJ"
  | "BT"
  | "BO"
  | "BA"
  | "BW"
  | "BR"
  | "BN"
  | "BG"
  | "BF"
  | "BI"
  | "CV"
  | "KH"
  | "CM"
  | "CA"
  | "CF"
  | "TD"
  | "CL"
  | "CN"
  | "CO"
  | "KM"
  | "CG"
  | "CD"
  | "CR"
  | "CI"
  | "HR"
  | "CU"
  | "CY"
  | "CZ"
  | "DK"
  | "DJ"
  | "DM"
  | "DO"
  | "EC"
  | "EG"
  | "SV"
  | "GQ"
  | "ER"
  | "EE"
  | "SZ"
  | "ET"
  | "FJ"
  | "FI"
  | "FR"
  | "GA"
  | "GM"
  | "GE"
  | "GH"
  | "GR"
  | "GD"
  | "GT"
  | "GN"
  | "GW"
  | "GY"
  | "HT"
  | "HN"
  | "HU"
  | "IS"
  | "IN"
  | "ID"
  | "IQ"
  | "IE"
  | "IL"
  | "IT"
  | "JM"
  | "JP"
  | "JO"
  | "KZ"
  | "KE"
  | "KI"
  | "KR"
  | "KW"
  | "KG"
  | "LA"
  | "LV"
  | "LB"
  | "LS"
  | "LR"
  | "LY"
  | "LI"
  | "LT"
  | "LU"
  | "MG"
  | "MW"
  | "MY"
  | "MV"
  | "ML"
  | "MT"
  | "MH"
  | "MR"
  | "MU"
  | "MX"
  | "FM"
  | "MD"
  | "MC"
  | "MN"
  | "ME"
  | "MA"
  | "MZ"
  | "NA"
  | "NR"
  | "NP"
  | "NL"
  | "NZ"
  | "NI"
  | "NE"
  | "NG"
  | "MK"
  | "NO"
  | "OM"
  | "PK"
  | "PW"
  | "PA"
  | "PG"
  | "PY"
  | "PE"
  | "PH"
  | "PL"
  | "PT"
  | "QA"
  | "RO"
  | "RW"
  | "KN"
  | "LC"
  | "VC"
  | "WS"
  | "SM"
  | "ST"
  | "SA"
  | "SN"
  | "RS"
  | "SC"
  | "SL"
  | "SG"
  | "SK"
  | "SI"
  | "SB"
  | "SO"
  | "ZA"
  | "SS"
  | "ES"
  | "LK"
  | "SD"
  | "SR"
  | "SE"
  | "CH"
  | "TJ"
  | "TZ"
  | "TH"
  | "TL"
  | "TG"
  | "TO"
  | "TT"
  | "TN"
  | "TR"
  | "TM"
  | "TV"
  | "UG"
  | "AE"
  | "UY"
  | "UZ"
  | "VU"
  | "VE"
  | "VN"
  | "YE"
  | "ZM"
  | "ZW"
  | "PS";

export const CRYPTOS = [currencies["EUROE"]];

export interface CountryWithAvailability extends Country {
  available: Availability;
}

export interface Availability {
  [key: string]: SimpleToken[];
}

const availableToAll: Availability = {
  [TYPE_FIAT]: [],
  [TYPE_CRYPTO]: CRYPTOS,
};

export const ALL_COUNTRIES_N: Record<AllCountryCode, Country> = {
  DE: {
    name: "Germany",
    flag: "🇩🇪",
    restrictions: false,

    iso: "DE",
  },
  AF: {
    name: "Afghanistan",
    flag: "🇦🇫",
    restrictions: true,

    iso: "AF",
  },
  AL: {
    name: "Albania",
    flag: "🇦🇱",
    restrictions: false,

    iso: "AL",
  },
  DZ: {
    name: "Algeria",
    flag: "🇩🇿",
    restrictions: false,

    iso: "DZ",
  },
  AD: {
    name: "Andorra",
    flag: "🇦🇩",
    restrictions: false,

    iso: "AD",
  },
  AO: {
    name: "Angola",
    flag: "🇦🇴",
    restrictions: false,

    iso: "AO",
  },
  AG: {
    name: "Antigua and Barbuda",
    flag: "🇦🇬",
    restrictions: false,

    iso: "AG",
  },
  AR: {
    name: "Argentina",
    flag: "🇦🇷",
    restrictions: false,

    iso: "AR",
  },
  AM: {
    name: "Armenia",
    flag: "🇦🇲",
    restrictions: false,

    iso: "AM",
  },
  AU: {
    name: "Australia",
    flag: "🇦🇺",
    restrictions: false,

    iso: "AU",
  },
  AT: {
    name: "Austria",
    flag: "🇦🇹",
    restrictions: false,

    iso: "AT",
  },
  AZ: {
    name: "Azerbaijan",
    flag: "🇦🇿",
    restrictions: false,

    iso: "AZ",
  },
  BS: {
    name: "The Bahamas",
    flag: "🇧🇸",
    restrictions: false,

    iso: "BS",
  },
  BH: {
    name: "Bahrain",
    flag: "🇧🇭",
    restrictions: false,

    iso: "BH",
  },
  BD: {
    name: "Bangladesh",
    flag: "🇧🇩",
    restrictions: false,

    iso: "BD",
  },
  BB: {
    name: "Barbados",
    flag: "🇧🇧",
    restrictions: false,

    iso: "BB",
  },
  BE: {
    name: "Belgium",
    flag: "🇧🇪",
    restrictions: false,

    iso: "BE",
  },
  BZ: {
    name: "Belize",
    flag: "🇧🇿",
    restrictions: false,

    iso: "BZ",
  },
  BJ: {
    name: "Benin",
    flag: "🇧🇯",
    restrictions: false,

    iso: "BJ",
  },
  BT: {
    name: "Bhutan",
    flag: "🇧🇹",
    restrictions: false,

    iso: "BT",
  },
  BO: {
    name: "Bolivia",
    flag: "🇧🇴",
    restrictions: false,

    iso: "BO",
  },
  BA: {
    name: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    restrictions: false,

    iso: "BA",
  },
  BW: {
    name: "Botswana",
    flag: "🇧🇼",
    restrictions: false,

    iso: "BW",
  },
  BR: {
    name: "Brazil",
    flag: "🇧🇷",
    restrictions: false,

    iso: "BR",
  },
  BN: {
    name: "Brunei",
    flag: "🇧🇳",
    restrictions: false,

    iso: "BN",
  },
  BG: {
    name: "Bulgaria",
    flag: "🇧🇬",
    restrictions: false,

    iso: "BG",
  },
  BF: {
    name: "Burkina Faso",
    flag: "🇧🇫",
    restrictions: false,

    iso: "BF",
  },
  BI: {
    name: "Burundi",
    flag: "🇧🇮",
    restrictions: true,

    iso: "BI",
  },
  CV: {
    name: "Cape Verde",
    flag: "🇨🇻",
    restrictions: false,

    iso: "CV",
  },
  KH: {
    name: "Cambodia",
    flag: "🇰🇭",
    restrictions: false,

    iso: "KH",
  },
  CM: {
    name: "Cameroon",
    flag: "🇨🇲",
    restrictions: false,

    iso: "CM",
  },
  CA: {
    name: "Canada",
    flag: "🇨🇦",
    restrictions: false,

    iso: "CA",
  },
  CF: {
    name: "Central African Republic",
    flag: "🇨🇫",
    restrictions: true,

    iso: "CF",
  },
  TD: {
    name: "Chad",
    flag: "🇹🇩",
    restrictions: false,

    iso: "TD",
  },
  CL: {
    name: "Chile",
    flag: "🇨🇱",
    restrictions: false,

    iso: "CL",
  },
  CN: {
    name: "China",
    flag: "🇨🇳",
    restrictions: false,

    iso: "CN",
  },
  CO: {
    name: "Colombia",
    flag: "🇨🇴",
    restrictions: false,

    iso: "CO",
  },
  KM: {
    name: "Comoros",
    flag: "🇰🇲",
    restrictions: false,

    iso: "KM",
  },
  CD: {
    name: "Democratic Republic of the Congo",
    flag: "🇨🇩",
    restrictions: false,

    iso: "CD",
  },
  CG: {
    name: "Republic of the Congo",
    flag: "🇨🇬",
    restrictions: false,

    iso: "CG",
  },
  CR: {
    name: "Costa Rica",
    flag: "🇨🇷",
    restrictions: false,

    iso: "CR",
  },
  CI: {
    name: "Ivory Coast",
    flag: "🇨🇮",
    restrictions: false,

    iso: "CI",
  },
  HR: {
    name: "Croatia",
    flag: "🇭🇷",
    restrictions: false,

    iso: "HR",
  },
  CU: {
    name: "Cuba",
    flag: "🇨🇺",
    restrictions: false,

    iso: "CU",
  },
  CY: {
    name: "Cyprus",
    flag: "🇨🇾",
    restrictions: false,

    iso: "CY",
  },
  CZ: {
    name: "Czech Republic",
    flag: "🇨🇿",
    restrictions: false,

    iso: "CZ",
  },
  DK: {
    name: "Denmark",
    flag: "🇩🇰",
    restrictions: false,

    iso: "DK",
  },
  DJ: {
    name: "Djibouti",
    flag: "🇩🇯",
    restrictions: false,

    iso: "DJ",
  },
  DM: {
    name: "Dominica",
    flag: "🇩🇲",
    restrictions: false,

    iso: "DM",
  },
  DO: {
    name: "Dominican Republic",
    flag: "🇩🇴",
    restrictions: false,

    iso: "DO",
  },
  EC: {
    name: "Ecuador",
    flag: "🇪🇨",
    restrictions: false,

    iso: "EC",
  },
  EG: {
    name: "Egypt",
    flag: "🇪🇬",
    restrictions: false,

    iso: "EG",
  },
  SV: {
    name: "El Salvador",
    flag: "🇸🇻",
    restrictions: false,

    iso: "SV",
  },
  GQ: {
    name: "Equatorial Guinea",
    flag: "🇬🇶",
    restrictions: false,

    iso: "GQ",
  },
  ER: {
    name: "Eritrea",
    flag: "🇪🇷",
    restrictions: false,

    iso: "ER",
  },
  EE: {
    name: "Estonia",
    flag: "🇪🇪",
    restrictions: false,

    iso: "EE",
  },
  SZ: {
    name: "Eswatini",
    flag: "🇸🇿",
    restrictions: false,

    iso: "SZ",
  },
  ET: {
    name: "Ethiopia",
    flag: "🇪🇹",
    restrictions: false,

    iso: "ET",
  },
  FJ: {
    name: "Fiji",
    flag: "🇫🇯",
    restrictions: false,

    iso: "FJ",
  },
  FI: {
    name: "Finland",
    flag: "🇫🇮",
    restrictions: false,

    iso: "FI",
  },
  FR: {
    name: "France",
    flag: "🇫🇷",
    restrictions: false,

    iso: "FR",
  },
  GA: {
    name: "Gabon",
    flag: "🇬🇦",
    restrictions: false,

    iso: "GA",
  },
  GM: {
    name: "The Gambia",
    flag: "🇬🇲",
    restrictions: false,

    iso: "GM",
  },
  GE: {
    name: "Georgia",
    flag: "🇬🇪",
    restrictions: false,

    iso: "GE",
  },

  GH: {
    name: "Ghana",
    flag: "🇬🇭",
    restrictions: false,

    iso: "GH",
  },
  GR: {
    name: "Greece",
    flag: "🇬🇷",
    restrictions: false,

    iso: "GR",
  },
  GD: {
    name: "Grenada",
    flag: "🇬🇩",
    restrictions: false,

    iso: "GD",
  },
  GT: {
    name: "Guatemala",
    flag: "🇬🇹",
    restrictions: true,

    iso: "GT",
  },
  GN: {
    name: "Guinea",
    flag: "🇬🇳",
    restrictions: true,

    iso: "GN",
  },
  GW: {
    name: "Guinea-Bissau",
    flag: "🇬🇼",
    restrictions: true,

    iso: "GW",
  },
  GY: {
    name: "Guyana",
    flag: "🇬🇾",
    restrictions: false,

    iso: "GY",
  },
  HT: {
    name: "Haiti",
    flag: "🇭🇹",
    restrictions: true,

    iso: "HT",
  },
  HN: {
    name: "Honduras",
    flag: "🇭🇳",
    restrictions: false,

    iso: "HN",
  },
  HU: {
    name: "Hungary",
    flag: "🇭🇺",
    restrictions: false,

    iso: "HU",
  },
  IS: {
    name: "Iceland",
    flag: "🇮🇸",
    restrictions: false,

    iso: "IS",
  },
  IN: {
    name: "India",
    flag: "🇮🇳",
    restrictions: false,

    iso: "IN",
  },
  ID: {
    name: "Indonesia",
    flag: "🇮🇩",
    restrictions: false,

    iso: "ID",
  },
  IQ: {
    name: "Iraq",
    flag: "🇮🇶",
    restrictions: true,

    iso: "IQ",
  },
  IE: {
    name: "Ireland",
    flag: "🇮🇪",
    restrictions: false,

    iso: "IE",
  },
  IL: {
    name: "Israel",
    flag: "🇮🇱",
    restrictions: false,

    iso: "IL",
  },
  IT: {
    name: "Italy",
    flag: "🇮🇹",
    restrictions: false,

    iso: "IT",
  },
  JM: {
    name: "Jamaica",
    flag: "🇯🇲",
    restrictions: false,

    iso: "JM",
  },
  JP: {
    name: "Japan",
    flag: "🇯🇵",
    restrictions: false,

    iso: "JP",
  },
  JO: {
    name: "Jordan",
    flag: "🇯🇴",
    restrictions: false,

    iso: "JO",
  },
  KZ: {
    name: "Kazakhstan",
    flag: "🇰🇿",
    restrictions: false,

    iso: "KZ",
  },
  KE: {
    name: "Kenya",
    flag: "🇰🇪",
    restrictions: false,

    iso: "KE",
  },
  KI: {
    name: "Kiribati",
    flag: "🇰🇮",
    restrictions: false,

    iso: "KI",
  },
  KR: {
    name: "South Korea",
    flag: "🇰🇷",
    restrictions: false,

    iso: "KR",
  },
  KW: {
    name: "Kuwait",
    flag: "🇰🇼",
    restrictions: false,

    iso: "KW",
  },
  KG: {
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    restrictions: false,

    iso: "KG",
  },
  LA: {
    name: "Laos",
    flag: "🇱🇦",
    restrictions: false,

    iso: "LA",
  },
  LV: {
    name: "Latvia",
    flag: "🇱🇻",
    restrictions: false,

    iso: "LV",
  },
  LB: {
    name: "Lebanon",
    flag: "🇱🇧",
    restrictions: false,

    iso: "LB",
  },
  LS: {
    name: "Lesotho",
    flag: "🇱🇸",
    restrictions: false,

    iso: "LS",
  },
  LR: {
    name: "Liberia",
    flag: "🇱🇷",
    restrictions: false,

    iso: "LR",
  },
  LY: {
    name: "Libya",
    flag: "🇱🇾",
    restrictions: true,

    iso: "LY",
  },
  LI: {
    name: "Liechtenstein",
    flag: "🇱🇮",
    restrictions: false,

    iso: "LI",
  },
  LT: {
    name: "Lithuania",
    flag: "🇱🇹",
    restrictions: false,

    iso: "LT",
  },
  LU: {
    name: "Luxembourg",
    flag: "🇱🇺",
    restrictions: false,

    iso: "LU",
  },
  MG: {
    name: "Madagascar",
    flag: "🇲🇬",
    restrictions: false,

    iso: "MG",
  },
  MW: {
    name: "Malawi",
    flag: "🇲🇼",
    restrictions: false,

    iso: "MW",
  },
  MY: {
    name: "Malaysia",
    flag: "🇲🇾",
    restrictions: false,

    iso: "MY",
  },
  MV: {
    name: "Maldives",
    flag: "🇲🇻",
    restrictions: false,

    iso: "MV",
  },
  ML: {
    name: "Mali",
    flag: "🇲🇱",
    restrictions: true,

    iso: "ML",
  },
  MT: {
    name: "Malta",
    flag: "🇲🇹",
    restrictions: false,

    iso: "MT",
  },
  MH: {
    name: "Marshall Islands",
    flag: "🇲🇭",
    restrictions: false,

    iso: "MH",
  },
  MR: {
    name: "Mauritania",
    flag: "🇲🇷",
    restrictions: false,

    iso: "MR",
  },
  MU: {
    name: "Mauritius",
    flag: "🇲🇺",
    restrictions: false,

    iso: "MU",
  },
  MX: {
    name: "Mexico",
    flag: "🇲🇽",
    restrictions: false,

    iso: "MX",
  },
  FM: {
    name: "Micronesia",
    flag: "🇫🇲",
    restrictions: false,

    iso: "FM",
  },
  MD: {
    name: "Moldova",
    flag: "🇲🇩",
    restrictions: true,

    iso: "MD",
  },
  MC: {
    name: "Monaco",
    flag: "🇲🇨",
    restrictions: false,

    iso: "MC",
  },
  MN: {
    name: "Mongolia",
    flag: "🇲🇳",
    restrictions: false,

    iso: "MN",
  },
  ME: {
    name: "Montenegro",
    flag: "🇲🇪",
    restrictions: false,

    iso: "ME",
  },
  MA: {
    name: "Morocco",
    flag: "🇲🇦",
    restrictions: false,

    iso: "MA",
  },
  MZ: {
    name: "Mozambique",
    flag: "🇲🇿",
    restrictions: false,

    iso: "MZ",
  },
  NA: {
    name: "Namibia",
    flag: "🇳🇦",
    restrictions: false,

    iso: "NA",
  },
  NR: {
    name: "Nauru",
    flag: "🇳🇷",
    restrictions: false,

    iso: "NR",
  },
  NP: {
    name: "Nepal",
    flag: "🇳🇵",
    restrictions: false,

    iso: "NP",
  },
  NL: {
    name: "Netherlands",
    flag: "🇳🇱",
    restrictions: false,

    iso: "NL",
  },
  NZ: {
    name: "New Zealand",
    flag: "🇳🇿",
    restrictions: false,

    iso: "NZ",
  },
  NI: {
    name: "Nicaragua",
    flag: "🇳🇮",
    restrictions: true,

    iso: "NI",
  },
  NE: {
    name: "Niger",
    flag: "🇳🇪",
    restrictions: false,

    iso: "NE",
  },
  NG: {
    name: "Nigeria",
    flag: "🇳🇬",
    restrictions: false,

    iso: "NG",
  },
  MK: {
    name: "North Macedonia",
    flag: "🇲🇰",
    restrictions: false,

    iso: "MK",
  },
  NO: {
    name: "Norway",
    flag: "🇳🇴",
    restrictions: false,

    iso: "NO",
  },
  OM: {
    name: "Oman",
    flag: "🇴🇲",
    restrictions: false,

    iso: "OM",
  },
  PK: {
    name: "Pakistan",
    flag: "🇵🇰",
    restrictions: false,

    iso: "PK",
  },
  PW: {
    name: "Palau",
    flag: "🇵🇼",
    restrictions: false,

    iso: "PW",
  },
  PA: {
    name: "Panama",
    flag: "🇵🇦",
    restrictions: false,

    iso: "PA",
  },
  PG: {
    name: "Papua New Guinea",
    flag: "🇵🇬",
    restrictions: false,

    iso: "PG",
  },
  PY: {
    name: "Paraguay",
    flag: "🇵🇾",
    restrictions: false,

    iso: "PY",
  },
  PE: {
    name: "Peru",
    flag: "🇵🇪",
    restrictions: false,

    iso: "PE",
  },
  PH: {
    name: "Philippines",
    flag: "🇵🇭",
    restrictions: false,

    iso: "PH",
  },
  PL: {
    name: "Poland",
    flag: "🇵🇱",
    restrictions: false,

    iso: "PL",
  },
  PS: {
    name: "State of Palestine",
    flag: "🇵🇸",
    restrictions: true,
    iso: "PS",
  },
  PT: {
    name: "Portugal",
    flag: "🇵🇹",
    restrictions: false,

    iso: "PT",
  },
  QA: {
    name: "Qatar",
    flag: "🇶🇦",
    restrictions: false,

    iso: "QA",
  },
  RO: {
    name: "Romania",
    flag: "🇷🇴",
    restrictions: false,

    iso: "RO",
  },
  RW: {
    name: "Rwanda",
    flag: "🇷🇼",
    restrictions: false,

    iso: "RW",
  },
  KN: {
    name: "Saint Kitts and Nevis",
    flag: "🇰🇳",
    restrictions: false,

    iso: "KN",
  },
  LC: {
    name: "Saint Lucia",
    flag: "🇱🇨",
    restrictions: false,

    iso: "LC",
  },
  VC: {
    name: "Saint Vincent and the Grenadines",
    flag: "🇻🇨",
    restrictions: false,

    iso: "VC",
  },
  WS: {
    name: "Samoa",
    flag: "🇼🇸",
    restrictions: false,

    iso: "WS",
  },
  SM: {
    name: "San Marino",
    flag: "🇸🇲",
    restrictions: false,

    iso: "SM",
  },
  ST: {
    name: "São Tomé and Príncipe",
    flag: "🇸🇹",
    restrictions: false,

    iso: "ST",
  },
  SA: {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    restrictions: false,

    iso: "SA",
  },
  SN: {
    name: "Senegal",
    flag: "🇸🇳",
    restrictions: false,

    iso: "SN",
  },
  RS: {
    name: "Serbia",
    flag: "🇷🇸",
    restrictions: false,

    iso: "RS",
  },
  SC: {
    name: "Seychelles",
    flag: "🇸🇨",
    restrictions: false,

    iso: "SC",
  },
  SL: {
    name: "Sierra Leone",
    flag: "🇸🇱",
    restrictions: false,

    iso: "SL",
  },
  SG: {
    name: "Singapore",
    flag: "🇸🇬",
    restrictions: false,

    iso: "SG",
  },
  SK: {
    name: "Slovakia",
    flag: "🇸🇰",
    restrictions: false,

    iso: "SK",
  },
  SI: {
    name: "Slovenia",
    flag: "🇸🇮",
    restrictions: false,

    iso: "SI",
  },
  SB: {
    name: "Solomon Islands",
    flag: "🇸🇧",
    restrictions: false,

    iso: "SB",
  },
  SO: {
    name: "Somalia",
    flag: "🇸🇴",
    restrictions: true,

    iso: "SO",
  },
  ZA: {
    name: "South Africa",
    flag: "🇿🇦",
    restrictions: false,

    iso: "ZA",
  },
  SS: {
    name: "South Sudan",
    flag: "🇸🇸",
    restrictions: true,

    iso: "SS",
  },
  ES: {
    name: "Spain",
    flag: "🇪🇸",
    restrictions: false,

    iso: "ES",
  },
  LK: {
    name: "Sri Lanka",
    flag: "🇱🇰",
    restrictions: false,

    iso: "LK",
  },
  SD: {
    name: "Sudan",
    flag: "🇸🇩",
    restrictions: true,

    iso: "SD",
  },
  SR: {
    name: "Suriname",
    flag: "🇸🇷",
    restrictions: false,

    iso: "SR",
  },
  SE: {
    name: "Sweden",
    flag: "🇸🇪",
    restrictions: false,

    iso: "SE",
  },
  CH: {
    name: "Switzerland",
    flag: "🇨🇭",
    restrictions: false,

    iso: "CH",
  },
  TJ: {
    name: "Tajikistan",
    flag: "🇹🇯",
    restrictions: false,

    iso: "TJ",
  },
  TZ: {
    name: "Tanzania",
    flag: "🇹🇿",
    restrictions: false,

    iso: "TZ",
  },
  TH: {
    name: "Thailand",
    flag: "🇹🇭",
    restrictions: false,

    iso: "TH",
  },
  TL: {
    name: "East Timor",
    flag: "🇹🇱",
    restrictions: false,

    iso: "TL",
  },
  TG: {
    name: "Togo",
    flag: "🇹🇬",
    restrictions: false,

    iso: "TG",
  },
  TO: {
    name: "Tonga",
    flag: "🇹🇴",
    restrictions: false,

    iso: "TO",
  },
  TT: {
    name: "Trinidad and Tobago",
    flag: "🇹🇹",
    restrictions: false,

    iso: "TT",
  },
  TN: {
    name: "Tunisia",
    flag: "🇹🇳",
    restrictions: true,

    iso: "TN",
  },
  TR: {
    name: "Türkiye",
    flag: "🇹🇷",
    restrictions: true,

    iso: "TR",
  },
  TM: {
    name: "Turkmenistan",
    flag: "🇹🇲",
    restrictions: false,

    iso: "TM",
  },
  TV: {
    name: "Tuvalu",
    flag: "🇹🇻",
    restrictions: false,

    iso: "TV",
  },
  UG: {
    name: "Uganda",
    flag: "🇺🇬",
    restrictions: false,

    iso: "UG",
  },
  AE: {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    restrictions: false,

    iso: "AE",
  },
  GB: {
    name: "United Kingdom",
    flag: "🇬🇧",
    restrictions: false,

    iso: "GB",
  },
  US: {
    name: "United States",
    flag: "🇺🇸",
    restrictions: false,

    iso: "US",
  },
  UY: {
    name: "Uruguay",
    flag: "🇺🇾",
    restrictions: false,

    iso: "UY",
  },
  UZ: {
    name: "Uzbekistan",
    flag: "🇺🇿",
    restrictions: false,

    iso: "UZ",
  },
  VU: {
    name: "Vanuatu",
    flag: "🇻🇺",
    restrictions: false,

    iso: "VU",
  },
  VE: {
    name: "Venezuela",
    flag: "🇻🇪",
    restrictions: true,

    iso: "VE",
  },
  VN: {
    name: "Vietnam",
    flag: "🇻🇳",
    restrictions: false,

    iso: "VN",
  },
  YE: {
    name: "Yemen",
    flag: "🇾🇪",
    restrictions: true,

    iso: "YE",
  },
  ZM: {
    name: "Zambia",
    flag: "🇿🇲",
    restrictions: false,

    iso: "ZM",
  },
  ZW: {
    name: "Zimbabwe",
    flag: "🇿🇼",
    restrictions: true,

    iso: "ZW",
  },
};

export const ALL_COUNTRIES: Record<AllCountryCode, CountryWithAvailability> = {
  DE: {
    name: "Germany",
    flag: "🇩🇪",
    restrictions: false,
    available: availableToAll,
    iso: "DE",
  },
  US: {
    name: "United States",
    flag: "🇺🇸",
    restrictions: false,
    available: availableToAll,
    iso: "US",
  },
  PS: {
    name: "State of Palestine",
    flag: "🇵🇸",
    restrictions: false,
    available: availableToAll,
    iso: "PS",
  },
  AF: {
    name: "Afghanistan",
    flag: "🇦🇫",
    restrictions: true,
    available: availableToAll,
    iso: "AF",
  },
  AL: {
    name: "Albania",
    flag: "🇦🇱",
    restrictions: false,
    available: availableToAll,
    iso: "AL",
  },
  DZ: {
    name: "Algeria",
    flag: "🇩🇿",
    restrictions: false,
    available: availableToAll,
    iso: "DZ",
  },
  AD: {
    name: "Andorra",
    flag: "🇦🇩",
    restrictions: false,
    available: availableToAll,
    iso: "AD",
  },
  AO: {
    name: "Angola",
    flag: "🇦🇴",
    restrictions: false,
    available: availableToAll,
    iso: "AO",
  },
  AG: {
    name: "Antigua and Barbuda",
    flag: "🇦🇬",
    restrictions: false,
    available: availableToAll,
    iso: "AG",
  },
  AR: {
    name: "Argentina",
    flag: "🇦🇷",
    restrictions: false,
    available: availableToAll,
    iso: "AR",
  },
  AM: {
    name: "Armenia",
    flag: "🇦🇲",
    restrictions: false,
    available: availableToAll,
    iso: "AM",
  },
  AU: {
    name: "Australia",
    flag: "🇦🇺",
    restrictions: false,
    available: availableToAll,
    iso: "AU",
  },
  AT: {
    name: "Austria",
    flag: "🇦🇹",
    restrictions: false,
    available: availableToAll,
    iso: "AT",
  },
  AZ: {
    name: "Azerbaijan",
    flag: "🇦🇿",
    restrictions: false,
    available: availableToAll,
    iso: "AZ",
  },
  BS: {
    name: "The Bahamas",
    flag: "🇧🇸",
    restrictions: false,
    available: availableToAll,
    iso: "BS",
  },
  BH: {
    name: "Bahrain",
    flag: "🇧🇭",
    restrictions: false,
    available: availableToAll,
    iso: "BH",
  },
  BD: {
    name: "Bangladesh",
    flag: "🇧🇩",
    restrictions: false,
    available: availableToAll,
    iso: "BD",
  },
  BB: {
    name: "Barbados",
    flag: "🇧🇧",
    restrictions: false,
    available: availableToAll,
    iso: "BB",
  },
  BE: {
    name: "Belgium",
    flag: "🇧🇪",
    restrictions: false,
    available: availableToAll,
    iso: "BE",
  },
  BZ: {
    name: "Belize",
    flag: "🇧🇿",
    restrictions: false,
    available: availableToAll,
    iso: "BZ",
  },
  BJ: {
    name: "Benin",
    flag: "🇧🇯",
    restrictions: false,
    available: availableToAll,
    iso: "BJ",
  },
  BT: {
    name: "Bhutan",
    flag: "🇧🇹",
    restrictions: false,
    available: availableToAll,
    iso: "BT",
  },
  BO: {
    name: "Bolivia",
    flag: "🇧🇴",
    restrictions: false,
    available: availableToAll,
    iso: "BO",
  },
  BA: {
    name: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    restrictions: false,
    available: availableToAll,
    iso: "BA",
  },
  BW: {
    name: "Botswana",
    flag: "🇧🇼",
    restrictions: false,
    available: availableToAll,
    iso: "BW",
  },
  BR: {
    name: "Brazil",
    flag: "🇧🇷",
    restrictions: false,
    available: availableToAll,
    iso: "BR",
  },
  BN: {
    name: "Brunei",
    flag: "🇧🇳",
    restrictions: false,
    available: availableToAll,
    iso: "BN",
  },
  BG: {
    name: "Bulgaria",
    flag: "🇧🇬",
    restrictions: false,
    available: availableToAll,
    iso: "BG",
  },
  BF: {
    name: "Burkina Faso",
    flag: "🇧🇫",
    restrictions: false,
    available: availableToAll,
    iso: "BF",
  },
  BI: {
    name: "Burundi",
    flag: "🇧🇮",
    restrictions: true,
    available: availableToAll,
    iso: "BI",
  },
  CV: {
    name: "Cape Verde",
    flag: "🇨🇻",
    restrictions: false,
    available: availableToAll,
    iso: "CV",
  },
  KH: {
    name: "Cambodia",
    flag: "🇰🇭",
    restrictions: false,
    available: availableToAll,
    iso: "KH",
  },
  CM: {
    name: "Cameroon",
    flag: "🇨🇲",
    restrictions: false,
    available: availableToAll,
    iso: "CM",
  },
  CA: {
    name: "Canada",
    flag: "🇨🇦",
    restrictions: false,
    available: availableToAll,
    iso: "CA",
  },
  CF: {
    name: "Central African Republic",
    flag: "🇨🇫",
    restrictions: true,
    available: availableToAll,
    iso: "CF",
  },
  TD: {
    name: "Chad",
    flag: "🇹🇩",
    restrictions: false,
    available: availableToAll,
    iso: "TD",
  },
  CL: {
    name: "Chile",
    flag: "🇨🇱",
    restrictions: false,
    available: availableToAll,
    iso: "CL",
  },
  CN: {
    name: "China",
    flag: "🇨🇳",
    restrictions: false,
    available: availableToAll,
    iso: "CN",
  },
  CO: {
    name: "Colombia",
    flag: "🇨🇴",
    restrictions: false,
    available: availableToAll,
    iso: "CO",
  },
  KM: {
    name: "Comoros",
    flag: "🇰🇲",
    restrictions: false,
    available: availableToAll,
    iso: "KM",
  },
  CD: {
    name: "Democratic Republic of the Congo",
    flag: "🇨🇩",
    restrictions: false,
    available: availableToAll,
    iso: "CD",
  },
  CG: {
    name: "Republic of the Congo",
    flag: "🇨🇬",
    restrictions: false,
    available: availableToAll,
    iso: "CG",
  },
  CR: {
    name: "Costa Rica",
    flag: "🇨🇷",
    restrictions: false,
    available: availableToAll,
    iso: "CR",
  },
  CI: {
    name: "Ivory Coast",
    flag: "🇨🇮",
    restrictions: false,
    available: availableToAll,
    iso: "CI",
  },
  HR: {
    name: "Croatia",
    flag: "🇭🇷",
    restrictions: false,
    available: availableToAll,
    iso: "HR",
  },
  CU: {
    name: "Cuba",
    flag: "🇨🇺",
    restrictions: false,
    available: availableToAll,
    iso: "CU",
  },
  CY: {
    name: "Cyprus",
    flag: "🇨🇾",
    restrictions: false,
    available: availableToAll,
    iso: "CY",
  },
  CZ: {
    name: "Czech Republic",
    flag: "🇨🇿",
    restrictions: false,
    available: availableToAll,
    iso: "CZ",
  },
  DK: {
    name: "Denmark",
    flag: "🇩🇰",
    restrictions: false,
    available: availableToAll,
    iso: "DK",
  },
  DJ: {
    name: "Djibouti",
    flag: "🇩🇯",
    restrictions: false,
    available: availableToAll,
    iso: "DJ",
  },
  DM: {
    name: "Dominica",
    flag: "🇩🇲",
    restrictions: false,
    available: availableToAll,
    iso: "DM",
  },
  DO: {
    name: "Dominican Republic",
    flag: "🇩🇴",
    restrictions: false,
    available: availableToAll,
    iso: "DO",
  },
  EC: {
    name: "Ecuador",
    flag: "🇪🇨",
    restrictions: false,
    available: availableToAll,
    iso: "EC",
  },
  EG: {
    name: "Egypt",
    flag: "🇪🇬",
    restrictions: false,
    available: availableToAll,
    iso: "EG",
  },
  SV: {
    name: "El Salvador",
    flag: "🇸🇻",
    restrictions: false,
    available: availableToAll,
    iso: "SV",
  },
  GQ: {
    name: "Equatorial Guinea",
    flag: "🇬🇶",
    restrictions: false,
    available: availableToAll,
    iso: "GQ",
  },
  ER: {
    name: "Eritrea",
    flag: "🇪🇷",
    restrictions: false,
    available: availableToAll,
    iso: "ER",
  },
  EE: {
    name: "Estonia",
    flag: "🇪🇪",
    restrictions: false,
    available: availableToAll,
    iso: "EE",
  },
  SZ: {
    name: "Eswatini",
    flag: "🇸🇿",
    restrictions: false,
    available: availableToAll,
    iso: "SZ",
  },
  ET: {
    name: "Ethiopia",
    flag: "🇪🇹",
    restrictions: false,
    available: availableToAll,
    iso: "ET",
  },
  FJ: {
    name: "Fiji",
    flag: "🇫🇯",
    restrictions: false,
    available: availableToAll,
    iso: "FJ",
  },
  FI: {
    name: "Finland",
    flag: "🇫🇮",
    restrictions: false,
    available: availableToAll,
    iso: "FI",
  },
  FR: {
    name: "France",
    flag: "🇫🇷",
    restrictions: false,
    available: availableToAll,
    iso: "FR",
  },
  GA: {
    name: "Gabon",
    flag: "🇬🇦",
    restrictions: false,
    available: availableToAll,
    iso: "GA",
  },
  GM: {
    name: "The Gambia",
    flag: "🇬🇲",
    restrictions: false,
    available: availableToAll,
    iso: "GM",
  },
  GE: {
    name: "Georgia",
    flag: "🇬🇪",
    restrictions: false,
    available: availableToAll,
    iso: "GE",
  },

  GH: {
    name: "Ghana",
    flag: "🇬🇭",
    restrictions: false,
    available: availableToAll,
    iso: "GH",
  },
  GR: {
    name: "Greece",
    flag: "🇬🇷",
    restrictions: false,
    available: availableToAll,
    iso: "GR",
  },
  GD: {
    name: "Grenada",
    flag: "🇬🇩",
    restrictions: false,
    available: availableToAll,
    iso: "GD",
  },
  GT: {
    name: "Guatemala",
    flag: "🇬🇹",
    restrictions: true,
    available: availableToAll,
    iso: "GT",
  },
  GN: {
    name: "Guinea",
    flag: "🇬🇳",
    restrictions: true,
    available: availableToAll,
    iso: "GN",
  },
  GW: {
    name: "Guinea-Bissau",
    flag: "🇬🇼",
    restrictions: true,
    available: availableToAll,
    iso: "GW",
  },
  GY: {
    name: "Guyana",
    flag: "🇬🇾",
    restrictions: false,
    available: availableToAll,
    iso: "GY",
  },
  HT: {
    name: "Haiti",
    flag: "🇭🇹",
    restrictions: true,
    available: availableToAll,
    iso: "HT",
  },
  HN: {
    name: "Honduras",
    flag: "🇭🇳",
    restrictions: false,
    available: availableToAll,
    iso: "HN",
  },
  HU: {
    name: "Hungary",
    flag: "🇭🇺",
    restrictions: false,
    available: availableToAll,
    iso: "HU",
  },
  IS: {
    name: "Iceland",
    flag: "🇮🇸",
    restrictions: false,
    available: availableToAll,
    iso: "IS",
  },
  IN: {
    name: "India",
    flag: "🇮🇳",
    restrictions: false,
    available: availableToAll,
    iso: "IN",
  },
  ID: {
    name: "Indonesia",
    flag: "🇮🇩",
    restrictions: false,
    available: availableToAll,
    iso: "ID",
  },
  IQ: {
    name: "Iraq",
    flag: "🇮🇶",
    restrictions: true,
    available: availableToAll,
    iso: "IQ",
  },
  IE: {
    name: "Ireland",
    flag: "🇮🇪",
    restrictions: false,
    available: availableToAll,
    iso: "IE",
  },
  IL: {
    name: "Israel",
    flag: "🇮🇱",
    restrictions: false,
    available: availableToAll,
    iso: "IL",
  },
  IT: {
    name: "Italy",
    flag: "🇮🇹",
    restrictions: false,
    available: availableToAll,
    iso: "IT",
  },
  JM: {
    name: "Jamaica",
    flag: "🇯🇲",
    restrictions: false,
    available: availableToAll,
    iso: "JM",
  },
  JP: {
    name: "Japan",
    flag: "🇯🇵",
    restrictions: false,
    available: availableToAll,
    iso: "JP",
  },
  JO: {
    name: "Jordan",
    flag: "🇯🇴",
    restrictions: false,
    available: availableToAll,
    iso: "JO",
  },
  KZ: {
    name: "Kazakhstan",
    flag: "🇰🇿",
    restrictions: false,
    available: availableToAll,
    iso: "KZ",
  },
  KE: {
    name: "Kenya",
    flag: "🇰🇪",
    restrictions: false,
    available: availableToAll,
    iso: "KE",
  },
  KI: {
    name: "Kiribati",
    flag: "🇰🇮",
    restrictions: false,
    available: availableToAll,
    iso: "KI",
  },
  KR: {
    name: "South Korea",
    flag: "🇰🇷",
    restrictions: false,
    available: availableToAll,
    iso: "KR",
  },
  KW: {
    name: "Kuwait",
    flag: "🇰🇼",
    restrictions: false,
    available: availableToAll,
    iso: "KW",
  },
  KG: {
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    restrictions: false,
    available: availableToAll,
    iso: "KG",
  },
  LA: {
    name: "Laos",
    flag: "🇱🇦",
    restrictions: false,
    available: availableToAll,
    iso: "LA",
  },
  LV: {
    name: "Latvia",
    flag: "🇱🇻",
    restrictions: false,
    available: availableToAll,
    iso: "LV",
  },
  LB: {
    name: "Lebanon",
    flag: "🇱🇧",
    restrictions: false,
    available: availableToAll,
    iso: "LB",
  },
  LS: {
    name: "Lesotho",
    flag: "🇱🇸",
    restrictions: false,
    available: availableToAll,
    iso: "LS",
  },
  LR: {
    name: "Liberia",
    flag: "🇱🇷",
    restrictions: false,
    available: availableToAll,
    iso: "LR",
  },
  LY: {
    name: "Libya",
    flag: "🇱🇾",
    restrictions: true,
    available: availableToAll,
    iso: "LY",
  },
  LI: {
    name: "Liechtenstein",
    flag: "🇱🇮",
    restrictions: false,
    available: availableToAll,
    iso: "LI",
  },
  LT: {
    name: "Lithuania",
    flag: "🇱🇹",
    restrictions: false,
    available: availableToAll,
    iso: "LT",
  },
  LU: {
    name: "Luxembourg",
    flag: "🇱🇺",
    restrictions: false,
    available: availableToAll,
    iso: "LU",
  },
  MG: {
    name: "Madagascar",
    flag: "🇲🇬",
    restrictions: false,
    available: availableToAll,
    iso: "MG",
  },
  MW: {
    name: "Malawi",
    flag: "🇲🇼",
    restrictions: false,
    available: availableToAll,
    iso: "MW",
  },
  MY: {
    name: "Malaysia",
    flag: "🇲🇾",
    restrictions: false,
    available: availableToAll,
    iso: "MY",
  },
  MV: {
    name: "Maldives",
    flag: "🇲🇻",
    restrictions: false,
    available: availableToAll,
    iso: "MV",
  },
  ML: {
    name: "Mali",
    flag: "🇲🇱",
    restrictions: true,
    available: availableToAll,
    iso: "ML",
  },
  MT: {
    name: "Malta",
    flag: "🇲🇹",
    restrictions: false,
    available: availableToAll,
    iso: "MT",
  },
  MH: {
    name: "Marshall Islands",
    flag: "🇲🇭",
    restrictions: false,
    available: availableToAll,
    iso: "MH",
  },
  MR: {
    name: "Mauritania",
    flag: "🇲🇷",
    restrictions: false,
    available: availableToAll,
    iso: "MR",
  },
  MU: {
    name: "Mauritius",
    flag: "🇲🇺",
    restrictions: false,
    available: availableToAll,
    iso: "MU",
  },
  MX: {
    name: "Mexico",
    flag: "🇲🇽",
    restrictions: false,
    available: availableToAll,
    iso: "MX",
  },
  FM: {
    name: "Micronesia",
    flag: "🇫🇲",
    restrictions: false,
    available: availableToAll,
    iso: "FM",
  },
  MD: {
    name: "Moldova",
    flag: "🇲🇩",
    restrictions: true,
    available: availableToAll,
    iso: "MD",
  },
  MC: {
    name: "Monaco",
    flag: "🇲🇨",
    restrictions: false,
    available: availableToAll,
    iso: "MC",
  },
  MN: {
    name: "Mongolia",
    flag: "🇲🇳",
    restrictions: false,
    available: availableToAll,
    iso: "MN",
  },
  ME: {
    name: "Montenegro",
    flag: "🇲🇪",
    restrictions: false,
    available: availableToAll,
    iso: "ME",
  },
  MA: {
    name: "Morocco",
    flag: "🇲🇦",
    restrictions: false,
    available: availableToAll,
    iso: "MA",
  },
  MZ: {
    name: "Mozambique",
    flag: "🇲🇿",
    restrictions: false,
    available: availableToAll,
    iso: "MZ",
  },
  NA: {
    name: "Namibia",
    flag: "🇳🇦",
    restrictions: false,
    available: availableToAll,
    iso: "NA",
  },
  NR: {
    name: "Nauru",
    flag: "🇳🇷",
    restrictions: false,
    available: availableToAll,
    iso: "NR",
  },
  NP: {
    name: "Nepal",
    flag: "🇳🇵",
    restrictions: false,
    available: availableToAll,
    iso: "NP",
  },
  NL: {
    name: "Netherlands",
    flag: "🇳🇱",
    restrictions: false,
    available: availableToAll,
    iso: "NL",
  },
  NZ: {
    name: "New Zealand",
    flag: "🇳🇿",
    restrictions: false,
    available: availableToAll,
    iso: "NZ",
  },
  NI: {
    name: "Nicaragua",
    flag: "🇳🇮",
    restrictions: true,
    available: availableToAll,
    iso: "NI",
  },
  NE: {
    name: "Niger",
    flag: "🇳🇪",
    restrictions: false,
    available: availableToAll,
    iso: "NE",
  },
  NG: {
    name: "Nigeria",
    flag: "🇳🇬",
    restrictions: false,
    available: availableToAll,
    iso: "NG",
  },
  MK: {
    name: "North Macedonia",
    flag: "🇲🇰",
    restrictions: false,
    available: availableToAll,
    iso: "MK",
  },
  NO: {
    name: "Norway",
    flag: "🇳🇴",
    restrictions: false,
    available: availableToAll,
    iso: "NO",
  },
  OM: {
    name: "Oman",
    flag: "🇴🇲",
    restrictions: false,
    available: availableToAll,
    iso: "OM",
  },
  PK: {
    name: "Pakistan",
    flag: "🇵🇰",
    restrictions: false,
    available: availableToAll,
    iso: "PK",
  },
  PW: {
    name: "Palau",
    flag: "🇵🇼",
    restrictions: false,
    available: availableToAll,
    iso: "PW",
  },
  PA: {
    name: "Panama",
    flag: "🇵🇦",
    restrictions: false,
    available: availableToAll,
    iso: "PA",
  },
  PG: {
    name: "Papua New Guinea",
    flag: "🇵🇬",
    restrictions: false,
    available: availableToAll,
    iso: "PG",
  },
  PY: {
    name: "Paraguay",
    flag: "🇵🇾",
    restrictions: false,
    available: availableToAll,
    iso: "PY",
  },
  PE: {
    name: "Peru",
    flag: "🇵🇪",
    restrictions: false,
    available: availableToAll,
    iso: "PE",
  },
  PH: {
    name: "Philippines",
    flag: "🇵🇭",
    restrictions: false,
    available: availableToAll,
    iso: "PH",
  },
  PL: {
    name: "Poland",
    flag: "🇵🇱",
    restrictions: false,
    available: availableToAll,
    iso: "PL",
  },
  PT: {
    name: "Portugal",
    flag: "🇵🇹",
    restrictions: false,
    available: availableToAll,
    iso: "PT",
  },
  QA: {
    name: "Qatar",
    flag: "🇶🇦",
    restrictions: false,
    available: availableToAll,
    iso: "QA",
  },
  RO: {
    name: "Romania",
    flag: "🇷🇴",
    restrictions: false,
    available: availableToAll,
    iso: "RO",
  },
  RW: {
    name: "Rwanda",
    flag: "🇷🇼",
    restrictions: false,
    available: availableToAll,
    iso: "RW",
  },
  KN: {
    name: "Saint Kitts and Nevis",
    flag: "🇰🇳",
    restrictions: false,
    available: availableToAll,
    iso: "KN",
  },
  LC: {
    name: "Saint Lucia",
    flag: "🇱🇨",
    restrictions: false,
    available: availableToAll,
    iso: "LC",
  },
  VC: {
    name: "Saint Vincent and the Grenadines",
    flag: "🇻🇨",
    restrictions: false,
    available: availableToAll,
    iso: "VC",
  },
  WS: {
    name: "Samoa",
    flag: "🇼🇸",
    restrictions: false,
    available: availableToAll,
    iso: "WS",
  },
  SM: {
    name: "San Marino",
    flag: "🇸🇲",
    restrictions: false,
    available: availableToAll,
    iso: "SM",
  },
  ST: {
    name: "São Tomé and Príncipe",
    flag: "🇸🇹",
    restrictions: false,
    available: availableToAll,
    iso: "ST",
  },
  SA: {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    restrictions: false,
    available: availableToAll,
    iso: "SA",
  },
  SN: {
    name: "Senegal",
    flag: "🇸🇳",
    restrictions: false,
    available: availableToAll,
    iso: "SN",
  },
  RS: {
    name: "Serbia",
    flag: "🇷🇸",
    restrictions: false,
    available: availableToAll,
    iso: "RS",
  },
  SC: {
    name: "Seychelles",
    flag: "🇸🇨",
    restrictions: false,
    available: availableToAll,
    iso: "SC",
  },
  SL: {
    name: "Sierra Leone",
    flag: "🇸🇱",
    restrictions: false,
    available: availableToAll,
    iso: "SL",
  },
  SG: {
    name: "Singapore",
    flag: "🇸🇬",
    restrictions: false,
    available: availableToAll,
    iso: "SG",
  },
  SK: {
    name: "Slovakia",
    flag: "🇸🇰",
    restrictions: false,
    available: availableToAll,
    iso: "SK",
  },
  SI: {
    name: "Slovenia",
    flag: "🇸🇮",
    restrictions: false,
    available: availableToAll,
    iso: "SI",
  },
  SB: {
    name: "Solomon Islands",
    flag: "🇸🇧",
    restrictions: false,
    available: availableToAll,
    iso: "SB",
  },
  SO: {
    name: "Somalia",
    flag: "🇸🇴",
    restrictions: true,
    available: availableToAll,
    iso: "SO",
  },
  ZA: {
    name: "South Africa",
    flag: "🇿🇦",
    restrictions: false,
    available: availableToAll,
    iso: "ZA",
  },
  SS: {
    name: "South Sudan",
    flag: "🇸🇸",
    restrictions: true,
    available: availableToAll,
    iso: "SS",
  },
  ES: {
    name: "Spain",
    flag: "🇪🇸",
    restrictions: false,
    available: availableToAll,
    iso: "ES",
  },
  LK: {
    name: "Sri Lanka",
    flag: "🇱🇰",
    restrictions: false,
    available: availableToAll,
    iso: "LK",
  },
  SD: {
    name: "Sudan",
    flag: "🇸🇩",
    restrictions: true,
    available: availableToAll,
    iso: "SD",
  },
  SR: {
    name: "Suriname",
    flag: "🇸🇷",
    restrictions: false,
    available: availableToAll,
    iso: "SR",
  },
  SE: {
    name: "Sweden",
    flag: "🇸🇪",
    restrictions: false,
    available: availableToAll,
    iso: "SE",
  },
  CH: {
    name: "Switzerland",
    flag: "🇨🇭",
    restrictions: false,
    available: availableToAll,
    iso: "CH",
  },
  TJ: {
    name: "Tajikistan",
    flag: "🇹🇯",
    restrictions: false,
    available: availableToAll,
    iso: "TJ",
  },
  TZ: {
    name: "Tanzania",
    flag: "🇹🇿",
    restrictions: false,
    available: availableToAll,
    iso: "TZ",
  },
  TH: {
    name: "Thailand",
    flag: "🇹🇭",
    restrictions: false,
    available: availableToAll,
    iso: "TH",
  },
  TL: {
    name: "East Timor",
    flag: "🇹🇱",
    restrictions: false,
    available: availableToAll,
    iso: "TL",
  },
  TG: {
    name: "Togo",
    flag: "🇹🇬",
    restrictions: false,
    available: availableToAll,
    iso: "TG",
  },
  TO: {
    name: "Tonga",
    flag: "🇹🇴",
    restrictions: false,
    available: availableToAll,
    iso: "TO",
  },
  TT: {
    name: "Trinidad and Tobago",
    flag: "🇹🇹",
    restrictions: false,
    available: availableToAll,
    iso: "TT",
  },
  TN: {
    name: "Tunisia",
    flag: "🇹🇳",
    restrictions: true,
    available: availableToAll,
    iso: "TN",
  },
  TR: {
    name: "Türkiye",
    flag: "🇹🇷",
    restrictions: true,
    available: availableToAll,
    iso: "TR",
  },
  TM: {
    name: "Turkmenistan",
    flag: "🇹🇲",
    restrictions: false,
    available: availableToAll,
    iso: "TM",
  },
  TV: {
    name: "Tuvalu",
    flag: "🇹🇻",
    restrictions: false,
    available: availableToAll,
    iso: "TV",
  },
  UG: {
    name: "Uganda",
    flag: "🇺🇬",
    restrictions: false,
    available: availableToAll,
    iso: "UG",
  },
  AE: {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    restrictions: false,
    available: availableToAll,
    iso: "AE",
  },
  GB: {
    name: "United Kingdom",
    flag: "🇬🇧",
    restrictions: false,
    available: availableToAll,
    iso: "GB",
  },
  UY: {
    name: "Uruguay",
    flag: "🇺🇾",
    restrictions: false,
    available: availableToAll,
    iso: "UY",
  },
  UZ: {
    name: "Uzbekistan",
    flag: "🇺🇿",
    restrictions: false,
    available: availableToAll,
    iso: "UZ",
  },
  VU: {
    name: "Vanuatu",
    flag: "🇻🇺",
    restrictions: false,
    available: availableToAll,
    iso: "VU",
  },
  VE: {
    name: "Venezuela",
    flag: "🇻🇪",
    restrictions: true,
    available: availableToAll,
    iso: "VE",
  },
  VN: {
    name: "Vietnam",
    flag: "🇻🇳",
    restrictions: false,
    available: availableToAll,
    iso: "VN",
  },
  YE: {
    name: "Yemen",
    flag: "🇾🇪",
    restrictions: true,
    available: availableToAll,
    iso: "YE",
  },
  ZM: {
    name: "Zambia",
    flag: "🇿🇲",
    restrictions: false,
    available: availableToAll,
    iso: "ZM",
  },
  ZW: {
    name: "Zimbabwe",
    flag: "🇿🇼",
    restrictions: true,
    available: availableToAll,
    iso: "ZW",
  },
};

const countries: Record<
  AllCountryCode,
  Record<AllCountryCode, CountryWithAvailability>
> = {
  DE: ALL_COUNTRIES, // Germany
  GB: ALL_COUNTRIES, // United Kingdom
  US: ALL_COUNTRIES, // United States
  AF: ALL_COUNTRIES, // Afghanistan
  PS: ALL_COUNTRIES, // Palestine
  AL: ALL_COUNTRIES, // Albania
  DZ: ALL_COUNTRIES, // Algeria
  AD: ALL_COUNTRIES, // Andorra
  AO: ALL_COUNTRIES, // Angola
  AG: ALL_COUNTRIES, // Antigua and Barbuda
  AR: ALL_COUNTRIES, // Argentina
  AM: ALL_COUNTRIES, // Armenia
  AU: ALL_COUNTRIES, // Australia
  AT: ALL_COUNTRIES, // Austria
  AZ: ALL_COUNTRIES, // Azerbaijan
  BS: ALL_COUNTRIES, // Bahamas
  BH: ALL_COUNTRIES, // Bahrain
  BD: ALL_COUNTRIES, // Bangladesh
  BB: ALL_COUNTRIES, // Barbados
  // FATF BY: ALL_COUNTRIES, // Belarus
  BE: ALL_COUNTRIES, // Belgium
  BZ: ALL_COUNTRIES, // Belize
  BJ: ALL_COUNTRIES, // Benin
  BT: ALL_COUNTRIES, // Bhutan
  BO: ALL_COUNTRIES, // Bolivia
  BA: ALL_COUNTRIES, // Bosnia and Herzegovina
  BW: ALL_COUNTRIES, // Botswana
  BR: ALL_COUNTRIES, // Brazil
  BN: ALL_COUNTRIES, // Brunei
  BG: ALL_COUNTRIES, // Bulgaria
  BF: ALL_COUNTRIES, // Burkina Faso
  BI: ALL_COUNTRIES, // Burundi
  CV: ALL_COUNTRIES, // Cabo Verde
  KH: ALL_COUNTRIES, // Cambodia
  CM: ALL_COUNTRIES, // Cameroon
  CA: ALL_COUNTRIES, // Canada
  CF: ALL_COUNTRIES, // Central African Republic
  TD: ALL_COUNTRIES, // Chad
  CL: ALL_COUNTRIES, // Chile
  CN: ALL_COUNTRIES, // China
  CO: ALL_COUNTRIES, // Colombia
  KM: ALL_COUNTRIES, // Comoros
  CG: ALL_COUNTRIES, // Congo (Republic of the)
  CD: ALL_COUNTRIES, // Congo (Democratic Republic of the)
  CR: ALL_COUNTRIES, // Costa Rica
  CI: ALL_COUNTRIES, // Côte d'Ivoire
  HR: ALL_COUNTRIES, // Croatia
  CU: ALL_COUNTRIES, // Cuba
  CY: ALL_COUNTRIES, // Cyprus
  CZ: ALL_COUNTRIES, // Czech Republic
  DK: ALL_COUNTRIES, // Denmark
  DJ: ALL_COUNTRIES, // Djibouti
  DM: ALL_COUNTRIES, // Dominica
  DO: ALL_COUNTRIES, // Dominican Republic
  EC: ALL_COUNTRIES, // Ecuador
  EG: ALL_COUNTRIES, // Egypt
  SV: ALL_COUNTRIES, // El Salvador
  GQ: ALL_COUNTRIES, // Equatorial Guinea
  ER: ALL_COUNTRIES, // Eritrea
  EE: ALL_COUNTRIES, // Estonia
  SZ: ALL_COUNTRIES, // Eswatini
  ET: ALL_COUNTRIES, // Ethiopia
  FJ: ALL_COUNTRIES, // Fiji
  FI: ALL_COUNTRIES, // Finland
  FR: ALL_COUNTRIES, // France
  GA: ALL_COUNTRIES, // Gabon
  GM: ALL_COUNTRIES, // Gambia
  GE: ALL_COUNTRIES, // Georgia

  GH: ALL_COUNTRIES, // Ghana
  GR: ALL_COUNTRIES, // Greece
  GD: ALL_COUNTRIES, // Grenada
  GT: ALL_COUNTRIES, // Guatemala
  GN: ALL_COUNTRIES, // Guinea
  GW: ALL_COUNTRIES, // Guinea-Bissau
  GY: ALL_COUNTRIES, // Guyana
  HT: ALL_COUNTRIES, // Haiti
  HN: ALL_COUNTRIES, // Honduras
  HU: ALL_COUNTRIES, // Hungary
  IS: ALL_COUNTRIES, // Iceland
  IN: ALL_COUNTRIES, // India
  ID: ALL_COUNTRIES, // Indonesia
  // FATF IR: ALL_COUNTRIES, // Iran
  IQ: ALL_COUNTRIES, // Iraq
  IE: ALL_COUNTRIES, // Ireland
  IL: ALL_COUNTRIES, // Israel
  IT: ALL_COUNTRIES, // Italy
  JM: ALL_COUNTRIES, // Jamaica
  JP: ALL_COUNTRIES, // Japan
  JO: ALL_COUNTRIES, // Jordan
  KZ: ALL_COUNTRIES, // Kazakhstan
  KE: ALL_COUNTRIES, // Kenya
  KI: ALL_COUNTRIES, // Kiribati
  // FATF KP: ALL_COUNTRIES, // Korea (North)
  KR: ALL_COUNTRIES, // Korea (South)
  KW: ALL_COUNTRIES, // Kuwait
  KG: ALL_COUNTRIES, // Kyrgyzstan
  LA: ALL_COUNTRIES, // Laos
  LV: ALL_COUNTRIES, // Latvia
  LB: ALL_COUNTRIES, // Lebanon
  LS: ALL_COUNTRIES, // Lesotho
  LR: ALL_COUNTRIES, // Liberia
  LY: ALL_COUNTRIES, // Libya
  LI: ALL_COUNTRIES, // Liechtenstein
  LT: ALL_COUNTRIES, // Lithuania
  LU: ALL_COUNTRIES, // Luxembourg
  MG: ALL_COUNTRIES, // Madagascar
  MW: ALL_COUNTRIES, // Malawi
  MY: ALL_COUNTRIES, // Malaysia
  MV: ALL_COUNTRIES, // Maldives
  ML: ALL_COUNTRIES, // Mali
  MT: ALL_COUNTRIES, // Malta
  MH: ALL_COUNTRIES, // Marshall Islands
  MR: ALL_COUNTRIES, // Mauritania
  MU: ALL_COUNTRIES, // Mauritius
  MX: ALL_COUNTRIES, // Mexico
  FM: ALL_COUNTRIES, // Micronesia
  MD: ALL_COUNTRIES, // Moldova
  MC: ALL_COUNTRIES, // Monaco
  MN: ALL_COUNTRIES, // Mongolia
  ME: ALL_COUNTRIES, // Montenegro
  MA: ALL_COUNTRIES, // Morocco
  MZ: ALL_COUNTRIES, // Mozambique
  // FATF MM: ALL_COUNTRIES, // Myanmar
  NA: ALL_COUNTRIES, // Namibia
  NR: ALL_COUNTRIES, // Nauru
  NP: ALL_COUNTRIES, // Nepal
  NL: ALL_COUNTRIES, // Netherlands
  NZ: ALL_COUNTRIES, // New Zealand
  NI: ALL_COUNTRIES, // Nicaragua
  NE: ALL_COUNTRIES, // Niger
  NG: ALL_COUNTRIES, // Nigeria
  MK: ALL_COUNTRIES, // North Macedonia
  NO: ALL_COUNTRIES, // Norway
  OM: ALL_COUNTRIES, // Oman
  PK: ALL_COUNTRIES, // Pakistan
  PW: ALL_COUNTRIES, // Palau
  PA: ALL_COUNTRIES, // Panama
  PG: ALL_COUNTRIES, // Papua New Guinea
  PY: ALL_COUNTRIES, // Paraguay
  PE: ALL_COUNTRIES, // Peru
  PH: ALL_COUNTRIES, // Philippines
  PL: ALL_COUNTRIES, // Poland
  PT: ALL_COUNTRIES, // Portugal
  QA: ALL_COUNTRIES, // Qatar
  RO: ALL_COUNTRIES, // Romania
  // FATF RU: ALL_COUNTRIES, // Russia
  RW: ALL_COUNTRIES, // Rwanda
  KN: ALL_COUNTRIES, // Saint Kitts and Nevis
  LC: ALL_COUNTRIES, // Saint Lucia
  VC: ALL_COUNTRIES, // Saint Vincent and the Grenadines
  WS: ALL_COUNTRIES, // Samoa
  SM: ALL_COUNTRIES, // San Marino
  ST: ALL_COUNTRIES, // Sao Tome and Principe
  SA: ALL_COUNTRIES, // Saudi Arabia
  SN: ALL_COUNTRIES, // Senegal
  RS: ALL_COUNTRIES, // Serbia
  SC: ALL_COUNTRIES, // Seychelles
  SL: ALL_COUNTRIES, // Sierra Leone
  SG: ALL_COUNTRIES, // Singapore
  SK: ALL_COUNTRIES, // Slovakia
  SI: ALL_COUNTRIES, // Slovenia
  SB: ALL_COUNTRIES, // Solomon Islands
  SO: ALL_COUNTRIES, // Somalia
  ZA: ALL_COUNTRIES, // South Africa
  SS: ALL_COUNTRIES, // South Sudan
  ES: ALL_COUNTRIES, // Spain
  LK: ALL_COUNTRIES, // Sri Lanka
  SD: ALL_COUNTRIES, // Sudan
  SR: ALL_COUNTRIES, // Suriname
  SE: ALL_COUNTRIES, // Sweden
  CH: ALL_COUNTRIES, // Switzerland
  // FATF SY: ALL_COUNTRIES, // Syria
  TJ: ALL_COUNTRIES, // Tajikistan
  TZ: ALL_COUNTRIES, // Tanzania
  TH: ALL_COUNTRIES, // Thailand
  TL: ALL_COUNTRIES, // Timor-Leste
  TG: ALL_COUNTRIES, // Togo
  TO: ALL_COUNTRIES, // Tonga
  TT: ALL_COUNTRIES, // Trinidad and Tobago
  TN: ALL_COUNTRIES, // Tunisia
  TR: ALL_COUNTRIES, // Turkey
  TM: ALL_COUNTRIES, // Turkmenistan
  TV: ALL_COUNTRIES, // Tuvalu
  UG: ALL_COUNTRIES, // Uganda
  // FATF UA: ALL_COUNTRIES, // Ukraine
  AE: ALL_COUNTRIES, // United Arab Emirates
  UY: ALL_COUNTRIES, // Uruguay
  UZ: ALL_COUNTRIES, // Uzbekistan
  VU: ALL_COUNTRIES, // Vanuatu
  VE: ALL_COUNTRIES, // Venezuela
  VN: ALL_COUNTRIES, // Vietnam
  YE: ALL_COUNTRIES, // Yemen
  ZM: ALL_COUNTRIES, // Zambia
  ZW: ALL_COUNTRIES, // Zimbabwe
};
