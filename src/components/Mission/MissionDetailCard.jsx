import React, { useState, useEffect, useCallback } from "react";
import styles from "./MissionDetailCard.module.scss";
import missionStateMap from "../../utils/missionStateMap";
import missionDifficultyMap from "../../utils/missionDifficultyMap";
import TaskItem from "./TaskItem";
import { FaFlag } from "react-icons/fa6";
import { getMissionTasks, getMissionMyTasks } from "../../api/missionService";

function MissionDetailCard({ mission, groupName, progress, onChallenge }) {
  const [tasks, setTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (mission) {
        const res = await getMissionTasks(mission.id);
        setTasks(res.data);
      }
    };
    fetchTasks();
  }, [mission]);

  const fetchMyTasks = useCallback(async () => {
    if (mission) {
      const res = await getMissionMyTasks(mission.id);
      const taskMap = {};
      res.data.forEach((task) => {
        taskMap[task.missionTaskId] = task;
      });
      setMyTasks(taskMap);
    }
  }, [mission]);

  useEffect(() => {
    fetchMyTasks();
  }, [fetchMyTasks]);

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
                  {progress ? missionStateMap[progress] : "도전 가능"}
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
            <h3 className={styles.missionDetailSubtasksTitle}>하위 태스크</h3>
            <ul className={styles.missionDetailTasks}>
              {tasks.map((item, index) => (
                <TaskItem
                  key={index}
                  task={{
                    id: item.id,
                    status: myTasks[item.id]?.state || "NOT_STARTED",
                    name: item.name,
                    score: item.score,
                  }}
                  onStatusChange={() => {
                    fetchMyTasks();
                  }}
                />
              ))}
            </ul>
          </div>
          <div className={styles.missionDetailActions}>
            {!progress ? (
              <span
                className={styles.missionDetailChallengeButton}
                onClick={() => {
                  onChallenge(mission.id);
                }}
              >
                미션 도전하기
              </span>
            ) : (
              <button className={styles.missionDetailMoveButton}>
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
