import React, { Fragment, useState } from "react";
import classes from "./index.module.css";
import Button from "../Button";
import { VISIBLE_PAGES, WINDOW_SIZES } from "../../../utils/constants";
import { useSelector } from "react-redux";

function TablePageControl(props) {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [selectedWindowSize, setSelectedWindowSize] = useState(WINDOW_SIZES[0]); // Default window size

  const changeSelectorHandler = (event) => {
    if (!isLoading.status) {
      const newSize = Number(event.target.value);
      setSelectedWindowSize(newSize);
      props.onWindowSizeChange(newSize); // Notify parent about change
    }
  };

  const totalPages = Math.ceil(props.totalRecords / selectedWindowSize);
  const currentPage = props.pageNo || 1;

  // Calculate the range of pages to display
  const startPage = Math.max(1, currentPage - Math.floor(VISIBLE_PAGES / 2));
  const endPage = Math.min(totalPages, startPage + VISIBLE_PAGES - 1);

  return (
    <div className={classes["table-action"]}>
      <div className={classes["action-select"]}>
        <select
          onChange={changeSelectorHandler}
          value={selectedWindowSize}
          className="text-slate-400"
        >
          {WINDOW_SIZES.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <span className="text-slate-400 text-xl ml-auto flex-1">
        Total Records: {props.totalRecords}
      </span>
      {/* Previous Button */}
      <Button
        className="btn-small round"
        title="prev page"
        disabled={currentPage === 1 || isLoading.status || !props.showPrevPage}
        onClick={props.onPrevPage}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </Button>

      {/* First Page + Ellipsis if needed */}
      {startPage > 1 && (
        <Fragment>
          <span
            className="text-slate-400 text-2xl mx-1 cursor-pointer"
            onClick={() => props.onChangePageNo(1)}
          >
            1
          </span>
          {startPage > 2 && (
            <span className="text-slate-400 text-2xl mx-1">...</span>
          )}
        </Fragment>
      )}

      {/* Page Numbers */}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      ).map((page) => (
        <span
          key={page}
          className={`text-2xl mx-1 cursor-pointer ${
            page === currentPage ? "" : "text-slate-400"
          }`}
          onClick={() => props.onChangePageNo(page)}
        >
          {page}
        </span>
      ))}

      {/* Last Page + Ellipsis if needed */}
      {endPage < totalPages && (
        <Fragment>
          {endPage < totalPages - 1 && (
            <span className="text-slate-400 text-2xl mx-1">...</span>
          )}
          <span
            className="text-slate-400 text-2xl mx-1 cursor-pointer"
            onClick={() => props.onChangePageNo(totalPages)}
          >
            {totalPages}
          </span>
        </Fragment>
      )}

      {/* Next Button */}
      <Button
        className="btn-small round"
        title="next page"
        disabled={
          currentPage === totalPages || isLoading.status || !props.showNextPage
        }
        onClick={props.onNextPage}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </Button>
    </div>
  );
}

export default TablePageControl;
