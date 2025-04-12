import React, { useState, useRef, forwardRef } from "react";
import {
  BsEyeSlash,
  BsFillEyeFill,
  BsFillQuestionCircleFill,
  BsFileEarmarkText,
} from "react-icons/bs";
import { FiUploadCloud } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import CustomDropdown from "./CustomDropdown";
import { Controller, Control } from "react-hook-form";
import CountrySelector from "./CountrySelector";
import { useTranslation } from "next-i18next";

interface ClassOverrides {
  textarea?: string;
  select?: string;
  advancedSelect?: string;
  input?: string;
}

type InputType = "text" | "textarea" | "select" | "country" | "switch" | "file" | "password" | string;

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string;
  label?: string;
  type?: InputType;
  className?: string;
  classOverrides?: ClassOverrides;
  control?: Control;
  defaultValue?: any;
  required?: boolean;
  error?: string;
  explanation?: string;
  options?: any[];
  disabled?: boolean;
  onlyIso?: boolean;
  validCountries?: string[];
  accept?: string;
  checked?: boolean;
}

/**
 * FormInput component is a versatile form input handler that supports various input types including text, textarea, select, country selector, switch, and file upload.
 * It integrates with react-hook-form for form state management and validation.
 *
 * @component
 * @param {FormInputProps} props - Component properties.
 * @returns {JSX.Element} The rendered FormInput component.
 */
const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>((props, ref) => {
  const { textarea, select, advancedSelect, input } = props.classOverrides || {};
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [filePreviews, setFilePreviews] = useState<File[]>([]);

  const { t } = useTranslation("common");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>, onChange?: (files: File[]) => void): void => {
    const files = Array.from(event.target.files || []);
    setFilePreviews(files);
    if (onChange) {
      onChange(files);
    }
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number, onChange: (files: File[]) => void): void => {
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    setFilePreviews(updatedPreviews);
    onChange(updatedPreviews);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderInput = () => {
    switch (props.type) {
      case "textarea":
        return (
          <textarea
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={twMerge(props.className, textarea)}
          />
        );

      case "select":
        return (
          <Controller
            name={props.name}
            control={props.control}
            defaultValue={props.defaultValue || ""}
            rules={{
              required: props.required ? t("selection_required") : false,
            }}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <>
                <CustomDropdown
                  options={props.options}
                  value={value}
                  onChange={onChange}
                  placeholder={t("select")}
                  disabled={props.disabled}
                />
              </>
            )}
          />
        );

      case "country":
        return (
          <Controller
            name={props.name}
            control={props.control}
            defaultValue={props.defaultValue || ""}
            rules={{
              required: props.required ? t("country_required") : false,
            }}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <>
                <CountrySelector
                  countries={props.options}
                  selectedCountry={value}
                  onlyIso={props.onlyIso}
                  validCountries={props.validCountries}
                  onSelect={(country) => {
                    console.log("country", country);
                    onChange(country);
                  }}
                  disabled={props.disabled}
                />
                {error && (
                  <p className="text-red-500 text-xs mt-1">
                    {error.message}
                  </p>
                )}
              </>
            )}
          />
        );

      case "switch":
        return (
          <label className="switch">
            <input
              type="checkbox"
              name={props.name}
              ref={ref as React.Ref<HTMLInputElement>}
              onChange={props.onChange}
              checked={props.checked}
              onBlur={props.onBlur}
            />
            <span className="slider round"></span>
          </label>
        );

      case "file":
        return (
          <Controller
            name={props.name}
            control={props.control}
            rules={{
              required: props.required ? `${props.label} ist erforderlich` : false,
            }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <div>
                <input
                  type="file"
                  id={props.id}
                  accept={props.accept}
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => handleFilesSelected(e, onChange)}
                />
                <div className="items-center justify-between p-2 border rounded-md border-gray-300">
                  <div>
                    {filePreviews.length === 0 ? (
                      <button
                        onClick={handleUploadClick}
                        className="flex items-center space-x-2 text-uhuBlue"
                      >
                        <FiUploadCloud className="w-5 h-5" />
                        <span>{t("uploadFile")}</span>
                      </button>
                    ) : (
                      <div className="flex flex-col w-full">
                        {filePreviews.map((file, index) => (
                          <div
                            key={index}
                            className="flex flex-1 items-center space-x-2 w-full"
                          >
                            <BsFileEarmarkText className="text-gray-600" />
                            <p className="flex-1 text-sm text-gray-600 truncate overflow-hidden w-full">
                              {file.name.length > 20
                                ? `${file.name.substring(0, 20)}...`
                                : file.name}
                            </p>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index, onChange)}
                              className="text-red-600"
                            >
                              <IoClose className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          />
        );

      default:
        return (
          <div className="relative">
            <input
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
              ref={ref as React.Ref<HTMLInputElement>}
              type={props.type === "password" && showPassword ? "text" : props.type}
              className={twMerge(
                `${props.error && "border-red-300"} ${
                  props.disabled && "text-gray-500 bg-gray-100"
                } ${props.className} px-2 focus:ring-[1px] focus:ring-uhuBlue`,
                input
              )}
            />
            <div className={`${props.type === "password" ? "" : "hidden"} absolute inset-y-0 right-0 pr-3 flex items-center`}>
              <button
                tabIndex={-1}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <BsEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <BsFillEyeFill className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="">
      <div className="flex justify-start items-center space-x-2">
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {props.error || props.label}
        </label>
        <div className={`group relative ${props.explanation ? "" : "hidden"}`}>
          <BsFillQuestionCircleFill className="text-gray-500 h-4 w-4" />
          <div className="hidden group-hover:block absolute z-50 text-xs text-gray-700 bg-white shadow p-2 w-64">
            {props.explanation}
          </div>
        </div>
      </div>
      <div className="">
        {renderInput()}
      </div>
    </div>
  );
});

FormInput.displayName = "FormInput";

export default FormInput; 