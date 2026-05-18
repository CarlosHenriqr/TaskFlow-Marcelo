const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailValido(email) {
  return EMAIL_REGEX.test(String(email).trim());
}
