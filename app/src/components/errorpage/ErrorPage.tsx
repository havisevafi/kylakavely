import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2>Voi ei! Jotain meni pieleen...</h2>
      <Fab
        onClick={() => navigate('/')}
        variant="extended"
        color="primary"
        aria-label="Palaa pääsivulle"
        sx={{
          margin: '32px',
        }}
      >
        <HomeIcon />
        Palaa pääsivulle
      </Fab>
    </Container>
  );
};
