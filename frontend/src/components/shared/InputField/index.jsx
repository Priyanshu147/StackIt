import React, { useState, useEffect } from "react";
import classes from "./index.module.css";
import { getImagePreview } from "../../../utils/helpers"; // Adjust the path if needed

export default function InputField({
  label,
  type = "text",
  name,
  validation,
  register,
  error,
  disabled = false,
  options = [],
  rows = 3,
  placeholder = "",
  defaultValue, // added for previewing existing image
}) {
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (defaultValue) {
      setPreview(getImagePreview(defaultValue));
    }
  }, [defaultValue]);

  const inputClass = `${classes["input"]} ${
    error ? classes["input-invalid"] : ""
  }`;

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setPreview(null);
        alert("Only JPG, JPEG, and PNG files are allowed.");
        e.target.value = ""; // Reset input
        return;
      }

      setPreview(getImagePreview(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className={classes["form-group"]}>
      <label className={classes["label"]}>{label}</label>
      {type === "textarea" ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          className={inputClass}
          {...register(name, validation)}
        />
      ) : type === "file" ? (
        <div className={classes["file-preview-wrapper"]}>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            className={inputClass}
            {...register(name, validation)}
            onChange={handleFileChange}
          />
          {preview && (
            <div className={classes["image-preview"]}>
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>
      ) : (
        <input
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClass}
          maxLength={type === "tel" ? 10 : undefined}
          onInput={
            type === "tel"
              ? (e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }
              : undefined
          }
          {...register(name, validation)}
        />
      )}

      {error && <p className={classes["validation-msg"]}>{error.message}</p>}
    </div>
  );
}
