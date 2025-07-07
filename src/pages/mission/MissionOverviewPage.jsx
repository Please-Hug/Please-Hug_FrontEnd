import React, { useState, useEffect, useCallback } from "react";
import styles from "./MissionOverviewPage.module.scss";
import MissionItem from "../../components/Mission/MissionItem";
import {
  getMyMissionGroups,
  getMissions,
  challengeMission,
  myChallenges,
} from "../../api/missionService";
import SideModal from "../../components/common/SideModal/SideModal";
import MissionDetailCard from "../../components/Mission/MissionDetailCard";
import TabComponent from "../../components/common/TabComponent/TabComponent";
import useBreadcrumbStore from "../../stores/breadcrumbStore";
import useTokenPayload from "../../stores/tokenPayloadStore";
import Modal from "../../components/common/Modal/Modal";
import EditMissionGroupModal from "../../components/Mission/EditMissionGroupModal";
import AddMissionGroupModal from "../../components/Mission/AddMissionGroupModal";

function MissionOverviewPage() {
  const [missionGroups, setMissionGroups] = useState([]);
  const [missions, setMissions] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [missionRows, setMissionRows] = useState({});
  const [missionLevels, setMissionLevels] = useState([]);
  const [challenges, setChallenges] = useState({});
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);
  const [activeMission, setActiveMission] = useState(null);
  const sideModalWidth = 800;
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const tokenPayload = useTokenPayload((state) => state.tokenPayload);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editMissionGroup, setEditMissionGroup] = useState(null);

  useEffect(() => {
    setBreadcrumbItems([{ label: "미션", path: "/mission" }]);
  }, [setBreadcrumbItems]);

  const fetchMissionGroups = useCallback(async () => {
    try {
      const groups = await getMyMissionGroups();
      const newGroups = [];
      groups.data.forEach((group) => {
        newGroups.push({
          ...group,
          name: group.missionGroup.name,
        });
      });
      setMissionGroups(newGroups);
    } catch (error) {
      console.error("미션 그룹을 가져오는 데 실패했습니다:", error);
    }
  }, []);

  useEffect(() => {
    fetchMissionGroups();
  }, [fetchMissionGroups]);

  useEffect(() => {
    if (activeGroup === null && missionGroups.length > 0) {
      // 초기 활성 그룹 설정
      setActiveGroup(missionGroups[0].missionGroup);
    } else if (activeGroup !== null) {
      const group = missionGroups.find(
        (g) => g.missionGroup.id === activeGroup.id
      );
      if (group) {
        setActiveGroup(group.missionGroup);
      }
    }
  }, [missionGroups, activeGroup]);

  useEffect(() => {
    const fetchMissions = async (groupId) => {
      try {
        const groupMissions = await getMissions(groupId);
        setMissions(groupMissions.data);
      } catch (error) {
        console.error("미션을 가져오는 데 실패했습니다:", error);
      }
    };

    if (activeGroup) {
      fetchMissions(activeGroup.id);
    }
  }, [activeGroup]);

  const fetchMyChallenges = useCallback(async () => {
    try {
      if (!activeGroup) {
        console.warn("활성 그룹이 설정되지 않았습니다.");
        return;
      }
      const challenges = await myChallenges(activeGroup.id);
      const uniqueChallenges = {};
      challenges.data.forEach((challenge) => {
        if (!uniqueChallenges[challenge.mission.id]) {
          uniqueChallenges[challenge.mission.id] = challenge;
        }
      });
      setChallenges(uniqueChallenges);
    } catch (error) {
      console.error("내 도전 과제를 가져오는 데 실패했습니다:", error);
    }
  }, [activeGroup]);

  useEffect(() => {
    fetchMyChallenges();
  }, [fetchMyChallenges]);

  useEffect(() => {
    if (missions.length > 0) {
      const missionRows = {};
      const missionLevels = [];
      for (const mission of missions) {
        const level = mission.order;
        const line = mission.line;
        if (!missionRows[line]) {
          missionRows[line] = {};
        }
        if (!missionRows[line][level]) {
          missionRows[line][level] = mission;
        }
        if (!missionLevels.includes(level)) {
          missionLevels.push(level);
        }
      }
      missionLevels.sort((a, b) => a - b);
      setMissionRows(missionRows);
      setMissionLevels(missionLevels);
    }
  }, [missions]);

  const handleChallenge = async (missionId) => {
    try {
      await challengeMission(missionId);
      await fetchMyChallenges();
    } catch (error) {
      console.error("미션 도전 실패:", error);
    }
  };

  const handleEditClick = (item) => {
    if (tokenPayload?.role === "ROLE_ADMIN") {
      const missionGroup = item.missionGroup;
      setEditMissionGroup(missionGroup);
      setIsEditModalOpen(true);
    }
  };

  if (!activeGroup) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>미션</h2>
      <TabComponent
        tabs={missionGroups}
        onTabChange={(item) => {
          setActiveGroup(item.missionGroup);
        }}
        onEditClick={handleEditClick}
      />
      {tokenPayload?.role === "ROLE_ADMIN" && (
        <button
          className={styles.addMissionGroupButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          추가
        </button>
      )}
      <div className={styles.missionTabPage}>
        <ul className={styles.missionLevel}>
          {missionLevels.map((level, index) => (
            <li key={index}>Lv.{level}</li>
          ))}
        </ul>

        {Object.keys(missionRows).length === 0 && <div>미션이 없습니다.</div>}
        {Object.keys(missionRows).map((missionRow) => (
          <ul key={missionRow} className={styles.missionRow}>
            {missionLevels.map((missionCol, index) =>
              missionRows[missionRow][missionCol] ? (
                <MissionItem
                  key={index}
                  title={missionRows[missionRow][missionCol].name}
                  progressValue={0}
                  maxProgress={1}
                  difficulty={missionRows[missionRow][missionCol].difficulty}
                  course={activeGroup.name}
                  isDummy={false}
                  currentState={
                    challenges[missionRows[missionRow][missionCol].id]
                      ? challenges[missionRows[missionRow][missionCol].id]
                          .progress
                      : null
                  }
                  onClick={() => {
                    setActiveMission(missionRows[missionRow][missionCol]);
                    setIsSideModalOpen(true);
                  }}
                />
              ) : (
                <MissionItem key={index} isDummy={true} />
              )
            )}
          </ul>
        ))}
      </div>
      <SideModal
        isOpen={isSideModalOpen}
        onClose={() => setIsSideModalOpen(false)}
        width={sideModalWidth}
      >
        <MissionDetailCard
          mission={activeMission}
          groupName={activeGroup.name}
          progress={challenges[activeMission?.id]?.progress || null}
          onChallenge={handleChallenge}
        />
      </SideModal>
      <EditMissionGroupModal
        isOpen={isEditModalOpen}
        onClose={() => {
          fetchMissionGroups();
          setIsEditModalOpen(false);
        }}
        missionGroup={editMissionGroup}
      />
      <AddMissionGroupModal
        isOpen={isAddModalOpen}
        onClose={() => {
          fetchMissionGroups();
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
}

export default MissionOverviewPage;
