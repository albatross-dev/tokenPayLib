import React from 'react';
import { UseFormRegister, Path } from 'react-hook-form';

interface InputProps<T extends Record<string, any>> {
  disabled?: boolean;
  type: string;
  fieldName: Path<T>;
  methods: {
    register: UseFormRegister<T>;
  };
  placeholder?: string | number;
  parsedRequired?: boolean;
}

function Input<T extends Record<string, any>>({
  disabled,
  type,
  fieldName,
  methods,
  placeholder,
  parsedRequired
}: InputProps<T>): JSX.Element {
  return (
    <input
      id={String(fieldName)}
      name={String(fieldName)}
      type={type}
      disabled={disabled}
      placeholder={placeholder?.toString()}
      {...methods.register(fieldName, { required: parsedRequired })}
      className={`mt-1 p-2 w-full border rounded-md ${
        disabled ? "text-gray-500" : ""
      }`}
    />
  );
}

export default Input; 