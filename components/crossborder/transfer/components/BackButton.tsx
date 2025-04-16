import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useTranslation } from "next-i18next";

interface BackButtonProps {
  clearData?: () => void;
  onBack: () => void;
}

export default function BackButton({ clearData, onBack }: BackButtonProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <button
      onClick={() => {
        if (clearData) {
          clearData();
        }
        onBack();
      }}
      className="flex relative z-[10] items-center text-uhuBlue hover:text-blue-700 mb-4"
    >
      <FiArrowLeft className="mr-2" />
      {tCrossborder("transferSection.back")}
    </button>
  );
} 