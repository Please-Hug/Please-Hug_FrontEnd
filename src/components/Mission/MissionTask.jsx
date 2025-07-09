import React, { useEffect, useState, useCallback } from "react";
import { getMissionTasks, getMissionMyTasks } from "../../api/missionService";
import styles from "./MissionTask.module.scss";
import TaskItem from "./TaskItem";
import EditTaskModal from "./EditTaskModal";

function MissionTask({ missionId, style, onTaskLoaded, reloadFlag }) {
  const [tasks, setTasks] = useState([]);
  const [myTasks, setMyTasks] = useState({});
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [prevReloadFlag, setPrevReloadFlag] = useState(null);
  useEffect(() => {
    setIsEditTaskModalOpen(false);
  }, [missionId]);

  const fetchTasks = useCallback(async () => {
    if (missionId) {
      const res = await getMissionTasks(missionId);
      setTasks(res.data);
      if (onTaskLoaded) {
        onTaskLoaded(res.data.length);
      }
    }
  }, [missionId, onTaskLoaded]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  useEffect(() => {
    if (prevReloadFlag !== reloadFlag) {
      fetchTasks();
      setPrevReloadFlag(reloadFlag);
      console.log("MissionTask reloadFlag", reloadFlag);
    }
  }, [reloadFlag, fetchTasks, prevReloadFlag]);

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
            tip: item.tip,
          }}
          onStatusChange={() => {
            fetchMyTasks();
          }}
          onEditButtonClick={() => {
            setIsEditTaskModalOpen(true);
            setSelectedTask(item);
          }}
        />
      ))}
      {isEditTaskModalOpen && selectedTask && (
        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          onClose={() => {
            setIsEditTaskModalOpen(false);
            setSelectedTask(null);
            fetchTasks();
          }}
          task={selectedTask}
        />
      )}
    </ul>
  );
}

export default MissionTask;
