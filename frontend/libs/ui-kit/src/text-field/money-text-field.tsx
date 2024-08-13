import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { useTr } from '@oxygen-portal/translation';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  label?: string;
}

const MoneyTextField = React.forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;
  const [t] = useTr();

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      suffix={` ${t('common.rial')} `}
    />
  );
});

export default MoneyTextField;
