import React from "react";
import { useForm } from "react-hook-form";
import classes from "../../../../styles/form.module.css";
import Button from "../../../shared/Button";
import InputField from "../../../shared/InputField"; // Adjust the path as needed
import {
  DASHBOARD_BASEURL,
  FORGET_PASSWORD_BASEURL,
  INPUT_FIELDS_CONFIGS,
  SNACKBAR_DETAILS,
} from "../../../../utils/constants";
import { wrapApiRequestHandler } from "../../../../utils/helpers";
import { uiActions } from "../../../../store/ui-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signinAdmin } from "../../../../utils/api";

export default function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUserHandler = async (data) => {
    await wrapApiRequestHandler({
      apiCall: async () => signinAdmin(data),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: () => {
        dispatch(uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_SIGNED_UP }));
        navigate(DASHBOARD_BASEURL);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(loginUserHandler)} className={classes["form"]}>
      <InputField
        {...INPUT_FIELDS_CONFIGS.USERNAME}
        error={errors.userName}
        register={register}
      />
      <InputField
        {...INPUT_FIELDS_CONFIGS.PASSWORD}
        register={register}
        error={errors.password}
      />
      {/* <Link to={FORGET_PASSWORD_BASEURL} className={classes["form-link"]}>
        Forgot Password?
      </Link> */}
      <Button type="submit">Login</Button>
    </form>
  );
}
