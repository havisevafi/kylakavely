type ContentType = 'subtitle' | 'paragraph' | 'image';

export interface ContentBlock {
  type: ContentType;
}

export interface ImageBlock extends ContentBlock {
  url: string;
  title: string;
}

export interface ParagraphBlock extends ContentBlock {
  text: string;
}

export interface SubtitleBlock extends ContentBlock {
  text: string;
}

export interface PageBase {
  image: string;
  title: string;
  content: ContentBlock[];
}

export interface DestinationLocation {
  lat: number;
  lon: number;
}

export interface DestinationPage extends PageBase {
  location: DestinationLocation;
  prev?: number;
  next?: number;
  validUntil?: string;
}

interface Destinations {
  [id: string]: DestinationPage;
}

/** Describes destinations.json structure */
export interface DestinationsData {
  mainPage: PageBase;
  destinations: Destinations;
}
