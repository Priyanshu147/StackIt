import React from "react";
import { useOutletContext } from "react-router-dom";
import TableControl from "../../shared/TableControl";
import TablePageControl from "../../shared/TablePageControl";
import Table from "../../shared/Table";
import { ALL_MASTER_DETAILS } from "../../../utils/constants";
function Main() {
  const props = useOutletContext();
  const columns = ALL_MASTER_DETAILS[props.masterName].COLUMNS;
  return (
    <div className="shadow-sm">
      <TableControl
        onToggleSwitch={props.onToggleSwitch}
        onSearch={props.onSearch}
        masterName={props.masterName}
      />
      <Table
        columns={columns}
        data={props.tableData}
        onSelectData={props.onSelectData}
        activePage={props.activePage}
        onDeleteData={props.onDeleteData}
        onEditData={props.onEditData}
        masterName={props.masterName}
        columnSortings={props?.columnSortings}
        onChangeSortingOrder={props?.onChangeSortingOrder}
      />
      <TablePageControl
        pageNo={props.pageState.pageNo}
        showNextPage={props.pageState.showNextPage}
        showPrevPage={props.pageState.showPrevPage}
        onChangePageNo={props.pageState?.onChangePageNo}
        onNextPage={props.pageState.onNextPage}
        onPrevPage={props.pageState.onPrevPage}
        onWindowSizeChange={props.pageState.onWindowSizeChange}
        totalRecords={props.pageState?.totalRecords || 0}
      />
    </div>
  );
}

export default Main;
