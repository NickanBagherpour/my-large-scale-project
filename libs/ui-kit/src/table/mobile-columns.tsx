import React from 'react';

import { Box, Table } from '@oxygen/ui-kit';

export type MobileColumnType = {
  title: string;
  value: React.ReactNode;
  colon?: boolean;
};

type MobileColumnsProps = {
  columns: MobileColumnType[];
  minHeight?: React.CSSProperties['minHeight'];
};

export const MobileColumns = (props: MobileColumnsProps) => {
  const { columns, minHeight = 'unset' } = props;

  return (
    <Box flexDirection='column'>
      {columns.map((item, idx) => (
        <Table.MobileColumn minHeight={minHeight} key={idx} {...item} />
      ))}
    </Box>
  );
};
