import store from "../../store";
import { uiActions } from "../../store/ui-slice";
import axios from "../axios";
import { SNACKBAR_DETAILS, SNACKBAR_SEVERITY } from "../constants";

axios.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
);

// Helper function to handle error responses
const handleErrorResponse = (status, message) => {
  const severity = [404, 400].includes(status)
    ? SNACKBAR_SEVERITY.ERROR
    : SNACKBAR_SEVERITY.WARNING;

  store.dispatch(
    uiActions.setSnackBar({
      status: true,
      message: message || "Something Went Wrong",
      severity,
    })
  );
  if (status === 401 || status === 403) {
    store.dispatch(uiActions.setIsAuthorized(false));
  }

  if (status !== 422 && status !== 409) {
    store.dispatch(uiActions.setIsAuthorized(false));
  }
};

axios.interceptors.response.use(
  (response) => {
    store.dispatch(uiActions.setIsAuthorized(true));
    return response;
  },
  async (error) => {
    console.log({ error });

    const { response, config: originalConfig } = error;
    const status = response?.status;
    const message = response?.data?.message;

    if (status === 403) {
      store.dispatch(
        uiActions.setSnackBar({
          ...SNACKBAR_DETAILS.ON_FORBIDDEN,
          message: message || "Access Forbidden",
        })
      );
      store.dispatch(uiActions.setIsAuthorized(false));
    } else if ([401, 400, 440, 404, 409, 422, 419].includes(status)) {
      handleErrorResponse(status, message);
    } else {
      store.dispatch(uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_ERROR }));
    }

    return Promise.reject(error);
  }
);
