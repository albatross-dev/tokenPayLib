import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { CurrencyConversionSlideProps } from '../types';
import FiatReceivingSelector from '../../crossborder/transfer/components/FiatReceivingSelector';

const CurrencyConversionSlide: React.FC<CurrencyConversionSlideProps> = ({
  selectedCountry,
  availableMethods,
  setSelectedMethod,
  setAvailableMethods,
  setPayoutCurrency,
  swiperInstance,
  goToSlide,
  back
}) => {
  return (
    <div className="relative z-[10] p-4 flex flex-col gap-4 max-w-4xl mx-auto">
      <button
        onClick={back}
        className="flex items-center text-uhuBlue hover:text-blue-700 mb-4"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>
      {selectedCountry && (
        <FiatReceivingSelector
          availableMethods={availableMethods}
          allMethods={selectedCountry?.paymentTypes}
          setSelectedMethod={setSelectedMethod}
          setAvailableMethods={setAvailableMethods}
          setPayoutCurrency={setPayoutCurrency}
          swiperInstance={swiperInstance}
          nextSlide={2}
        />
      )}
    </div>
  );
};

export default CurrencyConversionSlide; 