import React from "react";
import { Link } from "react-router-dom";
import styles from "./RecentLearning.module.scss";

function RecentLearning() {
  return (
    <div className={styles.learningHeader}>
      <div>
        <h3>(3회차) Spring 기반 백엔드 개발자 성장 과정</h3>
        <span>출결 QR 코드</span>
      </div>
      <div>
        <label htmlFor="learning-progress">68/107</label>
        <progress id="learning-progress" value="68" max="107" />
      </div>
      <div>
        <Link to="/">학습하기</Link>
      </div>
    </div>
  );
}

export default RecentLearning;
