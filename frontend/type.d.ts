import 'styled-components';
import { ITheme } from './libs/types/src';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
