import React from 'react'

export default function HelpDeskRequestForm({textareaContent, error, setTextareaContent, handleStartTransaction}) {
    return (
      <div className="flex flex-col gap-4 mt-8">
        <div className="text-2xl font-bold">Transaktionsdetails</div>
        <div>
          <p>Empfänger:</p>
          <ul className="list-disc list-inside">
            <li>Name</li>
            <li>IBAN</li>
            <li>Bank</li>
          </ul>
        </div>
        <textarea
          value={textareaContent}
          onChange={(e) => setTextareaContent(e.target.value)}
          className="w-full h-32 border rounded p-2"
          placeholder="Geben Sie hier weitere Details ein..."
        ></textarea>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <button
          onClick={handleStartTransaction}
          className="bg-uhuBlue text-white py-2 px-4 rounded font-bold hover:bg-uhuBlue-dark mt-4"
        >
          Anfrage senden
        </button>
      </div>
    );
  }