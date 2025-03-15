export const REGEX_PATTERNS = {
  isenglishText: /^[^\u0600-\u06FF]*$/,
  validWithNoCapitalLetters: /^(?![0-9])[a-z0-9_.-]+$/,
  noWhitespace: /^(?:\s*|[^\s\s]+(?:\S+[^\s]+)*\S*)$/,
  isPersianText: /^[^a-zA-Z]*$/,
  PersianIdentifier: /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/,
  defaultEnglishName: /^[A-Za-z][A-Za-z0-9._-]*$/,
  defaultPersianName: /^(?![0-9._-])[A-Za-z\u0600-\u06FF][A-Za-z\u0600-\u06FF0-9._\-\s]*(?<![\s])$/,
  url: /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  optionalUrl: /^(?:https?:\/\/)?(?=[^/]*[A-Za-z])(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?::\d{1,5})?$|^$/,
  optionalProtocolUrl: /^(http:\/\/|https:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d{1,5})?$/,
  onlyDigit: /^[0-9]*$/,
  nationalCode: /^[0-9]{10}$/,
  positiveNumber: /^[+]?\d*\.?\d+$/,
  englishOrPersianPositiveNumber: /^[\d٫۰-۹]+(\.[\d٫۰-۹]+)?$/, // english and persian positive numbers
  phoneNumber: /^09\d{9}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  ipOrDomainAddress:
    /^(https?:\/\/)?(((25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)|([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+))(:\d{1,5})?$/,
  ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  notHttpUrlPattern: /^(?!https?:\/\/)/, // Regular expression for strings that do not start with http:// or https://
  path: /^\/([A-Za-z0-9._~-]+(?:\/[A-Za-z0-9._~+-]*)*)?$/,
  host: /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3}))(:\d{1,5})?$/,
  domain: /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3}))(:\d{1,5})?$/,
  tel: /^0\d{10}$/,
  description: /^[0-9\u0600-\u06FF\u06F0-\u06F9._-]*$/,
  upstreamServerWeight: /^(0|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
};
