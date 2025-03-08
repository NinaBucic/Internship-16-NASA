import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";
import { APOD, APODDetail } from "./pages/APOD";
import { MarsRover, MarsRoverDetail } from "./pages/MarsRover";
import { NEOTracker } from "./pages/NEOTracker";
import { NotFound } from "./pages/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.APOD} element={<APOD />} />
          <Route path={ROUTES.APOD_DETAIL} element={<APODDetail />} />
          <Route path={ROUTES.MARS_ROVER} element={<MarsRover />} />
          <Route
            path={ROUTES.MARS_ROVER_DETAIL}
            element={<MarsRoverDetail />}
          />
          <Route path={ROUTES.NEO} element={<NEOTracker />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
