import React from "react";
import styles from "./MissionDetailCard.module.scss";
import missionStatusMap from "../../utils/missionStatusMap";
import missionDifficultyMap from "../../utils/missionDifficultyMap";

function MissionDetailCard({ mission, groupName, progress }) {
  return (
    <div className={styles.missionDetail}>
      {mission && (
        <>
          <h4>
            Lv.{mission.order} {groupName}
          </h4>
          <hr />
          <h2>{mission.name}</h2>
          <ul>
            <li>
              <span className={styles.missionDetailLabel}>진행상태</span>
              <span
                className={[
                  styles.missionDetailProgressValue,
                  progress ? styles[missionStatusMap[progress]] : "",
                ].join(" ")}
              >
                {progress ? missionStatusMap[progress] : "도전 가능"}
              </span>
            </li>
            <li>
              <span className={styles.missionDetailLabel}>난이도</span>
              <span className={styles.missionDetailDifficulty}>
                {missionDifficultyMap[mission.difficulty]}
              </span>
            </li>
          </ul>
          <p className={styles.missionDetailReward}>
            <span className={styles.missionDetailRewardLabel}>
              획득 가능한 리워드
            </span>
            <span className={styles.missionDetailRewardValue}>
              구름 조각 <span>{mission.rewardPoint}</span>개 · 경험치{" "}
              <span>{mission.rewardExp}</span>개
            </span>
          </p>
          <p className={styles.missionDetailDescription}>
            {mission.description}
          </p>
          <ul>
            <li>Notion으로 문서화 작업하기</li>
            <li>Figma로 UI/UX 디자인하기</li>
            <li>Jira로 이슈 관리하기</li>
          </ul>
          <div className={styles.missionDetailActions}>
            <button className={styles.missionDetailActionButton}>
              미션 도전하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MissionDetailCard;
