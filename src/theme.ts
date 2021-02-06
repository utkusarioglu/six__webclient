import { createMuiTheme } from '@material-ui/core/styles';
// import gray from '@material-ui/core/colors/grey';
// import green from '@material-ui/core/colors/green';

// export const lightTheme = createMuiTheme({
//   palette: {
//     type: 'light',
//     primary: {
//       main: gray[400],
//     },
//     secondary: {
//       main: green[500],
//     },
//   },
// });

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiInputBase: {
      root: {
        borderRadius: '4px',
      },
    },
    MuiFilledInput: {
      underline: {
        '&:before': {
          display: 'none',
        },
      },
    },
  },
});
