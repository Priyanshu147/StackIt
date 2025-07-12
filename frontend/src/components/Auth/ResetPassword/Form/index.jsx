import React from "react";
import { useForm } from "react-hook-form";
import classes from "../../../../styles/form.module.css";
import Button from "../../../shared/Button";
import InputField from "../../../shared/InputField"; // Adjust the path as needed
import {
  DASHBOARD_BASEURL,
  INPUT_FIELDS_CONFIGS,
  SNACKBAR_DETAILS,
} from "../../../../utils/constants";
import { wrapApiRequestHandler } from "../../../../utils/helpers";
import { uiActions } from "../../../../store/ui-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword, signinUser } from "../../../../utils/api";

export default function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await wrapApiRequestHandler({
      apiCall: async () => resetPassword(data),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: () => {
        dispatch(
          uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_RESET_PASSWORD })
        );
        navigate(DASHBOARD_BASEURL);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
      <InputField
        {...INPUT_FIELDS_CONFIGS.PASSWORD}
        register={register}
        error={errors.password}
      />
      <InputField
        {...INPUT_FIELDS_CONFIGS.CONFIRM_PASSWORD}
        validation={{
          ...INPUT_FIELDS_CONFIGS.CONFIRM_PASSWORD.validation,
          validate: (value) =>
            value === getValues("password") || "Passwords do not match",
        }}
        register={register}
        error={errors.confirmPassword}
      />
      <Button type="submit">Continue</Button>
    </form>
  );
}
