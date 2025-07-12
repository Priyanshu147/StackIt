import React from "react";
import classes from "../index.module.css";
import Form from "./Form";
import Title from "../../shared/Title";

function ForgotPassword() {
  return (
    <div className={classes["section-card"]}>
      <Title small={true} animate={true}>
        Forgot Password
      </Title>
      <Form />
    </div>
  );
}

export default ForgotPassword;
