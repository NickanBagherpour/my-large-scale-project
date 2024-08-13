import { CSSProperties, ReactNode } from 'react';

export type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export type ColumnType = {
  key?: string;
  dataIndex?: string;
  title?: ReactNode;
  align?: AlignType;
  render?: (value?: string, record?: any, index?: number) => void;
  width?: CSSProperties['width'];
};
