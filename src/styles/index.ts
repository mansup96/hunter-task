import { createGlobalStyle, css, DefaultTheme } from 'styled-components';
import { normalize } from 'styled-normalize';
import { ThemeKey } from '../styled';

export const theme: DefaultTheme = {
  main: '#1C2025',
  accent: '#EC174F',
  accentHover: '#d4295b',
  gray: '#EFEFF0',
  white: '#FFFFFF',
  fontGray: '#A4A6A8',
  sans: 'PT Sans, sans-serif',
  sansCaption: 'PT Sans Caption, sans-serif',
  defaultTransition: '0.2s ease',
};

export const GlobalStyle = createGlobalStyle`
${normalize}

*, *:before, *:after {
  box-sizing: border-box;
  outline: none;
  font-family: PT Sans, sans-serif;
}
a {
   text-decoration: none;
}
`;

export const fontStyle = (fontSize: string, color: string) => css`
  font-family: ${({ theme }) => theme.sans};
  font-style: normal;
  font-weight: normal;
  font-size: ${fontSize};
  line-height: 12px;
  color: ${color};
`;

export const labelStyle = (color?: ThemeKey) => css`
  display: block;
  ${({ theme }) => fontStyle('12px', color ? theme[color] : theme.white)}
`;
