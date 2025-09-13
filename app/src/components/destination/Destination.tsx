import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router';
import { useSwipeable } from 'react-swipeable';
import type { DestinationsData } from '../../data';
import { resolveImagePath } from '../../util/util.js';
import { Block } from '../contentblocks';
import { DestinationBottomNav } from './DestinationBottomNav.jsx';

import './Destination.scss';

export const Destination = () => {
  const { id } = useParams() as { id: string };
  const { destinations } = useRouteLoaderData(
    'destinations',
  ) as DestinationsData;
  const destination = destinations[id];
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (destination.next) {
        navigate(`/${destination.next}`);
      }
    },
    onSwipedRight: () => {
      if (destination.prev) {
        navigate(`/${destination.prev}`);
      }
    },
  });

  useEffect(() => {
    // In PWA mode moving to next destination keeps the scrolled location at
    // the bottom of the page. This tries to make it nicer for the user to get
    // directly at the top of the page when changing between destinations.
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Container
        {...handlers}
        maxWidth="md"
        title={destination.title}
        className="destination"
      >
        <Grid container gap={8} justifyContent="center">
          <Grid
            display="flex"
            size={{ xs: 12 }}
            marginTop={4}
            justifyContent="center"
          >
            <Box
              component="img"
              src={resolveImagePath(destination.image)}
              alt={destination.title}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h2"
              component="h1"
              align="center"
              sx={{
                fontSize: {
                  xs: '2rem',
                  sm: '2.75rem',
                  md: '3.5rem',
                },
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto',
                maxWidth: '100%',
              }}
            >
              {destination.title}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            {destination.content.map((contentBlock, index) => {
              return <Block key={index} contentBlock={contentBlock} />;
            })}
          </Grid>
        </Grid>
      </Container>
      <DestinationBottomNav prev={destination.prev} next={destination.next} />
    </>
  );
};
