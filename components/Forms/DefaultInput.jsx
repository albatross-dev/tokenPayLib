
import React, { useState } from 'react';

/**
 * DefaultInput component renders a customizable input field.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.disabled - Determines if the input is disabled.
 * @param {string} props.type - The type of the input (e.g., text, password).
 * @param {string} props.fieldName - The name and id of the input field.
 * @param {Object} props.methods - The methods object from react-hook-form.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {boolean} props.parsedRequired - Indicates if the input is required.
 *
 * @returns {JSX.Element} The rendered input element.
 */
function DefaultInput({disabled, type, fieldName, methods ,placeholder , parsedRequired, step}) {
  return  <input
  id={fieldName}
  name={fieldName}
  type={type}
  disabled={disabled}
  step={step}
  placeholder={placeholder?.toString()}
  {...methods.register(fieldName, { required: parsedRequired })}
  className={`mt-1 p-2 w-full border rounded-md ${
    disabled ? "text-gray-500" : ""
  }`}
/>
}

export default DefaultInput