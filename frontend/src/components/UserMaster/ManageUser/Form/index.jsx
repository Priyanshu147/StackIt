import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "../../../../styles/form.module.css";
import Button from "../../../shared/Button";
import InputField from "../../../shared/InputField";
import SelectField from "../../../shared/SelectField";
import Radio from "../../../shared/Radio";
import { ACTIONS, INPUT_FIELDS_CONFIGS, USER_MASTER_BASEURL } from "../../../../utils/constants";
import { getConditionalValidation } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";

const UserForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // Initialize with default values
    defaultValues: {
      IsActive: props.details?.IsActive || "1", // Default to "1" (active) if no details provided
    },
  });

  // Reset form when editing existing user
  useEffect(() => {
    if (props.details) {
      reset({
        ...props.details,
        IsActive: props.details.IsActive.toString(), // Ensure IsActive is a string
      });
    }
  }, [props.details, reset]);
  const [didFilterOnce, setDidFilterOnce] = useState(false);

  useEffect(() => {
    if (
      props.action === ACTIONS.UPDATE &&
      props.details?.OrganizationID &&
      !didFilterOnce
    ) {
      props.filterGroups([props.details.OrganizationID]);
      setDidFilterOnce(true); 
    }
  }, [props.action, props.details, didFilterOnce, props.filterGroups]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.Name);
    /* formData.append("phoneNo", data.PhoneNo); */
    formData.append("password", data.Password);
    formData.append("organizationId", data.OrganizationID);
    formData.append("isActive", data.IsActive == "1" ? "true" : "false");
    formData.append("groupId", data.GroupID);

    props.onSubmitForm(formData);
  };
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
      <InputField
        {...INPUT_FIELDS_CONFIGS.NAME}
        name="Name"
        register={register}
        error={errors.Name}
      />

      <div className="row">
       {/*  <InputField
          {...INPUT_FIELDS_CONFIGS.PHONE_NO}
          name="PhoneNo"
          register={register}
          error={errors.PhoneNo}
        /> */}
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
      </div>

      <div className="row">
        <SelectField
          {...INPUT_FIELDS_CONFIGS.ORGANIZATION}
          name="OrganizationID"
          options={props.organizations}
          register={register}
          error={errors.OrganizationID}
          onChange={props.filterGroups}
          defaultValue={props.details?.OrganizationID} // Pass the default value
        />
        <SelectField
          {...INPUT_FIELDS_CONFIGS.GROUP_DROPDOWN}
          name="GroupID"
          options={props.groups}
          register={register}
          error={errors.GroupID}
          defaultValue={props.details?.GroupID} // Pass the default value
        />
      </div>

      <div className="row">
        <Radio
          {...INPUT_FIELDS_CONFIGS.IS_ACTIVE}
          name="IsActive"
          register={register}
          error={errors.IsActive}
        />
      </div>

      <div className={classes["form-ctrl"]}>
        <Button type="submit">
          {props.action === ACTIONS.UPDATE ? "Save User" : "Add User"}
        </Button>
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

export default UserForm;
