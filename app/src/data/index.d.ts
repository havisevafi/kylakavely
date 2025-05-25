export interface PageBase {
  image: string;
  title: string;
  description: string[];
}

export interface DestinationLocation {
  lat: number;
  lon: number;
}

export interface DestinationPage extends PageBase {
  location: DestinationLocation;
  prev?: number;
  next?: number;
}

interface Destinations {
  [id: string]: DestinationPage;
}

/** Describes destinations.json structure */
export interface DestinationsData {
  mainPage: PageBase;
  destinations: Destinations;
}
