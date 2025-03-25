import React, { useEffect, useState, Fragment } from "react";
import { useFieldArray, useFormContext, useWatch, useFormState } from "react-hook-form";
import FormInput from "./FormInput";
import DocumentUploadField from "./DocumentUploader";
import { FiPlus } from "react-icons/fi";
import { IoTrashBinOutline } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";
import DateInputField from "./DateInputField";
import DefaultInput from "./DefaultInput";

/**
 * FieldRenderer component renders various types of form fields based on the provided configuration.
 *
 * @param {Object[]} fields - Array of field configuration objects.
 * @param {string} [style="vertical"] - Layout style for the fields, either "vertical" or "horizontal".
 * @param {boolean} [alwaysEditable=false] - Flag to determine if fields should always be editable.
 * @param {string} [parentName=""] - Parent name for correct nested structure.
 *
 * @returns {JSX.Element} Rendered form fields.
 */
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
        const fieldName = parentName
          ? `${parentName}.${field.name ? field.name : index}`
          : field.name;

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
                  <label
                    htmlFor={fieldName}
                    className="ml-2 block text-sm cursor-pointer text-gray-900"
                  >
                    {field.label}{" "}
                    {parsedRequired && <span className="text-red-500">*</span>}
                  </label>
                </div>
              ) : field.type === "ui" ? (
                field.content
              ) : field.type === "custom" &&
                typeof field.content === "function" ? (
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
                  parentName={parentName}
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

/**
 * ArrayField component handles rendering and managing an array of form fields.
 *
 * @param {Object} field - Field configuration object for the array.
 * @param {Object} methods - Methods provided by react-hook-form.
 * @param {string} parentName - Parent name for correct nested structure.
 *
 * @returns {JSX.Element} Rendered array of form fields with add and remove functionality.
 */

const ArrayField = ({
  field,
  methods,
  parentName, // Pass parentName for array fields
}) => {
  const {
    fields: arrayFields,
    append,
    remove,
    replace,
  } = useFieldArray({
    control: methods.control,
    name: parentName ? `${parentName}.${field.name}` : field.name,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [isAdding, setIsAdding] = useState(false);

  // Ensure at least one empty item on initial render
  useEffect(() => {
    if (arrayFields.length === 0) {
      const defaultItem = getDefaultItem();
      replace([defaultItem]); // Replace the empty array with a new item
    }
  }, [arrayFields]); // Depend on initialItemAdded and arrayFields

  function getDefaultItem() {
    return field.fields.reduce((acc, childField) => {
      acc[childField.name] = ""; // Each child field starts with an empty value
      return acc;
    }, {});
  }

  const handleDelete = () => {
    // if removed item is last item and isAdding is true, then set isAdding to false
    if (isAdding && itemToDelete === arrayFields.length - 1) {
      setIsAdding(false);
    }

    if (itemToDelete !== null) {
      remove(itemToDelete); // Remove the selected item
      setIsModalOpen(false); // Close the modal
      setItemToDelete(null); // Reset the item to delete
    }
  };

  const addNewItem = () => {
    // Default values for each new item
    const defaultItem = getDefaultItem();
    append(defaultItem);
    setIsAdding(true);
  };

  const [triggerRerender, setTriggerRerender] = useState(false);

  const formValues = methods.watch();
  useEffect(() => {
    console.log("Form state updated");
  }, [formValues]); // Track both dirty state and array length
  
  return (
    <div key={triggerRerender} className="mb-4 flex flex-col gap-4">
      {arrayFields.map((item, index) => (
        <div
          key={item.id + "array_item"}
          className="mb-2 border rounded-lg p-4 relative"
        >
          <h3 className="text-sm font-semibold mb-2">
            {index + 1}. {field.label}{" "}
            {isAdding && index === arrayFields.length - 1 ? (
              <span className="text-uhuBlue"> (Neu)</span>
            ) : (
              ""
            )}
          </h3>

          <FieldRenderer
            fields={field.fields} // Render child fields recursively
            alwaysEditable={isAdding && index === arrayFields.length - 1} // is isAdding and last field then editable
            arrayItemIndex={index} // Pass the index for conditional rendering
            parentName={`${parentName}.${field.name}[${index}]`} // Pass the parent name with the index for unique field names
          />

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => {
              setItemToDelete(index);
              setIsModalOpen(true); // Open the modal
            }}
            className={`${
              index === 0 && arrayFields.length < 2 && "hidden"
            } absolute top-2 right-2 text-red-600 hover:text-red-800`}
            title="Remove item"
          >
            <IoTrashBinOutline className="w-4 h-4 m-2" />
          </button>
        </div>
      ))}

      {/* Add Button */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={addNewItem}
          className="text-gray-700 hover:text-black  transition-all group duration-300 flex items-center  gap-2  rounded-full"
          title="Add new item"
        >
          {field.newLabel}

          <FiPlus className="w-8 h-8 p-2 rounded-full transition-all group-hover:shadow-xl duration-300 bg-uhuBlue shadow-sm text-white" />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-700"
                  >
                    Element löschen?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-700">
                      Möchten Sie dieses Element wirklich löschen? Diese Aktion
                      kann nicht rückgängig gemacht werden.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      className="btn p-2 rounded w-36 bg-gray-200"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={handleDelete}
                      type="button"
                      className="w-36 bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    >
                      Löschen
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default FieldRenderer;
