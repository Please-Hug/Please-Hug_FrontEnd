import React, { useState, useEffect, useCallback } from "react";
import styles from "./MissionOverviewPage.module.scss";
import MissionItem from "../../components/Mission/MissionItem";
import {
  getMyMissionGroups,
  getMissions,
  challengeMission,
} from "../../api/missionService";
import { myChallenges } from "../../api/missionService";
import SideModal from "../../components/common/SideModal/SideModal";
import MissionDetailCard from "../../components/Mission/MissionDetailCard";

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

  useEffect(() => {
    const fetchMissionGroups = async () => {
      try {
        const groups = await getMyMissionGroups();
        setMissionGroups(groups.data);
      } catch (error) {
        console.error("미션 그룹을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchMissionGroups();
  }, []);

  useEffect(() => {
    if (activeGroup === null && missionGroups.length > 0) {
      // 초기 활성 그룹 설정
      setActiveGroup(missionGroups[0].missionGroup);
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
      console.log("내 도전 과제:", challenges);
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
    // if (activeGroup) {
    fetchMyChallenges();
    // }
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

  if (!activeGroup) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>미션</h2>
      <ul className={styles.missionTab}>
        {/* MissionTab */}
        {missionGroups.map((group) => (
          <li
            key={group.missionGroup.id}
            className={
              group.missionGroup.id === activeGroup.id ? styles.active : ""
            }
            onClick={() => {
              setActiveGroup(group.missionGroup);
            }}
          >
            {group.missionGroup.name}
          </li>
        ))}
        <li>&nbsp;</li>
      </ul>
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
    </div>
  );
}

export default MissionOverviewPage;
