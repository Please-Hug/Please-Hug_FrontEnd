import React, { useState, useEffect } from "react";
import styles from "./MissionOverviewPage.module.scss";
import MissionItem from "../../components/Mission/MissionItem";
import { getMyMissionGroups, getMissions } from "../../api/missionService";

function MissionOverviewPage() {
  const [missionGroups, setMissionGroups] = useState([]);
  const [missions, setMissions] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [missionRows, setMissionRows] = useState({});
  const [missionLevels, setMissionLevels] = useState([]);

  useEffect(() => {
    const fetchMissionGroups = async () => {
      try {
        const groups = await getMyMissionGroups();
        setMissionGroups(groups.data);
        console.log("미션 그룹:", groups.data);
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
        console.log("미션:", groupMissions.data);
        setMissions(groupMissions.data);
      } catch (error) {
        console.error("미션을 가져오는 데 실패했습니다:", error);
      }
    };

    if (activeGroup) {
      fetchMissions(activeGroup.id);
    }
  }, [activeGroup]);

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
      console.log("미션 행:", missionRows);
      console.log("미션 레벨:", missionLevels);
      setMissionRows(missionRows);
      setMissionLevels(missionLevels);
    }
  }, [missions]);

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
        {Object.keys(missionRows).map((missionRow, rowIndex) => (
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
                />
              ) : (
                <MissionItem key={index} isDummy={true} />
              )
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default MissionOverviewPage;
