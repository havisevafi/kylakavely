import { CssBaseline, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';
import { Destination } from './components/destination/Destination';
import { ErrorPage } from './components/errorpage/ErrorPage';
import { Home } from './components/home/Home.jsx';
import { appTheme } from './theme.js';

import { Destinations, DestinationsData } from './data';
import mockDestinations from './data/destinations.json' with { type: 'json' };

const destinationsLoader = () => {
  const destinationsData: DestinationsData =
    mockDestinations as DestinationsData;

  // Remove all expired destinations
  const validDestinations = Object.entries(
    destinationsData.destinations,
  ).reduce((acc: Destinations, [id, destination]) => {
    if (!destination.validUntil) {
      // If no expiration has been set, the destination is valid
      acc[id] = destination;
      return acc;
    }

    const validUntil = new Date(destination.validUntil).getTime();
    const now = new Date().getTime();
    const timeLeft = validUntil - now;
    if (timeLeft > 0) {
      acc[id] = destination;
    } else {
      console.log('discarded destination', destination.title);
    }
    return acc;
  }, {});

  // Reorganize prev and next pointers
  const navigationOrder = Object.keys(validDestinations);
  navigationOrder.forEach((id, index) => {
    if (index === 0) {
      // No prev
      delete validDestinations[id].prev;
      validDestinations[id].next = Number(navigationOrder[index + 1]);
    } else if (index === navigationOrder.length - 1) {
      // No next
      delete validDestinations[id].next;
      validDestinations[id].prev = Number(navigationOrder[index - 1]);
    } else {
      // Both prev and next
      validDestinations[id].prev = Number(navigationOrder[index - 1]);
      validDestinations[id].next = Number(navigationOrder[index + 1]);
    }
  });

  destinationsData.destinations = validDestinations;

  return destinationsData;
};

const router = createHashRouter([
  {
    id: 'destinations',
    path: '/',
    loader: destinationsLoader,
    errorElement: <ErrorPage />,
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
