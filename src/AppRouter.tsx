import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";
import { APOD } from "./pages/APOD";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.APOD} element={<APOD />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
