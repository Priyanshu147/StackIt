import React from "react";
import { ALL_MASTER_NAMES } from "../../utils/constants";
import MasterView from "../MasterView";
import useUserMaster from "./hooks";
import { Outlet } from "react-router-dom";

function UserMaster() {
  const [userState, formState, pageState] = useUserMaster();
  return (
    <div className="main-content">
      <MasterView
        showBack={formState.showBack}
        onToggleForm={formState.onToggleForm}
        masterName={ALL_MASTER_NAMES.USER}
        showDelete={userState.showDelete}
        onDeleteMany={userState.onDeleteManyUser}
      >
        <Outlet
          context={{
            selectedUserForUpdate: userState.selectedUserForUpdate,
            tableData: userState.userData,
            onSelectData: userState.onSelectUser,
            onDeleteData: userState.onDeleteUser,
            onToggleForm: formState.onToggleForm,
            onToggleSwitch: userState.onToggleSwitch,
            onSearch: userState.onSearch,
            onEditData: userState.onEditUser,
            columnSortings: userState?.columnSortings,
            onChangeSortingOrder: userState?.onChangeSortingOrder,
            masterName: ALL_MASTER_NAMES.USER,
            pageState: pageState,
          }}
        />
      </MasterView>
    </div>
  );
}

export default UserMaster;
