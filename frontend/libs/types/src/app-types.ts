import { ReactNode } from 'react';
import { Direction, Locale, ThemeID } from './enums';

export interface IConfig {
  themeId: ThemeID;
  direction: Direction;
  locale: Locale;
}

export type Pallete = {
  main: string;
  _50: string;
  _100: string;
  _200: string;
  _300: string;
  _400: string;
  _500: string;
  _600: string;
  _700: string;
  _800: string;
  _900: string;
};

export type AlertPallete = {
  main: string;
  _50: string;
  _100: string;
  _300: string;
  _500: string;
  _600: string;
};

export type TextPallete = {
  primary: string;
  secondary: string;
  territory: string;
  quaternary: string;
};

export interface ITheme {
  id: string;
  direction: string;
  primary: Partial<Pallete>;
  // primaryDark: string;
  // primaryLight: string;
  secondary: Partial<Pallete>;
  background: Partial<Pallete>;
  surface: string;
  onPrimary: string;
  cardColor: string;
  // cardSecondaryColor: string;
  success: Partial<AlertPallete>;
  // successBackground: string;
  info: Partial<AlertPallete>;
  // infoBackground: string;
  lightGray: string;
  error: Partial<AlertPallete>;
  // errorBackground: string;
  warning: Partial<AlertPallete>;
  iconPrimary: string;
  text: Partial<TextPallete>;
  // textPrimary: string;
  // textSecondary: string;
  // textTerritory: string;
  // textQuaternary: string;
  // hint: string;
  divider: string;
  // drawer: string;
  border: Partial<AlertPallete>;
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

export interface WidgetHeaderType {
  title?: string[] | string;
  message?: string[] | string;
  icon?: React.ReactNode;
}
