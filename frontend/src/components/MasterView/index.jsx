import React from "react";
import TableHeader from "../shared/TableHeader";

function MasterView(props) {
  return (
    <div>
      <TableHeader
        allowInsert={props.allowInsert ?? true}
        showBack={props.showBack}
        onToggleForm={props.onToggleForm}
        masterName={props.masterName}
        showDelete={props.showDelete}
        onDeleteMany={props.onDeleteMany}
      />
      {props.children}
    </div>
  );
}

export default MasterView;
