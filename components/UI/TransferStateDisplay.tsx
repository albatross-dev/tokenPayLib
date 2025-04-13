import React from "react";

export const stateDict = {
  DepositPending: "Einzahlung ausstehend",
  DepositConfirmed: "Einzahlung bestätigt",
  Processing: "Verarbeitung",
  Complete: "Abgeschlossen",
  Rejected: "Abgelehnt",
  Canceled: "Abgebrochen",
  DepositMismatch: "Einzahlung nicht übereinstimmend",
  new: "Neu",
  done: "Abgeschlossen",
};

export default function StateDisplay({ state }: { state: string }): JSX.Element {
  return (
    <div className="bg-uhuBlue rounded px-2 py-1 text-white font-bold">
      {stateDict[state]}
    </div>
  );
}