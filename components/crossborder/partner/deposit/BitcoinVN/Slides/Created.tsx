import React from 'react';
import { useTranslation } from "next-i18next";
import { CreatedProps } from './types';

export function Created({ transaction }: CreatedProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-uhuBlue text-center">
        {tCrossborder("deposit.bitcoinvn.created.heading")}
      </h2>
      <div>
        <p>
          <strong>{tCrossborder("deposit.bitcoinvn.created.transactionId")}</strong>{" "}
          {transaction.UUID}
        </p>
        {tCrossborder("deposit.bitcoinvn.created.instructions1")}
        {transaction.depositAmount} {transaction.depositMethod}
        {tCrossborder("deposit.bitcoinvn.created.instructions2")}
        {transaction.shortId}
        {tCrossborder("deposit.bitcoinvn.created.instructions3")}

        <div>
          <p>
            <strong>{tCrossborder("deposit.bitcoinvn.created.bank")}</strong>{" "}
            {transaction.bank}
          </p>
          <p>
            <strong>{tCrossborder("deposit.bitcoinvn.created.accountHolder")}</strong>{" "}
            {transaction.accountHolder}
          </p>
          <p>
            <strong>{tCrossborder("deposit.bitcoinvn.created.accountNumber")}</strong>{" "}
            {transaction.accountNumber}
          </p>
          <p>
            <strong>{tCrossborder("deposit.bitcoinvn.created.referenceCode")}</strong>{" "}
            {transaction.shortId}
          </p>
        </div>
      </div>
    </div>
  );
} 