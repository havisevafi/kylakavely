import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#008C8C',
      contrastText: '#FFF5C3',
    },
    secondary: {
      main: '#C44A26',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F0EBE3',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#2C3E50',
    },
    error: {
      main: '#C44A26',
    },
    warning: {
      main: '#E4C084',
    },
    info: {
      main: '#78A693',
    },
    success: {
      main: '#008C8C',
    },
  },
  typography: {
    fontFamily: ['Manrope', 'sans-serif'].join(','),
    h1: {
      [`@media (max-width:600px)`]: {
        fontSize: '2rem',
      },
    },
    h2: {
      [`@media (max-width:600px)`]: {
        fontSize: '1.75rem',
      },
    },
    h5: {
      [`@media (max-width:600px)`]: {
        fontSize: '1rem',
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});
