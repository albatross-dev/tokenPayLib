import React from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FiatTransaction } from "../../../../types/payload-types";

export default function KoyweAwaitingFiatPayment({
  transaction,
  refetch,
}: {
  transaction: FiatTransaction;
  refetch: () => void;
}) {
  const { t: tTransaction } = useTranslation("transaction");

  return (
    <div>
      <div>
        {transaction.burnAddress && (
          <div>
            <div>{tTransaction("koyweAwaitingFiatPayment.description")}</div>
            <p className="text-xl font-bold bg-gray-100 rounded p-4 m-2">{transaction.burnAddress}</p>
          </div>
        )}

        {transaction.providedAction && !transaction.burnAddress && (
          <div className="flex flex-col ">
            <div className="text-sm text-gray-500">{tTransaction("koyweAwaitingFiatPayment.payNowDescription")}</div>
            <div className="pt-4">
              <Link className="mt-4 btn btn-primary" href={transaction.providedAction}>
                {tTransaction("koyweAwaitingFiatPayment.payNow")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
