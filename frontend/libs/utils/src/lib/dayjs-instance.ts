import dayjs, { Dayjs } from 'dayjs';
import jalaliday from 'jalaliday';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);
dayjs.extend(jalaliday);

dayjs['calendar']('jalali'); // Set the default calendar

export { dayjs, Dayjs };
