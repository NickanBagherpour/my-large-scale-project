export const RE_DIGIT = new RegExp(/^\d+$/);

export function addThousandSeparator(value: number | string) {
  return value
    .toString()
    .split(',')
    .join('')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function removeLettersFromNumber(value: string) {
  return value.replace(/\D/g, '');
}

export function rialToToman(value: string | number) {
  try {
    const amount = +removeLettersFromNumber(value.toString());
    return Math.floor(amount / 10);
  } catch (e) {
    return 0;
  }
}

export function isNumber(value: string): boolean {
  return /^\d+$/.test(value);
}

export function isNumberOrEmpty(value: string): boolean {
  return isNumber(value) || value.trim() === '';
}

export function isNumberComma(value: string): boolean {
  return /^[0-9,,]*$/.test(value);
}

export function getValueOrDash(value: any) {
  return value?.toString()?.trim()?.length > 0 ? value?.toString()?.trim() : ' - ';
}

export function isEmptyObject(obj: Record<string, unknown>) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}

export function deepCopy(obj) {
  // console.log('deepCopy', obj);
  return JSON.parse(JSON.stringify(obj));
}

export function uuid(key?: string | number) {
  const time = new Date().getTime();
  return `${key ?? 'xx'}-xxxxxxx-xxxx-xxx-yxxx-${time}`.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(20);
  });
}

export function fileSize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  let i = 0;

  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }

  return `${bytes
    .toFixed(1)
    .toString()
    .replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')} ${units[i]}`;
}

export function getFileExtension(fileName: string) {
  const lastIndexOf: number = fileName.lastIndexOf('.');
  if (lastIndexOf == -1) {
    return ''; // empty extension
  }
  return fileName.substring(lastIndexOf + 1);
}

export function getFileType(fileName: string) {
  const extension = getFileExtension(fileName);
  switch (extension) {
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'xml':
      return 'application/xml';
    case 'txt':
    case extension.match(/^[0-9]*$/) ? extension : undefined:
      return 'text/plain';
    case 'pdf':
      return 'application/pdf';
    case 'zip':
      return 'application/zip';
    default:
      return '';
  }
}

export function mergeObjects(obj1: any, obj2: any) {
  const result: any = {};

  // Copy keys from obj1 to result
  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      result[key] = obj1[key];
    }
  }

  // Merge obj2 into result
  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      if (typeof obj2[key] === 'object' && obj2[key] !== null) {
        result[key] = mergeObjects(result[key], obj2[key]);
      } else {
        result[key] = obj2[key];
      }
    }
  }

  return result;
}

export const getValueByKey = (targetEnum: object, key: string) => {
  let value = null;

  try {
    const indexOfS = Object.keys(targetEnum).indexOf(key as any);
    value = Object.values(targetEnum)[indexOfS];
  } catch (ex) {
    //
  }
  return value;
};

export const clearLocalStorageExceptForKey = (keyToKeep: string): void => {
  try {
    const keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== keyToKeep) {
        localStorage.removeItem(key);
      }
    }
  } catch (e) {
    //
    }
};

export const clearAllCookies = (): void => {
  try {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  } catch (e) {
    //
  }
};

export function convertToEnglishNumbers(text) {
  const arabicPersianMap = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '۰': '0', // Add additional variants for Persian numerals
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  };

  return text.replace(/[٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹]/g, (match) => arabicPersianMap[match]);
}

function replaceAll(str, targetChar, replacementChar) {
  // Use regular expression with global flag to replace all occurrences
  const regex = new RegExp(targetChar, 'g');
  return str.replace(regex, replacementChar);
}

