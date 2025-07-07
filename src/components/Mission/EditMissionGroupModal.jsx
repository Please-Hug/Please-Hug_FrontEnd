import React, { useState, useEffect } from "react";
import modalStyles from "../../components/common/Modal/Modal.module.scss";
import Modal from "../../components/common/Modal/Modal";
import { searchUsers } from "../../api/userService";
import {
  updateMissionGroup,
  deleteMissionGroup,
} from "../../api/missionService";

function EditMissionGroupModal({ isOpen, onClose, missionGroup }) {
  const [editMissionGroup, setEditMissionGroup] = useState(missionGroup);
  const [teachers, setTeachers] = useState([]);
  const handleEditMissionGroup = () => {
    updateMissionGroup(
      editMissionGroup.id,
      editMissionGroup.name,
      editMissionGroup.teacher.username
    )
      .then(() => {
        alert("미션 그룹이 수정되었습니다.");
        onClose();
      })
      .catch((error) => {
        console.error("미션 그룹 수정 실패:", error);
      });
  };
  const handleDeleteMissionGroup = () => {
    // 여기에 미션 그룹 삭제 로직을 추가해야 합니다.
    if (confirm("정말로 이 미션 그룹을 삭제하시겠습니까?")) {
      // 삭제 API 호출
      deleteMissionGroup(editMissionGroup.id)
        .then(() => {
          alert("미션 그룹이 삭제되었습니다.");
          onClose();
        })
        .catch((error) => {
          console.error("미션 그룹 삭제 실패:", error);
        });
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await searchUsers();
        setTeachers(response);
      } catch (error) {
        console.error("강사 목록을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    setEditMissionGroup(missionGroup);
  }, [missionGroup]);

  if (!missionGroup) {
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
        <h2>미션 그룹 수정</h2>
        <label>그룹 이름:</label>
        <input
          type="text"
          defaultValue={editMissionGroup?.name}
          onChange={(e) =>
            setEditMissionGroup({
              ...editMissionGroup,
              name: e.target.value,
            })
          }
        />
        <label>강사:</label>
        {(teachers?.length || 0) > 0 && editMissionGroup?.teacher.username ? (
          <select
            defaultValue={editMissionGroup?.teacher.username}
            onChange={(e) =>
              setEditMissionGroup({
                ...editMissionGroup,
                teacher: {
                  ...editMissionGroup.teacher,
                  username: e.target.value,
                },
              })
            }
          >
            <option value="">선택하세요</option>
            {/* 여기에 강사 목록을 추가해야 합니다. */}
            {teachers?.map((teacher) => (
              <option key={teacher.username} value={teacher.username}>
                {teacher.name}
              </option>
            ))}
          </select>
        ) : (
          <p>강사 정보가 없습니다.</p>
        )}
        <button
          type="button"
          className={modalStyles.saveButton}
          onClick={handleEditMissionGroup}
        >
          저장
        </button>
        <button
          type="button"
          className={modalStyles.deleteButton}
          onClick={handleDeleteMissionGroup}
        >
          삭제
        </button>
      </form>
    </Modal>
  );
}

export default EditMissionGroupModal;
