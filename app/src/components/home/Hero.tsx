import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { PageBase } from '../../data';
import { resolveImagePath } from '../../util/util.js';
import { LocateButton } from './LocateButton.jsx';

interface HeroProps {
  page: PageBase;
  onLocate: () => void;
}

export const Hero = ({ page, onLocate }: HeroProps) => (
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
      {page.description.map((p, idx) => (
        <Typography key={idx} variant="h5">
          {p}
        </Typography>
      ))}
      <LocateButton onClick={onLocate} />
    </Container>
  </Box>
);
