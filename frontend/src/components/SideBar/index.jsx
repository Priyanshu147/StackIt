import React, { useState, Fragment } from "react";
import classes from "./index.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { APP_NAME, SIDEBAR_STRUCTURE } from "../../utils/constants";
import { useSelector } from "react-redux";

const SideBar = () => {
  const location = useLocation();
  const firstPathSegment = "/" + location.pathname.split("/")[1];
  const userDetails = useSelector((state) => state.user.userDetails);

  // Initialize openSections based on isOpen and active links
  const [openSections, setOpenSections] = useState(
    SIDEBAR_STRUCTURE.reduce((acc, section, index) => {
      // Check if any menu item is currently active
      const isActive = section.items.some(
        (item) => item.link && location.pathname.startsWith(item.link)
      );
      return { ...acc, [index]: section.isOpen || isActive };
    }, {})
  );

  // Toggle function for section visibility
  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className={classes["sidebar-container"]}>
      <ul>
        <li className={classes["container-logo"]}>
          <img src="/logo.png" alt="logo" /> <p className={classes["app-name"]}>{APP_NAME}</p>
        </li>
      </ul>
      <div className={classes["container-options"]}>
        {SIDEBAR_STRUCTURE.map((section, index) => (
          <Fragment key={index}>
            {section.title && (
              <div
                className={classes["section-title"]}
                onClick={() => toggleSection(index)}
              >
                <p>{section.title}</p>
                <hr />
                {openSections[index] ? (
                  <i className="fa-solid fa-minus"></i>
                ) : (
                  <i className="fa-solid fa-plus"></i>
                )}
              </div>
            )}
            {openSections[index] && (
              <ul
                className={`${classes["menu-container"]} ${
                  section.title && classes["sub-menu"]
                }`}
              >
                {section.items.map((item, itemIndex) => {
                  if (item.access) {
                    const isAllowed = item.access.includes(
                      userDetails.isSuperAdmin
                    );
                    if (!isAllowed) {
                      return;
                    }
                  }
                  return (
                    <li key={itemIndex}>
                      {item.link ? (
                        <NavLink
                          to={item.link}
                          className={`${
                            firstPathSegment === item.link
                              ? classes["active-link"]
                              : ""
                          }`}
                        >
                          <i className={item.icon}></i>{" "}
                          <span>{item.label}</span>
                        </NavLink>
                      ) : (
                        <div>
                          <i className={item.icon}></i>
                          <span>{item.label}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
