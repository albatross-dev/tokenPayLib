import { UseFormReturn } from "react-hook-form";
import formatDateForInput from "./formatDateForInput";


const preprocessAndSetValues = (data: Record<string, any>, parentKey = "", methods: UseFormReturn): void => {
  Object.entries(data).forEach(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key; // Handles nested keys
    
    console.log("iterate", key, value);

    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      // Recursively call the function for nested objects
      preprocessAndSetValues(value, fullKey, methods);
    } else if (Array.isArray(value)) {
      // Handle arrays by recursively calling the function for each item
      value.forEach((item, index) => {
        preprocessAndSetValues(item, `${fullKey}.${index}`, methods);
      });
    } else {
      // Check if the value is a valid ISO date string
      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/.test(value) && !isNaN(Date.parse(value))) {
        const formattedDate = formatDateForInput(value);
        console.log("set date", value, formattedDate)
        methods.setValue(fullKey, formattedDate); // Set formatted date value
      } else {
        // Set the value normally for non-date fields
        methods.setValue(fullKey, value);
      }
    }
  });
};

export default preprocessAndSetValues;