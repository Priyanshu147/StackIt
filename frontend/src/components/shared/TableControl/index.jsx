import React from "react";
import Switch from "@mui/material/Switch";
import SearchBox from "../SearchBox";
import classes from "./index.module.css";
import { ALL_MASTER_DETAILS } from "../../../utils/constants";

function index(props) {
  const name = ALL_MASTER_DETAILS[props.masterName].NAME;
  const title = ALL_MASTER_DETAILS[props.masterName].TABLE_TITLE;
  const toggleSwitchHandler = (event) => {
    props.onToggleSwitch(event.target.checked);
  };
  return (
    <div className={classes["table-action"]}>
      <h3>{title}</h3>
      <SearchBox onSearch={props.onSearch} />
     {/*  <div className={classes["table-switch"]}>
        <span>Active {name}</span>
        <Switch size="small" onChange={toggleSwitchHandler} defaultChecked />
      </div> */}
    </div>
  );
}

export default index;
