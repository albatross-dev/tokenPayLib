import { UseFormSetValue, Path } from "react-hook-form";
import {
  Consumer,
  User,
  Vendor,
} from "../../../../../../../../../types/payload-types";
import formatDateForInput from "../../../../../../../../../utilities/forms/formatDateForInput";

// Recursive function to preprocess and set values in nested data structures
const preprocessDataForHelpDesk = <T extends Record<string, any>>(
  user: User,
  setValue: UseFormSetValue<T>
): void => {
  let userCp: Vendor | Consumer = JSON.parse(JSON.stringify(user));

  // Remove specific transaction properties
  delete userCp.currentOvexTransaction;
  delete userCp.currentRomaTransaction;
  delete userCp.currentBitcoinVNHelpdeskTransaction;
  delete userCp.currentKoyweHelpdeskTransaction;
  delete userCp.currentKotaniPayHelpdeskTransaction;
  delete userCp.currentCoinhakoHelpdeskTransaction;

  const loop = (data: Record<string, any>, parentKey = ""): void => {
    Object.entries(data).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key; // Handles nested keys

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        // Recursively call the function for nested objects
        loop(value, fullKey);
      } else if (Array.isArray(value)) {
        // Handle arrays by recursively calling the function for each item
        value.forEach((item, index) => {
          if (typeof item === "object" && item !== null) {
            loop(item, `${fullKey}[${index}]`);
          }
        });
      } else {
        // Check if the value is a valid ISO date string
        if (
          typeof value === "string" &&
          !isNaN(Date.parse(value)) &&
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)
        ) {
          const formattedDate = formatDateForInput(value);
          console.log("formattedDate", key, value, formattedDate);
          setValue(fullKey as Path<T>, formattedDate as any);
        } else {
          // Set the value normally for non-date fields
          setValue(fullKey as Path<T>, value as any);
        }
      }
    });
  };

  loop(userCp);
};

export default preprocessDataForHelpDesk;
