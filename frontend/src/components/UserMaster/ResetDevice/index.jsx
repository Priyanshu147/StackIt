import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams,useNavigate } from "react-router-dom";
import classes from "../../../styles/form.module.css";
import Button from "../../shared/Button";
import InputField from "../../shared/InputField";
import { INPUT_FIELDS_CONFIGS, SNACKBAR_DETAILS,USER_MASTER_BASEURL } from "../../../utils/constants";
import { fetchUser,resetDevice } from "../../../utils/api";
import { uiActions } from "../../../store/ui-slice";
import { useDispatch } from "react-redux";
import { wrapApiRequestHandler } from "../../../utils/helpers";
const ResetDevice = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    wrapApiRequestHandler({
      apiCall: async () => fetchUser(id),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: (data) => {
        reset({
          Name: data.Name,
          PhoneNo: data.PhoneNo,
          Email: data.Email,
          Password: "",
        });
      },
    });
  }, [id]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("userID", id);
    formData.append("password", data.Password);

    wrapApiRequestHandler({
      apiCall: async () => resetDevice(formData),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: () => {
        const snackbar =SNACKBAR_DETAILS.ON_RESET_USER_DEVICE;
        dispatch(uiActions.setSnackBar({ ...snackbar }));
        navigate(USER_MASTER_BASEURL);
      },
    });
  };

    const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
      <div className="row">
        <InputField
          {...INPUT_FIELDS_CONFIGS.NAME}
          disabled={true}
          name="Name"
          register={register}
          validation={{}}
          error={errors.Name}
        />
        <InputField
          {...INPUT_FIELDS_CONFIGS.PHONE_NO}
          disabled={true}
          name="PhoneNo"
          register={register}
          validation={{}}
          error={errors.PhoneNo}
        />
      </div>
      <div className="row">
        <InputField
          {...INPUT_FIELDS_CONFIGS.EMAIL}
          disabled={true}
          name="Email"
          register={register}
          validation={{}}
          error={errors.Email}
        />
        <InputField
          {...INPUT_FIELDS_CONFIGS.PASSWORD}
          label="Set New Password"
          name="Password"
          register={register}
          error={errors.Password}
        />
      </div>

      <div className={classes["form-ctrl"]}>
        <Button type="submit">Reset Device</Button>
       {/*  <Button
          className="btn-outline btn-cancle"
          onClick={() => navigate(USER_MASTER_BASEURL)}
          type="button"
        >
          Cancel  
        </Button> */}
      </div>
    </form>
  );
};

export default ResetDevice;
