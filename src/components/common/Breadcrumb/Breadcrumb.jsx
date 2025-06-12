import React from "react";
import styles from "./Breadcrumb.module.scss";
import { Link } from "react-router-dom";

function getBreadcrumbItems() {
  // This function can be extended to dynamically generate breadcrumb items
  return [
    { label: "정휘상(백엔드 3회차)의 대시보드", path: "/" },
    { label: "홈", path: "/" },
  ];
}

function Breadcrumb() {
  const breadcrumbItems = getBreadcrumbItems();

  return (
    <ul className={styles.breadcrumb}>
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <li className={styles.breadcrumbItem}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
}

export default Breadcrumb;
