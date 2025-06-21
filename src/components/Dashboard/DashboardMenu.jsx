import React from "react";
import { Link } from "react-router-dom";
import styles from "./DashboardMenu.module.scss";

function DashboardMenu() {
  return (
    <ul className={styles.dashboardMenu}>
      <li>
        <Link to="/" className={styles.active}>
          홈
        </Link>
      </li>
      <li>
        <Link to="/activity">활동</Link>
      </li>
      <li>
        <Link to="/settings">설정</Link>
      </li>
    </ul>
  );
}

export default DashboardMenu;
