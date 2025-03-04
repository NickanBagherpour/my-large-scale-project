import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps } from 'antd';
import { Dayjs, dayjs } from '@oxygen/utils';
import * as S from './date-picker.style';

// Access RangePickerProps through DatePicker
type AntRangePickerProps = React.ComponentProps<typeof AntDatePicker.RangePicker>;

type DatePickerProps = AntDatePickerProps & {
  defaultValueStr?: string;
  disabledPast?: boolean;
  disableFuture?: boolean;
  fromDate?: Dayjs | null;
  toDate?: Dayjs | null;
  setFromDate?: (date: Dayjs | null) => void;
  setToDate?: (date: Dayjs | null) => void;
};

const dateFormat = 'YYYY/MM/DD';

export const DatePicker = (props: DatePickerProps) => {
  const {
    defaultValueStr,
    disabledPast = false,
    disableFuture = false,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    ...rest
  } = props;

  const defaultValue = defaultValueStr ? dayjs(defaultValueStr) : null;

  const handleDisableDate = (current) => {
    if (disabledPast && current < dayjs().subtract(1, 'day').endOf('day')) {
      return true;
    }
    if (disableFuture && current > dayjs().endOf('day')) {
      return true;
    }
    if (fromDate) {
      const maxToDate = fromDate.add(1, 'month');
      if (current.isAfter(maxToDate, 'day') || current.isBefore(fromDate, 'day')) {
        return true;
      }
    }
    if (toDate) {
      const minFromDate = toDate.subtract(1, 'month');
      if (current.isBefore(minFromDate, 'day') || current.isAfter(toDate, 'day')) {
        return true;
      }
    }
    return false;
  };

  return (
    <S.DatePickerContainer>
      <AntDatePicker
        format={dateFormat}
        defaultValue={defaultValue as any}
        disabledDate={handleDisableDate}
        onChange={(date: Dayjs | null, dateString: string | string[]) => {
          if (setFromDate && date) {
            setFromDate(date);
          }
          if (setToDate) {
            setToDate(null);
          }
        }}
        {...rest} // Pass other props from AntDatePickerProps
      />
    </S.DatePickerContainer>
  );
};

// Forward ref with the correct typing for RangePicker
DatePicker.RangePicker = forwardRef<
  any,
  AntRangePickerProps & {
    setFromDate?: (date: Dayjs | null) => void;
    setToDate?: (date: Dayjs | null) => void;
    fromDate?: Dayjs | null;
    toDate?: Dayjs | null;
  }
>(({ fromDate, toDate, setFromDate, setToDate, ...rest }, ref) => {
  return (
    <S.DatePickerContainer>
      <AntDatePicker.RangePicker
        ref={ref} // Forward the ref correctly
        format={dateFormat}
        disabledDate={(current) => {
          if (!fromDate && !toDate) return false;
          if (fromDate) {
            const maxToDate = fromDate.add(1, 'month');
            return current.isAfter(maxToDate, 'day') || current.isBefore(fromDate, 'day');
          }
          if (toDate) {
            const minFromDate = toDate.subtract(1, 'month');
            return current.isBefore(minFromDate, 'day') || current.isAfter(toDate, 'day');
          }
          return false;
        }}
        onCalendarChange={(dates: [Dayjs | null, Dayjs | null], dateStrings: [string, string], info) => {
          if (dates[0] && setFromDate) setFromDate(dates[0]);
          if (dates[1] && setToDate) setToDate(dates[1]);
        }}
        {...rest} // Pass other props from AntRangePickerProps
      />
    </S.DatePickerContainer>
  );
});

DatePicker.TimePicker = AntDatePicker.TimePicker;
DatePicker.YearPicker = AntDatePicker.YearPicker;
DatePicker.WeekPicker = AntDatePicker.WeekPicker;
DatePicker.MonthPicker = AntDatePicker.MonthPicker;
DatePicker.QuarterPicker = AntDatePicker.QuarterPicker;
