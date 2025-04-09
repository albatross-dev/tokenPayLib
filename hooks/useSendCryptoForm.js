import { useState } from "react";

export const useSendCryptoForm = (tAccount) => {
  const [errors, setErrors] = useState({});

  const validate = (selectedToken, amount, targetAddress, maxAmount) => {
    let newErrors = {};

    if (!selectedToken) {
      newErrors.selectedToken = tAccount("sendCrypto.errors.selectToken");
    }

    if (!amount || amount <= 0) {
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

  const setFieldError = (field, error) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const clearFieldError = (field) => {
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