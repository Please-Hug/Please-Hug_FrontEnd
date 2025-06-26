import React from "react";

function RecentDiaryItem({ diary }) {
  return (
    <li>
      <span>{diary.category}</span>
      <h3>{diary.title}</h3>
      <span>{diary.date}</span>
    </li>
  );
}

export default RecentDiaryItem;
