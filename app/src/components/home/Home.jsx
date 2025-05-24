import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useRouteLoaderData } from 'react-router';
import { AttractionCard } from './AttractionCard.jsx';
import { Hero } from './Hero.jsx';

export const Home = () => {
  const { mainPage, destinations } = useRouteLoaderData('destinations');

  const onLocate = () => {
    console.log('TODO: locate nearest attraction and show it');
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
