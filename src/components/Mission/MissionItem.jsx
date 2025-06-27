import React from "react";
import styles from "./MissionItem.module.scss";
import { FaFlag } from "react-icons/fa6";

function MissionItem({
  title,
  progressValue,
  maxProgress,
  difficulty,
  course,
  isDummy = false,
  currentState = null,
}) {
  const difficultyMap = {
    EASY: "쉬움",
    NORMAL: "보통",
    HARD: "어려움",
  };
  let classByState = null;

  if (currentState) {
    classByState = "IN_PROGRESS";
    if (
      currentState === "FEEDBACK_COMPLETED" ||
      currentState === "REWARD_RECEIVED"
    ) {
      classByState = "COMPLETED";
    }
    console.log("classByState", classByState);
  }

  if (isDummy) {
    return (
      <li className={[styles.missionItem, styles.emptyCol].join(" ")}></li>
    );
  } else {
    return (
      <li className={[styles.missionItem, styles[classByState]].join(" ")}>
        <p>{title}</p>
        <div style={{ display: "none" }}>
          <progress value={progressValue} max={maxProgress} />
          <span>
            {progressValue} / {maxProgress}
          </span>
        </div>
        <div>
          <span className={[styles.difficulty, styles[difficulty]].join(" ")}>
            <FaFlag /> {difficultyMap[difficulty]}
          </span>
          <span className={styles.course}>{course}</span>
        </div>
      </li>
    );
  }
}

export default MissionItem;
