import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useParams, useRouteLoaderData } from 'react-router';
import { resolveImagePath } from '../../util/util.js';

import './Destination.scss';
import { DestinationBottomNav } from './DestinationBottomNav.jsx';

export const Destination = () => {
  const { id } = useParams();
  const { destinations } = useRouteLoaderData('destinations');
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
            item
            xs={6}
            marginTop={4}
            justifyContent="center"
          >
            <Box
              component="img"
              src={resolveImagePath(destination.image)}
              alt={destination.title}
            />
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
