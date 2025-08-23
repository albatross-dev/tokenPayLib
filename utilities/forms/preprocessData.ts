const preprocessDataForServer = (data: Record<string, any>) => {
  const processedData = { ...data };

  const recursiveProcess = (obj: Record<string, any>) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      console.log("preprocessing",key, obj[key] )

      if (typeof value === "object" && value !== null) {
        if (value.createdAt && value.id) {
          // Replace the object with just the ID if it contains a filename
          obj[key] = value.id;
        } else if (Array.isArray(value)) {
          // Recursively process each item in the array
          value.forEach((item) => recursiveProcess(item));
        } else if (value?.iso && value?.name && value?.flag) {
          // if the item is a country selection item then set ISO as the string
          console.log("settging country");
          obj[key] = value.iso
        } else {
          // Recursively process nested objects
          recursiveProcess(value);
        }
      }

      console.log("post",key, obj[key] )


      if(value === null){
        delete obj[key];
      }
    });
  };

  recursiveProcess(processedData);
  return processedData;
};

export default preprocessDataForServer;