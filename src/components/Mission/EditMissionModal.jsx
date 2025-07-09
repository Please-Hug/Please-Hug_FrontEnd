import React, { useState, useEffect } from "react";
import modalStyles from "../../components/common/Modal/Modal.module.scss";
import Modal from "../../components/common/Modal/Modal";
import { editMission, deleteMission } from "../../api/missionService";
import { getMissionDetail } from "../../api/missionService";

function EditMissionModal({ isOpen, onClose, missionId }) {
  const [newMission, setNewMission] = useState(null);

  const handleEditMission = () => {
    editMission(missionId, newMission)
      .then(() => {
        alert("미션이 수정되었습니다.");
        onClose();
        setNewMission({});
      })
      .catch((error) => {
        console.error("미션 수정 실패:", error);
        alert("미션 수정에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const handleDeleteMission = () => {
    if (window.confirm("정말로 이 미션을 삭제하시겠습니까?")) {
      deleteMission(missionId)
        .then(() => {
          alert("미션이 삭제되었습니다.");
          onClose();
          setNewMission({});
        })
        .catch((error) => {
          console.error("미션 삭제 실패:", error);
          alert("미션 삭제에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  useEffect(() => {
    if (missionId) {
      getMissionDetail(missionId)
        .then((res) => {
          setNewMission({
            ...res.data,
            missionGroupId: res.data.missionGroup.id,
          });
        })
        .catch((error) => {
          console.error("미션 상세 조회 실패:", error);
        });
    } else {
      onClose();
    }
  }, [missionId, isOpen]);

  if (!newMission) {
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
        <h2>미션 수정</h2>
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
        <label>팁</label>
        <textarea
          value={newMission?.tip}
          onChange={(e) =>
            setNewMission({
              ...newMission,
              tip: e.target.value,
            })
          }
        />

        <button
          type="button"
          className={modalStyles.saveButton}
          onClick={handleEditMission}
        >
          저장
        </button>
        <button
          type="button"
          className={modalStyles.deleteButton}
          onClick={handleDeleteMission}
        >
          삭제
        </button>
      </form>
    </Modal>
  );
}

export default EditMissionModal;
