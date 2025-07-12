import React, { Fragment, useMemo } from "react";
import classes from "./index.module.css";
import moment from "moment";
import useTable from "./hooks";
import { NavLink } from "react-router-dom";
import {
  ALL_MASTER_DETAILS,
  RECORD_STATUS,
  GENERAL_YES_NO,
  SORTING_STATUS,
} from "../../../utils/constants";
import { useSelector } from "react-redux";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_URL_DEV;

function Table(props) {
  const editLink = ALL_MASTER_DETAILS[props.masterName].FORM_LINK;
  const viewLink = ALL_MASTER_DETAILS[props.masterName].VIEW_LINK || "#";
  const resetDeviceLink =
    ALL_MASTER_DETAILS[props.masterName].RESET_DEVICE_LINK || "#";
  const idName = ALL_MASTER_DETAILS[props.masterName].ID_NAME;
  const userDetails = useSelector((state) => state.user.userDetails);

  const [checkBoxState, isLoading] = useTable({
    data: props.data,
    onSelectData: props.onSelectData,
    idName,
  });
  const { checkedStates } = checkBoxState;

  const renderColumns = useMemo(() => {
    return props.columns.map((column, index) => {
      if (column.isDate) {
        return (data) => (
          <td className={column.align} key={index}>
            {moment(data[column.for]).format("D MMM YYYY")}
          </td>
        );
      }
      if (column.isStatus) {
        return (data) => (
          <td key={index} className={column.align}>
            <span
              className={`status-container ${
                data[column.for] === 0 ? "status-active" : "status-deleted"
              }`}
            >
              {data[column.for] === 0
                ? RECORD_STATUS.ACTIVE
                : RECORD_STATUS.IN_ACTIVE}
            </span>
          </td>
        );
      }
      if (column.isImage) {
        return (data) => (
          <td key={index} className={column.align}>
            {data[column.for] ? (
              <img
                src={`${BACKEND_DOMAIN}/${data[column.for]}`}
                className={classes["td-img"]}
                alt="banner-img"
              />
            ) : (
              <img
                src="/no-image.png"
                className={classes["td-img"]}
                alt="banner-img"
              />
            )}
          </td>
        );
      }
      if (column.isAppVisibility) {
        return (data) => (
          <td key={index} className={column.align}>
            <span
              className={`status-container ${
                data[column.for] === 1 ? "status-active" : "status-deleted"
              }`}
            >
              {data[column.for] === 1
                ? GENERAL_YES_NO[0].Text
                : GENERAL_YES_NO[1].Text}
            </span>
          </td>
        );
      }
      if (column.isServiceStatus) {
        return (data) => {
          const statusMap = {
            Ongoing: { text: "Ongoing", className: "status-ongoing" },
            Cancelled: { text: "Cancelled", className: "status-cancelled" },
            Completed: { text: "Completed", className: "status-completed" },
            Accepted: { text: "Accepted", className: "status-completed" },
            Pending: { text: "Pending", className: "status-pending" },
            Rejected: { text: "Rejected", className: "status-cancelled" },
          };

          const status = statusMap[data[column.for]] || {
            text: "Not Available",
            className: "status-unknown",
          };

          return (
            <td key={index} className={column.align}>
              <span className={`status-container ${status.className}`}>
                {status.text}
              </span>
            </td>
          );
        };
      }

      if (!column?.for) {
        return (data) => (
          <td className={column.align} key={index}>
            {!data.IsDeleted &&
              (!column.access ||
                column.access.includes(userDetails.isSuperAdmin)) && (
                <Fragment>
                  {column?.allowEdit !== false && (
                    <NavLink to={`${editLink}/${data[idName]}`}>
                      <i
                        className="fa-solid fa-pen-to-square hover:text-blue-400"
                        title="edit"
                      ></i>
                    </NavLink>
                  )}

                  {column?.allowDelete !== false && (
                    <i
                      className="fa-solid fa-trash hover:text-red-400"
                      title="delete"
                      onClick={props.onDeleteData.bind(null, data)}
                    ></i>
                  )}

                  {column.isView && viewLink && (
                    <NavLink to={`${viewLink}/${data[idName]}`}>
                      <i
                        className="fa-solid fa-eye hover:text-blue-400"
                        title="view"
                      ></i>
                    </NavLink>
                  )}

                  {column.isResetDevice && resetDeviceLink && (
                    <NavLink to={`${resetDeviceLink}/${data[idName]}`}>
                      <i
                        title="Reset Device"
                        className="fa-solid fa-mobile-screen-button hover:text-red-400"
                      ></i>
                    </NavLink>
                  )}
                </Fragment>
              )}
          </td>
        );
      }
      return (data) => (
        <td className={column.align} key={index}>
          {column.isHtml ? (
            <div dangerouslySetInnerHTML={{ __html: data[column.for] }} />
          ) : (
            data[column.for]
          )}
        </td>
      );
    });
  }, [props.columns, editLink, viewLink, idName]);
  return (
    <table className={classes["section-table"]}>
      <thead>
        <tr>
          <th
            className={`${classes["check-box_cell"]} ${classes["check-box_th"]}`}
          >
            <input
              type="checkbox"
              onChange={checkBoxState.onAllCheckBoxChange}
              checked={checkBoxState.isMainChecked}
            />
          </th>
          {props.columns.map((column) => (
            <th
              className={column.align}
              style={{
                cursor: column?.isSortingAllowed ? "pointer" : "auto",
              }}
              key={column._id}
              onClick={() => {
                if (column?.isSortingAllowed) {
                  props?.onChangeSortingOrder(column.for);
                }
              }}
            >
              {/* {column.icon} */}

              {column.title}
              {props?.columnSortings &&
                column?.isSortingAllowed &&
                (() => {
                  const sortingStatus = props.columnSortings[column.for];
                  return (
                    sortingStatus &&
                    (sortingStatus === SORTING_STATUS.ASCENDING ? (
                      <i className="fa-solid fa-arrow-down-short-wide"></i>
                    ) : (
                      <i className="fa-solid fa-arrow-up-wide-short"></i>
                    ))
                  );
                })()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading?.status && !isLoading?.isGlobal ? (
          <tr>
            <td colSpan={props.columns.length + 1}>
              <div className={"spinner"}></div>
            </td>
          </tr>
        ) : props.data.length ? (
          props.data.map((data, index) => (
            <tr key={index}>
              <td className={classes["check-box_cell"]}>
                <input
                  type="checkbox"
                  checked={checkedStates[index] || false}
                  onChange={checkBoxState.onCheckBoxChange.bind(null, index)}
                  disabled={data?.IsDeleted || false}
                />
              </td>
              {renderColumns.map((renderColumn) => renderColumn(data))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={props.columns.length + 1}>
              <p className="text-center text-slate-300">No Records Found</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
