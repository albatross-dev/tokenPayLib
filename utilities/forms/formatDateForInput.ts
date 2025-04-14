
// Utility function to convert ISO date string to "YYYY-MM-DD"
const formatDateForInput = (isoString: string) => {
  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // Return YYYY-MM-DD format
};

export default formatDateForInput;