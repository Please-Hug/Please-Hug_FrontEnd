import React from "react";
import styles from "./PraisePage.module.scss";

function PraisePage() {
  return (
    <div>
      <h2>칭찬</h2>
      <div className={styles.praiseContainer}>
        <div className={styles.praiseContent}>asd</div>
        <div className={styles.praiseSideBar}>
          <div
            className={[styles.praiseBox, styles.praiseGoodReaction].join(" ")}
          >
            <h3>반응 좋은 칭찬 글</h3>
            <div>
              <span className={[styles.praiseType, styles.thankYou]}>
                감사해요
              </span>
              <p>
                장윤영(백엔드 3회차) ▶ 정휘상(백엔드 3회차) <span>외 2명</span>
              </p>
              <p>칭찬</p>
            </div>
            <div className={styles.praiseReactions}>
              <span className={styles.praiseIcon}>👍 3</span>
              <span className={styles.praiseIcon}>😆 2</span>
              <span className={styles.praiseIcon}>➕</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PraisePage;
