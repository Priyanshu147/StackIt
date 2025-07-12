import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import classes from "./index.module.css";
import { HEADING_PATH } from "../../../utils/constants";
import { useSelector } from "react-redux";
import ProfileCard from "../../ProfileCard";
function NavigationBar() {
  const location = useLocation();

  const firstPathSegment = location.pathname.split("/")[1];
  const breadcrumb = HEADING_PATH[`/${firstPathSegment}`] || [];
  const userDetails = useSelector((state) => state.user.userDetails);
  return (
    <nav className={classes["nav-container"]}>
      <ul className={classes["nav-container--ul"]}>
        {breadcrumb.map((item, index) => (
          <Fragment key={index}>
            <li className={classes["nav-container--li"]}>
              {item} {index !== breadcrumb.length - 1}
            </li>
            {index < breadcrumb.length - 1 && (
              <li className={classes["nav-container--li"]}>
                <i className="fa-solid fa-angle-right"></i>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
      <ul className={`${classes["nav-container--ul"]} ${classes["action-ul"]}`}>
        <li
          className={`${classes["nav-container--li"]} ${classes["profile-img"]}`}
        >
          <img src="/profile.png" alt="Profile" />
        </li>
        <div className={classes["li-card"]}>
          <ProfileCard user={userDetails} />
        </div>
      </ul>
    </nav>
  );
}

export default NavigationBar;
