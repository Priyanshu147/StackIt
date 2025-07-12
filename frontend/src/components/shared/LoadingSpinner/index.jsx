import React, { Fragment } from "react";
import classes from "./index.module.css";

function LoadingSpinner(props) {
  return (
    <Fragment>
      <span
        className={`${classes["loader"]} ${
          props.bottomLoading ? classes["loader--bottom"] : ""
        }`}
      ></span>
      <div
        className={`${
          !props?.isolated
            ? classes["loader-overlay"]
            : classes["loader-overlay--isolated"]
        }`}
      />
    </Fragment>
  );
}

export default LoadingSpinner;
