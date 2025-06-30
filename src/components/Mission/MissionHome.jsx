import React, { useEffect, useState } from "react";
import styles from "./MissionHome.module.scss";
import { getMissionGroupMembers } from "../../api/missionService";
import emptyUserProfile from "../../assets/images/user/empty-user-profile.svg";
import BASE_URL from "../../api/baseUrl";

function MissionHome({ groupId }) {
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const members = await getMissionGroupMembers(groupId);
        setGroupMembers(members.data);
      } catch (error) {
        console.error("Failed to fetch group members:", error);
      }
    };

    fetchGroupMembers();
  }, [groupId]);

  if (!groupId) {
    return <div>그룹 ID가 없습니다.</div>;
  }

  return (
    <div className={styles.missionHome}>
      <div>
        <h4>팀 소개</h4>
        <p></p>
      </div>
      <div>
        <h4>
          멤버{" "}
          <span className={styles.memberCount}>{groupMembers.length}명</span>
        </h4>
        <ul className={styles.memberList}>
          {groupMembers.map((member) => (
            <li key={member.username}>
              <img
                src={
                  member.profileImage
                    ? BASE_URL + member.profileImage
                    : emptyUserProfile
                }
              />
              <span>{member.name || "이름 없음"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MissionHome;
