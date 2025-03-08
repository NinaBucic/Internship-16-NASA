import { API_KEY } from "../constants/apiKey";
import { EarthAssetResponse } from "../types/earthAssets";
import { getEarthAssetsUrl } from "./apiPaths";

export async function fetchEarthAssets(
  lon: number,
  lat: number,
  date: string,
  dim?: number
): Promise<EarthAssetResponse> {
  const url = getEarthAssetsUrl(API_KEY, lon, lat, date, dim);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Earth assets");
  }
  const data: EarthAssetResponse = await response.json();
  return data;
}
