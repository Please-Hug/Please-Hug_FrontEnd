import React, { useState, useEffect } from "react";
import modalStyles from "../../components/common/Modal/Modal.module.scss";
import Modal from "../../components/common/Modal/Modal";
import { searchUsers } from "../../api/userService";
import { addMissionGroup } from "../../api/missionService";

function AddMissionGroupModal({ isOpen, onClose }) {
  const [newMissionGroup, setNewMissionGroup] = useState({
    name: "",
    teacher: {
      username: "",
    },
  });
  const [teachers, setTeachers] = useState([]);
  const handleAddMissionGroup = () => {
    addMissionGroup(newMissionGroup.name, newMissionGroup.teacher.username)
      .then(() => {
        alert("미션 그룹이 추가되었습니다.");
        onClose();
        setNewMissionGroup({
          name: "",
          teacher: {
            username: "",
          },
        });
      })
      .catch((error) => {
        console.error("미션 그룹 수정 실패:", error);
      });
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <form>
        <label>그룹 이름:</label>
        <input
          type="text"
          defaultValue={newMissionGroup?.name}
          onChange={(e) =>
            setNewMissionGroup({
              ...newMissionGroup,
              name: e.target.value,
            })
          }
        />
        <label>강사:</label>
        {(teachers?.length || 0) > 0 ? (
          <select
            onChange={(e) =>
              setNewMissionGroup({
                ...newMissionGroup,
                teacher: {
                  ...newMissionGroup.teacher,
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
          onClick={handleAddMissionGroup}
        >
          저장
        </button>
      </form>
    </Modal>
  );
}

export default AddMissionGroupModal;
