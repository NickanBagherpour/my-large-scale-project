export const REGEX_PATTERNS = {
  isLatinText: /^[^\u0600-\u06FF]*$/,
  isPersianText: /^[^a-zA-Z]*$/,
  urlValidator: /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  optionalUrlValidator: /^(?:https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|)$/,
  onlyDigit: /^[0-9]*$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  mobileNumber: /^(\+98|0)?9\d{9}$/,
};

export const REGEX_PATTERNS_UPSTREAM_MANAGEMENT = {
  searchUpstreamName: /^[A-Za-z0-9\u0600-\u06FF\u06F0-\u06F9._-]*$/,
  upstreamName: /^[A-Za-z0-9._-]*$/,
  upstreamDescription: /^[0-9\u0600-\u06FF\u06F0-\u06F9._-]*$/,
};
