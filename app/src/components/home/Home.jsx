import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { findNearestDestinationId, getGeoLocation } from '../../util/util.js';
import { AttractionCard } from './AttractionCard.jsx';
import { Hero } from './Hero.jsx';

export const Home = () => {
  const { mainPage, destinations } = useRouteLoaderData('destinations');
  const navigate = useNavigate();

  const onLocateSuccess = (position) => {
    const currentLoc = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    const nearestDestinationId = findNearestDestinationId(
      destinations,
      currentLoc,
    );

    navigate(`/${nearestDestinationId}`);
  };

  const onLocateError = (err) => {
    alert(err);
  };

  const onLocate = () => {
    getGeoLocation(onLocateSuccess, onLocateError);
  };

  const attractions = Object.entries(destinations).map(([id, data]) => {
    return (
      <Grid
        item
        xs={1}
        sm={2}
        md={4}
        sx={{
          paddingTop: '16px',
          paddingLeft: '16px',
          width: '250px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        }}
      >
        <AttractionCard
          key={id}
          id={id}
          image={data.image}
          title={data.title}
        />
      </Grid>
    );
  });

  return (
    <div>
      <Hero page={mainPage} onLocate={onLocate} />
      <Paper></Paper>
      <Grid
        container
        gap={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '32px',
        }}
      >
        {attractions}
      </Grid>
    </div>
  );
};
