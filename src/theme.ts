import { createMuiTheme } from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  breakpoints: {
    values: {
      xs: 400, // custom value
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
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
