import MapIcon from '@mui/icons-material/Map';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { PageBase } from '../../data';
import { resolveImagePath } from '../../util/util.js';
import { Block } from '../contentblocks';
import './Hero.scss';

interface HeroProps {
  page: PageBase;
}

export const Hero = ({ page }: HeroProps) => {
  const navigate = useNavigate();
  return (
    <Box
      className="hero"
      style={{
        backgroundImage: `url(${resolveImagePath(`${page.image}`)})`,
      }}
    >
      <Box className="hero__overlay" />

      <Container className="hero__content">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          fontWeight="600"
          lineHeight="150%"
        >
          {page.title}
        </Typography>
        {page.content.map((block, idx) => (
          <Typography key={idx} variant="h5" className="hero__subtitle">
            <Block contentBlock={block} />
          </Typography>
        ))}
        <Fab
          onClick={() => navigate('/map')}
          variant="extended"
          color="secondary"
          aria-label="Näytä kyläkävelyn kohteet kartalla"
          className="hero__fab"
        >
          <span>Kohteet kartalla</span>
          <MapIcon />
        </Fab>
      </Container>
    </Box>
  );
};
