import React, { useState, useRef, useEffect } from 'react';
import { Controller, useFormContext, Control } from 'react-hook-form';
import { BsFileEarmarkText } from 'react-icons/bs';
import { IoClose, IoAttachOutline } from 'react-icons/io5';

interface PreloadedFile {
  id: string | number;
  url?: string;
  filename?: string;
}

type FileType = File | PreloadedFile | null;

interface DocumentUploadFieldProps {
  name: string;
  control: Control;
  label: string;
  required?: boolean;
}

const isPreloadedFile = (file: FileType): file is PreloadedFile => {
  return file !== null && 'id' in file;
};

const isFile = (file: FileType): file is File => {
  return file !== null && file instanceof File;
};

/**
 * DocumentUploadField component for handling file uploads within a form.

 * @example
 * <DocumentUploadField
 *   name="document"
 *   control={control}
 *   label="Upload Document"
 *   required={true}
 * />
 */
const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({ name, control, label, required }: DocumentUploadFieldProps): JSX.Element => {
  const [filePreview, setFilePreview] = useState<FileType>(null);
  const [error, setError] = useState<string | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const { formState: { errors }, clearErrors, setValue, getValues, trigger } = useFormContext();

  // Fetch the existing file from the state (if available)
  useEffect(() => {
    const existingFile = getValues(name);
    if (existingFile && typeof existingFile === 'object' && 'id' in existingFile) {
      setFilePreview(existingFile as PreloadedFile);
    }
  }, [name, getValues]);

  // Trigger hidden file input click
  const handleUploadClick = (): void => {
    hiddenInputRef.current?.click();
  };

  // Handle file selection manually through the input
  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>, onChange: (file: FileType) => void): void => {
    const file = event.target.files?.[0];
    if (file) {
      setFilePreview(file);
      setError(null);
      onChange(file);
      clearErrors(name);
      setValue(name, file);
    }
  };

  // Handle removal of the file
  const handleRemoveFile = (onChange: (file: FileType) => void): void => {
    setFilePreview(null);
    setValue(name, null);
    onChange(null);
    trigger(name);
  };

  // Prepare the data for server submission
  const prepareDataForServer = (): string | number | FileType => {
    if (isPreloadedFile(filePreview)) {
      return filePreview.id;
    }
    return filePreview;
  };

  // Set the prepared data for the server before form submission
  useEffect(() => {
    const processedFile = prepareDataForServer();
    setValue(name, processedFile);
  }, [filePreview, name, setValue]);

  // Parse and display errors for nested fields
  useEffect(() => {
    const parseNestedError = (fieldName: string, errorObj: Record<string, any>): string | null => {
      const regex = /([a-zA-Z]+)\[(\d+)\]\.(\w+)/;
      const match = fieldName.match(regex);

      if (match) {
        const [_, arrayName, arrayIndex, field] = match;
        const index = parseInt(arrayIndex, 10);

        if (errorObj[arrayName]?.[index]?.[field]) {
          return errorObj[arrayName][index][field].message;
        }
      }
      return null;
    };

    const errorMessage = parseNestedError(name, errors);
    setError(errorMessage);
  }, [errors, name]);

  const renderFilePreview = () => {
    if (!filePreview) return null;

    if (isPreloadedFile(filePreview)) {
      return (
        <a href={filePreview.url} target="_blank" rel="noopener noreferrer" className="text-sm text-uhuBlue underline">
          {filePreview.filename}
        </a>
      );
    }

    if (isFile(filePreview)) {
      return (
        <p className="text-sm text-gray-600 truncate">
          {filePreview.name.length > 30
            ? `${filePreview.name.substring(0, 30)}...`
            : filePreview.name}
        </p>
      );
    }

    return null;
  };

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
              className="bg-uhuBlue text-white flex items-center px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <IoAttachOutline className="w-5 h-5 mr-2" />
              Datei hochladen
            </button>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            ref={hiddenInputRef}
            style={{ display: 'none' }}
            onChange={(e) => handleFileSelected(e, onChange)}
          />

          {/* Uploaded file preview */}
          <div className="mt-4">
            {filePreview && (
              <div className="flex justify-between items-center bg-gray-100 rounded p-2">
                <div className="flex items-center space-x-2">
                  <BsFileEarmarkText className="text-gray-600" />
                  {renderFilePreview()}
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