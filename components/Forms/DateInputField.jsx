
import React, { useState } from 'react';

/**
 * DateInputField component renders a date input field with custom formatting.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.fieldName - The name of the field.
 * @param {Object} props.methods - The methods object from react-hook-form.
 * @param {boolean} props.parsedRequired - Indicates if the field is required.
 * @param {boolean} props.disabled - Indicates if the field is disabled.
 *
 * @returns {JSX.Element} The rendered date input field component.
 */
const DateInputField = ({ fieldName, methods, parsedRequired, disabled }) => {
  const [formattedDate, setFormattedDate] = useState("");

  // Format the default value if it exists
  const formatDateToDisplay = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // yyyy-mm-dd format
    if (selectedDate) {
      const [year, month, day] = selectedDate.split("-");
      const formatted = `${day}.${month}.${year}`;  // Convert to dd.mm.yyyy format
      setFormattedDate(formatted); // Update state for displaying formatted date
      methods.setValue(fieldName, selectedDate); // Keep the value in the native format
    } else {
      setFormattedDate(""); // Reset if no date selected
    }
  };

  return (
    <div>
      {/* The native date picker */}
      <input
        id={fieldName}
        name={fieldName}
        disabled={disabled}
        type="date"
        {...methods.register(fieldName, { required: parsedRequired })}
        className={`mt-1 p-2 w-full border rounded-md`}
        onChange={handleDateChange}
      />

    </div>
  );
};

export default DateInputField;