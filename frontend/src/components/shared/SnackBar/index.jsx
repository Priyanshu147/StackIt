import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp() {
  const snackBar = useSelector((state) => state.ui.snackBar);

  useEffect(() => {
    if (snackBar.status) {
      const options = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };

      switch (snackBar.severity) {
        case "success":
          toast.success(snackBar.message, options);
          break;
        case "error":
          toast.error(snackBar.message, options);
          break;
        case "warning":
          toast.warning(snackBar.message, options);
          break;
        case "info":
        default:
          toast.info(snackBar.message, options);
          break;
      }
    }
  }, [snackBar]);

  return null;
}

function SnackBar() {
  return (
    <>
      <ToastContainer
        toastStyle={{
          fontSize: "var(--default-font-size)",
          letterSpacing: "0.5px",
          textTransform: "capitalize",
          borderRadius: "1rem",
          boxShadow: "0 0 15px #0002",
        }}
      />
      <MyApp />
    </>
  );
}

export default SnackBar;
