import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsX } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import AddressDisplay from "../UI/AddressDisplay";
import { FiatTransaction } from "../../types/payload-types";

interface TransactionModalProps {
  isOpen: boolean;
  closeModal: () => void;
  transactionData: FiatTransaction | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  closeModal,
  transactionData,
}) => {
  if (!transactionData) return null;

  delete transactionData.vendor;
  delete transactionData.requestChatId;
  delete transactionData.requestMessageId;

  const { t } = useTranslation("common");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {/* Overlay */}
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

        {/* Modal content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 flex justify-between items-center text-gray-900"
                >
                  {t("PaymentModal.transactionDetails")}
                  <BsX
                    className="w-6 h-6 cursor-pointer"
                    onClick={closeModal}
                  />
                </DialogTitle>
                <div className="mt-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* ... additional rows */}
                      {/* Dynamically create rows for items */}
                      {Object.entries(transactionData).map(
                        ([key, value]: [string, any], index) => (
                          <tr key={index}>
                            <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                              {t(key)}{" "}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                              {typeof value === "string" ? (
                                value?.startsWith("0x") ? (
                                  <AddressDisplay value={value} concat={true} />
                                ) : (
                                  value
                                )
                              ) : (
                                value
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TransactionModal;
