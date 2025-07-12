import React from "react";
import classes from "../index.module.css";
import Form from "./Form";
import Title from "../../shared/Title";

function Signin() {
  return (
    <div className={classes["section-card"]}>
      <Title small={true} animate={true}>
        Reset Password
      </Title>
      <Form />
    </div>
  );
}

export default Signin;
