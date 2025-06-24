import React from "react";
import styles from "./MissionOverviewPage.module.scss";
import MissionItem from "../../components/Mission/MissionItem";
function getMissions() {
  return {
    missionLevels: [1, 2, 4, 6, 8, 12, 14, 16],
    missionRows: [
      [
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        { isDummy: true },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
      ],
      [
        { isDummy: true },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
      ],
      [
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
        { isDummy: true },
        {
          title: "오리엔테이션",
          progressValue: 2,
          maxProgress: 14,
          difficulty: "쉬움",
          course: "(3회차)백엔드 과정 개인 미션",
        },
      ],
    ],
  };
}

function MissionOverviewPage() {
  const missionData = getMissions();
  return (
    <div>
      <h2>미션</h2>
      <ul className={styles.missionTab}>
        {/* MissionTab */}
        <li className={styles.active}>정휘상(백엔드 3회차)의 개인 그룹</li>
        <li>정휘상(백엔드 3회차)의 개인 알고리즘</li>
        <li>&nbsp;</li>
      </ul>
      <div className={styles.missionTabPage}>
        <ul className={styles.missionLevel}>
          {missionData.missionLevels.map((level, index) => (
            <li key={index}>Lv.{level}</li>
          ))}
        </ul>

        {missionData.missionRows.map((missionRow, rowIndex) => (
          <ul key={rowIndex} className={styles.missionRow}>
            {missionRow.map((mission, index) => (
              <MissionItem key={index} {...mission} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default MissionOverviewPage;
