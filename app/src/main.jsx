import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';
import { Attraction } from './components/attraction/Attraction.jsx';
import { Home } from './components/home/Home.jsx';

import destinations from './data/destinations.json';

const appTheme = createTheme({
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

const router = createHashRouter([
  {
    id: 'destinations',
    path: '/',
    loader: () => destinations,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/:id',
        element: <Attraction />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
