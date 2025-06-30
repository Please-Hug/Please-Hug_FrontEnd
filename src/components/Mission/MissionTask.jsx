import React, { useEffect, useState, useCallback } from "react";
import { getMissionTasks, getMissionMyTasks } from "../../api/missionService";
import styles from "./MissionTask.module.scss";
import TaskItem from "./TaskItem";

function MissionTask({ missionId, style, onTaskLoaded }) {
  const [tasks, setTasks] = useState([]);
  const [myTasks, setMyTasks] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      if (missionId) {
        const res = await getMissionTasks(missionId);
        setTasks(res.data);
        if (onTaskLoaded) {
          onTaskLoaded(res.data);
        }
      }
    };
    fetchTasks();
  }, [missionId, onTaskLoaded]);

  const fetchMyTasks = useCallback(async () => {
    if (missionId) {
      const res = await getMissionMyTasks(missionId);
      const taskMap = {};
      res.data.forEach((task) => {
        taskMap[task.missionTaskId] = task;
      });
      setMyTasks(taskMap);
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
