import React from "react";
import { LoadingButtonError } from "../../../UI/LoadingButton";
import { LoadingButtonStates } from "../../../UI/LoadingButton";
import { useTranslation } from "next-i18next";
import { FiatTransaction } from "../../../../types/payload-types";
import { useState } from "react";
import Link from "next/link";

export default function KoyweAwaitingFiatPayment({
  transaction,
  refetch,
}: {
  transaction: FiatTransaction;
  refetch: () => void;
}) {
  const { t: tTransaction } = useTranslation("transaction");
  const [isLoading, setIsLoading] = useState<LoadingButtonStates>("normal");
  const [error, setError] = useState<LoadingButtonError | null>(null);
  return (
    <div>
      <div>
        {transaction.burnAddress && (
          <div>
            <div>
              Bitte bezahle die angezeigte Summe an den angezeigten Adresse.
            </div>
            <p className="text-xl font-bold bg-gray-100 rounded p-4 m-2">
              {transaction.burnAddress}
            </p>
          </div>
        )}

        {transaction.providedAction && !transaction.burnAddress && (
          <div className="flex flex-col ">
            <div className="text-sm text-gray-500">
              Klicken Sie auf den Button um die Zahlung zu bestätigen um auf die
              Zahlungseite zu gelangen.
            </div>
            <div className="pt-4">
              <Link
                className="mt-4 btn btn-primary"
                href={transaction.providedAction}
              >
                Jetzt bezahlen
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
