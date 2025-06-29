import React, { useEffect, useState, useCallback } from "react";
import { getMissionTasks, getMissionMyTasks } from "../../api/missionService";
import styles from "./MissionTask.module.scss";
import TaskItem from "./TaskItem";

function MissionTask({ missionId, style }) {
  const [tasks, setTasks] = useState([]);
  const [myTasks, setMyTasks] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      if (missionId) {
        const res = await getMissionTasks(missionId);
        setTasks(res.data);
        console.log("미션 작업 목록:", res.data);
      }
    };
    fetchTasks();
  }, [missionId]);

  const fetchMyTasks = useCallback(async () => {
    if (missionId) {
      const res = await getMissionMyTasks(missionId);
      const taskMap = {};
      res.data.forEach((task) => {
        taskMap[task.missionTaskId] = task;
      });
      setMyTasks(taskMap);
      console.log("내 미션 작업 목록:", taskMap);
    }
  }, [missionId]);

  useEffect(() => {
    fetchMyTasks();
  }, [fetchMyTasks]);
  return (
    <ul className={styles.missionDetailTasks} style={style || {}}>
      {tasks.map((item) => (
        <TaskItem
          key={item.id}
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
  );
}

export default MissionTask;
