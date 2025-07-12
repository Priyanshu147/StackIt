import React, { useState, useEffect } from "react";
import classes from "./index.module.css";

export default function SelectField({
  label,
  name,
  options,
  validation,
  register,
  error,
  idKey = "id",
  value = "name",
  defaultValue = "",
  onChange = () => {},
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const selectClass = `${classes["input"]} ${
    error ? classes["input-invalid"] : ""
  }`;

  return (
    <div className={classes["form-group"]}>
      <label className={classes["label"]}>{label}</label>
      <select
        className={selectClass}
        {...register(name, validation)}
        onChange={handleChange}
        value={selectedValue}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option[idKey]} value={option[idKey]}>
            {option[value]}
          </option>
        ))}
      </select>

      {error && <p className={classes["validation-msg"]}>{error.message}</p>}
    </div>
  );
}
