import React from "react";
import styles from "./MissionItem.module.scss";
import { FaCircleCheck, FaFlag } from "react-icons/fa6";
import missionDifficultyMap from "../../utils/missionDifficultyMap";

function MissionItem({
  title,
  progressValue,
  maxProgress,
  difficulty,
  course,
  isDummy = false,
  currentState = null,
  onClick = () => {},
  onMissionEditClick = () => {},
}) {
  let classByState = null;

  if (currentState) {
    classByState = "IN_PROGRESS";
    if (
      currentState === "FEEDBACK_COMPLETED" ||
      currentState === "REWARD_RECEIVED"
    ) {
      classByState = "COMPLETED";
    }
  }

  if (isDummy) {
    return (
      <li className={[styles.missionItem, styles.emptyCol].join(" ")}></li>
    );
  } else {
    return (
      <li
        className={[
          styles.missionItem,
          classByState ? styles[classByState] : "",
        ].join(" ")}
        onClick={onClick}
      >
        {classByState === "COMPLETED" && (
          <span className={styles.checkIcon}>
            <FaCircleCheck />
          </span>
        )}
        <p>{title}</p>
        <button
          className={styles.editButton}
          onClick={(e) => {
            e.stopPropagation();
            onMissionEditClick();
          }}
          aria-label={`${title} 미션 편집`}
        >
          Edit
        </button>
        <div style={{ display: "none" }}>
          <progress value={progressValue} max={maxProgress} />
          <span>
            {progressValue} / {maxProgress}
          </span>
        </div>
        <div>
          <span className={[styles.difficulty, styles[difficulty]].join(" ")}>
            <FaFlag /> {missionDifficultyMap[difficulty]}
          </span>
          <span className={styles.course}>{course}</span>
        </div>
      </li>
    );
  }
}

export default MissionItem;
