// src/components/ErrorPopup.tsx
import React, { Fragment, useEffect, useState, ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
} from "@headlessui/react";
import { createRoot } from "react-dom/client";

import { AnimatePresence, easeOut, motion } from "framer-motion";
import {
  HiChevronDown,
  HiChevronUp,
  HiExclamationTriangle,
  HiInformationCircle,
} from "react-icons/hi2";
import { useTranslation } from "next-i18next"; // Or your i18n hook

// Type definitions
interface ErrorObject {
  code?: string | number;
  message?: string;
}

export interface ErrorDetails {
  message?: string | null;
  component?: ReactNode;
  error?: ErrorObject;
}

export interface AdditionalInfo {
  neutral?: boolean;
  closeTimeout?: number;
  actionOnTimeout?: () => void;
  closingButtonText?: string;
}

interface ErrorPopupProps {
  titleKey?: string | null;
  titleText?: string | null;
  errorDetails: ErrorDetails;
  onClose: () => void;
  action?: {
    buttonText: string;
    onAction: () => void;
  };
  additionalInfo?: AdditionalInfo;
}

// This component is now designed to be rendered imperatively
const ErrorPopup: React.FC<ErrorPopupProps> = ({
  titleKey,
  titleText,
  errorDetails,
  onClose,
  action,
  additionalInfo,
}) => {
  const { t } = useTranslation("common"); // Assuming 'common' namespace for generic terms
  const [isOpen, setIsOpen] = useState(true); // Control open state internally
  const [isActionClicked, setIsActionClicked] = useState(false);

  // Extract details safely
  const message = errorDetails?.message || "";
  const component = errorDetails?.component; // Custom component to render
  const errorObj = errorDetails?.error; // Nested error object { code, message }

  const handleClose = () => {
    setIsOpen(false);
    // Allow time for the exit animation before calling onClose which unmounts
    setTimeout(onClose, 300); // Match leave duration
  };

  useEffect(() => {
    let timeoutId;

    if (isOpen && additionalInfo?.closeTimeout) {
      timeoutId = setTimeout(() => {
        handleClose();
        if (
          additionalInfo.actionOnTimeout &&
          typeof additionalInfo.actionOnTimeout === "function"
        ) {
          additionalInfo.actionOnTimeout();
        }
      }, additionalInfo.closeTimeout);
    }

    // Cleanup function - runs when dependencies change or component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [additionalInfo?.closeTimeout, isOpen]);

  return (
    // Use internal isOpen state for Transition
    <Transition appear show={isOpen} as={Fragment}>
      {/* Dialog uses its own onClose mechanism */}
      <Dialog as="div" className="relative z-[100]" onClose={handleClose}>
        {/* Background Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        </TransitionChild>

        {/* Modal Container */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 overflow-y-auto">
          {/* Modal Panel */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="max-w-md w-full transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 flex items-center"
              >
                {additionalInfo?.neutral ? (
                  <HiInformationCircle className="h-6 w-6 text-gray-500 mr-2 flex-shrink-0" />
                ) : (
                  <HiExclamationTriangle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
                )}
                {/* Use translated title */}
                {titleText || t(titleKey || "errorPopup.defaultTitle", "Error")}
              </DialogTitle>
              <div className="my-4 space-y-3">
                {/* Display main message */}
                {message && (
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {/* If message is a key, translate it, otherwise display directly */}
                    {t(message, message)}
                  </div>
                )}
                {/* Display optional custom component */}
                {component && <div>{component}</div>}
              </div>

              {/* Display details from nested error object */}
              {errorObj?.message && (
                <div className="mt-2 rounded-md border border-red-200 bg-red-50/50">
                  <Disclosure as="div" className="w-full">
                    {({ open }: { open: boolean }) => (
                      <>
                        <DisclosureButton className="w-full flex justify-between items-center p-3 text-sm font-medium text-red-700 hover:bg-red-100 rounded-t-md focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                          <span>
                            {t("errorPopup.detailsLabel", "Details")}
                            {errorObj.code ? ` (Code: ${errorObj.code})` : ""}
                          </span>
                          {open ? (
                            <HiChevronUp className="h-5 w-5" />
                          ) : (
                            <HiChevronDown className="h-5 w-5" />
                          )}
                        </DisclosureButton>
                        {/* Animate panel visibility */}
                        <AnimatePresence>
                          {open && (
                            <DisclosurePanel
                              static
                              as="div"
                              className="overflow-hidden"
                            >
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: easeOut }}
                              >
                                <p className="text-xs text-red-600 pb-3 px-3 pt-1 whitespace-pre-wrap break-words">
                                  {errorObj.message}
                                </p>
                              </motion.div>
                            </DisclosurePanel>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </Disclosure>
                </div>
              )}

              <div className="mt-5 flex justify-end gap-2">
                {action ? (
                  <button
                    type="button"
                    disabled={isActionClicked}
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-colors"
                    onClick={() => {
                      setIsActionClicked(true);
                      handleClose();
                      action.onAction();
                    }}
                  >
                    {action.buttonText}
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-colors"
                  onClick={handleClose} // Use internal handler
                >
                  {additionalInfo?.closingButtonText || "Close"}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

interface ShowErrorPopupProps {
  titleKey?: string | null;
  titleText?: string | null;
  messageKeyOrText?: string | null;
  details?: {
    component?: ReactNode;
    error?: ErrorObject;
    [key: string]: any;
  };
  action?: {
    buttonText: string;
    onAction: () => void;
  };
}

/**
 * Displays an error popup modally.
 */
export function showErrorPopup(
  props: ShowErrorPopupProps,
  additionalInfo?: AdditionalInfo
): void {
  // 1. Create a DOM element to mount the popup into
  const container = document.createElement("div");
  container.setAttribute("id", "error-popup-container"); // Optional ID
  document.body.appendChild(container);

  // 2. Create a React root attached to the container
  const root = createRoot(container);

  // 3. Define the cleanup function to unmount and remove the container
  const cleanup = () => {
    // Small delay to ensure animations might finish if needed, though handleClose handles it now
    setTimeout(() => {
      root.unmount();
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 0); // Can be 0 if handleClose handles delay
  };

  // 4. Prepare errorDetails object for the component
  const errorDetails: ErrorDetails = {
    message: props.messageKeyOrText || undefined, // Pass the key or text
    component: props?.details?.component,
    error: props?.details?.error,
  };

  // 5. Render the ErrorPopup component into the root
  root.render(
    <React.StrictMode>
      <ErrorPopup
        titleKey={props.titleKey}
        titleText={props.titleText}
        errorDetails={errorDetails}
        onClose={cleanup} // Pass the cleanup function
        action={props.action}
        additionalInfo={additionalInfo}
      />
    </React.StrictMode>
  );
}

export default showErrorPopup;
