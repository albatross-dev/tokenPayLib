import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { HiExclamationTriangle, HiCheckCircle, HiInformationCircle } from "react-icons/hi2";

export const MODAL_TYPE_ERROR = "error";
export const MODAL_TYPE_SUCCESS = "success";
export const MODAL_TYPE_INFO = "info";

const UniversalModal = ({ isOpen, closeModal, type, title, message }) => {
  const types = {
    error: {
      icon: <HiExclamationTriangle className="h-6 w-6 text-red-500 mr-2" />,
      titleColor: "text-red-900",
      bgColor: "bg-red-100",
      buttonBgColor: "bg-red-100 hover:bg-red-200",
      buttonTextColor: "text-red-900",
    },
    success: {
      icon: <HiCheckCircle className="h-6 w-6 text-green-500 mr-2" />,
      titleColor: "text-green-900",
      bgColor: "bg-green-100",
      buttonBgColor: "bg-green-100 hover:bg-green-200",
      buttonTextColor: "text-green-900",
    },
    info: {
      icon: <HiInformationCircle className="h-6 w-6 text-blue-500 mr-2" />,
      titleColor: "text-blue-900",
      bgColor: "bg-blue-100",
      buttonBgColor: "bg-blue-100 hover:bg-blue-200",
      buttonTextColor: "text-blue-900",
    },
  };

  const currentType = types[type] || types.info; // Default to "info" if type is undefined

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
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

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="max-w-md w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle
                as="h3"
                className={`text-lg font-medium leading-6 flex items-center ${currentType.titleColor}`}
              >
                {currentType.icon}
                {title}
              </DialogTitle>
              <div className="my-4">
                <p className="text-base text-gray-700">{message}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${currentType.buttonBgColor} ${currentType.buttonTextColor}`}
                  onClick={closeModal}
                >
                  Schließen
                </button>
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UniversalModal;
