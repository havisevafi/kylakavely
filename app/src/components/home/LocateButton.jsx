import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';

export const LocateButton = ({ onClick }) => {
  return (
    <Fab
      onClick={onClick}
      variant="extended"
      color="secondary"
      aria-label="Paikanna"
      sx={{
        margin: '32px',
      }}
    >
      <NavigationIcon />
      Etsi lähin
    </Fab>
  );
};
