import { formatDateForInput } from "@/pages/information";


// Recursive function to preprocess and set values in nested data structures
const preprocessDataForHelpDesk = (user, setValue) => {

  let userCp = JSON.parse(JSON.stringify(user));
    delete userCp.currentOvexTransaction;
    delete userCp.currentRomaTransaction;
    delete userCp.currentBitcoinVNHelpdeskTransaction;
    delete userCp.currentKoyweHelpdeskTransaction;
    delete userCp.currentKotaniPayHelpdeskTransaction;
    delete userCp.currentCoinhakoHelpdeskTransaction;
    

  const loop = (data, parentKey = "") => {
    Object.entries(data).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key; // Handles nested keys
  
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        // Recursively call the function for nested objects
        loop(value, fullKey);
      } else if (Array.isArray(value)) {
        // Handle arrays by recursively calling the function for each item
        value.forEach((item, index) => {
          loop(item, `${fullKey}[${index}]`);
        });
      } else {
        // Check if the value is a valid ISO date string
        if (typeof value === "string" && !isNaN(Date.parse(value)) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
          const formattedDate = formatDateForInput(value);
          console.log("formattedDate", key, value , formattedDate);
          setValue(fullKey, formattedDate); // Set formatted date value
        } else {
          // Set the value normally for non-date fields
          setValue(fullKey, value);
        }
      }
    });
  };

  loop(userCp);
};


export default preprocessDataForHelpDesk;
