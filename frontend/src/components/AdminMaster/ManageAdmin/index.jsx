import React, { useEffect, useState } from "react";
import { ACTIONS, SNACKBAR_DETAILS } from "../../../utils/constants";
import { useOutletContext, useParams } from "react-router-dom";
import {
  addAdmin,
  fetchAdmin,
  fetchAllOrganizations,
  updateAdmin,
} from "../../../utils/api";
import { uiActions } from "../../../store/ui-slice";
import { useDispatch } from "react-redux";
import { wrapApiRequestHandler } from "../../../utils/helpers";
import AdminForm from "./Form";

function ManageAdmin() {
  const dispatch = useDispatch();
  const props = useOutletContext();
  const { id } = useParams();
  const [adminDetails, setAdminDetails] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    if (id) {
      wrapApiRequestHandler({
        apiCall: async () => fetchAdmin(id),
        setGlobalLoading: (loading) =>
          dispatch(uiActions.setIsLoading(loading)),
        onSuccess: (data) => {
          setAdminDetails(data);
        },
      });
    }
    wrapApiRequestHandler({
      apiCall: async () => fetchAllOrganizations({ status: true }),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: (data) => setOrganizations(data),
    });
  }, [id]);

  const handleApi = (callback, payload) =>
    wrapApiRequestHandler({
      apiCall: async () => callback(payload),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: () => {
        const snackbar =
          id != null
            ? SNACKBAR_DETAILS.ON_UPDATE_ADMIN
            : SNACKBAR_DETAILS.ON_ADD_ADMIN;
        dispatch(uiActions.setSnackBar({ ...snackbar }));
        props.onToggleForm(false, true);
      },
    });

  const submitFormHandler = async (data) => {
    if (id != null) {
      await handleApi(updateAdmin, { id, data });
    } else {
      await handleApi(addAdmin, data);
    }
  };

  return (
    <div>
      {/* <hr className="mb-10" /> */}
      <AdminForm
        key={id || "new"}
        action={id != null ? ACTIONS.UPDATE : ACTIONS.DEFAULT}
        adminID={id}
        details={adminDetails}
        organizations={organizations}
        onSubmitForm={submitFormHandler}
      />
    </div>
  );
}

export default ManageAdmin;
