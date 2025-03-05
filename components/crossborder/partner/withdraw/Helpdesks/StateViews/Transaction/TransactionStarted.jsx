import Loader from '@/tokenPayLib/components/UI/Loader';
import React from 'react'

export default function TransactionStarted() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-16">
      <div className="">
        Bitte warten Sie auf die Zahlungsadresse des OTC Partners
      </div>
      <Loader></Loader>
    </div>
  );
}