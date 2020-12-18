import 'styled-components';

export type ThemeKey =
  | 'main'
  | 'accent'
  | 'accentHover'
  | 'gray'
  | 'white'
  | 'fontGray'
  | 'sans'
  | 'sansCaption'
  | 'defaultTransition';

declare module 'styled-components' {
  export interface DefaultTheme {
    [key: ThemeKey]: string;
  }
}
