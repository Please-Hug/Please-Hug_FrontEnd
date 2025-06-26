import React from "react";
import { Link } from "react-router-dom";
import { FaCircleInfo, FaAngleRight } from "react-icons/fa6";
import styles from "./RecentDiary.module.scss";
import RecentDiaryItem from "./RecentDiaryItem";

function RecentDiary() {
  const recentDiaryData = [
    {
      category: "hugEDU",
      title: "(메모) 리눅스 젠킨스 관련 문제 해결",
      date: "10일 전",
    },
  ];

  return (
    <div className={styles.recentDiary}>
      <div className={styles.recentDiaryHeader}>
        <div>
          <h3>최근 작성한 배움일기</h3>
          <FaCircleInfo />
        </div>
        <Link to="">
          더보기 <FaAngleRight />
        </Link>
      </div>
      <ul className={styles.recentDiaryList}>
        {recentDiaryData.map((diary, index) => (
          <RecentDiaryItem key={index} diary={diary} />
        ))}
      </ul>
    </div>
  );
}

export default RecentDiary;
