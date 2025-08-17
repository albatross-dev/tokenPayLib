import delay from "./delay";

/**
 * Retries an async function up to a given number of times with delay between attempts.
 * @param fn - Async function to retry
 * @param retries - Number of attempts
 * @param delayMs - Delay in milliseconds between attempts
 * @returns The successful result of the async function
 */
export default function retry<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
  const execute = async (attempt: number): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      if (attempt < retries) {
        console.warn(`Attempt ${attempt} failed:`, error);
        await delay(delayMs);
        return execute(attempt + 1);
      }
      throw error;
    }
  };

  return execute(1);
}
