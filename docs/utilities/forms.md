## forms helpers

appendFilesInFormData(processedData, data)
- Builds FormData from nested objects/arrays, preserving file names and embedding parent id if present.

getFormData(processedData)
- Similar to appendFilesInFormData; recursively appends primitives and File instances.

preprocessData (preprocessData.ts)
- Normalizes nested values before server submit:
  - If value has { filename, id } → replace with id
  - If country-like object with { iso, name, flag } → replace with iso
  - Removes null fields

processAndSet (processAndSet.ts)
- Recursively sets values into react-hook-form methods, formatting ISO dates to YYYY-MM-DD via formatDateForInput.

formatDateForInput(iso): string
- Converts ISO timestamp to YYYY-MM-DD.
