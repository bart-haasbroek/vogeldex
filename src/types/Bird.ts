export interface Bird {
  id: string;
  title: string;
  scientificName: string;
  description: string;
  image: string;
  captured: boolean;
  heard: boolean;
  seen: boolean;
  location: string;
  date: string;
  properties: {
    name: string;
    value: string;
    key: string;
  }[];
}