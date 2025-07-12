import React, { useEffect, useState } from "react";
import { ACTIONS, SNACKBAR_DETAILS } from "../../../utils/constants";
import { useOutletContext, useParams } from "react-router-dom";
import {
  addUser,
  fetchAllOrganizations,
  fetchUser,
  updateUser,
  fetchGroupsForOrganizations,
} from "../../../utils/api";
import { uiActions } from "../../../store/ui-slice";
import { useDispatch } from "react-redux";
import { wrapApiRequestHandler } from "../../../utils/helpers";
import UserForm from "./Form";

function ManageUser() {
  const dispatch = useDispatch();
  const props = useOutletContext();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [group, setGroup] = useState([]);

  useEffect(() => {
    wrapApiRequestHandler({
      apiCall: async () => fetchAllOrganizations({ status: true }),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: (data) => setOrganizations(data),
    });
    if (id) {
      wrapApiRequestHandler({
        apiCall: async () => fetchUser(id),
        setGlobalLoading: (loading) =>
          dispatch(uiActions.setIsLoading(loading)),
        onSuccess: (data) => {
          setUserDetails(data);
        },
      });
    }
  }, [id]);

  const handleApi = (callback, payload) =>
    wrapApiRequestHandler({
      apiCall: async () => callback(payload),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: () => {
        const snackbar =
          id != null
            ? SNACKBAR_DETAILS.ON_UPDATE_USER
            : SNACKBAR_DETAILS.ON_ADD_USER;
        dispatch(uiActions.setSnackBar({ ...snackbar }));
        props.onToggleForm(false, true);
      },
    });
  const filterGroupsHandler = (orgId) => {
    const orgIds = Array.isArray(orgId) ? orgId : [orgId]; // ensure it's an array
    wrapApiRequestHandler({
      apiCall: async () => fetchGroupsForOrganizations({ ids: orgIds }),
      setGlobalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: (res) => {
        setGroup(res.length > 0 ? res : []);
      },
    });
  };

  const submitFormHandler = async (data) => {
    if (id != null) {
      await handleApi(updateUser, { id, data });
    } else {
      await handleApi(addUser, data);
    }
  };

  return (
    <div>
      {/* <hr className="mb-10" /> */}
      <UserForm
        key={id || "new"}
        action={id != null ? ACTIONS.UPDATE : ACTIONS.DEFAULT}
        userID={id}
        details={userDetails}
        organizations={organizations}
        onSubmitForm={submitFormHandler}
        filterGroups={filterGroupsHandler}
        groups={group}
      />
    </div>
  );
}

export default ManageUser;
