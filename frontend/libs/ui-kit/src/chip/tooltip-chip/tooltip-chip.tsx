import React from 'react';

import * as S from './tooltip-chip.style';
import { Tooltip } from 'antd';
import { Chip, ChipProps } from '../chip';
type Data = {
  lable: string;
  key: string;
};
type TooltipChipProps = ChipProps & {
  LABEL_LENGTH_LIMIT?: number;
  data: Data[];
  children?: string | number;
};
function TooltipChip(props: TooltipChipProps) {
  const { LABEL_LENGTH_LIMIT = 30, children, data, ...rest } = props;
  const shouldShowTooltip = (data) => {
    const isLongLabel = data.label.length > LABEL_LENGTH_LIMIT;
    if (isLongLabel) {
      return (
        <Tooltip title={data.label} arrow={true} key={data.key}>
          <Chip key={data.key} {...rest}>
            {children}
          </Chip>
        </Tooltip>
      );
    } else {
      return (
        <Chip key={data.key} {...rest}>
          {children}
        </Chip>
      );
    }
  };
  return shouldShowTooltip(data);
}

export default TooltipChip;
