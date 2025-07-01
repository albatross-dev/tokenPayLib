import { useFormContext } from "react-hook-form";
import ArrayField from "./ArrayField";
import DateInputField from "./DateInputField";
import DefaultInput from "./DefaultInput";
import DocumentUploadField from "./DocumentUploader";
import FormInput from "./FormInput";

const FieldRenderer = ({
  fields,
  style = "vertical",
  alwaysEditable = false,
  parentName = "", // Parent name for correct nested structure
  arrayItemIndex = null,
  step = "any",
}) => {
  const methods = useFormContext();

  return (
    <>
      {fields.map((field, index) => {
        // Generate a unique field key
        const fieldName = parentName ? `${parentName}.${field.name ? field.name : index}` : field.name;

        // check if is visible field by checking if field.visible is a function and then run it
        if (field.visible && typeof field.visible === "function") {
          if (!field.visible(methods)) {
            return null;
          }
        }
        // parse required field, check if it is a function or boolean or undefined
        let parsedRequired = false;
        if (field.required) {
          if (typeof field.required === "function") {
            if (arrayItemIndex !== null) {
              parsedRequired = field.required(methods, arrayItemIndex); // Execute the function with methods
            } else {
              parsedRequired = field.required(methods); // Execute the function with methods
            }
          } else {
            parsedRequired = field.required; // Otherwise, it's a boolean
          }
        }

        return (
          <div
            key={fieldName || index} // Use fieldName if available, otherwise use index for non-named fields like rows
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
              {field.type === "checkbox" ? (
                <div className="flex items-center">
                  <input
                    id={fieldName}
                    name={fieldName}
                    type="checkbox"
                    {...methods.register(fieldName, {
                      required: parsedRequired ? "!!!" : false, // Add validation rule
                    })} // Register the checkbox with validation
                    defaultChecked={methods.getValues(fieldName) || false} // Ensure defaultChecked is handled
                    className="h-4 w-4 text-uhuBlue border-gray-300 rounded focus:ring-uhuBlue"
                  />
                  <label htmlFor={fieldName} className="ml-2 block text-sm cursor-pointer text-gray-900">
                    {field.label} {parsedRequired && <span className="text-red-500">*</span>}
                  </label>
                </div>
              ) : field.type === "ui" ? (
                field.content
              ) : field.type === "custom" && typeof field.content === "function" ? (
                field.content(methods) // Pass control and user to the custom component
              ) : field.type === "select" ? (
                <FormInput
                  type="select"
                  control={methods.control}
                  options={field.options}
                  disabled={alwaysEditable ? false : field.disabled}
                  required={parsedRequired}
                  id={fieldName}
                  {...methods.register(fieldName, { required: parsedRequired })}
                />
              ) : field.type === "country" ? (
                <FormInput
                  type="country"
                  onlyIso={field.onlyIso}
                  control={methods.control}
                  disabled={alwaysEditable ? false : field.disabled}
                  required={parsedRequired}
                  validCountries={field.validCountries}
                  id={fieldName}
                  {...methods.register(fieldName, { required: parsedRequired })}
                />
              ) : field.type === "textarea" ? (
                <textarea
                  id={fieldName}
                  name={fieldName}
                  placeholder={field.placeholder?.toString()}
                  {...methods.register(fieldName, { required: parsedRequired })}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              ) : field.type === "file" ? (
                <DocumentUploadField
                  name={fieldName}
                  control={methods.control}
                  label={field.label}
                  required={parsedRequired}
                />
              ) : field.type === "row" ? (
                <div className="flex flex-col md:flex-row md:gap-4">
                  <FieldRenderer
                    fields={field.fields} // Render nested fields recursively
                    parentName={parentName} // Pass parentName for nested fields
                    alwaysEditable={alwaysEditable}
                  />
                </div>
              ) : field.type === "array" ? (
                <ArrayField
                  type={field.type}
                  field={field}
                  methods={methods}
                  parentName={parentName} // Pass parentName for array fields
                />
              ) : field.type === "date" ? (
                // Specific handling for date fields inside arrays
                <DateInputField
                  fieldName={fieldName}
                  methods={methods}
                  disabled={alwaysEditable ? false : field.disabled}
                  parsedRequired={parsedRequired}
                />
              ) : (
                <DefaultInput
                  disabled={alwaysEditable ? false : field.disabled}
                  type={field.type}
                  placeholder={field.placeholder}
                  fieldName={fieldName}
                  methods={methods}
                  parsedRequired={parsedRequired}
                  validate={field.validate}
                  step={step}
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FieldRenderer;
