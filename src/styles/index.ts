import { createGlobalStyle, css, DefaultTheme } from 'styled-components';
import { normalize } from 'styled-normalize';
import { ThemeKey } from '../styled';

export const theme: DefaultTheme = {
  main: '#1C2025',
  accent: '#0f8fee',
  warn: '#be1010',
  accentHover: '#0b5f9f',
  gray: '#EFEFF0',
  white: '#FFFFFF',
  fontGray: '#999',
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

body {
  width: 100vw;
  overflow-x: hidden;
}
a {
   text-decoration: none;
   color: #0f8fee;

    &:hover {
      color: #be1010;
    }

    &:visited {
      color: #be1010;
    }
}

p {
  margin: 0;
  padding: 0;
}

.mainContainer {
    width: 1320px;
    max-width: 100%;
    margin: 0 auto;

}

.mainWrapper {
margin: 0 40px 0 20px;
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
