import React from 'react';
import { UseFormRegister, Path } from 'react-hook-form';

interface DefaultInputProps<T extends Record<string, any>> {
  disabled?: boolean;
  type: string;
  fieldName: Path<T>;
  methods: {
    register: UseFormRegister<T>;
  };
  placeholder?: string | number;
  parsedRequired?: boolean;
  step?: string | number;
}

/**
 * DefaultInput component renders a customizable input field.
 *
 * @component
 * @template T - The type of the form data structure
 * @param {DefaultInputProps<T>} props - The component props
 * @returns {JSX.Element} The rendered input element
 */
function DefaultInput<T extends Record<string, any>>({
  disabled,
  type,
  fieldName,
  methods,
  placeholder,
  parsedRequired,
  step
}: DefaultInputProps<T>): JSX.Element {
  return (
    <input
      id={String(fieldName)}
      name={String(fieldName)}
      type={type}
      disabled={disabled}
      step={step}
      placeholder={placeholder?.toString()}
      {...methods.register(fieldName, { required: parsedRequired })}
      className={`mt-1 p-2 w-full border rounded-md ${
        disabled ? "text-gray-500" : ""
      }`}
    />
  );
}

export default DefaultInput; 