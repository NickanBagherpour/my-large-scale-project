import React from 'react';
import styled from 'styled-components';
import { DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps } from 'antd';
import { dayjs } from '@oxygen/utils';
import { RangePickerProps } from 'antd/lib/date-picker';
import * as S from './date-picker.style';

export type DatePickerProps = AntDatePickerProps & {
  defaultValueStr?: string;
  disabledPast?: boolean;
  disableFuture?: boolean;
};

const dateFormat = 'YYYY/MM/DD';

export const DatePicker = (props: DatePickerProps) => {
  const {
    defaultValue,
    defaultValueStr,
    format = dateFormat,
    disabledPast = false,
    disableFuture = false,
    disabledDate,
    ...rest
  } = props;
  debugger;
  const defVal = defaultValue ?? (defaultValueStr ? dayjs(defaultValueStr) : null);

  const handleDisableDate = (current) => {
    if (disabledPast) {
      return current && current < dayjs().subtract(1, 'day').endOf('day');
    }
    if (disableFuture) {
      return current && current > dayjs().endOf('day');
    }
    if (disabledDate) {
      return disabledDate(current, { type: 'date' });
    }

    return false;
  };

  return (
    <S.DatePickerContainer>
      <AntDatePicker
        format={format}
        defaultValue={defVal as any}
        disabledDate={handleDisableDate as RangePickerProps['disabledDate']}
        {...rest}
      />
    </S.DatePickerContainer>
  );
};

DatePicker.RangePicker = AntDatePicker.RangePicker;
DatePicker.TimePicker = AntDatePicker.TimePicker;
DatePicker.YearPicker = AntDatePicker.YearPicker;
DatePicker.WeekPicker = AntDatePicker.WeekPicker;
DatePicker.MonthPicker = AntDatePicker.MonthPicker;
DatePicker.QuarterPicker = AntDatePicker.QuarterPicker;
