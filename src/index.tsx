import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles';
import RootStore from './store';
import StoreProvider from './components/StoreProvider/StoreProvider';
import App from './App';
import './static/fonts/fonts.css';

const Root = () => (
  <React.Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <StoreProvider store={RootStore}>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </React.Fragment>
);

(window as any).store = RootStore;

ReactDOM.render(<Root />, document.getElementById('root'));
