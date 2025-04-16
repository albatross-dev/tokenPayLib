import React from 'react';
import { SwiperClass } from "swiper/react";
import { useTranslation } from "next-i18next";
import BackButton from '../components/BackButton';
import FiatBalanceSelector from '../components/FiatBalanceSelector';
import { Country, PaymentTypesArray } from '../../../../types/payload-types';

interface BalanceSelectionProps {
  selectedCountry: Country | null;
  availableMethods: PaymentTypesArray;
  setAvailableMethods: (methods: PaymentTypesArray) => void;
  handlePreferredStableCoin: (coin: string) => void;
  swiperInstance: SwiperClass | null;
}

export default function BalanceSelection({
  selectedCountry,
  availableMethods,
  setAvailableMethods,
  handlePreferredStableCoin,
  swiperInstance
}: BalanceSelectionProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="relative z-[10] p-4 flex flex-col gap-4 max-w-4xl mx-auto">
      <BackButton onBack={() => swiperInstance?.slideTo(0)} />
      <h2 className="text-2xl">
        {tCrossborder("transferSection.ask_for_balance")}
      </h2>
      {selectedCountry && (
        <FiatBalanceSelector
          availableMethods={selectedCountry?.paymentTypes}
          setAvailableMethods={setAvailableMethods}
          setPreferredStableCoin={handlePreferredStableCoin}
          swiperInstance={swiperInstance}
          nextSlide={2}
        />
      )}
    </div>
  );
} 