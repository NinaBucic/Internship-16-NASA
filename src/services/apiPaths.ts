export const APOD_API_BASE = "https://api.nasa.gov/planetary/apod";

export const getAPODUrl = (
  apiKey: string,
  startDate: string,
  endDate: string
): string => {
  return `${APOD_API_BASE}?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
};

export const MARS_ROVER_PHOTOS_BASE =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

export const getMarsRoverPhotosUrl = (
  apiKey: string,
  earthDate: string,
  camera?: string,
  page?: number
): string => {
  let url = `${MARS_ROVER_PHOTOS_BASE}?api_key=${apiKey}&earth_date=${earthDate}`;
  if (camera && camera !== "ALL") {
    url += `&camera=${camera}`;
  }
  if (page) {
    url += `&page=${page}`;
  }
  return url;
};

export const NEO_FEED_BASE = "https://api.nasa.gov/neo/rest/v1/feed";

export const getNEOFeedUrl = (
  apiKey: string,
  startDate: string,
  endDate: string
): string => {
  return `${NEO_FEED_BASE}?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
};
