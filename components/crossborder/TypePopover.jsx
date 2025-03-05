import React, { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { Popover, Transition } from '@headlessui/react';
import { paymentsTableQueryAtom } from '@/pages/_app';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';



export default function TypePopover({onSelect}) {
  const [selectedType, setSelectedType] = useState('all'); // default selected type

  const { t } = useTranslation("common");

  const options = [
    { label: t("StatusPopover.all"), value: 'all' },
    { label: t("Withdraw"), value: 'Withdraw' },
    { label: t("Deposit"), value: 'Deposit' },
  ]

  const handleButtonClick = (value) => {
    setSelectedType(value);
    onSelect(value);
  };

  const getDisplayType = () => {
    if (selectedType === 'all') return "Typ";
    return `${options.find((el) => el.value === selectedType).label}`; // Capitalize the first letter
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className={` px-3 py-2 gap-2 flex items-center bg-white border ${open&&" border-uhuBlue ring-0 outline-0"} rounded`}>
            {getDisplayType()} <BsChevronDown />
          </Popover.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 mt-2 w-56 max-w-sm px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white p-4">
                  {options.map(({ value, label }) => (
                    <button key={value} onClick={() => handleButtonClick(value)} className="block w-full text-left py-2">
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
