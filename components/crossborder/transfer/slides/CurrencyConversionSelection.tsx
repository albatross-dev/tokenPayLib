import React from 'react';
import { SwiperClass } from "swiper/react";
import BackButton from '../components/BackButton';
import FiatReceivingSelector from '../components/FiatReceivingSelector';
import { Country, PaymentTypesArray } from '../../../../types/payload-types';

interface CurrencyConversionSelectionProps {
  selectedCountry: Country | null;
  availableMethods: PaymentTypesArray;
  setSelectedMethod: (method: PaymentTypesArray[number] | null) => void;
  setAvailableMethods: (methods: PaymentTypesArray) => void;
  handleSetPayoutCurrency: (currency: string) => void;
  swiperInstance: SwiperClass | null;
}

export default function CurrencyConversionSelection({
  selectedCountry,
  availableMethods,
  setSelectedMethod,
  setAvailableMethods,
  handleSetPayoutCurrency,
  swiperInstance
}: CurrencyConversionSelectionProps) {
  return (
    <div className="relative z-[10] p-4 flex flex-col gap-4 max-w-4xl mx-auto">
      <BackButton />
      {selectedCountry && (
        <FiatReceivingSelector
          availableMethods={availableMethods}
          allMethods={selectedCountry?.paymentTypes}
          setSelectedMethod={setSelectedMethod}
          setAvailableMethods={setAvailableMethods}
          setPayoutCurrency={handleSetPayoutCurrency}
          swiperInstance={swiperInstance}
          nextSlide={3}
        />
      )}
    </div>
  );
} 