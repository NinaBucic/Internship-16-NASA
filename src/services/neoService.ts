import { API_KEY } from "../constants/apiKey";
import { NEOFeedResponse } from "../types/NEOData";
import { getDefaultDateRange } from "../utils";
import { getNEOFeedUrl } from "./apiPaths";

export async function fetchNEOData(): Promise<NEOFeedResponse> {
  const { startDate, endDate } = getDefaultDateRange(7);
  const url = getNEOFeedUrl(API_KEY, startDate, endDate);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch NEO data");
  }
  const data: NEOFeedResponse = await response.json();
  return data;
}
