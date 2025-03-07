import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";
import { APOD, APODDetail } from "./pages/APOD";
import { MarsRover } from "./pages/MarsRover";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.APOD} element={<APOD />} />
          <Route path={ROUTES.APOD_DETAIL} element={<APODDetail />} />
          <Route path={ROUTES.MARS_ROVER} element={<MarsRover />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
