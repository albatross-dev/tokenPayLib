import React, { useState, ChangeEvent } from 'react';
import { UseFormRegister, Path, UseFormSetValue, PathValue } from 'react-hook-form';

interface DateInputFieldProps<T extends Record<string, any>> {
  fieldName: Path<T>;
  methods: {
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
  };
  parsedRequired?: boolean;
  disabled?: boolean;
}

/**
 * DateInputField component renders a date input field with custom formatting.
 *
 * @component
 * @template T - The type of the form data structure
 * @param {DateInputFieldProps<T>} props - The component props
 * @returns {JSX.Element} The rendered date input field component
 */
function DateInputField<T extends Record<string, any>>({
  fieldName,
  methods,
  parsedRequired,
  disabled
}: DateInputFieldProps<T>): JSX.Element {
  const [formattedDate, setFormattedDate] = useState<string>("");

  /**
   * Formats a date string from yyyy-mm-dd to dd.mm.yyyy
   * @param {string} dateString - The date string in yyyy-mm-dd format
   * @returns {string} The formatted date string in dd.mm.yyyy format
   */
  const formatDateToDisplay = (dateString: string): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  /**
   * Handles date input changes and formats the date for display
   * @param {ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedDate = e.target.value; // yyyy-mm-dd format
    if (selectedDate) {
      const [year, month, day] = selectedDate.split("-");
      const formatted = `${day}.${month}.${year}`;  // Convert to dd.mm.yyyy format
      setFormattedDate(formatted); // Update state for displaying formatted date
      methods.setValue(fieldName, selectedDate as PathValue<T, Path<T>>); // Keep the value in the native format
    } else {
      setFormattedDate(""); // Reset if no date selected
    }
  };

  return (
    <div>
      {/* The native date picker */}
      <input
        id={String(fieldName)}
        name={String(fieldName)}
        disabled={disabled}
        type="date"
        {...methods.register(fieldName, { required: parsedRequired })}
        className="mt-1 p-2 w-full border rounded-md"
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DateInputField; 