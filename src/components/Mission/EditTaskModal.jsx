import React, { useState, useEffect } from "react";
import modalStyles from "../../components/common/Modal/Modal.module.scss";
import Modal from "../../components/common/Modal/Modal";
import { updateMissionTask, deleteMissionTask } from "../../api/missionService";

function EditTaskModal({ isOpen, onClose, task }) {
  const [newTask, setNewTask] = useState(task);

  const handleEditTask = () => {
    updateMissionTask(newTask.id, newTask)
      .then(() => {
        alert("태스크가 수정되었습니다.");
        onClose();
      })
      .catch((error) => {
        alert("태스크 수정에 실패했습니다.");
        console.error("Error updating task:", error);
      });
  };

  const handleDeleteTask = () => {
    if (window.confirm("정말로 이 태스크를 삭제하시겠습니까?")) {
      deleteMissionTask(newTask.id)
        .then(() => {
          alert("태스크가 삭제되었습니다.");
          onClose();
        })
        .catch((error) => {
          alert("태스크 삭제에 실패했습니다.");
          console.error("Error deleting task:", error);
        });
    }
  };

  useEffect(() => {
    setNewTask(task);
  }, [task.id, isOpen]);

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
        <h2>태스크 수정</h2>
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
          onClick={handleEditTask}
        >
          저장
        </button>
        <button
          type="button"
          className={modalStyles.deleteButton}
          onClick={handleDeleteTask}
        >
          삭제
        </button>
      </form>
    </Modal>
  );
}

export default EditTaskModal;
