import { CSSProperties, ReactNode } from 'react';

export type BasicComponentProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
};

export type PageProps = {
  parentProps?: unknown;
  children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
  updateHeaderTitle?: (newTitles: string[] | string) => void;
};
