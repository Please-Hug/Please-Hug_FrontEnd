import React from "react";
import styles from "./MissionDetailCard.module.scss";
import missionStatusMap from "../../utils/missionStatusMap";
import missionDifficultyMap from "../../utils/missionDifficultyMap";
import { FaFlag } from "react-icons/fa6";

function MissionDetailCard({ mission, groupName, progress }) {
  return (
    <div className={styles.missionDetail}>
      {mission && (
        <>
          <h4 className={styles.missionDetailTitle}>
            Lv.{mission.order} {groupName}
          </h4>
          <div className={styles.missionDetailContent}>
            <h2 className={styles.missionDetailName}>{mission.name}</h2>
            <ul className={styles.missionDetailInfo}>
              <li>
                <span className={styles.missionDetailLabel}>진행상태</span>
                <span
                  className={[
                    styles.missionDetailProgressValue,
                    progress ? styles[progress] : "",
                  ].join(" ")}
                >
                  {progress ? missionStatusMap[progress] : "도전 가능"}
                </span>
              </li>
              <li>
                <span className={styles.missionDetailLabel}>난이도</span>
                <span
                  className={[
                    styles.missionDetailDifficulty,
                    styles[mission.difficulty],
                  ].join(" ")}
                >
                  <FaFlag /> {missionDifficultyMap[mission.difficulty]}
                </span>
              </li>
            </ul>
            <p className={styles.missionDetailReward}>
              <span className={styles.missionDetailRewardLabel}>
                획득 가능한 리워드
              </span>
              <span className={styles.missionDetailRewardValue}>
                구름 조각 <strong>{mission.rewardPoint}</strong>개 · 경험치{" "}
                <strong>{mission.rewardExp}</strong>개
              </span>
            </p>
            <p className={styles.missionDetailDescription}>
              {mission.description}
            </p>
            <ul>
              <li>Notion으로 문서화 작업하기</li>
              <li>Figma로 UI/UX 디자인하기</li>
              <li>Jira로 이슈 관리하기</li>
              <li>GitHub로 코드 관리하기</li>
              <li>Slack으로 팀원과 소통하기</li>
              <li>Google Drive로 자료 공유하기</li>
              <li>Zoom으로 원격 회의하기</li>
              <li>Google Calendar로 일정 관리하기</li>
              <li>Google Docs로 문서 작성하기</li>
              <li>Google Sheets로 데이터 분석하기</li>
              <li>Google Slides로 프레젠테이션 만들기</li>
              <li>Google Forms로 설문 조사하기</li>
              <li>Google Meet로 화상 회의하기</li>
              <li>Google Chat로 팀원과 대화하기</li>
            </ul>
          </div>
          <div className={styles.missionDetailActions}>
            {!progress ? (
              <span className={styles.missionDetailActionButton}>
                미션 도전하기
              </span>
            ) : (
              <button className={styles.missionDetailActionButton}>
                학습 계획 이동하기
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MissionDetailCard;
