/**
 * Validates Iranian mobile number formats as specified.
 * @param phone - The phone number string (trimmed automatically).
 * @returns True if valid, false otherwise.
 */
export function isValidIranianMobile(phone: string): boolean {
  const trimmed = phone.trim();
  const regex = /^(09\d{9}|\+989\d{9}|00989\d{9})$/;
  return regex.test(trimmed);
}
