import MapIcon from '@mui/icons-material/Map';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { PageBase } from '../../data';
import { resolveImagePath } from '../../util/util.js';
import { Block } from '../contentblocks';
import { LocationAwareButton } from './LocationAwareButton.js';

interface HeroProps {
  page: PageBase;
}

export const Hero = ({ page }: HeroProps) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: '40vh',
        width: '100%',
        backgroundImage: `url(${resolveImagePath(`${page.image}`)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 1,
        }}
      />

      <Container
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
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
          <Typography key={idx} variant="h5">
            <Block contentBlock={block} />
          </Typography>
        ))}
        <LocationAwareButton
          text="Kohteet kartalla"
          altText="Näytä kyläkävelyn kohteet kartalla"
          onClick={() => navigate('/map')}
          icon={<MapIcon />}
        />
      </Container>
    </Box>
  );
};
