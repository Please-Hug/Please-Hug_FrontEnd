import React from "react";
import { Link } from "react-router-dom";
import styles from "./RecentDiaryItem.module.scss";

function RecentDiaryItem({ diary }) {
  return (
    <li>
      <Link to={`/study-diary/${diary.id}`} className={styles.diaryLink}>
        <h3>{diary.title}</h3>
        <span>{diary.date}</span>
      </Link>
    </li>
  );
}

export default RecentDiaryItem;
