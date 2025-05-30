import { CssBaseline, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';
import { Destination } from './components/destination/Destination.jsx';
import { Home } from './components/home/Home.jsx';
import { appTheme } from './theme.js';

import mockDestinations from './data/destinations.json';

const havisOrgLoader = () => {
  return fetch('https://www.havis.org/data/destinations.json');
};

const router = createHashRouter([
  {
    id: 'destinations',
    path: '/',
    loader: () => mockDestinations,
    // loader: havisOrgLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/:id',
        element: <Destination />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
