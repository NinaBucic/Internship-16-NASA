export const APOD_API_BASE = "https://api.nasa.gov/planetary/apod";

export const getAPODUrl = (
  apiKey: string,
  startDate: string,
  endDate: string
): string => {
  return `${APOD_API_BASE}?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
};
