import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import classes from "./index.module.css";
import SideBar from "../../SideBar";
import { AUTH_BASEURL, DEFAULTS } from "../../../utils/constants";
import { useSelector } from "react-redux";

function Layout() {
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.ui.isAuthorized);

  useEffect(() => {
    if (!isAuthorized) navigate(AUTH_BASEURL);
  }, [isAuthorized]);

  return (
    <div className={classes["layout-container"]}>
      <input
        id="sidebar-toggle"
        type="checkbox"
        defaultChecked={DEFAULTS.IS_SIDEBAR_OPEN}
        className={classes["sidebar-toggle-checkbox"]}
      />
      <label
        htmlFor="sidebar-toggle"
        className={classes["sidebar-toggle-button"]}
      >
        <i
          className={`fa-solid fa-arrow-right-long ${classes["sidebar-ctrl"]}`}
        />
      </label>
      <div className={classes["sidebar-container"]}>
        <SideBar />
      </div>
      <main className={classes["main-container"]}>
        <NavigationBar />
        <section className={classes["section-container"]}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Layout;
