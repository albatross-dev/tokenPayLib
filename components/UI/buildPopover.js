import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import React, { Fragment, useState, useRef, useEffect } from 'react';

export default function buildPopover(getButton, getContent, classInject) {
  return function PopoverComponent({ t }) {  // Accept t as a prop
    const [position, setPosition] = useState('bottom-left');
    const popoverButtonRef = useRef(null);

    useEffect(() => {
      const updatePosition = () => {
        if (popoverButtonRef.current) {
          const rect = popoverButtonRef.current.getBoundingClientRect();
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;

          const isNearTop = rect.top < screenHeight / 2;
          const isNearLeft = rect.left < screenWidth / 2;

          if (screenWidth >= 768) {
            if (isNearTop && isNearLeft) {
              setPosition('bottom-right');
            } else if (isNearTop && !isNearLeft) {
              setPosition('bottom-left');
            } else if (!isNearTop && isNearLeft) {
              setPosition('top-right');
            } else {
              setPosition('top-left');
            }
          } else {
            setPosition('bottom-full');
          }
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('resize', updatePosition);
      };
    }, []);

    const getPopoverPanelPosition = () => {
      let classAll = "shadow-lg bg-white z-[99]";

      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return 'left-0 bottom-0 w-full rounded-t-[2rem] fixed pb-18 pt-8 ' + classAll;
      }

      let classBase = "transform absolute rounded sm:w-96 max-h-96 overflow-scroll  md:px-4 sm:px-0 " + classAll;

      switch (position) {
        case 'top-left':
          return 'bottom-full right-0 ' + classBase;
        case 'top-right':
          return 'bottom-full left-0 ' + classBase;
        case 'bottom-left':
          return 'top-full right-0 ' + classBase;
        case 'bottom-right':
          return 'top-full left-0 ' + classBase;
        default:
          return 'top-full right-0 ' + classBase;
      }
    };

    return (
      <Popover className={`relative ${classInject}`}>
        {({ open, close }) => (
          <>
            <PopoverButton
              ref={popoverButtonRef}
              className={`w-full md:w-auto ${classInject} focus:outline-none focus:border-none focus:ring-0`}
            >
              {getButton(t)}
            </PopoverButton>

            {open && typeof window !== 'undefined' && window.innerWidth < 768 && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-[98]" onClick={close} />
            )}

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className={` ${getPopoverPanelPosition()} `}>
                <div className="sm:hidden flex justify-between p-4">
                  <InformationCircleIcon className="h-8 w-8 text-fullPurple" />
                  <XMarkIcon className="h-8 w-8 cursor-pointer" onClick={close} />
                </div>
                {getContent(t)} {/* Call getContent with t */}
                <div className="sm:hidden h-16"></div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };
}