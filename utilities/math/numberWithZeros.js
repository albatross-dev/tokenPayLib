export default function numberWithZeros(n) {
  if (n <= 0) return null; // Handle cases less than or equal to 0
  return Math.pow(10, n);
}