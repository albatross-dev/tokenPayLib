/**
 * Delays execution for a given number of milliseconds
 * @param ms - milliseconds to wait
 * @returns Promise that resolves after the delay
 */
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default delay;
