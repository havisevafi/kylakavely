import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import { useEffect, useState } from 'react';
import { isGeoLocationAllowed } from '../../util/util';

interface LocateButtonProps {
  onClick: () => void;
}

export const LocateButton = ({ onClick }: LocateButtonProps) => {
  const [isLocationAvailable, setIsLocationAvailable] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    isGeoLocationAllowed().then(setIsLocationAvailable);
  }, []);

  if (!isLocationAvailable) {
    return undefined;
  }

  return (
    <Fab
      onClick={onClick}
      variant="extended"
      color="secondary"
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
