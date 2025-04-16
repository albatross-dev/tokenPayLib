import React from 'react';
import { useTranslation } from 'next-i18next';
import { BalanceSelectionSlideProps } from '../types';
import FiatBalanceSelector from '../../crossborder/transfer/components/FiatBalanceSelector';

const BalanceSelectionSlide: React.FC<BalanceSelectionSlideProps> = ({
  selectedCountry,
  setAvailableMethods,
  setPreferredStableCoin,
  swiperInstance,
}) => {
  const { t: tCrossborder } = useTranslation('crossborder');

  return (
    <div className="relative z-[10] p-4 flex flex-col gap-4 max-w-4xl mx-auto">
      <h2 className="text-2xl">
        {tCrossborder('withdrawPage.balanceSelection.heading')}
      </h2>
      {selectedCountry && (
        <FiatBalanceSelector
          availableMethods={selectedCountry?.paymentTypes}
          setAvailableMethods={setAvailableMethods}
          setPreferredStableCoin={(coin) => {
            if (coin) {
              console.log('coin', coin);
              setPreferredStableCoin(coin);
            }
          }}
          swiperInstance={swiperInstance}
          transfer={false}
          nextSlide={1}
        />
      )}
    </div>
  );
};

export default BalanceSelectionSlide; 