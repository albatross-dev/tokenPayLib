const preprocessDataForServer = (data) => {
  const processedData = { ...data };

  const recursiveProcess = (obj) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (typeof value === "object" && value !== null) {
        if (value.filename && value.id) {
          // Replace the object with just the ID if it contains a filename
          obj[key] = value.id;
        } else if (Array.isArray(value)) {
          // Recursively process each item in the array
          value.forEach((item) => recursiveProcess(item));
        } else {
          // Recursively process nested objects
          recursiveProcess(value);
        }
      }

      if(value === null){
        delete obj[key];
      }
    });
  };

  recursiveProcess(processedData);
  return processedData;
};

export default preprocessDataForServer;