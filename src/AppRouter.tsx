import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
