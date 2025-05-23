import { BottomNavigation } from '@mui/material/BottomNavigation';

export const AttractionBottomNav = () => {
  return (
    <BottomNavigation>
      <BottomNavigationAction label="Recents" />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
};
