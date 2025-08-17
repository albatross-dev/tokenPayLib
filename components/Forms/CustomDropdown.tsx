import React, { forwardRef , Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";

interface DropdownOption {
  value: string;
  label: string;
  type?: 'category' | 'option';
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * CustomDropdown component renders a dropdown menu with options.
 * It supports both enabled and disabled states.
 * 
 * @component
 * @param {CustomDropdownProps} props - The props for the component
 * @param {React.Ref<HTMLInputElement>} ref - The ref to attach to the hidden input element
 * @returns {JSX.Element} The rendered CustomDropdown component
 */
const CustomDropdown = forwardRef<HTMLInputElement, CustomDropdownProps>(({
  options,
  value,
  onChange,
  name,
  placeholder,
  disabled
}, ref): JSX.Element => {
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
          <MenuButton className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            <span>{selectedOption ? selectedOption.label : placeholder}</span>
            <BiChevronDown className="h-5 w-5 text-gray-500" />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 max-h-60 overflow-auto">
                {options.map((option) => {
                  if (option.type === "category") {
                    return (
                      <div
                        key={option.value}
                        className="px-4 py-2 text-sm text-uhuBlue bg-gray-100 font-semibold"
                      >
                        {option.label}
                      </div>
                    );
                  } 
                    return (
                      <MenuItem key={option.value}>
                        {({ active }: { active: boolean }) => (
                          <button
                            type="button"
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                            onClick={() => onChange(option.value)}
                          >
                            {option.label}
                          </button>
                        )}
                      </MenuItem>
                    );
                  
                })}
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      )}
    </div>
  );
});

// Add display name for better debugging
CustomDropdown.displayName = 'CustomDropdown';

export default CustomDropdown; 