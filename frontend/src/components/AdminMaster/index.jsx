import React from "react";
import { ALL_MASTER_NAMES } from "../../utils/constants";
import MasterView from "../MasterView";
import useAdminMaster from "./hooks";
import { Outlet } from "react-router-dom";

function AdminMaster() {
  const [adminState, formState, pageState] = useAdminMaster();
  return (
    <div className="main-content">
      <MasterView
        showBack={formState.showBack}
        onToggleForm={formState.onToggleForm}
        masterName={ALL_MASTER_NAMES.ADMIN}
        showDelete={adminState.showDelete}
        onDeleteMany={adminState.onDeleteManyAdmin}
      >
        <Outlet
          context={{
            selectedAdminForUpdate: adminState.selectedAdminForUpdate,
            tableData: adminState.adminData,
            onSelectData: adminState.onSelectAdmin,
            onDeleteData: adminState.onDeleteAdmin,
            onToggleForm: formState.onToggleForm,
            onToggleSwitch: adminState.onToggleSwitch,
            onSearch: adminState.onSearch,
            onEditData: adminState.onEditAdmin,
            columnSortings: adminState?.columnSortings,
            onChangeSortingOrder: adminState?.onChangeSortingOrder,
            masterName: ALL_MASTER_NAMES.ADMIN,
            pageState: pageState,
          }}
        />
      </MasterView>
    </div>
  );
}

export default AdminMaster;
