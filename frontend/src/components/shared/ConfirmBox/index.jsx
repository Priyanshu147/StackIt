import React from "react";
import Modal from "../Modal";
import Button from "../Button";
import classes from "./index.module.css";
import { CONFIRM_BOX_MESSAGES } from "../../../utils/constants";

function ConfirmBox(props) {
  return (
    <Modal small>
      <div className={classes["confirm-container"]}>
        <p className={classes["message"]}>
          {props?.message || CONFIRM_BOX_MESSAGES.DEFAULT_CONFIRMATION}
        </p>
        <div className={classes["container-ctrl"]}>
          <Button
            className="btn-cancle btn-small"
            onClick={props.onClose}
            autoFocus
          >
            Close
          </Button>
          <Button
            className="btn-success btn-outline btn-small"
            onClick={props.onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmBox;
