import { Swiper } from 'swiper';
import { Consumer, Country, Maintenance, PaymentTypesArray, Vendor } from '../../types/payload-types';
import { Account } from 'thirdweb/wallets';

export interface WithdrawPageProps {
  maintenance?: Maintenance
}

export interface SlideProps {
  swiperInstance: Swiper | null;
  goToSlide: (index: number) => void;
  back: () => void;
}

export interface BalanceSelectionSlideProps extends SlideProps {
  selectedCountry: Country;
  setAvailableMethods: (methods: PaymentTypesArray) => void;
  setPreferredStableCoin: (coin: string) => void;
}

export interface CurrencyConversionSlideProps extends SlideProps {
  selectedCountry: Country;
  availableMethods: PaymentTypesArray;
  setSelectedMethod: (method: PaymentTypesArray[number]) => void;
  setAvailableMethods: (methods: PaymentTypesArray) => void;
  setPayoutCurrency: (currency: string) => void;
}

export interface TransactionDetailsSlideProps extends SlideProps {
  selectedCountry: Country;
  selectedCurrency: any; // Replace with proper type
  preferredStableCoin: string;
  maxAmount: number;
  amount: string;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  availableMethods: PaymentTypesArray;
  exchangeRate: number;
  loadedExchangeRate: boolean;
  setSelectedMethod: (method: PaymentTypesArray[number]) => void;
  selectedMethod: PaymentTypesArray[number] | null;
  clearData: () => void;
}

export interface PartnerPanelSlideProps extends SlideProps {
  selectedMethod: PaymentTypesArray[number];
  amount: string;
  account: Account;
  user: Consumer | Vendor;
  selectedCountry: Country;
  preferredStableCoin: string;
} 