/**
 * Retrieves data from local storage based on the provided key.
 */
function getFromLocalStorage(key: string): any {
  try {
    const dataJson = localStorage.getItem(key);
    if (dataJson === null) {
      return null;
    }
    const data = JSON.parse(dataJson);
    return data;
  } catch (error) {
    console.error("Error fetching data from local storage:", error);
    return null;
  }
}

export default getFromLocalStorage;
