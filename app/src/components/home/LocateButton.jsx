import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';

export const LocateButton = ({ onClick }) => {
  return (
    <Fab
      onClick={onClick}
      variant="extended"
      color="info"
      aria-label="Etsi minua lähin oleva kohde"
      sx={{
        margin: '32px',
      }}
    >
      <NavigationIcon />
      Etsi lähin
    </Fab>
  );
};
