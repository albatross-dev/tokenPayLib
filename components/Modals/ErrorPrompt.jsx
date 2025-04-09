// src/components/ErrorPopup.js
import React, { Fragment, useEffect, useState } from "react";
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
import { createRoot } from 'react-dom/client';

import { AnimatePresence, easeOut, motion } from "framer-motion";
import {
    HiChevronDown,
    HiChevronUp,
    HiExclamationTriangle,
} from "react-icons/hi2";
import { useTranslation } from 'next-i18next'; // Or your i18n hook

// This component is now designed to be rendered imperatively
const ErrorPopup = ({ titleKey, errorDetails, onClose }) => {
    const { t } = useTranslation('common'); // Assuming 'common' namespace for generic terms
    const [isOpen, setIsOpen] = useState(true); // Control open state internally

    // Extract details safely
    const message = errorDetails?.message || '';
    const component = errorDetails?.component; // Custom component to render
    const errorObj = errorDetails?.error; // Nested error object { code, message }

    const handleClose = () => {
        setIsOpen(false);
        // Allow time for the exit animation before calling onClose which unmounts
        setTimeout(onClose, 300); // Match leave duration
    };

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
                                <HiExclamationTriangle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
                                {/* Use translated title */}
                                {t(titleKey || 'errorPopup.defaultTitle', 'Error')}
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
                                        {({ open }) => (
                                            <>
                                                <DisclosureButton className="w-full flex justify-between items-center p-3 text-sm font-medium text-red-700 hover:bg-red-100 rounded-t-md focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                                    <span>
                                                        {t('errorPopup.detailsLabel', 'Details')}
                                                        {errorObj.code ? ` (Code: ${errorObj.code})` : ''}
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
                                                        static // Keep in DOM for animation
                                                        as={motion.div}
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: easeOut }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-xs text-red-600 pb-3 px-3 pt-1 whitespace-pre-wrap break-words">
                                                            {errorObj.message}
                                                        </p>
                                                    </DisclosurePanel>
                                                 )}
                                                </AnimatePresence>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            )}

                            {/* Close Button */}
                            <div className="mt-5 flex justify-end">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-colors"
                                    onClick={handleClose} // Use internal handler
                                >
                                    {t('errorPopup.closeButton', 'Close')}
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

/**
 * Displays an error popup modally.
 *
 * @param {string | undefined | null} titleKey - Translation key for the title (or default 'Error').
 * @param {string | undefined | null} messageKeyOrText - Translation key or direct text for the main message.
 * @param {object} [details={}] - Optional details object.
 * @param {React.ReactNode} [details.component] - Optional React component to render in the body.
 * @param {object} [details.error] - Optional nested error object.
 * @param {string | number} [details.error.code] - Optional error code.
 * @param {string} [details.error.message] - Optional detailed error message for disclosure.
 */
const showErrorPopup = (titleKey, messageKeyOrText, details = {}) => {
    // 1. Create a DOM element to mount the popup into
    const container = document.createElement('div');
    container.setAttribute('id', 'error-popup-container'); // Optional ID
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
    const errorDetails = {
        message: messageKeyOrText, // Pass the key or text
        component: details.component,
        error: details.error,
    };

    // 5. Render the ErrorPopup component into the root
    // If ErrorPopup strictly requires I18nextProvider context:
    // root.render(
    //   <React.StrictMode>
    //     <I18nextProvider i18n={i18n}> {/* Wrap with provider */}
    //       <ErrorPopup
    //         titleKey={titleKey}
    //         errorDetails={errorDetails}
    //         onClose={cleanup}
    //       />
    //     </I18nextProvider>
    //   </React.StrictMode>
    // );
    // --- OR ---
    // If useTranslation works okay in ErrorPopup without explicit provider (less likely but simpler):
     root.render(
       <React.StrictMode>
           <ErrorPopup
             titleKey={titleKey}
             errorDetails={errorDetails}
             onClose={cleanup} // Pass the cleanup function
           />
       </React.StrictMode>
     );
};

export default showErrorPopup;