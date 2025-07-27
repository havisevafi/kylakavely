import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useHref } from 'react-router';
import { resolveImagePath } from '../../util/util.js';
import './AttractionCard.scss';

interface AttractionCardProps {
  id: string;
  image: string;
  title: string;
}

export const AttractionCard = ({ id, image, title }: AttractionCardProps) => {
  return (
    <Box component="a" href={useHref(`/${id}`)} className="attraction">
      <Card elevation={16} className="attraction__card">
        <CardMedia
          className="attraction__media"
          image={resolveImagePath(image)}
          title={title}
        />
        <CardContent className="attraction__content">
          <Typography variant="h6">{title}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
