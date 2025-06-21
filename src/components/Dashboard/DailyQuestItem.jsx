import React from "react";

function DailyQuestItem({ icon, title, progress, goal, buttonText, status }) {
  return (
    <li>
      <img src={icon} alt="퀘스트 아이콘" />
      <div>
        <span>{title}</span>
        <span>
          {progress}회 / {goal}회
        </span>
      </div>
      <button className={status}>{buttonText}</button>
    </li>
  );
}

export default DailyQuestItem;
