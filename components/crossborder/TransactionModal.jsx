import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsX } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import AddressDisplay from "@/tokenPayLib/components/UI/AddressDisplay";

const TransactionModal = ({ isOpen, closeModal, transactionData }) => {
  if (!transactionData) return null;

  delete transactionData.vendor;
  delete transactionData.requestChatId;
  delete transactionData.requestMessageId;

  const { t } = useTranslation("common");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* Modal content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 flex justify-between items-center text-gray-900"
                >
                  {t("PaymentModal.transaction_details")}
                  <BsX
                    className="w-6 h-6 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>
                <div className="mt-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* ... additional rows */}
                      {/* Dynamically create rows for items */}
                      {Object.keys(transactionData).map((key, index) => (
                        <tr key={index}>
                          <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                            {t(key)}{" "}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                            {typeof transactionData[key] === "string" ? (
                              transactionData[key]?.startsWith("0x") ? (
                                <AddressDisplay
                                  value={transactionData[key]}
                                  concat={true}
                                />
                              ) : (
                                transactionData[key]
                              )
                            ) : (
                              transactionData[key]
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TransactionModal;
