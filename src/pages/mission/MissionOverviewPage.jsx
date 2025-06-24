import React from "react";
import styles from "./MissionOverviewPage.module.scss";
import MissionItem from "../../components/Mission/MissionItem";

function getMissions() {
  return [
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
  ];
}

function MissionOverviewPage() {
  const missions = getMissions();
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
          <li>
            <span>Lv.1</span>
          </li>
          <li>
            <span>Lv.2</span>
          </li>
          <li>
            <span>Lv.4</span>
          </li>
          <li>
            <span>Lv.6</span>
          </li>
          <li>
            <span>Lv.8</span>
          </li>
          <li>
            <span>Lv.12</span>
          </li>
          <li>
            <span>Lv.14</span>
          </li>
          <li>
            <span>Lv.16</span>
          </li>
        </ul>

        {missions.map((missionRow, rowIndex) => (
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
