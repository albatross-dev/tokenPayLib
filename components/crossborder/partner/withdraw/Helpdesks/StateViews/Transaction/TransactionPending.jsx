import Loader from '@/tokenPayLib/components/UI/Loader';
import React from 'react'

export default function TransactionPending() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-16">
      <div className="">Warten auf bestätigung der Zahlung</div>
      <Loader></Loader>
    </div>
  );
}