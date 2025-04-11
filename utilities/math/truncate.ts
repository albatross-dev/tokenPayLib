/**
 * Truncates a string to a specified length, adding a separator in the middle
 * @param fullStr - The full string to truncate
 * @param strLen - The maximum length of the resulting string
 * @param separator - The separator to use (defaults to '...')
 * @returns The truncated string with the separator in the middle
 */
export default function truncate(
  fullStr: string, 
  strLen: number, 
  separator?: string
): string {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...';

  const sepLen = separator.length;
  const charsToShow = strLen - sepLen;
  const frontChars = Math.ceil(charsToShow/2);
  const backChars = Math.floor(charsToShow/2);

  return fullStr.substring(0, frontChars) + 
         separator + 
         fullStr.substring(fullStr.length - backChars);
} 