import React, { useState, Fragment, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import numberWithZeros from "../../utilities/math/numberWithZeros";
import { SimpleToken } from "../../types/token.types";
import { CheckoutSession } from "@/tokenPayLib/types/payload-types";

interface Token {
  symbol: string;
  contract: {
    decimals: number;
  };
}

interface Router {
  stableCoinShortName: string;
}

interface ExchangeModalProps {
  show: boolean;
  closeModal: () => void;
  token: SimpleToken | null;
  handleExchange: (amount: number) => void;
  maxAmount: number | string;
  checkoutSession?: CheckoutSession | null;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({
  show,
  closeModal,
  token,
  handleExchange,
  maxAmount,
  checkoutSession = null,
}) => {
  const [amount, setAmount] = useState<number>(Number(maxAmount) || 1);

  const { t } = useTranslation("common");

  useEffect(() => {
    setAmount((Number(maxAmount) || 1) / numberWithZeros(token?.decimals || 1));
  }, [maxAmount, token?.decimals]);

  const handleMaxClick = (): void => {
    setAmount((Number(maxAmount) || 1) / numberWithZeros(token?.decimals || 1));
  };

  const handleConfirmExchange = (): void => {
    handleExchange(amount * numberWithZeros(token?.decimals || 1));
    closeModal();
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="max-w-xl w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {`${t("convert")} ${token?.id}`}
              </DialogTitle>

              <p className="text-gray-700">
                {t("enter_amount_exchange", {
                  currency: (checkoutSession?.router as Router)?.stableCoinShortName || "usdc",
                })}
              </p>

              <input
                type="number"
                className="mt-2 p-2 w-full border rounded-md"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                max={maxAmount}
              />
              <div className="font-bold text-sm ">{t("fees")}</div>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={handleMaxClick}
                >
                  {t("max")}
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={handleConfirmExchange}
                >
                  {t("confirm")}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ExchangeModal;
