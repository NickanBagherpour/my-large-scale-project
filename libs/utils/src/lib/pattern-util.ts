export const REGEX_PATTERNS = {
  isLatinText: /^[^\u0600-\u06FF]*$/,
  isPersianText: /^[^a-zA-Z]*$/,
  urlValidator: /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  optionalUrlValidator: /^(?:https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|)$/,
  onlyDigit: /^[0-9]*$/,
  optionalEmailValidator: /^(|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
};

export const REGEX_PATTERNS_MORE_VALIDATION = {
  // isLatinText: /^[a-zA-Z]+(-[a-zA-Z]+)*$/,
  // isPersianText: /^[\u0600-\u06FF]+(-[\u0600-\u06FF]+)*$/,
  dontAcceptNumbers: /^[A-Za-z\u0600-\u06FF\s-]*$/,
  dontStartWithNumber: /^(?!\d)[A-Za-z\u0600-\u06FF\s0-9-]*$/,
  acceptDash: /^(?!-)[A-Za-z\u0600-\u06FF0-9\s-]*$/,
  dontAcceptSpaces: /^[A-Za-z\u0600-\u06FF0-9-]*$/,
};
