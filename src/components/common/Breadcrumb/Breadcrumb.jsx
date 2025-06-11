import React from "react";
import styles from "./Breadcrumb.module.scss";

function Breadcrumb() {
  return (
    <ul className={styles.breadcrumb}>
      <li>정휘상(백엔드 3회차)의 대시보드</li>
      <li>/</li>
      <li>홈</li>
    </ul>
  );
}

export default Breadcrumb;
