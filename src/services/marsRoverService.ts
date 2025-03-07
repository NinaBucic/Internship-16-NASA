import { API_KEY } from "../constants/apiKey";
import { MarsRoverPhoto } from "../types/marsRoverPhoto";
import { getMarsRoverPhotosUrl } from "./apiPaths";

export async function fetchMarsRoverPhotos(
  earthDate: string,
  camera: string,
  page: number
): Promise<MarsRoverPhoto[]> {
  const url = getMarsRoverPhotosUrl(API_KEY, earthDate, camera, page);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Mars rover photos");
  }
  const data = await response.json();
  return data.photos;
}
