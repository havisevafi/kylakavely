import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router';

export const DestinationBottomNav = ({ prev, next }) => {
  const navigate = useNavigate();

  const onChange = (_, value) => {
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
          label={prev ? 'Edellinen' : ''}
          value={prev}
          disabled={!prev}
        />
        <BottomNavigationAction label="Pääsivu" value="" />
        <BottomNavigationAction
          label={next ? 'Seuraava' : ''}
          value={next}
          disabled={!next}
        />
      </BottomNavigation>
    </Paper>
  );
};
