import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router';
import './ErrorPage.scss';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="error-page">
      <h2>Voi ei! Jotain meni pieleen...</h2>
      <Fab
        onClick={() => navigate('/')}
        variant="extended"
        color="primary"
        aria-label="Palaa pääsivulle"
        className="error-page__btn"
      >
        <HomeIcon />
        Palaa pääsivulle
      </Fab>
    </Container>
  );
};
