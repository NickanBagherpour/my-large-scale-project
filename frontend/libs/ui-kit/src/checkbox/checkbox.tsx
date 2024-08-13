import React from 'react';
import { Checkbox as MuiCheckBox, CheckboxProps as MuiCheckboxProps, FormControlLabel, styled } from '@mui/material';

export type CheckboxProps = MuiCheckboxProps & {
  label?: string;
  labelColor?: string;
  fullWidth?: boolean;
};

export type $CheckboxProps = CheckboxProps & {
  $labelColor?: string;
  $fullWidth?: boolean;
};

const StyledCheckbox = styled(MuiCheckBox)<$CheckboxProps>``;

const StyledFormControlLabel = styled(FormControlLabel)<$CheckboxProps>`
  display: flex;
  width: ${(p) => (p.$fullWidth ? '100%' : 'unset')};
  color: ${(p) => p.$labelColor};
`;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { labelColor = undefined, fullWidth = undefined, ...rest } = props;

  if (props.label) {
    return (
      <StyledFormControlLabel
        disabled={props.disabled}
        $fullWidth={fullWidth}
        $labelColor={labelColor}
        /*        style={{

          // justifyContent: 'center',
          // alignItems: 'start',
          color: labelColor
        }}*/
        control={<StyledCheckbox {...rest} />}
        label={props.label}
      />
    );
  }

  return <StyledCheckbox {...rest} />;
};
export default Checkbox;
