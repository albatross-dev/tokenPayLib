import { TFunction } from "i18next";
import { useState } from "react";
import { SimpleToken } from "../types/token.types";

export interface Errors {
  selectedToken?: string;
  amount?: string;
  targetAddress?: string;
  [key: string]: string | undefined;
}

interface UseSendCryptoFormProps {
  tAccount: TFunction;
}

interface UseSendCryptoFormReturn {
  errors: Errors;
  validate: (
    selectedToken: SimpleToken | null,
    amount: string | number,
    targetAddress: string,
    maxAmount?: number
  ) => boolean;
  setFieldError: (field: string, error: string) => void;
  clearFieldError: (field: string) => void;
}

export const useSendCryptoForm = ({
  tAccount,
}: UseSendCryptoFormProps): UseSendCryptoFormReturn => {
  const [errors, setErrors] = useState<Errors>({});

  const validate = (
    selectedToken: SimpleToken | null,
    amount: string | number,
    targetAddress: string,
    maxAmount?: number
  ): boolean => {
    const newErrors: Errors = {};

    if (!selectedToken) {
      newErrors.selectedToken = tAccount("sendCrypto.errors.selectToken");
    }

    if (!amount || Number(amount) <= 0) {
      newErrors.amount = tAccount("sendCrypto.errors.enterAmount");
    } else if (maxAmount && Number(amount) > maxAmount) {
      newErrors.amount = tAccount("sendCrypto.errors.insufficientBalance");
    }

    if (!targetAddress || !/^0x[a-fA-F0-9]{40}$/.test(targetAddress)) {
      newErrors.targetAddress = tAccount("sendCrypto.errors.validWallet");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setFieldError = (field: string, error: string): void => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const clearFieldError = (field: string): void => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    errors,
    validate,
    setFieldError,
    clearFieldError,
  };
};
