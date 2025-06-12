import React from "react";
import { Link } from "react-router-dom";
import styles from "./DashboardPage.module.scss";

function DashboardPage() {
  return (
    <div>
      <h1 className={styles.dashboardGreeting}>
        정휘상(백엔드 3회차)님,
        <br /> 오늘도 좋은 하루 보내세요!
      </h1>
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
    </div>
  );
}

export default DashboardPage;
