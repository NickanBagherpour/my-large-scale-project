import { CSSProperties, JSX, ReactNode } from 'react';
import { Obj } from './common';

export type BasicComponentProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
};

export type PageProps = {
  parentProps?: Obj;
  children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
  updateHeaderTitle?: (newTitles: string[] | string) => void;
};
