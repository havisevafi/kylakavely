import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useNavigate } from 'react-router';

interface DestinationBottomNavProps {
  prev?: number;
  next?: number;
}

export const DestinationBottomNav = ({
  prev,
  next,
}: DestinationBottomNavProps) => {
  const navigate = useNavigate();

  const onChange = (_: React.SyntheticEvent, value: string) => {
    navigate(`/${value}`);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      elevation={3}
    >
      <BottomNavigation showLabels onChange={onChange}>
        <BottomNavigationAction
          label={prev !== undefined ? 'Edellinen' : ''}
          value={prev}
          disabled={prev === undefined}
        />
        <BottomNavigationAction label="Pääsivu" value="" />
        <BottomNavigationAction
          label={next !== undefined ? 'Seuraava' : ''}
          value={next}
          disabled={next === undefined}
        />
      </BottomNavigation>
    </Paper>
  );
};
