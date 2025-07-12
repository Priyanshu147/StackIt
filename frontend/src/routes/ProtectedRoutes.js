import React, { Suspense } from "react";
import { Await, Outlet, useLoaderData, redirect } from "react-router-dom";
import { fetchAdminProfile } from "../utils/api";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { AUTH_BASEURL } from "../utils/constants";
import store from "../store";
import { userActions } from "../store/user-slice";

const ProtectedRoutes = () => {
  const user = useLoaderData();

  // here

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={user}>
        {(userData) => <Outlet context={userData} />}
      </Await>
    </Suspense>
  );
};

export async function loader() {
  try {
    const user = await fetchAdminProfile();
    if (!user) {
      return redirect(AUTH_BASEURL);
    }

    const userData = {
      userName: user.UserName,
      isSuperAdmin: user.IsSuperAdmin,
    };
    store.dispatch(userActions.setUserDetails(userData));

    return user;
  } catch {
    return redirect(AUTH_BASEURL);
  }
}

export default ProtectedRoutes;
