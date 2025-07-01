import { useTranslation } from "next-i18next";
import React, { useEffect } from "react";
import { UseFormRegister, Path, UseFormGetFieldState, UseFormStateProps } from "react-hook-form";

interface DefaultInputProps<T extends Record<string, any>> {
  disabled?: boolean;
  type: string;
  fieldName: Path<T>;
  methods: {
    register: UseFormRegister<T>;
    getFieldState: UseFormGetFieldState<T>;
  };
  placeholder?: string | number;
  parsedRequired?: boolean;
  step?: string | number;
  validate?: (value: any) => boolean | string;
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
  step,
  validate,
}: DefaultInputProps<T>): JSX.Element {
  const { getFieldState } = methods;
  const fieldState = getFieldState(fieldName);

  const { t } = useTranslation("common");

  return (
    <>
      <input
        id={String(fieldName)}
        name={String(fieldName)}
        type={type}
        disabled={disabled}
        step={step}
        placeholder={placeholder?.toString()}
        {...methods.register(fieldName, {
          validate: validate,
          required: parsedRequired,
        })}
        className={`mt-1 p-2 w-full border rounded-md ${disabled ? "text-gray-500" : ""}`}
      />
      {fieldState.error && (
        <p className="text-red-500 text-sm">
          {fieldState.error?.message?.toString()} {t(`form.errors.${fieldState.error?.type?.toString()}`)}
        </p>
      )}
    </>
  );
}

export default DefaultInput;
