export interface Bird {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
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