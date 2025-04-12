import React, { useState, useEffect, Fragment } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { IoTrashBinOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';
import { Dialog, Transition } from '@headlessui/react';
import FieldRenderer from './FieldRenderer';
import { ArrayFieldProps } from './types';

/**
 * ArrayField component handles rendering and managing an array of form fields.
 *
 * @param {ArrayFieldProps} props - Component properties
 * @returns {JSX.Element} Rendered array of form fields with add and remove functionality.
 */
const ArrayField: React.FC<ArrayFieldProps> = ({
  field,
  methods,
  parentName,
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [triggerRerender, setTriggerRerender] = useState<boolean>(false);

  // Ensure at least one empty item on initial render
  useEffect(() => {
    if (arrayFields.length === 0) {
      const defaultItem = getDefaultItem();
      replace([defaultItem]);
    }
  }, [arrayFields, replace]);

  function getDefaultItem(): Record<string, string> {
    return field.fields.reduce((acc: Record<string, string>, childField) => {
      acc[childField.name] = "";
      return acc;
    }, {});
  }

  const handleDelete = (): void => {
    if (isAdding && itemToDelete === arrayFields.length - 1) {
      setIsAdding(false);
    }

    if (itemToDelete !== null) {
      remove(itemToDelete);
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const addNewItem = (): void => {
    const defaultItem = getDefaultItem();
    append(defaultItem);
    setIsAdding(true);
  };

  const formValues = methods.watch();
  useEffect(() => {
    console.log("Form state updated");
  }, [formValues]);

  return (
    <div key={triggerRerender.toString()} className="mb-4 flex flex-col gap-4">
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
            fields={field.fields}
            alwaysEditable={isAdding && index === arrayFields.length - 1}
            arrayItemIndex={index}
            parentName={`${parentName}.${field.name}[${index}]`}
          />

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => {
              setItemToDelete(index);
              setIsModalOpen(true);
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
          className="text-gray-700 hover:text-black transition-all group duration-300 flex items-center gap-2 rounded-full"
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

export default ArrayField;