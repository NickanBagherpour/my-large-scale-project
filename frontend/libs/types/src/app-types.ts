import { ReactNode } from 'react';
import { Direction, Locale, ThemeID } from './enums';

export interface IConfig {
  themeId: ThemeID;
  direction: Direction;
  locale: Locale;
}

export interface ITheme {
  id: string;
  direction: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  // secondary: string;
  background: string;
  surface: string;
  onPrimary: string;
  cardColor: string;
  cardSecondaryColor: string;
  success: string;
  successBackground: string;
  info: string;
  infoBackground: string;
  lightGray: string;
  error: string;
  errorBackground: string;
  warning: string;
  iconPrimary: string;
  textPrimary: string;
  textSecondary: string;
  textTerritory: string;
  textQuaternary: string;
  // hint: string;
  divider: string;
  // drawer: string;
  border: string;
  appbar: string;
}

export type Obj = {
  [key: string]: string | number | boolean | null | undefined | Obj[] | { [key: string]: Obj };
};

export type InfoItemType = {
  key: string;
  value: string | ReactNode;
  subValue?: string | ReactNode;
  displayValue?: boolean;
  type?: 'text' | 'file';
  files?: any;
  fullwidth?: boolean;
};
