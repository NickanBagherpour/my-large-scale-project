import { Locale } from '@oxygen/types';
import { dayjs, Dayjs } from './dayjs-instance';

export function changeDayjsCalendar(locale?: string) {
  if (locale === Locale.FA_IR) {
    dayjs['calendar']('jalali');
  } else {
    dayjs['calendar'](undefined);
  }
}

export function dateLocale(date?: string | number, locale?: string, defaultNow?: boolean) {
  const _locale = locale || Locale.FA_IR;
  const options = { year: 'numeric' as const, month: '2-digit' as const, day: '2-digit' as const };
  if (date) return new Date(date).toLocaleDateString(_locale, options);
  else if (defaultNow) return new Date().toLocaleDateString(_locale, options);
  return null; //.replace(/\//g, '-'); // replace forward slashes with dashes
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
  const dateParts = _date.replace('T', ' ').split(' ');
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

export function toApiFullDate(date?: string, time?: string, defaultNow?: boolean) {
  if (date) {
    return time ? new Date(date).toISOString().slice(0, 10) + ' ' + time : new Date(date).toISOString();
  } else if (defaultNow) {
    return time ? new Date().toISOString().slice(0, 10) + time + 'Z' : new Date().toISOString();
  }
  return null;
}

export function getTimeFromDayjs(date: Dayjs) {
  try {
    return dayjs(date).format('HH:mm:ss');
  } catch (e) {
    return null;
  }
}

export const getTodayDate = (time?: string) => withTime(time)(dayjs(new Date()));

export const getLastMonth = (time?: string) => withTime(time)(dayjs().subtract(1, 'month'));

export const getLastWeek = (time?: string) => withTime(time)(dayjs().subtract(1, 'week'));

export const getLastDays = (days: number, time?: string) => withTime(time)(dayjs().subtract(days, 'day'));

const withTime = (time?: string) => (date: Dayjs) => {
  if (time) {
    const [hour, minute, second] = time.split(':').map(Number);
    return date
      .hour(hour)
      .minute(minute)
      .second(second ?? 0);
  } else {
    return date;
  }
};
