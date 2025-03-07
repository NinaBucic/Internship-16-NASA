export interface NEOItem {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    miss_distance: { kilometers: string };
    relative_velocity: { kilometers_per_hour: string };
  }>;
}

export interface NEOFeedResponse {
  element_count: number;
  near_earth_objects: {
    [date: string]: NEOItem[];
  };
}
