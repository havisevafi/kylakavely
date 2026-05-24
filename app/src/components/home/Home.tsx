import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useRouteLoaderData } from 'react-router';
import { DestinationsData } from '../../data';
import { AttractionCard } from './AttractionCard.jsx';
import { Hero } from './Hero.jsx';
import './Home.scss';

export const Home = () => {
  const { mainPage, destinations } = useRouteLoaderData(
    'destinations',
  ) as DestinationsData;

  const attractions = Object.entries(destinations).map(([id, data]) => {
    return (
      <Grid
        key={id}
        size={{ xs: 12, sm: 5, md: 5, lg: 3, xl: 3 }}
      >
        <div className="home__card">
          <AttractionCard
            key={id}
            id={id}
            image={data.image}
            title={data.title}
          />
        </div>
      </Grid>
    );
  });

  return (
    <div>
      <Hero page={mainPage} />
      <Paper>{/*Placeholder*/}</Paper>
      <Grid container gap={2} className="home__container">
        {attractions}
      </Grid>
    </div>
  );
};
