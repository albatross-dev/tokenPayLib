
// Utility function to convert ISO date string to "YYYY-MM-DD"
const formatDateForInput = (isoString) => {
  if (!isoString) return ""; // If no date, return an empty string
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // Return YYYY-MM-DD format
};

export default formatDateForInput;