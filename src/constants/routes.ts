type Routes = {
  [key: string]: string;
};

export const ROUTES: Routes = {
  HOME: "/",
  APOD: "/apod",
  APOD_DETAIL: "/apod/:date",
  MARS_ROVER: "/mars-rover",
  MARS_ROVER_DETAIL: "/mars-rover/:earthDate/:id",
  NEO: "/neo",
  EARTH: "/earth",
};
