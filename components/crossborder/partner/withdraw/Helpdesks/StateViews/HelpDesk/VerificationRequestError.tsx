import { useTranslation } from 'next-i18next';
import React from 'react'

export default function VerificationRequestError() {

  const { t: tCrossborder } = useTranslation("crossborder");
  
  return (
    <div className="mt-16 flex items-center justify-center">
      <div>{tCrossborder("withdraw.otcStates.error")}</div>
    </div>
  );
}