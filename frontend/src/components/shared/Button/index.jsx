import React from "react";
import classes from "./index.module.css";

function Button(props) {
  const classNames = props.className
    ?.split(" ")
    .map((className) => classes[className])
    .filter(Boolean) // Filter out any undefined values
    .join(" "); // Join class names with a space

  return (
    <button
      type={props?.type || "button"}
      className={`${classes["btn"]} ${classNames}`}
      onClick={props.onClick}
      disabled={props.disabled}
      autoFocus={props.autoFocus}
      style={{
        marginTop: props.marginTop,
      }}
      title={props?.title}
    >
      {props.children}
    </button>
  );
}

export default Button;
