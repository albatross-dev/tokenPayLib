import React from "react";
import { useTranslation } from "next-i18next";

interface DepositErrorProps {
  errorType: "helpdesk" | "unavailable";
}

export default function DepositError({ errorType }: DepositErrorProps) {
  const { t } = useTranslation("crossborder");

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="text-lg font-medium">
        {t(`deposit.errors.${errorType}`)}
      </div>
    </div>
  );
} 