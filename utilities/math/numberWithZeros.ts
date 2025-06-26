/**
 * Calculates 10 raised to the power of n
 * @param n - The exponent to raise 10 to
 * @returns 10^n or null if n <= 0
 */
export default function numberWithZeros(n: number): number {
  if (n <= 0) return 0; // Handle cases less than or equal to 0
  return Math.pow(10, n);
}
