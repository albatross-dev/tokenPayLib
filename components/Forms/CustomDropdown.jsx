
import React, { forwardRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiChevronDown } from "react-icons/bi";

/**
 * CustomDropdown component renders a dropdown menu with options.
 * It supports both enabled and disabled states.
 * 
 * @component
 * @param {Object} props - The props for the component.
 * @param {Array} props.options - The array of options for the dropdown. Each option should be an object with `value`, `label`, and optionally `type` properties.
 * @param {string} props.value - The currently selected value.
 * @param {function} props.onChange - The function to call when an option is selected.
 * @param {string} props.name - The name attribute for the hidden input element.
 * @param {string} props.placeholder - The placeholder text to display when no option is selected.
 * @param {boolean} props.disabled - Whether the dropdown is disabled.
 * @param {React.Ref} ref - The ref to attach to the hidden input element.
 * 
 * @returns {JSX.Element} The rendered CustomDropdown component.
 */
const CustomDropdown = forwardRef(({ options, value, onChange, name, placeholder, disabled }, ref) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div>
      {/* Hidden input for React Hook Form */}
      <input type="hidden" name={name} value={value || ""} ref={ref} />

      {disabled ? (
        // If the dropdown is disabled, just display the selected value without the chevron
        <div className="inline-flex justify-between w-full rounded-md border border-gray-200 px-2 py-2 bg-gray-50 text-sm font-medium text-gray-500">
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
      ) : (
        // If the dropdown is enabled, display the dropdown menu with chevron
        <Menu as="div" className="relative inline-block text-left w-full">
          <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            <span>{selectedOption ? selectedOption.label : placeholder}</span>
            <BiChevronDown className="h-5 w-5 text-gray-500" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 max-h-60 overflow-auto">
                {options.map((option) => {
                  if(option.type === "category"){
                    return <div key={option.value} className="px-4 py-2 text-sm text-uhuBlue bg-gray-100 font-semibold">{option.label}</div>
                  }else{
                  return <Menu.Item key={option.value}>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        onClick={() => onChange(option.value)} // Trigger onChange when option is selected
                      >
                        {option.label}
                      </button>
                    )}
                  </Menu.Item>
                  }
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
});

export default CustomDropdown;