import React from "react";
import { Outlet } from "react-router-dom";
import SnackBar from "../SnackBar";
import classes from "./index.module.css";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import ConfirmBox from "../ConfirmBox";
import useConfirmBox from "../ConfirmBox/hooks";

function Wrapper() {
  const confirmBoxState = useConfirmBox();
  const isLoading = useSelector((state) => state.ui.isLoading);
  return (
    <div className={classes["wrapper-container"]}>
      {isLoading?.status && isLoading?.isGlobal && <LoadingSpinner />}
      {confirmBoxState.isOpen && (
        <ConfirmBox
          onConfirm={confirmBoxState.onConfirm}
          onClose={confirmBoxState.onClose}
          message={confirmBoxState.message}
        />
      )}
      <SnackBar />
      <Outlet />
    </div>
  );
}

export default Wrapper;
