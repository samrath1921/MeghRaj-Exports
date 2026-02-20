export function isValidCountryName(value: string): boolean {
  const country = value.trim();
  if (!country) return false;

  // Country names should contain letters and may include spaces, apostrophes, dots, and hyphens.
  // Require at least 2 letters total, and disallow digits/special symbols.
  const formatOk = /^[A-Za-z][A-Za-z .'-]*$/.test(country);
  if (!formatOk) return false;

  const lettersOnly = country.replace(/[^A-Za-z]/g, '');
  return lettersOnly.length >= 2;
}

export function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function isValidWhatsappLocalNumber(value: string): boolean {
  const digits = normalizePhoneDigits(value);
  // Typical local subscriber lengths vary; keep a practical safe range.
  return digits.length >= 6 && digits.length <= 14;
}
