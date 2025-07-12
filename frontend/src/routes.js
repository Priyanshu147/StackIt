import {
  HOME_BASEURL,
  DASHBOARD_BASEURL,
  AUTH_BASEURL,
  FORGET_PASSWORD_BASEURL,
  RESET_PASSWORD_BASEURL,
 
} from "./utils/constants";

import React, { lazy, Suspense } from "react";
import { Navigate, Route, createRoutesFromElements } from "react-router-dom";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import { loader as profileLoader } from "./routes/ProtectedRoutes";

const Wrapper = lazy(() => import("./components/shared/Wrapper"));
const Layout = lazy(() => import("./components/shared/Layout"));
const Error = lazy(() => import("./components/shared/Error"));
const Main = lazy(() => import("./components/MasterView/Main"));
const Signin = lazy(() => import("./components/Auth/Signin"));
const ForgotPassword = lazy(() => import("./components/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/Auth/ResetPassword"));



const AuthPage = lazy(() => import("./pages/AuthPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));


const ProtectedRoutes = lazy(() => import("./routes/ProtectedRoutes"));


const routes = createRoutesFromElements(
  <Route
    path={HOME_BASEURL}
    element={
      <Suspense fallback={<LoadingSpinner />}>
        <Wrapper />
      </Suspense>
    }
    errorElement={<Error />}
  >
    <Route index element={<Navigate to={DASHBOARD_BASEURL} />} />
    <Route path={AUTH_BASEURL} element={<AuthPage />}>
      <Route index element={<Signin />} />
      <Route path={FORGET_PASSWORD_BASEURL} element={<ForgotPassword />} />
      <Route path={RESET_PASSWORD_BASEURL} element={<ResetPassword />} />
    </Route>
    <Route element={<ProtectedRoutes />} loader={profileLoader}>
      <Route element={<Layout />}>
        <Route path={DASHBOARD_BASEURL} element={<DashboardPage />} />
        
      </Route>
    </Route>
  </Route>
);

export default routes;
