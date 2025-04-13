import React, { useEffect, useState, ReactNode } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import AnimateHeight from 'react-animate-height';

interface ToggleSectionProps {
  title: ReactNode;
  content: ReactNode;
  storageKey: string;
}

export default function ToggleSection({ 
  title, 
  content, 
  storageKey 
}: ToggleSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem(storageKey);
      return storedState ? JSON.parse(storedState) : true; // Default open
    }
    return true; // Default open when SSR
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(isOpen));
    }
  }, [isOpen, storageKey]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-blue-200 shadow-md rounded-lg">
        <Disclosure defaultOpen={isOpen}>
          {({ open }) => (
            <div className="">
              <DisclosureButton
                className="w-full flex items-center justify-between py-3 px-4 text-left font-medium"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <div>{title}</div>
                <FiChevronDown
                  className={`w-6 h-6 text-blue-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </DisclosureButton>

              <AnimateHeight duration={300} height={isOpen ? 'auto' : 0}>
                <DisclosurePanel static>
                  <div className="p-8 bg-blue-100 text-gray-700">
                    {content}
                  </div>
                </DisclosurePanel>
              </AnimateHeight>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}