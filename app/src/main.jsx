import { createTheme, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';
import { Attraction } from './components/attraction/Attraction.jsx';
import { Home } from './components/home/Home.jsx';
import './index.css';

import destinations from './data/destinations.json';

const appTheme = createTheme({
  typography: {
    fontFamily: ['"Noto Sans"', 'sans-serif'].join(','),
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
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
