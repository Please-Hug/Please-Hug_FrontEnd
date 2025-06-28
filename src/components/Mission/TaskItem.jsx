import React from "react";
import styles from "./TaskItem.module.scss";
import missionTaskStateMap from "../../utils/missionTaskStateMap";
import { changeMissionTaskState } from "../../api/missionService";

function TaskItem({ task, onStatusChange }) {
  const handleStatusChange = async () => {
    try {
      let newStatus;
      switch (task.status) {
        case "NOT_STARTED":
          newStatus = "IN_PROGRESS";
          break;
        case "IN_PROGRESS":
          newStatus = "COMPLETED";
          break;
        case "COMPLETED":
          newStatus = "NOT_STARTED";
          break;
        default:
          newStatus = "IN_PROGRESS";
      }
      await changeMissionTaskState(task.id, newStatus);
      if (onStatusChange) {
        onStatusChange();
      }
      // 상태 변경 성공 시 추가 작업 수행
    } catch (error) {
      console.error("상태 변경 실패:", error);
    }
  };

  //   const taskStatusList = [
  //     { value: "NOT_STARTED", label: "시작전" },
  //     { value: "IN_PROGRESS", label: "진행중" },
  //     { value: "COMPLETED", label: "완료" },
  //   ];

  return (
    <li className={styles.taskItem} onClick={handleStatusChange}>
      <span className={[styles.taskStatus, styles[task.status]].join(" ")}>
        {missionTaskStateMap[task.status]} ▶
      </span>
      <span className={styles.taskName}>{task.name}</span>
      <span className={styles.taskScore}>{task.score}점</span>
    </li>
  );
}

export default TaskItem;
