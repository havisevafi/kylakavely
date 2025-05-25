import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useParams, useRouteLoaderData } from 'react-router';
import { DestinationsData } from '../../data';
import { resolveImagePath } from '../../util/util.js';
import { DestinationBottomNav } from './DestinationBottomNav.jsx';

import './Destination.scss';

export const Destination = () => {
  const { id } = useParams() as { id: string };
  const { destinations } = useRouteLoaderData(
    'destinations',
  ) as DestinationsData;
  const destination = destinations[id];

  return (
    <>
      <Container
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
            {destination.description.map((paragraph, index) => {
              return <p key={index}>{paragraph}</p>;
            })}
          </Grid>
        </Grid>
      </Container>
      <DestinationBottomNav prev={destination.prev} next={destination.next} />
    </>
  );
};
