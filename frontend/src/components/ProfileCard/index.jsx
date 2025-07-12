import React from "react";
import classes from "./index.module.css";
import Button from "../shared/Button";
import { logoutAdmin } from "../../utils/api";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import { AUTH_BASEURL, SNACKBAR_DETAILS } from "../../utils/constants";
import { wrapApiRequestHandler } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
function ProfileCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUserHandler = async () =>
    await wrapApiRequestHandler({
      apiCall: async () => logoutAdmin(),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: () => {
        dispatch(uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_LOGGED_OUT }));
        navigate(AUTH_BASEURL);
      },
    });
  return (
    <div className={classes["card-container"]}>
      <div className={classes["container-content"]}>
        <img src="/profile.png" alt="Profile" />
        <div>
          <h1>{props.user.userName}</h1>
          <h2>Role - {props.user.isSuperAdmin ? "Super Admin" : "Admin"}</h2>
        </div>
      </div>
      <div>
        <Button
          className="btn-outline btn-small btn-cancle"
          onClick={logoutUserHandler}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default ProfileCard;
