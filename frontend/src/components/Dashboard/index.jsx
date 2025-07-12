import React from "react";
import classes from "./index.module.css";
import Title from "../shared/Title";
import {
  DASHBOARD_HEADING,
  DASHBOARD_SUB_HEADING,
} from "../../utils/constants";
import { useSelector } from "react-redux";
function Dashboard() {
  const userDetails = useSelector((state) => state.user.userDetails);
  return (
    <div className={classes["dashboard-container"]}>
      {/* <div className={classes["container-header"]}>
        <h1>
          {DASHBOARD_HEADING}{" "}
          <strong className="highlight-text">{userDetails.userName}</strong>
        </h1>
        <h2>{DASHBOARD_SUB_HEADING}</h2>
        <hr className="mt-10 mb-10" />
      </div> */}

      <div className={classes["log-section"]}>
        {/*  <Title small={true} animate={true}>
          Logs
        </Title> */}
        
      </div>
    </div>
  );
}

export default Dashboard;
