import React from "react";
import Button from "../Button";
import classes from "./index.module.css";
import { getTableHeader } from "../../../utils/helpers";
function TableHeader(props) {
  const { title, description, buttonLabel } = getTableHeader(props.masterName);
  return (
    <div className={classes["table-header"]}>
      {/* <div className={classes["header-content"]}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div> */}
      <div className={classes["btn-container"]}>
        {(props.allowInsert || props.showBack) && (
          <Button
            className="btn-small"
            onClick={props.onToggleForm.bind(null, !props.showBack, false)}
          >
            {props.showBack ? "Back" : buttonLabel}
          </Button>
        )}
        {props.showDelete && (
          <Button
            className="btn-small btn-outline btn-cancle"
            onClick={props.onDeleteMany}
          >
            Delete Selected
          </Button>
        )}
      </div>
    </div>
  );
}

export default TableHeader;
