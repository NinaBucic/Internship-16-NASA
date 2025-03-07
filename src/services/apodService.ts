import { API_KEY } from "../constants/apiKey";
import { getDateRange } from "../utils/getDateRange";
import { getAPODUrl } from "./apiPaths";

export async function fetchAPODData() {
  const { startDate, endDate } = getDateRange(20);
  const url = getAPODUrl(API_KEY, startDate, endDate);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch APOD data");
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data.reverse();
  } else {
    return [data];
  }
}

export async function fetchAPODDataRange(startDate: string, endDate: string) {
  const url = getAPODUrl(API_KEY, startDate, endDate);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch APOD data");
  }
  const data = await response.json();
  if (Array.isArray(data)) {
    return data.reverse();
  } else {
    return [data];
  }
}
