import { LocalStorageKey, Nullable } from '@oxygen/types';
import { storage } from './storage';
import axios, { type AxiosError } from 'axios';

export const RE_DIGIT = new RegExp(/^\d+$/);

export function addThousandSeparator(value: number | string) {
  return value
    ?.toString()
    ?.split(',')
    ?.join('')
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const arrayToQueryString = (params: (string | number)[], paramName: string): string => {
  let store = '';
  params.map((item) => {
    if (item) {
      store += `&${paramName}=${item}`;
    }
  });

  return store;
};

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

export function getValueOrDash(value: any, emptyValue?: string) {
  return value?.toString()?.trim()?.length > 0 ? value?.toString()?.trim() : emptyValue ?? ' - ';
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
    // const keys = Object.keys(storage['_localStorageItems']);
    const keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (!key.endsWith(keyToKeep)) {
        localStorage.removeItem(key);
        // storage.clear();
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

export const clearAllCookiesExceptForKey = (keyToKeep: string): void => {
  try {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

      // Skip the cookie that matches the keyToKeep
      if (name !== keyToKeep) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    }
  } catch (e) {
    console.error('Error while clearing cookies:', e);
  }
};

export const getCookie = (key: string): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  // Create a regular expression to match the exact key
  const regex = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)');
  const match = document.cookie.match(regex);

  // If a match is found, decode and return the value
  return match ? decodeURIComponent(match[1]) : null;
};

export function setCookie(name: string, value: string, minutes?: number): void {
  let expires = '';
  if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
}

export const getUserFullNameFromStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    const userDataString = storage.getItem(LocalStorageKey.USER);
    const userData = userDataString ? JSON.parse(userDataString as string) : null;

    if (userData) {
      const name = userData.name ? userData.name.trim() : '';
      const family = userData.family ? userData.family.trim() : '';
      return `${name} ${family}`.trim();
    }

    return null;
  } else {
    return null;
  }
};

export const debounceFn = (callback, delay) => {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
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

export function convertShamsiDateFormat(dateString) {
  if (dateString) {
    const [datePart, timePart] = dateString.split(' ');

    const [hours, minutes] = timePart.split(':');

    const newFormat = `${datePart}\u00A0\u00A0\u00A0\u00A0${hours}:${minutes}`;

    return newFormat;
  } else {
    return '-';
  }
}

export function normalizePhoneNumber(phone) {
  if (phone) {
    // Remove any non-numeric characters (dashes, spaces)
    const cleanedPhone = phone.replace(/\D/g, '');

    // Check if the phone number has at least 10 digits (assuming format like '021 - 88698541')
    if (cleanedPhone.length === 11) {
      // Format the phone number as '021 - 88698541'
      return `${cleanedPhone.slice(0, 3)}\u00A0-\u00A0${cleanedPhone.slice(3)}`;
    }
    return phone;
  } else {
    return '-';
  }
}

export function isAxiosError(error: any): error is AxiosError {
  return axios.isAxiosError(error);
}

export function getWidgetTitle(props: {
  widgetName: string;
  widgetNamePrefix?: string;
  englishName?: Nullable<string>;
  persianName?: Nullable<string>;
}): string {
  const { widgetName, widgetNamePrefix, englishName, persianName } = props;

  const name = englishName || persianName;
  if (name) {
    return `${widgetNamePrefix} ${name}`;
  } else {
    return widgetName;
  }
}
