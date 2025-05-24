import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { resolveImagePath } from '../../util/util.js';
import { LocateButton } from './LocateButton.jsx';

export const Hero = ({ page, onLocate }) => (
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
      <Typography variant="h5">{page.description}</Typography>
      <LocateButton onClick={onLocate} />
    </Container>
  </Box>
);
