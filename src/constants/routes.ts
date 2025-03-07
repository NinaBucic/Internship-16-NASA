type Routes = {
  [key: string]: string;
};

export const ROUTES: Routes = {
  HOME: "/",
  APOD: "/apod",
  APOD_DETAIL: "/apod/:date",
  MARS_ROVER: "/mars-rover",
  NEO: "/neo",
  EARTH: "/earth",
};
