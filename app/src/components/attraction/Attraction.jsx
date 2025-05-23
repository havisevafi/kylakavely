import Grid from '@mui/material/Grid';
import { useParams, useRouteLoaderData } from 'react-router';

export const Attraction = () => {
  const { id } = useParams();
  const { destinations } = useRouteLoaderData('destinations');

  return (
    <Grid container>
      <Grid size={12}>
        Attraction #{id}: {destinations[id].title}
      </Grid>
    </Grid>
  );
};
