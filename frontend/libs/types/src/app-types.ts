import { Direction, Locale, ThemeID } from './enums';

export interface IConfig {
  themeId: ThemeID;
  direction: Direction;
  locale: Locale;
}

export interface ITheme {
  base: IBaseTheme;
}

export interface IBaseTheme {
  id: string;
  direction: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  // primaryLightest: string;
  secondary: string;
  background: string;
  surface: string;
  onPrimary: string;
  success: string;
  successBackground: string;
  successBackgroundLight: string;
  info: string;
  infoBackground: string;
  infoBackgroundLight: string;
  lightGray: string;
  error: string;
  errorBackground: string;
  errorBackgroundLight: string;
  warning: string;
  warningBackground: string;
  warningBackgroundLight: string;
  iconPrimary: string;
  textPrimary: string;
  textSecondary: string;
  textPrimaryDark: string;
  hint: string;
  // divider: string;
  drawer: string;
  border: string;
  borderLight: string;
  orange: string;
}

export type Obj = {
  [key: string]: string | number | boolean | null | undefined | Obj[] | { [key: string]: Obj };
};
