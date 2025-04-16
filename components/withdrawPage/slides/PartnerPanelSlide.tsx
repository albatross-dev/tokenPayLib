import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { PartnerPanelSlideProps } from '../types';
import TransferPanel from '../../crossborder/transfer/components/TransferPanel';
import { useTranslation } from 'next-i18next';
const PartnerPanelSlide: React.FC<PartnerPanelSlideProps> = ({
  selectedMethod,
  amount,
  account,
  user,
  selectedCountry,
  preferredStableCoin,
  back
}) => {
  const { t: tCrossborder } = useTranslation('crossborder');
  return (
    <div>
      <div className="relative z-[10] text-darkBlue flex flex-col gap-4 max-w-4xl mx-auto">
        <div className="p-4">
          <button
            onClick={back}
            className="flex items-center text-uhuBlue hover:text-blue-700 mb-4"
          >
            <FiArrowLeft className="mr-2" />
            {tCrossborder('withdrawPage.backButton')}
          </button>
        </div>
        <TransferPanel
          method={selectedMethod}
          amount={parseFloat(amount)}
          account={account}
          user={user}
          selectedCountry={selectedCountry}
          selectedMethod={selectedMethod}
          preferredStableCoin={preferredStableCoin}
        />
      </div>
    </div>
  );
};

export default PartnerPanelSlide; 