import React from "react";
import styles from "./BreadcrumbsFeature.module.css";
import { FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const BreadcrumbsFeature = () => {
  const location = useLocation();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink = +`/${crumb}`;
      const capitalizedCrumb = capitalizeFirstLetter(crumb);
      return (
        <div key={crumb}>
          <Link
            to={currentLink}
            style={{
              fontWeight: "300",
              lineHeight: "18px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {capitalizedCrumb}
          </Link>
        </div>
      );
    });

  return (
    <div>
      <div className={styles.breadcrumbsTitle}>
        <div>Dashboard</div>
        <div>
          {" "}
          <FaChevronRight />{" "}
        </div>
        {crumbs}
      </div>
    </div>
  );
};

export default BreadcrumbsFeature;
