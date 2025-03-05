import React from 'react'

export default  function TransactionDone({handleNewTransaction}) {
  return (
    <div className="max-w-4xl mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
        Transaktion erfolgreich
      </h1>
      <p className="text-center">
        Ihre Transaktion wurde erfolgreich durchgeführt. Sie sollten in Kürze
        das Geld auf dem Gewünschten Konto haben.
      </p>
      <div className="flex items-center justify-center mt-6">
        <div
          onClick={handleNewTransaction}
          className="cursor-pointer bg-uhuBlue rounded py-1 px-2 font-bold text-white"
        >
          Neue Transaktion
        </div>
      </div>
    </div>
  );
}