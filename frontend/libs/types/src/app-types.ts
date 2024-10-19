import { ReactNode } from 'react';
import { Direction, Locale, ThemeID } from './enums';

export interface IConfig {
  themeId: ThemeID;
  direction: Direction;
  locale: Locale;
}

export type Palette = {
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

export type TextPalette = {
  primary: string;
  secondary: string;
  territory: string;
  quaternary: string;
};

type BackgroundPalette = Pick<Palette, 'main' | '_50' | '_100' | '_200' | '_600'>;
type AlertPalette = Pick<Palette, 'main' | '_50' | '_100' | '_300' | '_500' | '_600'>;

export interface ITheme {
  id: string;
  direction: string;
  primary: Palette;
  secondary: Palette;
  background: BackgroundPalette;
  surface: string;
  onPrimary: string;
  cardColor: string;
  success: AlertPalette;
  info: AlertPalette;
  lightGray: string;
  error: AlertPalette;
  warning: AlertPalette;
  iconPrimary: string;
  text: TextPalette;
  divider: string;
  border: AlertPalette;
  appbar: string;
}

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

export type ErrorMessageType = {
  title?: string;
  description: string;
  type: 'error' | 'success' | 'info' | 'warning';
  shouldTranslate: boolean;
};