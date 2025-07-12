import React from "react";
import classes from "./index.module.css";

const Radio = ({
  label,
  name,
  options,
  register,
  error,
  validation,
}) => {
  return (
    <div className={classes["form-group"]}>
      <label className={classes["label"]}>{label}</label>
      <div className={classes["radio-group"]}>
        {options.map((option) => (
          <label key={option.value} className={classes["radio-label"]}>
            <input
              type="radio"
              value={option.value}
              {...register(name, validation)}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className={classes["validation-msg"]}>{error.message}</p>}
    </div>
  );
};

export default Radio;