import React from 'react';
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useTranslation } from "next-i18next";

export default function SuccessView() {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="max-w-96 w-full mb-16 mt-4 flex items-center flex-col justify-center gap-4 h-[30rem]">
      <IoShieldCheckmarkSharp className="text-green-500 w-16 h-16" />
      <div className="text-2xl text-center text-gray-700 font-bold">
        {tCrossborder("withdraw.stasis.successfullTransaction")}
      </div>
      <div className="text-center text-gray-600">
        {tCrossborder("withdraw.stasis.initiatedInfo")}
      </div>
    </div>
  );
} 