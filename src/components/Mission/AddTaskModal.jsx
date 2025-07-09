import React, { useState, useEffect } from "react";
import modalStyles from "../../components/common/Modal/Modal.module.scss";
import Modal from "../../components/common/Modal/Modal";
import { addMissionTask } from "../../api/missionService";

function AddTaskModal({ isOpen, onClose, missionId }) {
  const [newTask, setNewTask] = useState({
    name: "",
    tip: "",
    score: 0,
    missionId: missionId,
  });

  const handleAddTask = () => {
    addMissionTask(missionId, newTask)
      .then(() => {
        alert("태스크가 추가되었습니다.");
        onClose();
        setNewTask({
          name: "",
          tip: "",
          score: 0,
          missionId: missionId,
        });
      })
      .catch((error) => {
        console.error("태스크 추가 실패:", error);
        alert("태스크 추가에 실패했습니다. 다시 시도해주세요.");
      });
  };

  useEffect(() => {
    setNewTask({
      name: "",
      tip: "",
      score: 0,
      missionId: missionId,
    });
  }, [missionId, isOpen]);

  if (!newTask) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <form>
        <h2>태스크 추가</h2>
        <label>이름</label>
        <input
          type="text"
          value={newTask?.name || ""}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              name: e.target.value,
            })
          }
        />
        <label>공수</label>
        <input
          type="number"
          value={newTask?.score || 0}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              score: parseInt(e.target.value, 10) || 0,
            })
          }
        />
        <label>팁</label>
        <textarea
          value={newTask?.tip || ""}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              tip: e.target.value,
            })
          }
        />

        <button
          type="button"
          className={modalStyles.saveButton}
          onClick={handleAddTask}
        >
          저장
        </button>
      </form>
    </Modal>
  );
}

export default AddTaskModal;
