import React, { Fragment, useEffect } from "react";
import classes from "./index.module.css";
import Title from "../Title";

function Modal(props) {
  useEffect(() => {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    // const handleTabKey = (e) => e.key === "Tab" && e.preventDefault();
    // document.addEventListener("keydown", handleTabKey);

    return () => {
      document.body.style.height = "";
      document.body.style.overflow = "";
      // document.removeEventListener("keydown", handleTabKey);
    };
  }, []);

  return (
    <Fragment>
      <div
        className={`${classes["modal-container"]} ${
          props?.small && classes["modal-container--small"]
        }`}
        role="dialog"
        tabIndex={-1}
      >
        <div className={classes["title-container"]}>
          {props?.title && <Title>{props.title}</Title>}
          {props?.closable && (
            <img src="/reject.png" alt="close" onClick={props.onClose} />
          )}
        </div>
        {props.children}
      </div>
      <div className={classes["container-overlay"]} />
    </Fragment>
  );
}

export default Modal;
