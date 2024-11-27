import formatDateForInput from "./formatDateForInput";

  // Recursive function to preprocess and set values in nested data structures
  const preprocessAndSetValues = (data, parentKey = "", setValue) => {
    Object.entries(data).forEach(([key, value]) => {
      console.log("preprocessAndSetValues", )
      const fullKey = parentKey ? `${parentKey}.${key}` : key; // Handles nested keys
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        // Recursively call the function for nested objects
        preprocessAndSetValues(value, fullKey);
      } else if (Array.isArray(value)) {
        // Handle arrays by recursively calling the function for each item
        value.forEach((item, index) => {
          preprocessAndSetValues(item, `${fullKey}.${index}`);
        });
      } else {
        // Check if the value is a valid ISO date string
        if (typeof value === "string" && !isNaN(Date.parse(value))) {
          const formattedDate = formatDateForInput(value);
          console.log(fullKey, formattedDate);
          setValue(fullKey, formattedDate); // Set formatted date value
        } else {
          // Set the value normally for non-date fields
          console.log(fullKey, value);
          setValue(fullKey, value);
        }
      }
    });
  };

  export default preprocessAndSetValues;