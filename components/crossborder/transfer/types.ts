import { Currency } from "../../../types/currency.types";
import { Consumer, Country, PaymentTypesArray, Vendor } from "../../../types/payload-types";

export interface RouterQuery {
  continent?: string;
  country?: string;
  stableCoin?: string;
  payoutCoin?: string;
}

export interface CurrencyDisplayProps {
  selectedCurrency: Currency | null;
  mainCurrencySymbol: string;
  onCurrencySelected: (currency: Currency, max: number) => void;
}

export interface MethodSelectorProps {
  methods: PaymentTypesArray;
  selectable: boolean;
  amount: number;
  exchangeRate: number;
  loadedExchangeRate: boolean;
  setSelectedMethod: (method: PaymentTypesArray[number] | null) => void;
  selectedMethod: PaymentTypesArray[number] | null;
  sendingCurrency: any; // Replace with proper type from STANDARD_STABLE_MAP
  finalCurrency: any; // Replace with proper type from FIAT_INFO_MAP
}

export interface BackButtonProps {
  clearData?: () => void;
}

export interface TransferPanelProps {
  method: PaymentTypesArray[number];
  amount: number;
  account: any; // Replace with proper type from thirdweb
  user: Consumer | Vendor;
  selectedCountry: Country;
  selectedMethod: PaymentTypesArray[number];
  preferredStableCoin: string;
} 