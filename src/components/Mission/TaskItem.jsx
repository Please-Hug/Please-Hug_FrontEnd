import React from "react";
import styles from "./TaskItem.module.scss";
function TaskItem({ task }) {
  //   const taskStatusList = [
  //     { value: "NOT_STARTED", label: "시작전" },
  //     { value: "IN_PROGRESS", label: "진행중" },
  //     { value: "COMPLETED", label: "완료" },
  //   ];

  return (
    <li className={styles.taskItem}>
      <span className={styles.taskStatus}>{task.status} ▶</span>
      <span className={styles.taskName}>{task.name}</span>
      <span className={styles.taskScore}>{task.score}점</span>
    </li>
  );
}

export default TaskItem;
