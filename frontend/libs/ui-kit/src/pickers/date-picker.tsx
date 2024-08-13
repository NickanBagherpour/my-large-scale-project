import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers';
import React from 'react';

import styled from '@emotion/styled';

type TDate = Date | any;

interface DatePickerProps extends MuiDatePickerProps<TDate> {
  icon?: string;
  fullWidth?: boolean;
}

const StyledDatePicker = styled(MuiDatePicker)<DatePickerProps>`
  & .MuiInputBase-input {
    padding: 0.85rem;
  }

  & label.MuiInputLabel-root {
    //top: -1rem;

    //-webkit-transform: translate(-14px, 8px) scale(1);
    transform: translate(16px, 8px) scale(1);
  }

  & label.MuiInputLabel-root.Mui-focused,
  & label.MuiInputLabel-root.MuiInputLabel-shrink {
    //top: -1rem;

    //-webkit-transform: translate(-14px, 8px) scale(1);
    transform: translate(16px, -9px) scale(0.75);
  }
`;

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { fullWidth = false, ...rest } = props;

  return (
    <StyledDatePicker
      slotProps={{
        textField: {
          fullWidth,
          // helperText: 'MM/DD/YYYY',
          /*
        InputProps: {
         startAdornment: (
              <S.InputAdornment position='start'>
                <i className='icon-search-normal' />
              </S.InputAdornment>
            ),
          },
          */
        },
        // inputAdornment: {
        //   position: 'start',
        //   // suffix: <i className={'icon-bill'} />,
        // },

        // field: {clearable: true, /*onClear: () => setCleared(true)*/},

        actionBar: { actions: ['clear'] },
        openPickerIcon: <i className={'icon-bill'} />,
      }}
      {...rest}
    />
  );
};

export default DatePicker;
