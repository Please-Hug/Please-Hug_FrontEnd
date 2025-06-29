import React from "react";
import styles from "./Breadcrumb.module.scss";
import { Link } from "react-router-dom";
import useBreadcrumbStore from "../../../stores/breadcrumbStore";

function Breadcrumb() {
  const { breadcrumbItems } = useBreadcrumbStore();

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
