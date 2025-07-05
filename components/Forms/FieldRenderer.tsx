import { useFormContext, useFormState } from "react-hook-form";
import { useTranslation } from "next-i18next";
// eslint-disable-next-line import/no-cycle
import ArrayField from "./ArrayField";
import DateInputField from "./DateInputField";
import DefaultInput from "./DefaultInput";
import DocumentUploadField from "./DocumentUploader";
import FormInput from "./FormInput";
import FieldWrapper from "./FieldWrapper";


function FieldRenderer({
  fields,
  style = "vertical",
  alwaysEditable = false,
  parentName = "", // Parent name for correct nested structure
  arrayItemIndex = null,
  step = "any",
}) {
  const methods = useFormContext();
  const { t } = useTranslation();

  // This ensures the component actually re-renders when errors change
  const { errors } = useFormState({ control: methods.control });

  return (
    <>
      {fields.map((field, index) => {
        // Generate a unique field key
        const fieldName = parentName ? `${parentName}.${field.name ? field.name : index}` : field.name || index.toString();

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

      
        switch (field.type) {
          case "checkbox": {
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
                <div className="flex items-center">
                  <input
                    id={fieldName}
                    name={fieldName}
                    type="checkbox"
                    {...methods.register(fieldName, {
                      required: parsedRequired ? t("selection_required") : false, // Add validation rule
                    })} // Register the checkbox with validation
                    defaultChecked={methods.getValues(fieldName) || false} // Ensure defaultChecked is handled
                    className="h-4 w-4 text-uhuBlue border-gray-300 rounded focus:ring-uhuBlue"
                  />
                  <label htmlFor={fieldName} className="ml-2 block text-sm cursor-pointer text-gray-900">
                    {field.label} {parsedRequired && <span className="text-red-500">*</span>}
                  </label>
                </div>
              </FieldWrapper>
            );
          }
          case "ui":
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
                {field.content}
              </FieldWrapper>
            );
          case "custom":
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
                {field.content(methods)}
              </FieldWrapper>
            );
          case "select":
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
                <FormInput
                  type="select"
                  control={methods.control}
                  options={field.options}
                  disabled={alwaysEditable ? false : field.disabled}
                  required={parsedRequired}
                  id={fieldName}
                  {...methods.register(fieldName, { required: parsedRequired ? t("selection_required") : false })}
                />
              </FieldWrapper>
            );
          case "country":
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
                <FormInput
                  type="country"
                  onlyIso={field.onlyIso}
                  control={methods.control}
                  disabled={alwaysEditable ? false : field.disabled}
                  required={parsedRequired}
                  validCountries={field.validCountries}
                  id={fieldName}
                  {...methods.register(fieldName, { required: parsedRequired ? t("selection_required") : false })}
                />
              </FieldWrapper>
            );
          case "textarea":
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
                <FormInput
                  type="textarea"
                  control={methods.control}
                  disabled={alwaysEditable ? false : field.disabled}
                  required={parsedRequired}
                  id={fieldName}
                  {...methods.register(fieldName, { required: parsedRequired ? t("input_required") : false })}
                />
              </FieldWrapper>
            );
          case "file":
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
                <DocumentUploadField
                  name={fieldName}
                  control={methods.control}
                  label={field.label}
                  required={parsedRequired}
                />
              </FieldWrapper>
            );
          case "row":
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <FieldRenderer
                    fields={field.fields} // Render nested fields recursively
                    parentName={parentName} // Pass parentName for nested fields
                    alwaysEditable={alwaysEditable}
                  />
                </div>
              </FieldWrapper>
            );
          case "array":
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
                <ArrayField
                  type={field.type}
                  field={field}
                  parentName={parentName} // Pass parentName for array fields
                />
              </FieldWrapper>
            );
          case "date":
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
                <DateInputField
                  fieldName={fieldName}
                  methods={methods}
                  disabled={alwaysEditable ? false : field.disabled}
                  parsedRequired={parsedRequired}
                />
              </FieldWrapper>
            );
          default:
            return (
              <FieldWrapper errors={errors} key={fieldName} field={field} fieldName={fieldName} style={style} parsedRequired={parsedRequired}>
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
              </FieldWrapper>
            );
        }
      })}
    </>
  );
}

export default FieldRenderer;
