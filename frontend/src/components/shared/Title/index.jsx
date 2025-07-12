import React from "react";
import classes from "./index.module.css";
function Title(props) {
  return (
    <div
      className={`${classes["title-container"]} ${
        props.small && classes["title-container--small"]
      } ${props.animate && classes["title-container--animate"]}`}
    >
      <h1 className={classes["container-title"]}>{props.children}</h1>
      <hr className={classes["divider"]}></hr>
    </div>
  );
}

export default Title;
