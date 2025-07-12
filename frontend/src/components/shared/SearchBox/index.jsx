import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
function SearchBox(props) {
  const [searchText, setSearchText] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText != null && props.onSearch) {
        props.onSearch(searchText);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [searchText]);

  const searchChangeHandler = (eve) => {
    let searchString = eve.target.value;
    searchString = searchString.replace(/[^a-zA-Z0-9\s]/g, "");
    eve.target.value = searchString;
    setSearchText(searchString);
  };

  return (
    <div className={classes["searchBox-container"]}>
      <input
        onChange={searchChangeHandler}
        placeholder={props.placeholder || "Search here"}
      />
    </div>
  );
}

export default SearchBox;
