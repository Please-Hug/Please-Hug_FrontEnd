import React, { useState, useEffect, useMemo } from "react";
import modalStyles from "../../components/common/Modal/Modal.module.scss";
import Modal from "../../components/common/Modal/Modal";
import { addMission } from "../../api/missionService";

function AddMissionModal({ isOpen, onClose, groupId }) {
  const defaultMission = useMemo(() => {
    return {
      missionGroupId: groupId,
      name: "",
      description: "",
      difficulty: "EASY",
      rewardPoint: 0,
      rewardExp: 0,
      order: 0,
      line: 0,
    };
  }, [groupId]);

  const [newMission, setNewMission] = useState(defaultMission);

  const handleAddMission = () => {
    addMission(newMission)
      .then(() => {
        alert("미션이 추가되었습니다.");
        onClose();
        setNewMission({
          ...defaultMission,
          missionGroupId: groupId,
        });
      })
      .catch((error) => {
        console.error("미션 추가 실패:", error);
      });
  };

  useEffect(() => {
    setNewMission({
      ...defaultMission,
      missionGroupId: groupId,
    });
  }, [groupId, defaultMission]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <form>
        <h2>미션 추가</h2>
        <label>이름</label>
        <input
          type="text"
          value={newMission?.name}
          onChange={(e) =>
            setNewMission({
              ...newMission,
              name: e.target.value,
            })
          }
        />
        <label>설명</label>
        <textarea
          value={newMission?.description}
          onChange={(e) =>
            setNewMission({
              ...newMission,
              description: e.target.value,
            })
          }
        ></textarea>
        <label>난이도</label>
        <select
          value={newMission?.difficulty}
          onChange={(e) =>
            setNewMission({
              ...newMission,
              difficulty: e.target.value,
            })
          }
        >
          <option value="EASY">EASY</option>
          <option value="NORMAL">NORMAL</option>
          <option value="HARD">HARD</option>
        </select>
        <label>보상 포인트</label>
        <input
          type="number"
          value={newMission?.rewardPoint}
          onChange={(e) =>
            setNewMission({
              ...newMission,
              rewardPoint: parseInt(e.target.value, 10) || 0,
            })
          }
        />
        <label>보상 경험치</label>
        <input
          type="number"
          value={newMission?.rewardExp}
          onChange={(e) =>
            setNewMission({
              ...newMission,
              rewardExp: parseInt(e.target.value, 10) || 0,
            })
          }
        />
        <label>레벨</label>
        <input
          type="number"
          value={newMission?.order}
          onChange={(e) =>
            setNewMission({
              ...newMission,
              order: parseInt(e.target.value, 10) || 0,
            })
          }
        />
        <label>라인</label>
        <input
          type="number"
          value={newMission?.line}
          onChange={(e) =>
            setNewMission({
              ...newMission,
              line: parseInt(e.target.value, 10) || 0,
            })
          }
        />

        <button
          type="button"
          className={modalStyles.saveButton}
          onClick={handleAddMission}
        >
          저장
        </button>
      </form>
    </Modal>
  );
}

export default AddMissionModal;
