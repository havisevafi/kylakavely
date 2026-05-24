import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useNavigate } from 'react-router';
import { useDirection } from '../animate/DirectionContext';
import './DestinationBottomNav.scss';

interface DestinationBottomNavProps {
  prev?: number;
  next?: number;
}

export const DestinationBottomNav = ({
  prev,
  next,
}: DestinationBottomNavProps) => {
  const navigate = useNavigate();
  const { setDirection } = useDirection();

  const onChange = (_: React.SyntheticEvent, value: string) => {
    navigate(`/${value}`);
  };

  return (
    <Paper className="destination-bottom-nav">
      <BottomNavigation
        showLabels
        onChange={onChange}
        className="destination-bottom-nav__nav"
      >
        <BottomNavigationAction
          label={prev !== undefined ? 'Edellinen' : ''}
          value={prev}
          disabled={prev === undefined}
          onClick={() => setDirection(-1)}
        />
        <BottomNavigationAction label="Pääsivu" value="" />
        <BottomNavigationAction
          label={next !== undefined ? 'Seuraava' : ''}
          value={next}
          disabled={next === undefined}
          onClick={() => setDirection(1)}
        />
      </BottomNavigation>
    </Paper>
  );
};
