import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';

interface LocateButtonProps {
  onClick: () => void;
}

export const LocateButton = ({ onClick }: LocateButtonProps) => {
  return (
    <Fab
      onClick={onClick}
      variant="extended"
      color="info"
      aria-label="Etsi minua lähimpänä oleva kohde"
      sx={{
        margin: '32px',
      }}
    >
      <NavigationIcon />
      Etsi lähin
    </Fab>
  );
};
