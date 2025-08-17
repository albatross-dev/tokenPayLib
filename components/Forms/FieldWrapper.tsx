import React from "react";

export default function FieldWrapper({
  errors,
  children,
  field,
  fieldName,
  style,
  parsedRequired,
}: {
  errors: any;
  children: React.ReactNode;
  field: any;
  fieldName: string;
  style: string;
  parsedRequired: boolean;
}): React.ReactNode {
  return (
    <div
      className={`${
        style === "horizontal" && "md:flex w-full items-center flex-row"
      } ${field.type !== "row" && "mb-4"} ${field.width || ""}`}
    >
      {field.type !== "checkbox" &&
        field.type !== "array" &&
        field.type !== "row" &&
        field.label && ( // Exclude the date type from the generic input rendering
          <label
            htmlFor={fieldName}
            className={`block text-sm font-medium text-gray-700 ${
              style === "horizontal" && "md:w-64 md:text-end pr-6"
            }`}
          >
            {field.label}
            {parsedRequired && <span className="text-red-500">*</span>}
          </label>
        )}

      <div
        className={`${
          style === "horizontal" &&
          field.type !== "checkbox" &&
          field.type !== "array" &&
          field.type !== "row" &&
          field.type !== "ui" &&
          "md:w-64"
        }`}
      >
        {children}
        {errors[fieldName] && (
          <p className="text-red-500 text-sm">{errors[fieldName].message}</p>
        )}
      </div>
    </div>
  );
}
