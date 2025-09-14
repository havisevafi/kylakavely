import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useRouteLoaderData } from 'react-router';
import { DestinationsData } from '../../data';
import { AttractionCard } from './AttractionCard.jsx';
import { Hero } from './Hero.jsx';

export const Home = () => {
  const { mainPage, destinations } = useRouteLoaderData(
    'destinations',
  ) as DestinationsData;

  const attractions = Object.entries(destinations).map(([id, data]) => {
    return (
      <Grid
        key={id}
        size={{ xs: 12, sm: 5, md: 5, lg: 3, xl: 3 }}
        sx={{
          paddingTop: '16px',
          paddingLeft: '16px',
          width: '80%',
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
      <Hero page={mainPage} />
      <Paper>{/*Placeholder*/}</Paper>
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
