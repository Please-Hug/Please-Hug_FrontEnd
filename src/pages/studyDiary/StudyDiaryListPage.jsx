import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudyDiaries, searchStudyDiaries } from "../../api/studyDiaryService";
import styles from "./StudyDiaryListPage.module.scss";

function StudyDiaryListPage() {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // API는 0부터 시작
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // 페이지 로드 시 배움일기 목록 가져오기
  useEffect(() => {
    if (isSearching && searchKeyword) {
      fetchSearchResults();
    } else {
      fetchDiaries();
    }
  }, [currentPage, isSearching, searchKeyword]);

  const fetchDiaries = async () => {
    try {
      setLoading(true);
      const response = await getStudyDiaries(currentPage, 10, "createdAt");
      
      if (response.status === 200 && response.data) {
        setDiaries(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error("배움일기 목록 조회 실패:", error);
      // 임시 더미 데이터 (백엔드 연결 전까지)
      setDiaries([
        {
          id: 1,
          title: "React 기초 학습",
          content: "오늘은 React의 기본 개념을 배웠습니다.",
          createdAt: "2024-01-15T10:30:00",
          userName: "김학습",
          likeNum: 5,
          commentNum: 3,
        },
        {
          id: 2,
          title: "JavaScript ES6 문법",
          content: "화살표 함수와 구조분해할당을 학습했습니다.",
          createdAt: "2024-01-14T16:45:00",
          userName: "이개발",
          likeNum: 8,
          commentNum: 2,
        },
      ]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async () => {
    if (!searchKeyword.trim()) return;
    
    try {
      setLoading(true);
      const response = await searchStudyDiaries(searchKeyword, currentPage, 10);
      
      if (response.status === 200 && response.data) {
        setDiaries(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error("배움일기 검색 실패:", error);
      setDiaries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      setCurrentPage(0);
      setIsSearching(true);
    } else {
      setIsSearching(false);
      setCurrentPage(0);
    }
  };

  const handleSearchReset = () => {
    setSearchKeyword("");
    setIsSearching(false);
    setCurrentPage(0);
  };

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>배움일기</h1>
        <div className={styles.headerButtons}>
          <button
            className={styles.activityButton}
            onClick={() => navigate("/my-activity")}
          >
            나의 활동
          </button>
          <button
            className={styles.writeButton}
            onClick={() => navigate("/study-diary/write")}
          >
            새 글 작성
          </button>
        </div>
      </div>

      {/* 검색 기능 */}
      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="배움일기를 검색해보세요..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            검색
          </button>
          {isSearching && (
            <button 
              type="button" 
              onClick={handleSearchReset}
              className={styles.resetButton}
            >
              전체보기
            </button>
          )}
        </form>
        {isSearching && (
          <p className={styles.searchInfo}>
            "{searchKeyword}" 검색 결과: {diaries.length}개
          </p>
        )}
      </div>

      <div className={styles.diaryList}>
        {diaries.length === 0 ? (
          <div className={styles.empty}>
            <p>아직 작성된 배움일기가 없습니다.</p>
            <button onClick={() => navigate("/study-diary/write")}>
              첫 번째 일기 작성하기
            </button>
          </div>
        ) : (
          diaries.map((diary) => (
            <div
              key={diary.id}
              className={styles.diaryItem}
              onClick={() => navigate(`/study-diary/${diary.id}`)}
            >
              <div className={styles.diaryHeader}>
                <h3>{diary.title}</h3>
                <span className={styles.date}>
                  {new Date(diary.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <p className={styles.content}>{diary.content}</p>
              <div className={styles.diaryFooter}>
                <div className={styles.authorInfo}>
                  <span className={styles.author}>작성자: {diary.userName}</span>
                </div>
                <div className={styles.stats}>
                  <span className={styles.likes}>❤️ {diary.likeNum || 0}</span>
                  <span className={styles.comments}>💬 {diary.commentNum || 0}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 0 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            이전
          </button>
          <span>페이지 {currentPage + 1} / {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

export default StudyDiaryListPage; 