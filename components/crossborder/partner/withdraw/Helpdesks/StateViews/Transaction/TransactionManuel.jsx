import React from 'react'

export default function TransactionManual() {
  <div className="flex flex-col items-center justify-center mt-8 gap-2">
    <div className="font-bold">
      Die Zahlung kann nicht automatisch verarbeitet werden.
    </div>
    <div>Wir setzen uns mit Ihnen per Email in verbindung</div>
    <div
      onClick={handleNewTransaction}
      className="cursor-pointer bg-uhuBlue rounded py-1 px-2 font-bold text-white"
    >
      Neue Transaktion
    </div>
  </div>;
}