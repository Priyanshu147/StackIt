import React from "react";
import classes from "./index.module.css";
import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <section className={classes["auth-section"]}>
      <div className={classes["section-left"]}>
        <img src="/background.svg" />
      </div>
      <div className={classes["section-right"]}>
        <Outlet />
      </div>
    </section>
  );
}

export default Auth;
