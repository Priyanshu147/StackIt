import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import classes from "../../../../styles/form.module.css";
import Button from "../../../shared/Button";
import InputField from "../../../shared/InputField";
import Radio from "../../../shared/Radio";
import {
  ACTIONS,
  INPUT_FIELDS_CONFIGS,
  ADMIN_MASTER_BASEURL,
} from "../../../../utils/constants";
import { getConditionalValidation } from "../../../../utils/helpers";
import SelectField from "../../../shared/SelectField";
import { useNavigate } from "react-router-dom";

const AdminForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      IsActive: props.details?.IsSuperAdmin || "1",
    },
  });

  const isSuperAdmin = watch("IsSuperAdmin");

  useEffect(() => {
    if (props.details) {
      reset({
        ...props.details,
        IsSuperAdmin: props.details.IsSuperAdmin.toString(),
      });
    }
  }, [props.details, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("userName", data.UserName);
    if (props.action === ACTIONS.DEFAULT) {
      formData.append("password", data.Password);
    }
    formData.append("isSuperAdmin", data.IsSuperAdmin == "1" ? true : false);
    if (isSuperAdmin !== "1") {
      formData.append("organizationId", data.OrganizationID);
    }

    props.onSubmitForm(formData);
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
      <div className="row">
        <InputField
          {...INPUT_FIELDS_CONFIGS.USERNAME}
          name="UserName"
          register={register}
          error={errors.UserName}
        />
        {props.action === ACTIONS.DEFAULT && (
          <InputField
            {...INPUT_FIELDS_CONFIGS.PASSWORD}
            name="Password"
            register={register}
            validation={getConditionalValidation(
              INPUT_FIELDS_CONFIGS.PASSWORD.validation,
              props.action
            )}
            error={errors.Password}
          />
        )}
      </div>
      <div className="row">
        <Radio
          {...INPUT_FIELDS_CONFIGS.IS_SUPERADMIN}
          name="IsSuperAdmin"
          register={register}
          error={errors.IsSuperAdmin}
        />
        {isSuperAdmin !== "1" && (
          <SelectField
            {...INPUT_FIELDS_CONFIGS.ORGANIZATION}
            name="OrganizationID"
            options={props.organizations}
            register={register}
            error={errors.OrganizationID}
            defaultValue={props.details?.OrganizationID}
          />
        )}
        
      </div>

      <div className={classes["form-ctrl"]}>
        <Button type="submit">
          {props.action === ACTIONS.UPDATE ? "Save Admin" : "Add Admin"}
        </Button>
        {/* <Button
          className="btn-outline btn-cancle"
          onClick={() => navigate(ADMIN_MASTER_BASEURL)}
          type="button"
        >
          Cancel
        </Button> */}
      </div>
    </form>
  );
};

export default AdminForm;
