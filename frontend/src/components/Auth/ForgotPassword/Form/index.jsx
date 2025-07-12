import React from "react";
import { useForm } from "react-hook-form";
import classes from "../../../../styles/form.module.css";
import Button from "../../../shared/Button";
import InputField from "../../../shared/InputField"; // Adjust the path as needed
import {
  AUTH_BASEURL,
  INPUT_FIELDS_CONFIGS,
  RESET_PASSWORD_BASEURL,
  SNACKBAR_DETAILS,
} from "../../../../utils/constants";
import { wrapApiRequestHandler } from "../../../../utils/helpers";
import { uiActions } from "../../../../store/ui-slice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../../utils/api";

export default function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await wrapApiRequestHandler({
      apiCall: async () => forgotPassword(data),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: () => {
        dispatch(
          uiActions.setSnackBar({
            ...SNACKBAR_DETAILS.ON_RESET_PASSWORD_EMAIL_SENT,
          })
        );
        navigate(RESET_PASSWORD_BASEURL);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
      <InputField
        {...INPUT_FIELDS_CONFIGS.EMAIL}
        error={errors.email}
        register={register}
      />
      <NavLink to={AUTH_BASEURL} className={classes["form-link"]}>
        Go back
      </NavLink>
      <Button type="submit">Continue</Button>
    </form>
  );
}
