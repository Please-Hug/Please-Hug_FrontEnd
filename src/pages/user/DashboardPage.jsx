import React, { useEffect } from "react";
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
import BookmarkModal   from "../../components/Dashboard/BookmarkModal";
import BookmarkList    from "../../components/Dashboard/BookmarkList";
import useBookmarkModal from "../../hooks/useBookmarkModal";
import useUserStore from "../../stores/userStore";
import api from "../../api/axiosInstance";
import useBreadcrumbStore from "../../stores/breadcrumbStore";

function DashboardPage() {
  const userInfo = useUserStore((state) => state.userInfo);
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { isModalOpen, openModal, closeModal, handleCreate } = useBookmarkModal(); // 북마크 모달 훅
  console.log("💡 isModalOpen?", isModalOpen);

  useEffect(() => {
    if (userInfo) {
      setBreadcrumbItems([
        { label: userInfo.name + "의 대시보드", path: "/" },
        {
          label: "홈",
          path: `/dashboard`,
        },
      ]);
    }
  }, [setBreadcrumbItems, userInfo]);
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

      {/* — 북마크 섹션 시작 — */}
      <div className={styles.bookmarkSection}>
        <button type="button" className={styles.bookmarkAddButton} onClick={openModal}>📌 북마크 추가</button>
        <BookmarkList />
      </div>
      {/* — 북마크 섹션 끝 — */}
      
      <div className={styles.dashboardContent}>
        <div className={styles.dashboardLeft}>
          <RecentLearning />
          <LearningPlans />
          <RecentDiary />
        </div>
        <div className={styles.dashboardRight}>
          <UserProfile
            profileImg={
              userInfo.profileImage
                ? `${api.defaults.baseURL}${userInfo.profileImage}`
                : emptyUserProfile
            }
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

      {/* — 북마크 추가 모달 — */}
      <BookmarkModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreate={handleCreate}
      />

    </div>
  );
}

function DashboardGreeting({ name, className }) {
  return <h2 className={className}>{name}님, 오늘도 화이팅이에요!</h2>;
}

export default DashboardPage;
