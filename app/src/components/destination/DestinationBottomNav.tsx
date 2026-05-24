import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useNavigate } from 'react-router';
import { useDirection } from '../animate/DirectionContext';

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
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: (theme) => theme.zIndex.appBar,
        backgroundColor: '#f7f7f7',
        borderTop: '1px solid #dddddd',
        boxShadow: 'none',
      }}
    >
      <BottomNavigation
        showLabels
        onChange={onChange}
        sx={{
          height: 'auto',
          '& .MuiBottomNavigationAction-root': {
            minHeight: '56px',
            padding: '8px 12px',
            fontSize: '16px',
            fontWeight: 500,
            color: '#222222',
            '&.Mui-selected': {
              color: '#ff385c',
              fontWeight: 600,
            },
            '&.Mui-disabled': {
              color: '#cccccc',
              cursor: 'not-allowed',
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '16px',
              fontWeight: 500,
              marginTop: '4px',
            },
            '&.Mui-selected .MuiBottomNavigationAction-label': {
              fontSize: '16px',
              fontWeight: 600,
            },
          },
        }}
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
