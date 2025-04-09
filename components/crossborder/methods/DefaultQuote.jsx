import React from 'react'

export default function DefaultQuote({key, method, amount, selectedMethod, handleSelect, selectable}) {
  const minAmountDifference = method.minAmount > amount ? method.minAmount - amount : 0;
  const isDisabled = selectable === false || minAmountDifference > 0;

  return (
    <div
    key={key}
    className={`p-4 rounded-md flex justify-between items-center ${
      isDisabled ? "bg-gray-100 cursor-not-allowed" : " cursor-pointer"
    } ${selectedMethod?.name === method.name ? "bg-uhuBlue text-white" : "bg-uhuGray hover:bg-gray-50"}`}
    onClick={() => !isDisabled && handleSelect(method)}
  >
    <div className="flex-1 flex justify-between gap-4 items-center">
      <h3 className="text-lg font-semibold mb-1">{method.name}</h3>
      <div className="flex items-center justify-end gap-2">
    
     
      {minAmountDifference > 0 && (
        <p className="text-sm text-red-500">
          Fügen Sie {minAmountDifference.toFixed(2)} hinzu, um den Mindestbetrag zu erfüllen.
        </p>
      )}
      <p>{method.recommended && <span className="text-sm text-green-600 font-bold">(Empfohlen)</span>}</p>
       {!!method.fee && <p className="font-bold">
         {method.fee}% 
      </p>}
      </div>
    </div>
  </div>
  )
}
