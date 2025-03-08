export interface EarthAssetResponse {
  date: string;
  id: string;
  resource: {
    dataset: string;
    planet: string;
  };
  url: string;
}
