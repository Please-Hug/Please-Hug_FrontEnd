import React from "react";
import { Link } from "react-router-dom";
import styles from "./DashboardPage.module.scss";
import emptyUserProfile from "../../assets/images/user/empty-user-profile.svg";
import DashboardMenu from "../../components/dashboard/DashboardMenu";
import RecentLearning from "../../components/dashboard/RecentLearning";
import LearningPlans from "../../components/dashboard/LearningPlans";
import DailyQuest from "../../components/dashboard/DailyQuest";
import AttendanceCheck from "../../components/dashboard/AttendanceCheck";
import UserProfile from "../../components/dashboard/UserProfile";
import RecentDiary from "../../components/dashboard/RecentDiary";

function DashboardPage() {
  const userInfo = {
    name: "정휘상(백엔드 3회차)",
    course: "Hugton 알고리즘 미션 강좌",
    rank: "11%",
    level: 17,
    currentExp: 4721,
    maxExp: 6274,
  };
  return (
    <div className={styles.dashboardPage}>
      <DashboardGreeting
        name={userInfo.name}
        className={styles.dashboardGreeting}
      />
      <DashboardMenu />
      <div className={styles.dashboardContent}>
        <div className={styles.dashboardLeft}>
          <RecentLearning />
          <LearningPlans />
          <RecentDiary />
        </div>
        <div className={styles.dashboardRight}>
          <UserProfile
            profileImg={emptyUserProfile}
            username={userInfo.name}
            course={userInfo.course}
            rank={userInfo.rank}
            level={userInfo.level}
            currentExp={userInfo.currentExp}
            maxExp={userInfo.maxExp}
          />
          <AttendanceCheck />
          <DailyQuest />
        </div>
      </div>
    </div>
  );
}

function DashboardGreeting({ name, className }) {
  return <h2 className={className}>{name}님, 오늘도 화이팅이에요!</h2>;
}

export default DashboardPage;
