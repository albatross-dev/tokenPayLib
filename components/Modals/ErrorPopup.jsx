// src/components/ErrorPopup.js
import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild
} from "@headlessui/react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import { HiChevronDown, HiChevronUp, HiExclamationTriangle } from "react-icons/hi2";

const ErrorPopup = ({ isOpen, closeModal, errorMessage }) => {
  return (
    <Transition appear show={isOpen?true:false} as={Fragment}>
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
            <DialogPanel className="max-w-md w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 flex items-center"
              >
                <HiExclamationTriangle className="h-6 w-6 text-red-500 mr-2" />
                Fehler
              </DialogTitle>
              <div className="my-6">
                <p className="text-base leading-relaxed">
                  {errorMessage?.message}
                </p>
              </div>

              <div className="mt-2 rounded-xl bg-red-100">
                <Disclosure as="div" className="w-full max-w-md">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="w-full  flex justify-between items-center p-4">
                        {" "}
                        <p className="text-sm text-red-400 font-bold">
                          Error {errorMessage?.error.code}
                        </p>
                        {open ? (<HiChevronUp className="h-4 w-4 text-red-400" />) : (<HiChevronDown className="h-4 w-4 text-red-400" />)}
                      </DisclosureButton>
                      <div className="overflow-hidden">
                        <AnimatePresence>
                          {open && (
                            <DisclosurePanel
                              static
                              as={motion.div}
                              initial={{ opacity: 0, y: -24 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -24 }}
                              transition={{ duration: 0.2, ease: easeOut }}
                              className="origin-top"
                            >
                              <p className="text-sm text-red-400 mb-4 px-4">
                                {errorMessage?.error.message}
                              </p>
                            </DisclosurePanel>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </Disclosure>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Schließen
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ErrorPopup;
