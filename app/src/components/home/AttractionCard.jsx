import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router';
import { resolveImagePath } from '../../util/util.js';
import './AttractionCard.scss';

export const AttractionCard = ({ id, image, title }) => {
  // Link to or this: const attractionUrl = useHref(`/${id}`);
  // // `${import.meta.env.BASE_URL}images/${image}`
  // console.log('base url', import.meta.env.BASE_URL);
  // const imageUrl = new URL(`/images/${image}`, import.meta.env.BASE_URL).href;
  return (
    <Link to={`/${id}`} className="attraction-card">
      <Card>
        <CardMedia
          className="attraction-card__media"
          image={resolveImagePath(image)}
          title={title}
        />
        <CardContent>
          <Typography variant="h5">{title}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
