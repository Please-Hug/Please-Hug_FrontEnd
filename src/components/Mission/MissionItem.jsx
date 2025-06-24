import React from "react";
import styles from "./MissionItem.module.scss";

function MissionItem({
  title,
  progressValue,
  maxProgress,
  difficulty,
  course,
  isDummy = false,
}) {
  return (
    (isDummy && (
      <li className={[styles.missionItem, styles.emptyCol].join(" ")}></li>
    )) || (
      <li className={styles.missionItem}>
        <p>{title}</p>
        <div>
          <progress value={progressValue} max={maxProgress} />
          <span>
            {progressValue} / {maxProgress}
          </span>
        </div>
        <div>
          <span>{difficulty}</span>
          <span>{course}</span>
        </div>
      </li>
    )
  );
}

export default MissionItem;
