import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCircleInfo, FaAngleRight } from "react-icons/fa6";
import styles from "./RecentDiary.module.scss";
import RecentDiaryItem from "./RecentDiaryItem";
import { getMyRecentStudyDiaries } from "../../api/studyDiaryService";

function RecentDiary() {
  const [recentDiaryData, setRecentDiaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return "오늘";
    } else if (diffDays === 2) {
      return "어제";
    } else {
      return `${diffDays - 1}일 전`;
    }
  };

  useEffect(() => {
    const fetchRecentDiaries = async () => {
      try {
        setLoading(true);
        const response = await getMyRecentStudyDiaries(0, 5); // 최근 5개만 표시
        
        if (response && response.data && response.data.content) {
          const formattedData = response.data.content.map((diary) => ({
            id: diary.id,
            title: diary.title,
            date: formatDate(diary.createdAt),
            createdAt: diary.createdAt
          }));
          setRecentDiaryData(formattedData);
        }
        setError(null);
      } catch (err) {
        console.error("최근 배움일기 조회 실패:", err);
        setError("최근 배움일기를 불러오는데 실패했습니다.");
        setRecentDiaryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentDiaries();
  }, []);

  return (
    <div className={styles.recentDiary}>
      <div className={styles.recentDiaryHeader}>
        <div>
          <h3>최근 작성한 배움일기</h3>
          <FaCircleInfo />
        </div>
        <Link to="/study-diary">
          더보기 <FaAngleRight />
        </Link>
      </div>
      <ul className={styles.recentDiaryList}>
        {loading ? (
          <li>로딩 중...</li>
        ) : error ? (
          <li>{error}</li>
        ) : recentDiaryData.length > 0 ? (
          recentDiaryData.map((diary) => (
            <RecentDiaryItem key={diary.id} diary={diary} />
          ))
        ) : (
          <li>최근 작성한 배움일기가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default RecentDiary;
