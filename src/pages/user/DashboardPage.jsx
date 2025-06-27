import React from "react";
import { Link } from "react-router-dom";
import styles from "./DashboardPage.module.scss";
import emptyUserProfile from "../../assets/images/user/empty-user-profile.svg";
import DashboardMenu from "../../components/Dashboard/DashboardMenu";
import RecentLearning from "../../components/Dashboard/RecentLearning";
import LearningPlans from "../../components/Dashboard/LearningPlans";
import DailyQuest from "../../components/Dashboard/DailyQuest";
import AttendanceCheck from "../../components/Dashboard/AttendanceCheck";
import UserProfile from "../../components/Dashboard/UserProfile";
import RecentDiary from "../../components/Dashboard/RecentDiary";
import useUserStore from "../../stores/userStore";

function DashboardPage() {
  const userInfo = useUserStore((state) => state.userInfo);
  if (!userInfo) {
    return <div>로딩중...</div>;
  }
  // const userInfo = {
  //   name: "정휘상(백엔드 3회차)",
  //   course: "Hugton 알고리즘 미션 강좌",
  //   rank: "11%",
  //   level: 17,
  //   currentExp: 4721,
  //   maxExp: 6274,
  // };
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
            profileImg={userInfo.profileImage || emptyUserProfile}
            username={userInfo.name}
            course={userInfo.course || "Hugton 알고리즘 미션 강좌"}
            rank={userInfo.rank || "0%"}
            level={userInfo.level}
            currentExp={userInfo.currentTotalExp}
            maxExp={userInfo.nextLevelTotalExp}
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
