import React, { useState } from 'react';

function Input({disabled, type, fieldName, methods ,placeholder ,  parsedRequired}) {
  return  <input
  id={fieldName}
  name={fieldName}
  type={type}
  disabled={disabled}
  placeholder={placeholder?.toString()}
  {...methods.register(fieldName, { required: parsedRequired })}
  className={`mt-1 p-2 w-full border rounded-md ${
    disabled ? "text-gray-500" : ""
  }`}
/>
}

export default Input