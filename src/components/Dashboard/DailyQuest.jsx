import React from "react";
import questSuccessIcon from "../../assets/images/daily-quest/quest-success.png";
import questInprogressIcon from "../../assets/images/daily-quest/quest-inprogress.png";
import styles from "./DailyQuest.module.scss";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import DailyQuestItem from "./DailyQuestItem";

function DailyQuest() {
  const quests = [
    {
      id: 1,
      icon: questInprogressIcon,
      title: "배움일기 댓글 작성",
      progress: 0,
      goal: 1,
      buttonText: "50 포인트",
      status: "inprogress",
    },
    {
      id: 2,
      icon: questInprogressIcon,
      title: "미션 리워드 받기",
      progress: 0,
      goal: 1,
      buttonText: "50 포인트",
      status: "inprogress",
    },
    {
      id: 3,
      icon: questSuccessIcon,
      title: "태스크 완료",
      progress: 0,
      goal: 1,
      buttonText: "50 포인트",
      status: "inprogress",
    },
    {
      id: 4,
      icon: questInprogressIcon,
      title: "일일 퀘스트 완료",
      progress: 0,
      goal: 1,
      buttonText: "50 포인트",
      status: "inprogress",
    },
    {
      id: 5,
      icon: questSuccessIcon,
      title: "배움일기 좋아요하기",
      progress: 0,
      goal: 1,
      buttonText: "50 포인트",
      status: "inprogress",
    },
  ];
  return (
    <div className={styles.dailyQuest}>
      <div>
        <h3>데일리 퀘스트</h3>
        <Link to="/daily-quest">
          더보기 <FaAngleRight />
        </Link>
      </div>
      <div>
        <p>주간 리워드</p>
        <div>
          <span>200포인트</span>
          <span> / 500포인트</span>
          <button>획득 완료</button>
        </div>
      </div>
      <ul>
        {quests.map((quest) => (
          <DailyQuestItem
            key={quest.id}
            icon={quest.icon}
            title={quest.title}
            progress={quest.progress}
            goal={quest.goal}
            buttonText={quest.buttonText}
            status={quest.status}
          />
        ))}
      </ul>
    </div>
  );
}

export default DailyQuest;
