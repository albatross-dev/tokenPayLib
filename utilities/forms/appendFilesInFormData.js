const appendFilesRecursively = (processedData, data) => {
  const formData = new FormData();
  const handleDataRecursively = (key, value, parent, formKey = "") => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        handleDataRecursively(`${key}[${index}]`, item, value, formKey);
      });
    } else if (value instanceof File) {
      // If the value is a File, append it to FormData with metadata (key and id if present)
      const fileKey = formKey || key;
      console.log("parent", parent);
      const id = parent?.id ? parent.id : null; // If there is an id, add it
      const newKey = id ? `${fileKey}/${id}` : fileKey; // Create a unique key with id
      console.log("appendfile", newKey, value, value.name);
      formData.append(newKey, value, value.name);
    } else if (typeof value === "object" && value !== null) {
      Object.keys(value).forEach((nestedKey) => {
        handleDataRecursively(
          nestedKey,
          value[nestedKey],
          value,
          formKey ? `${formKey}.${nestedKey}` : `${key}.${nestedKey}`
        );
      });
    } else {
      // Append non-file values to FormData
      if(value !== undefined){
        formData.append(formKey || key, value);
      }
    }
  };

  // Iterate over the data object and process each field
  Object.keys(processedData).forEach((key) => {
    handleDataRecursively(key, data[key], data);
  });

  return formData;
};

export default appendFilesRecursively;