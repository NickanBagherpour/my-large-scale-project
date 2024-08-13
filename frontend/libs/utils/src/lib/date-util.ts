import { Locale } from '@oxygen-portal/types';

import { convertToEnglishNumbers } from './util';

export function dateLocale(date?: string, locale?: string) {
  let result = '';
  const _locale = locale || Locale.FA_IR;
  const options = { year: 'numeric' as const, month: '2-digit' as const, day: '2-digit' as const };
  if (date) result = new Date(date).toLocaleDateString(_locale, options);
  else result = new Date().toLocaleDateString(_locale, options);
  return convertToEnglishNumbers(result); //.replace(/\//g, '-'); // replace forward slashes with dashes
}

export function fullDateLocale(date?: string, locale?: string) {
  let result = '';
  const _locale = locale || Locale.FA_IR;

  let year = '';
  let month = '';
  let day = '';
  let weekday = '';

  if (date) {
    year = new Date(date).toLocaleDateString(_locale, { year: 'numeric' });
    month = new Date(date).toLocaleDateString(_locale, { month: 'long' });
    day = new Date(date).toLocaleDateString(_locale, { day: 'numeric' });
    weekday = new Date(date).toLocaleDateString(_locale, { weekday: 'long' });
  } else {
    year = new Date().toLocaleDateString(_locale, { year: 'numeric' });
    month = new Date().toLocaleDateString(_locale, { month: 'long' });
    day = new Date().toLocaleDateString(_locale, { day: 'numeric' });
    weekday = new Date().toLocaleDateString(_locale, { weekday: 'long' });
  }

  result = `${weekday} ${day} ${month} ${year}`;
  return result;
}

export function timeFromDate(date?: string, withSeconds?: boolean) {
  const _date = date || new Date().toTimeString();
  const dateParts = _date.split(' ');
  for (const part of dateParts) {
    if (part.includes(':')) {
      const timeParts = part.split(':');
      if (withSeconds && timeParts.length === 3) {
        return part.trim();
      }
      return `${timeParts[0]}:${timeParts[1]}`;
    }
  }

  return '';
}

export function datetimeLocale(date?: string, withSeconds?: boolean, delimiter = ' , ') {
  let result = '';
  try {
    result = `${dateLocale(date)}${delimiter}${timeFromDate(date, withSeconds)}`;
  } catch (e) {
    //
  }

  return result;
}

export function toApiDate(date?: string, defaultNow?: boolean) {
  if (date) return new Date(date).toISOString().slice(0, 10);
  else if (defaultNow) return new Date().toISOString().slice(0, 10);
  return null;
}

export function dateFormatter(date?: string, delimiter = '/') {
  // console.log('date', date);
  if (date) {
    const targetChar = /[-/]/g; // Regular expression to match '-' or '/'
    return date.replace(targetChar, delimiter);
  }
  return '';
}

export function reformatDate(date) {
  const newDate = new Date(date).toLocaleString('fa').split(',')[0];
  return convertToEnglishNumbers(newDate);
}
