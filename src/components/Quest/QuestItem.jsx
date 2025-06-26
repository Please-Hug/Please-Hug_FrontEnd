import React from "react";
import styles from "./QuestItem.module.scss";

function QuestItem({
  title,
  description,
  progress,
  progressMax,
  icon,
  timeLeft,
}) {
  return (
    <div className={[styles.questCard, styles.questBox].join(" ")}>
      <div className={styles.questCardContent}>
        <img src={icon} alt="아이콘" />
        <div className={styles.questDetails}>
          <h6>{title}</h6>
          <div className={styles.questSubtitle}>{description}</div>
          <div className={styles.questProgressText}>
            <span className={styles.current}>{progress}</span> /{" "}
            <span className={styles.total}>{progressMax}</span>회
          </div>
        </div>
      </div>
      <div className={styles.questButtonContainer}>
        <button className={[styles.questButton]} disabled>
          {timeLeft}
        </button>
      </div>
    </div>
  );
}

export default QuestItem;
