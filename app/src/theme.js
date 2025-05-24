import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4E6C50', // Sage green
      contrastText: '#FAF8F1',
    },
    secondary: {
      main: '#A98467', // Warm clay
      contrastText: '#FAF8F1',
    },
    background: {
      default: '#FAF8F1', // Very light beige
      paper: '#F0EBE3', // Soft stone
    },
    text: {
      primary: '#2F2F2F', // Almost black
      secondary: '#6E6658', // Warm gray-brown
    },
    info: {
      main: '#D0C9C0', // Muted sand
    },
    warning: {
      main: '#F4DFB6', // Pale gold
    },
  },
  typography: {
    fontFamily: ['"Manrope"', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // backgroundColor: 'orangered',
        },
        a: {
          textDecoration: 'none',
        },
      },
    },
  },
});
