import React from 'react';
import { Tooltip } from 'antd';
import { getValueOrDash } from '@oxygen/utils';

type Props = {
  title: string;
};

export default function TooltipWrapper({ title }: Props) {
  return (
    <Tooltip placement='top' title={getValueOrDash(title)} arrow={true}>
      {title}
    </Tooltip>
  );
}
