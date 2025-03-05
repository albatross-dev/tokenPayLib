import AddressDisplay from '@/tokenPayLib/components/UI/AddressDisplay'
import LoadingButton from '@/tokenPayLib/components/UI/LoadingButton'
import React from 'react'

export default function TransactionPaymentPending({transaction, handleSend, isLoading, errorMessage}) {
  return (
    <div className="max-w-4xl mx-auto p-6 w-full">
    <h1 className="text-2xl font-bold mb-6 text-uhuBlue text-center">
      Transaktion abschließen
    </h1>
    <div className="flex flex-col gap-2 bg-uhuGray p-4 rounded-lg shadow-sm">
      <div>Senden Sie</div>
      <div className="font-bold text-6xl text-gray-600">
        {transaction?.amount} {transaction?.currencyName}
      </div>
      <div>An unseren OTC Partner unter der Addresse</div>
      <div className="">
        <AddressDisplay
          concat={true}
          value={transaction?.burnAddress}
          className="bg-gray-200 rounded p-2 inline-flex items-center justify-center"
        />
      </div>
    </div>
    <div className="flex flex-col items-end justify-end mt-6">
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage.message}</div>}
      <LoadingButton
        openError={() => {}}
        isLoading={isLoading}
        onClick={handleSend}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Transaktion abschließen
      </LoadingButton>
    </div>
  </div>
  )
}
