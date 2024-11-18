
import React, { useState, useRef, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BsFileEarmarkText } from 'react-icons/bs';
import { IoClose, IoAttachOutline } from 'react-icons/io5';

/**
 * DocumentUploadField component for handling file uploads within a form.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the form field
 * @param {Object} props.control - Control object from react-hook-form
 * @param {string} props.label - The label for the upload field
 * @param {boolean} props.required - Whether the field is required
 *
 * @returns {JSX.Element} The rendered component
 *
 * @example
 * <DocumentUploadField
 *   name="document"
 *   control={control}
 *   label="Upload Document"
 *   required={true}
 * />
 */
const DocumentUploadField = ({ name, control, label, required }) => {
  const [filePreview, setFilePreview] = useState(null); // Single file preview
  const [error, setError] = useState(null);
  const hiddenInputRef = useRef(null);
  const { formState: { errors }, clearErrors, setValue, getValues, trigger } = useFormContext();

  // Fetch the existing file from the state (if available)
  useEffect(() => {
    const existingFile = getValues(name);
    if (existingFile && typeof existingFile === 'object' && existingFile.id) {
      setFilePreview(existingFile); // Set preloaded file as preview
    }
  }, [name, getValues]);

  // Trigger hidden file input click
  const handleUploadClick = () => {
    hiddenInputRef.current.click();
  };

  // Handle file selection manually through the input
  const handleFileSelected = (event, onChange) => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      setFilePreview(file); // Update the preview with the selected file
      setError(null); // Clear any existing errors
      onChange(file); // Pass the file to the form state
      clearErrors(name); // Clear the field error when file is selected
      setValue(name, file); // Update the form state with the file
    }
  };

  // Handle removal of the file
  const handleRemoveFile = (onChange) => {
    setFilePreview(null); // Clear the preview
    setValue(name, null); // Clear the form state value
    onChange(null); // Update form hook with null
    trigger(name); // Trigger validation for the field
  };

  // Prepare the data for server submission
  const prepareDataForServer = () => {
    if (filePreview && filePreview.id) {
      // If the file is preloaded, return only the id
      return filePreview.id;
    }
    // Otherwise, return the actual file
    return filePreview;
  };

  // Set the prepared data for the server before form submission
  useEffect(() => {
    const processedFile = prepareDataForServer();
    setValue(name, processedFile); // Set the processed file in the form state
  }, [filePreview, name, setValue]);

  // Parse and display errors for nested fields
  useEffect(() => {
    const parseNestedError = (fieldName, errorObj) => {
      const regex = /([a-zA-Z]+)\[(\d+)\]\.(\w+)/;
      const match = fieldName.match(regex);

      if (match) {
        const [_, arrayName, arrayIndex, field] = match;
        const index = parseInt(arrayIndex, 10);

        // Traverse errors to find if there is an error for this field
        if (errorObj[arrayName] && errorObj[arrayName][index] && errorObj[arrayName][index][field]) {
          return errorObj[arrayName][index][field].message;
        }
      }
      return null;
    };

    const errorMessage = parseNestedError(name, errors);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError(null);
    }
  }, [errors, name]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} ist erforderlich` : false }}
      render={({ field: { onChange } }) => (
        <div className="file-upload-container">

          {/* Upload Button */}
          {!filePreview && (
            <button
              type="button"
              onClick={handleUploadClick}
              className={`bg-uhuBlue text-white flex items-center px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            >
              <IoAttachOutline className="w-5 h-5 mr-2" />
              Datei hochladen
            </button>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            ref={hiddenInputRef}
            style={{ display: 'none' }} // Hide input element
            onChange={(e) => handleFileSelected(e, onChange)}
          />

          {/* Uploaded file preview */}
          <div className="mt-4">
            {filePreview && (
              <div className="flex justify-between items-center bg-gray-100 rounded p-2">
                <div className="flex items-center space-x-2">
                  <BsFileEarmarkText className="text-gray-600" />
                  {filePreview.url ? ( // If it's a preloaded file, show the filename with a link
                    <a href={filePreview.url} target="_blank" rel="noopener noreferrer" className="text-sm text-uhuBlue underline">
                      {filePreview.filename || filePreview.name}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-600 truncate">
                      {filePreview?.name?.length > 30 ? `${filePreview?.name?.substring(0, 30)}...` : filePreview?.name}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(onChange)}
                  className="text-red-600"
                >
                  <IoClose className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
    />
  );
};

export default DocumentUploadField;