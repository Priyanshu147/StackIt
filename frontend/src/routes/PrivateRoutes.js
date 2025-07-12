import React, { useEffect, useState, Suspense } from "react";
import { Await, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { SNACKBAR_DETAILS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";

const PrivateRoutes = ({ allowedRoles }) => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get parent's context from the nearest Outlet above PrivateRoutes
  const parentContext = useOutletContext();

  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const accessAllowed = allowedRoles.includes(userDetails.isSuperAdmin);
    if (!accessAllowed) {
      navigate(-1);
      dispatch(uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_FORBIDDEN }));
    } else {
      setIsAllowed(true);
    }
  }, [allowedRoles, userDetails, dispatch, navigate]);

  if (!isAllowed) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={userDetails}>
        {(userData) => (
          <Outlet
            context={{
              ...parentContext, // keep parent's context props like onToggleForm
              userData,         // add user data here, can rename if needed
            }}
          />
        )}
      </Await>
    </Suspense>
  );
};

export default PrivateRoutes;
