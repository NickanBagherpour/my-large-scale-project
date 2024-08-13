import {
  MobileDatePicker as MuiMobileDatePicker,
  MobileDatePickerProps as MuiMobileDatePickerProps,
} from '@mui/x-date-pickers';
import React, { ReactNode } from 'react';

import styled from '@emotion/styled';

type TDate = Date | any;

interface MobileDatePickerProps extends MuiMobileDatePickerProps<TDate> {
  hiddenToolbar?: boolean;
  helperText?: ReactNode;
  placeholder?: string;
  error?: boolean;
  fullWidth?: boolean;
}

const StyledMobileDatePicker = styled(MuiMobileDatePicker)<MobileDatePickerProps>`
  & .MuiInputBase-input {
    padding: 1.25rem;
    /* height: 3.53rem; */
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

  i.adornment-icon {
    font-size: 2.4rem;
  }
`;

const MobileDatePicker: React.FC<MobileDatePickerProps> = (props) => {
  const { hiddenToolbar = true, helperText, placeholder, error = false, fullWidth = false, ...rest } = props;

  return (
    <StyledMobileDatePicker
      // format='yyyy/MM/dd'

      slotProps={{
        textField: {
          fullWidth,
          helperText: helperText,
          placeholder: placeholder,
          error: error,
          InputProps: {
            endAdornment: <i className='icon-calendar adornment-icon' />,
          },
          InputLabelProps: {
            shrink: true,
          },
        },
        // inputAdornment: {
        //   position: 'start',
        //   // suffix: <i className={'icon-bill'} />,
        // },

        // field: {clearable: true, /*onClear: () => setCleared(true)*/},

        actionBar: { actions: ['clear'] },
        toolbar: {
          hidden: hiddenToolbar,
        },
      }}
      {...rest}
    />
  );
};

export default MobileDatePicker;
