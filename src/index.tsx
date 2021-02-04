import React from 'react';
import store from '_store/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactGa from 'react-ga';
import AppRouter from '_routers/app/App.router';
import { darkTheme } from '_base/theme';
import { GA_ID } from '_base/config';

ReactGa.initialize(GA_ID);

ReactDOM.render(
  <React.StrictMode>
    <Provider {...{ store }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <AppRouter />
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
