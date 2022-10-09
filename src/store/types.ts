export interface Location {
  key: string;
  type: string;
  name: string;
  country: {
    id: string;
    name: string;
  };
  administrativeArea: {
    id: string;
    name: string;
  };
}
