import React from 'react';
import { useTranslation } from "next-i18next";
import { IoShieldCheckmarkSharp, IoCopy } from "react-icons/io5";
import { PaymentInfo } from  '../../../universal/stasis.types';

interface SuccessProps {
  amount: number;
  reference: string;
  paymentInfo: PaymentInfo;
}

export function Success({ amount, reference, paymentInfo }: SuccessProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="flex items-center flex-col justify-center gap-4 h-[30rem]">
      <IoShieldCheckmarkSharp className="text-green-500 w-16 h-16" />
      <div className="text-2xl text-center text-gray-700 font-bold">
        {tCrossborder("deposit.stasis.success.heading")}
      </div>
      <div className="text-center text-gray-600">
        <div className="w-full flex flex-col mt-4 gap-2">
          <h3 className="text-lg font-semibold mb-4">
            {tCrossborder("deposit.stasis.success.infoHeading")}
          </h3>

          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.amount")}</span> {amount} EUR
            </p>
          </div>

          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.bankName")}</span>{" "}
              {paymentInfo.bank_name}
            </p>
          </div>

          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.bankCountry")}</span>{" "}
              {paymentInfo.bank_country}
            </p>
          </div>

          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.bic")}</span> {paymentInfo.bank_code}
            </p>
          </div>

          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.iban")}</span>{" "}
              {paymentInfo.bank_account}
            </p>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => navigator.clipboard.writeText(paymentInfo.bank_account)}
            >
              <IoCopy className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.referenceCode")}</span> {reference}
            </p>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => navigator.clipboard.writeText(reference)}
            >
              <IoCopy className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4 mt-5">
            {tCrossborder("deposit.stasis.success.instructions")}
          </p>
        </div>
      </div>
    </div>
  );
} 