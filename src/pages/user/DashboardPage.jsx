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

function DashboardPage() {
  return (
    <div className={styles.dashboardPage}>
      <h1 className={styles.dashboardGreeting}>
        정휘상(백엔드 3회차)님,
        <br /> 오늘도 좋은 하루 보내세요!
      </h1>
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
            username={"정휘상(백엔드 3회차)"}
            course={"Hugton 알고리즘 미션 강좌"}
            rank={"11%"}
            level={17}
            currentExp={4721}
            maxExp={6274}
          />
          <AttendanceCheck />
          <DailyQuest />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
