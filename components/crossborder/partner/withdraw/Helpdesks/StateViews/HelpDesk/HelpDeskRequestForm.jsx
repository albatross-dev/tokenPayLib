import { useTranslation } from 'next-i18next';
import React from 'react'

export default function HelpDeskRequestForm({textareaContent, error, setTextareaContent, handleStartTransaction}) {

  const { t: tCrossborder } = useTranslation("crossborder");
  
    return (
      <div className="flex flex-col gap-4 mt-8">
        <div className="text-2xl font-bold">{tCrossborder("withdraw.helpdeskRequest.transactionDetails")}</div>
        <div>
          <p>{tCrossborder("withdraw.helpdeskRequest.receiver")}</p>
          <ul className="list-disc list-inside">
            <li>{tCrossborder("withdraw.helpdeskRequest.name")}</li>
            <li>{tCrossborder("withdraw.helpdeskRequest.iban")}</li>
            <li>{tCrossborder("withdraw.helpdeskRequest.bank")}</li>
          </ul>
        </div>
        <textarea
          value={textareaContent}
          onChange={(e) => setTextareaContent(e.target.value)}
          className="w-full h-32 border rounded p-2"
          placeholder={tCrossborder("withdraw.helpdeskRequest.placeholderDetails")}
        ></textarea>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <button
          onClick={handleStartTransaction}
          className="bg-uhuBlue text-white py-2 px-4 rounded font-bold hover:bg-uhuBlue-dark mt-4"
        >
          {tCrossborder("withdraw.helpdeskRequest.noAccessInfo")}
        </button>
      </div>
    );
  }