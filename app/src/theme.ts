import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#ff385c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6a6a6a',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#222222',
      secondary: '#3f3f3f',
    },
    error: {
      main: '#c13515',
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
    action: {
      disabled: '#ffd1da',
    },
  },
  typography: {
    fontFamily: ['-apple-system', 'system-ui', 'Roboto', '"Helvetica Neue"', 'sans-serif'].join(','),
    h1: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.43,
      letterSpacing: '0px',
      [`@media (max-width:600px)`]: {
        fontSize: '22px',
        fontWeight: 500,
        lineHeight: 1.18,
        letterSpacing: '-0.44px',
      },
    },
    h2: {
      fontSize: '22px',
      fontWeight: 500,
      lineHeight: 1.18,
      letterSpacing: '-0.44px',
      [`@media (max-width:600px)`]: {
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.18px',
      },
    },
    h5: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.25,
      [`@media (max-width:600px)`]: {
        fontSize: '16px',
        fontWeight: 600,
      },
    },
    h6: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.25,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.43,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
          color: '#222222',
        },
        html: {
          backgroundColor: '#ffffff',
        },
        body: {
          backgroundColor: '#ffffff',
          color: '#222222',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          padding: '16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: 'none',
          border: '1px solid #dddddd',
          borderRadius: '14px',
          '&:hover': {
            boxShadow:
              'rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.1) 0 4px 8px 0',
          },
        },
      },
    },
  },
});
