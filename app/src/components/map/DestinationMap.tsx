import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import type { LatLngLiteral } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Link, useNavigate, useRouteLoaderData } from 'react-router';
import type {
  DestinationPage,
  Destinations,
  DestinationsData,
} from '../../data';
import { useLocate } from '../../util/useLocate';
import { blueDotIcon, destinationIcon } from './icons';

import 'leaflet/dist/leaflet.css';
import './DestinationMap.scss';

const getLatLngExpression = (destination: DestinationPage): LatLngLiteral => ({
  lat: destination.location.lat,
  lng: destination.location.lon,
});

interface MapContentProps {
  position: LatLngLiteral;
  destinations: Destinations;
}

const MapContent = ({ position, destinations }: MapContentProps) => {
  const map = useMap();
  const destinationMarkers = Object.entries(destinations)
    .filter(([key]) => key !== '0')
    .map(([key, value]) => {
      return (
        <Marker
          key={key}
          position={getLatLngExpression(value)}
          icon={destinationIcon}
        >
          <Popup>
            <Link to={`/${key}`}>{value.title}</Link>
          </Popup>
        </Marker>
      );
    });

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={blueDotIcon}>
        <Popup>Olet tässä</Popup>
      </Marker>
      {destinationMarkers}
    </>
  );
};

export const DestinationMap = () => {
  const { destinations } = useRouteLoaderData(
    'destinations',
  ) as DestinationsData;
  const destination = destinations[0];
  const navigate = useNavigate();
  const { onLocate } = useLocate({ destinations, navigate });
  const center = getLatLngExpression(destination);
  const [position, setPosition] = useState<LatLngLiteral>(center);

  const handleNavigation = (_: any, value: string) => {
    if (value === 'closest') {
      onLocate().then(() => undefined);
      return;
    }

    navigate('/');
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }, []);

  return (
    <div className="destination-map-container">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="destination-map"
      >
        <MapContent position={position} destinations={destinations} />
      </MapContainer>
      <BottomNavigation showLabels onChange={handleNavigation}>
        <BottomNavigationAction label="Pääsivu" value="" />
        <BottomNavigationAction label="Etsi minua lähin" value="closest" />
      </BottomNavigation>
    </div>
  );
};
