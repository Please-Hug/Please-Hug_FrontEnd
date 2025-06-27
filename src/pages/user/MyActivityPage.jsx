import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyActivity } from "../../api/studyDiaryService";
import styles from "./MyActivityPage.module.scss";

function MyActivityPage() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchMyActivity();
  }, []);

  const fetchMyActivity = async () => {
    try {
      setLoading(true);
      const response = await getMyActivity();
      setActivities(response.data.activities || []);
      setStats(response.data.stats || {});
    } catch (error) {
      console.error("나의 활동 조회 실패:", error);
      // 임시 더미 데이터
      setStats({
        totalDiaries: 15,
        thisWeekDiaries: 3,
        totalLearningHours: 120,
        streakDays: 7,
        completedMissions: 8,
        currentLevel: 12
      });
      
      setActivities([
        {
          id: 1,
          type: "diary",
          title: "React 훅스 심화 학습",
          description: "useEffect와 useCallback 활용법을 학습했습니다.",
          createdAt: "2024-01-15T14:30:00Z",
          points: 50
        },
        {
          id: 2,
          type: "mission",
          title: "알고리즘 문제 5개 해결",
          description: "백준 온라인 저지에서 그래프 문제를 해결했습니다.",
          createdAt: "2024-01-15T10:20:00Z",
          points: 100
        },
        {
          id: 3,
          type: "quest",
          title: "7일 연속 학습 달성",
          description: "일주일 동안 매일 학습을 완료했습니다.",
          createdAt: "2024-01-14T23:59:00Z",
          points: 200
        },
        {
          id: 4,
          type: "diary",
          title: "CSS Grid 레이아웃 학습",
          description: "반응형 웹 디자인을 위한 Grid 시스템을 익혔습니다.",
          createdAt: "2024-01-14T16:45:00Z",
          points: 50
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "diary": return "📚";
      case "mission": return "🎯";
      case "quest": return "🏆";
      case "level": return "⭐";
      default: return "📝";
    }
  };

  const getActivityTypeText = (type) => {
    switch (type) {
      case "diary": return "배움일기";
      case "mission": return "미션";
      case "quest": return "퀘스트";
      case "level": return "레벨업";
      default: return "활동";
    }
  };

  const filteredActivities = activeTab === "all" 
    ? activities 
    : activities.filter(activity => activity.type === activeTab);

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <button 
            className={styles.backButton}
            onClick={() => navigate("/study-diary")}
          >
            ← 배움일기로 돌아가기
          </button>
        </div>
        <h1>나의 활동</h1>
        <p>학습 활동과 성과를 한눈에 확인해보세요!</p>
      </div>

      {/* 통계 카드들 */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statInfo}>
            <h3>{stats.totalDiaries || 0}</h3>
            <p>총 배움일기</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🔥</div>
          <div className={styles.statInfo}>
            <h3>{stats.streakDays || 0}일</h3>
            <p>연속 학습</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏰</div>
          <div className={styles.statInfo}>
            <h3>{stats.totalLearningHours || 0}시간</h3>
            <p>총 학습시간</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statInfo}>
            <h3>Lv.{stats.currentLevel || 1}</h3>
            <p>현재 레벨</p>
          </div>
        </div>
      </div>

      {/* 활동 필터 탭 */}
      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
            onClick={() => setActiveTab("all")}
          >
            전체
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "diary" ? styles.active : ""}`}
            onClick={() => setActiveTab("diary")}
          >
            배움일기
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "mission" ? styles.active : ""}`}
            onClick={() => setActiveTab("mission")}
          >
            미션
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "quest" ? styles.active : ""}`}
            onClick={() => setActiveTab("quest")}
          >
            퀘스트
          </button>
        </div>
      </div>

      {/* 활동 목록 */}
      <div className={styles.activityList}>
        {filteredActivities.length === 0 ? (
          <div className={styles.empty}>
            <p>아직 활동이 없습니다.</p>
            <p>배움일기를 작성하거나 미션을 완료해보세요!</p>
          </div>
        ) : (
          filteredActivities.map((activity) => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {getActivityIcon(activity.type)}
              </div>
              <div className={styles.activityContent}>
                <div className={styles.activityHeader}>
                  <h3>{activity.title}</h3>
                  <span className={styles.activityType}>
                    {getActivityTypeText(activity.type)}
                  </span>
                </div>
                <p className={styles.activityDescription}>
                  {activity.description}
                </p>
                <div className={styles.activityFooter}>
                  <span className={styles.activityDate}>
                    {new Date(activity.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                  <span className={styles.activityPoints}>
                    +{activity.points}P
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyActivityPage; 