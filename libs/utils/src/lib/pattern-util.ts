export const REGEX_PATTERNS = {
  isLatinText: /^[^\u0600-\u06FF]*$/,
  isPersianText: /^[^a-zA-Z]*$/,
  urlValidator: /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  optionalUrlValidator:/^(?:https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|)$/,
  onlyDigit: /^[0-9]*$/,
  optionalEmailValidator:/^(|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
};
