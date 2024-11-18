
import React, { useState, useRef } from 'react';
import { BsEyeSlash, BsFillEyeFill, BsFillQuestionCircleFill, BsFileEarmarkText } from 'react-icons/bs';
import { FiUploadCloud } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import CustomDropdown from './CustomDropdown';
import { Controller } from "react-hook-form";
import CountrySelector from './CountrySelector';
import { useTranslation } from 'next-i18next';

/**
 * FormInput component is a versatile form input handler that supports various input types including text, textarea, select, country selector, switch, and file upload.
 * It integrates with react-hook-form for form state management and validation.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.name - The name of the input field.
 * @param {string} [props.label] - The label for the input field.
 * @param {string} [props.type] - The type of the input field (e.g., text, textarea, select, country, switch, file, password).
 * @param {string} [props.className] - Additional CSS classes for the input field.
 * @param {Object} [props.classOverrides] - Custom class overrides for specific input types.
 * @param {Object} [props.control] - Control object from react-hook-form.
 * @param {string} [props.defaultValue] - Default value for the input field.
 * @param {boolean} [props.required] - Indicates if the input field is required.
 * @param {string} [props.error] - Error message for the input field.
 * @param {string} [props.explanation] - Explanation or tooltip for the input field.
 * @param {Array} [props.options] - Options for select or country selector input types.
 * @param {boolean} [props.disabled] - Indicates if the input field is disabled.
 * @param {boolean} [props.onlyIso] - Indicates if only ISO codes should be used in the country selector.
 * @param {string} [props.accept] - Accepted file types for file input.
 * @param {Function} [props.onChange] - Change handler for the input field.
 * @param {boolean} [props.checked] - Checked state for switch input type.
 * @param {Function} [props.onBlur] - Blur handler for the input field.
 * @param {Object} ref - Ref object for the input field.
 * @returns {JSX.Element} The rendered FormInput component.
 */
const FormInput = React.forwardRef((props, ref) => {
    const { textarea, select, advancedSelect, input } = props.classOverrides || {};
    const [showPassword, setShowPassword] = useState(false);
    const [filePreviews, setFilePreviews] = useState([]); // To handle file uploads

    const { t } = useTranslation("common");

    // Create a ref for the hidden file input
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFilesSelected = (event, onChange) => {
        const files = Array.from(event.target.files);
        setFilePreviews(files); // Store the file previews locally
        if (onChange) {
            onChange(files); // Pass files to the form state via react-hook-form's onChange
        }
    };

    // Trigger file input click
    const handleUploadClick = (e) => {
        e.preventDefault(); // Prevent focusing on the next input element
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Remove file and update state
    const handleRemoveFile = (index, onChange) => {
        const updatedPreviews = filePreviews.filter((_, i) => i !== index);
        setFilePreviews(updatedPreviews);
        onChange(updatedPreviews); // Update the form state with the remaining files
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input to allow re-upload
        }
    };

    return (
        <div className={''}>
            <div className={'flex justify-start items-center space-x-2'}>
                <label htmlFor={props.name} className={'block text-sm font-medium text-gray-700'}>
                    {props.error || props.label}
                </label>
                <div className={`group relative ${props.explanation ? '' : 'hidden'}`}>
                    <BsFillQuestionCircleFill className="text-gray-500 h-4 w-4" />
                    <div className={`hidden group-hover:block absolute z-50 text-xs text-gray-700 bg-white shadow p-2 w-64`}>
                        {props.explanation}
                    </div>
                </div>
            </div>
            <div className={''}>
                {(() => {
                    if (props.type === 'textarea') return (
                        <textarea
                            {...props}
                            ref={ref}
                            className={twMerge(props.className, textarea)}
                        ></textarea>
                    )
                    else if (props.type === 'select') return (
                        <Controller
                            name={props.name}
                            control={props.control}
                            defaultValue={props.defaultValue || ""}
                            rules={{ required: props.required ? t("selection_required") : false }}
                            render={({ field: { onChange, value }, fieldState: { error }  }) => (
                                <> <CustomDropdown
                                    options={props.options}
                                    value={value}
                                    onChange={onChange} // This ensures that changes are sent to react-hook-form
                                    placeholder={t("select")}
                                    disabled={props.disabled}
                                />
                              
                                </>
                            )}
                        />
                    )
                    else if (props.type === 'country') return (
                        <Controller
                            name={props.name}
                            control={props.control}
                            defaultValue={props.defaultValue || ""}
                            rules={{ required: props.required ? t("country_required") : false }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                               <> <CountrySelector
                                    countries={props.options} // Assuming field.options contains the countries
                                    selectedCountry={value}
                                    onlyIso={props.onlyIso}
                                    onSelect={(country) => {console.log("country",country);onChange(country)}}
                                    disabled={props.disabled}
                                />
                                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
                                </>
                            )}
                        />
                    )
                    else if (props.type === 'switch') return (
                        <label className="switch">
                            <input type="checkbox"
                                name={props.name}
                                ref={ref}
                                onChange={props.onChange}
                                checked={props.checked}
                                onBlur={props.onBlur}
                            />
                            <span className="slider round"></span>
                        </label>
                    )
                    else if (props.type === 'file') return (
                        <Controller
                            name={props.name}
                            control={props.control}
                            rules={{ required: props.required ? `${props.label} ist erforderlich` : false }}
                            render={({ field: { onChange } ,fieldState: { error } }) => (
                                <div>
                                    <input
                                        type="file"
                                        id={props.id}
                                        accept={props.accept}
                                        className="hidden" // Hide default input
                                        ref={fileInputRef} // Use the file input ref
                                        onChange={(e) => handleFilesSelected(e, onChange)}
                                    />
                                    <div className={` items-center justify-between p-2 border rounded-md border-gray-300`}>
                                        <div>
                                            {filePreviews.length === 0 ? (
                                                <button
                                                    onClick={handleUploadClick} // Trigger file input click
                                                    className="flex items-center space-x-2 text-uhuBlue "
                                                >
                                                    <FiUploadCloud className="w-5 h-5" />
                                                    <span>{t("uploadFile")}</span>
                                                </button>
                                            ) : (
                                                <div className="flex flex-col w-full">
                                                    {filePreviews.map((file, index) => (
                                                        <div key={index} className="flex flex-1 items-center space-x-2 w-full">
                                                            <BsFileEarmarkText className="text-gray-600" />
                                                            <p className="flex-1 text-sm text-gray-600 truncate overflow-hidden w-full">
                                                                {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                                                            </p>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveFile(index, onChange)} // Remove file and update form
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
                    )
                    else return (
                        <div className='relative'>
                            <input
                                {...props}
                                ref={ref}
                                type={props.type === 'password' && showPassword ? 'text' : props.type}
                                className={twMerge(`${props.error && 'border-red-300'} ${props.disabled && "text-gray-500 bg-gray-100"} ${props.className} px-2 focus:ring-[1px] focus:ring-uhuBlue`, input)}
                            />
                            {/* Button for Password Input ( toggle show/hide password) */}
                            <div className={`${props.type === 'password' ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3 flex items-center`}>
                                <button tabIndex={-1} type='button' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <BsEyeSlash className={`h-5 w-5 text-gray-400 hover:text-gray-500`} />) :
                                        (<BsFillEyeFill className={`h-5 w-5 text-gray-400 hover:text-gray-500`} />
                                        )}
                                </button>
                            </div> 
                        </div>
                    )
                })()}
            </div>
        </div>
    )
})

export default FormInput;