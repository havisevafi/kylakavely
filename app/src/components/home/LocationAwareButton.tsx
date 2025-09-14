import Fab from '@mui/material/Fab';
import { useEffect, useState } from 'react';
import { isGeoLocationAllowed } from '../../util/util';

interface LocateButtonProps {
  text: string;
  altText: string;
  onClick: () => void;
  icon?: React.ReactElement;
}

export const LocationAwareButton = ({
  text,
  altText,
  onClick,
  icon,
}: LocateButtonProps) => {
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
      aria-label={altText}
      sx={{
        margin: '32px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '6px' }}>{icon}</span>
        <span>{text}</span>
      </div>
    </Fab>
  );
};
