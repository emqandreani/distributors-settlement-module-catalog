import React from "react";
import { Route, Routes as RoutesRouter } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));

const Detail = React.lazy(() => import("./pages/Detail"));
const Login = React.lazy(() => import("./pages/Login"));

const Routes = () => (
  <>
    <RoutesRouter>
      <Route element={<Detail />} path="/:id" />
      <Route element={<Login />} path="login" />
      <Route index element={<Home />} />
    </RoutesRouter>
  </>
);

export default Routes;
