import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyWeeklyStatus, getMyStudyDiaries } from "../../api/studyDiaryService";
import styles from "./MyStudyDiaryActivity.module.scss";

function MyStudyDiaryActivity() {
  const navigate = useNavigate();
  const [myDiaries, setMyDiaries] = useState([]);
  const [weeklyStatus, setWeeklyStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("나의 활동");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 두 API를 병렬로 호출
      const [weeklyResponse, diariesResponse] = await Promise.all([
        getMyWeeklyStatus(),
        getMyStudyDiaries(0, 20) // 페이지 0, 사이즈 20으로 조회
      ]);

      // 주간 활동 상황 데이터 설정
      setWeeklyStatus(weeklyResponse.data || null);
      
      // 배움일기 목록 데이터 설정 - data가 직접 배열임
      setMyDiaries(diariesResponse.data || []);
    } catch (error) {
      console.error("데이터 조회 실패:", error);
      // 에러 발생 시 기본값 설정
      setWeeklyStatus(null);
      setMyDiaries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "홈") {
      navigate("/study-diary");
    }
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const getCurrentDate = () => {
    const today = new Date();
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayName = days[today.getDay()];
    const dateStr = today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\./g, '.').replace(/ /g, '');
    
    return `${dayName} ${dateStr}`;
  };

  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    // 월요일부터 시작하도록 변경 (getDay()는 일요일=0, 월요일=1 반환)
    const dayOfWeek = today.getDay();
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 일요일이면 6, 나머지는 -1
    startOfWeek.setDate(today.getDate() - daysFromMonday);
    
    const weekDates = [];
    const dayNames = ['월', '화', '수', '목', '금', '토', '일']; // 월요일부터 시작
    const apiDayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      // weeklyStatus 데이터에서 해당 요일의 작성 여부 확인
      let hasEntry = false;
      if (weeklyStatus) {
        hasEntry = weeklyStatus[apiDayNames[i]] || false;
      }
      
      weekDates.push({
        dayName: dayNames[i],
        date: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        hasEntry: hasEntry
      });
    }
    
    return weekDates;
  };

  // 통계 정보 계산
  const getStats = () => {
    if (!weeklyStatus) {
      return {
        todayCount: 0,
        weeklyRate: 0,
        goal: 1
      };
    }

    const todayCount = weeklyStatus.todayStudyDiaryNum || 0;
    
    // 7일 작성률 계산 (true인 요일 개수 / 7 * 100)
    const dayFields = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const completedDays = dayFields.filter(day => weeklyStatus[day]).length;
    const weeklyRate = Math.round((completedDays / 7) * 100);
    
    const goal = 7; // 주 7일 목표

    return {
      todayCount,
      weeklyRate,
      goal
    };
  };

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      {/* 헤더 섹션 */}
      <div className={styles.headerSection}>
        <div className={styles.titleRow}>
          <h1 className={styles.pageTitle}>배움일기</h1>
          <button
            className={styles.writeButton}
            onClick={() => navigate("/study-diary/write")}
          >
            배움일기 작성하기
          </button>
        </div>
      </div>

      {/* 탭 */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "홈" ? styles.activeTab : ""}`}
          onClick={() => handleTabChange("홈")}
        >
          홈
        </button>
        <button
          className={`${styles.tab} ${activeTab === "나의 활동" ? styles.activeTab : ""}`}
          onClick={() => handleTabChange("나의 활동")}
        >
          나의 활동
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className={styles.mainContent}>
        {/* 왼쪽 사이드바 */}
        <div className={styles.sidebar}>
          <div className={styles.dateSection}>
            <h2 className={styles.dateTitle}>{getCurrentDate()}</h2>
            
            {/* 주간 달력 */}
            <div className={styles.weekCalendar}>
              <div className={styles.weekDays}>
                {getWeekDates().map((day, index) => (
                  <div 
                    key={index} 
                    className={`${styles.dayCell} ${day.isToday ? styles.today : ''}`}
                  >
                    <div className={styles.dayName}>{day.dayName}</div>
                    <div className={styles.dayDate}>
                      {day.hasEntry ? (
                        <div className={styles.checkMark}>✓</div>
                      ) : (
                        day.date
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 통계 정보 */}
            <div className={styles.statsInfo}>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>오늘 배움일기</div>
                <div className={styles.statValue}>{getStats().todayCount}개</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>7일 작성률</div>
                <div className={styles.statValue}>{getStats().weeklyRate}%</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>목표</div>
                <div className={styles.statValue}>{getStats().goal}개</div>
              </div>
            </div>

            <button className={styles.exportButton}>
              📤 모든 글 내보내기
            </button>
          </div>
        </div>

        {/* 오른쪽 메인 영역 */}
        <div className={styles.mainArea}>
          {/* 많이 학습한 유형 섹션
          <div className={styles.statsSection}>
            <h3 className={styles.sectionTitle}>
              많이 학습한 유형 <span className={styles.count}>3</span>
            </h3>
            <div className={styles.typesList}>
              <span className={styles.typeTag}>타입1</span>
              <span className={styles.typeTag}>백엔드</span>
              <span className={styles.typeTag}>KDT</span>
            </div>
          </div>  */}

          {/* 전체 배움일기 섹션 */}
          <div className={styles.diariesSection}>
            <h3 className={styles.sectionTitle}>
              전체 배움일기 <span className={styles.count}>{myDiaries.length}</span>
            </h3>
            
            {/* 배움일기 목록 */}
            <div className={styles.diaryList}>
              {myDiaries.length === 0 ? (
                <div className={styles.empty}>
                  <p>아직 작성된 배움일기가 없습니다.</p>
                  <button onClick={() => navigate("/study-diary/write")}>
                    첫 번째 일기 작성하기
                  </button>
                </div>
              ) : (
                myDiaries.map((diary) => (
                  <div
                    key={diary.id}
                    className={styles.diaryCard}
                    onClick={() => navigate(`/study-diary/${diary.id}`)}
                  >
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{diary.title}</h3>
                      <p className={styles.cardText}>
                        {truncateContent(diary.content)}
                      </p>
                    </div>
                    <div className={styles.cardFooter}>
                      <div className={styles.cardStats}>
                        <span className={styles.likes}>❤️ {diary.likeCount || diary.likeNum || 0}</span>
                        <span className={styles.comments}>💬 {diary.commentCount || diary.commentNum || 0}</span>
                      </div>
                      <div className={styles.cardMeta}>
                        <span className={styles.date}>
                          {diary.createdAt ? 
                            new Date(diary.createdAt).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 
                            diary.createdAt
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStudyDiaryActivity; 