import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router';
import { useSwipeable } from 'react-swipeable';
import type { DestinationPage, DestinationsData } from '../../data';
import { resolveImagePath } from '../../util/util.js';
import { useDirection } from '../animate/DirectionContext';
import { Block } from '../contentblocks';
import { DestinationBottomNav } from './DestinationBottomNav.jsx';

import './Destination.scss';

interface DestinationContentProps {
  destination: DestinationPage;
}

const PrivateDestinationNote = () => (
  <div>
    <strong>
      <em>
        Tämä kohde on yksityisalueella, tutustu kohteeseen vain tieltä. Ethän
        häiritse asukkaiden rauhaa.
      </em>
    </strong>
  </div>
);

const DestinationContent = ({ destination }: DestinationContentProps) => {
  const isPrivate = !(destination.public ?? false);
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
            {isPrivate && <PrivateDestinationNote />}
            {destination.content.map((contentBlock, index) => {
              return <Block key={index} contentBlock={contentBlock} />;
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const Destination = () => {
  const { id } = useParams() as { id: string };
  const { destinations } = useRouteLoaderData(
    'destinations',
  ) as DestinationsData;
  const destination = destinations[id];
  const { setDirection } = useDirection();
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (destination.next) {
        setDirection(1);
        navigate(`/${destination.next}`);
      }
    },
    onSwipedRight: () => {
      if (destination.prev) {
        setDirection(-1);
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
    <div
      {...handlers}
      style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          padding: '12px 12px',
          top: 0,
          left: 0,
        }}
      >
        <DestinationContent destination={destination} />
      </div>
      <DestinationBottomNav prev={destination.prev} next={destination.next} />
    </div>
  );
};
