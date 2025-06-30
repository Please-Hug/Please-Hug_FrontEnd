import React, { useState } from "react";
import { FaCaretRight, FaCodeBranch } from "react-icons/fa6";
import emptyUserProfile from "../../assets/images/user/empty-user-profile.svg";
import MissionTask from "../Mission/MissionTask";
import BASE_URL from "../../api/baseUrl";

function LearningPlanItem({ title, missionId, manager, statusLabel }) {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [taskCount, setTaskCount] = useState(0);

  return (
    <>
      <li>
        <FaCaretRight onClick={() => setIsTaskOpen(!isTaskOpen)} />
        <span>{title}</span>
        <div>
          <span>
            <FaCodeBranch /> <span>{taskCount}</span>
          </span>
        </div>
        <div>
          <span>{manager.name}</span>
        </div>
        <span>{statusLabel}</span>
        <img
          src={
            manager.profileImage
              ? BASE_URL + manager.profileImage
              : emptyUserProfile
          }
          alt={manager.name}
        />
      </li>
      <li style={{ display: isTaskOpen ? "block" : "none" }}>
        <MissionTask
          missionId={missionId}
          style={{ width: "100%", border: "none", padding: "0" }}
          onTaskLoaded={async (taskCount) => {
            setTaskCount(taskCount);
          }}
        />
      </li>
    </>
  );
}

export default LearningPlanItem;
