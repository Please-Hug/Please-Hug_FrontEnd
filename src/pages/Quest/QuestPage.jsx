import React from "react";
import styles from "./QuestPage.module.scss";
import questInProgressIcon from "../../assets/images/daily-quest/quest-inprogress.png";
import QuestItem from "../../components/Quest/QuestItem";

function getDailyQuestItems() {
  return [
    {
      title: "배움일기 작성",
      description: "학습 내용을 정리하고 회고해요",
      progress: 0,
      progressMax: 1,
      icon: questInProgressIcon,
      timeLeft: "0일 12시간 남음",
    },
    {
      title: "배움일기 작성",
      description: "학습 내용을 정리하고 회고해요",
      progress: 0,
      progressMax: 1,
      icon: questInProgressIcon,
      timeLeft: "0일 12시간 남음",
    },
    {
      title: "배움일기 작성",
      description: "학습 내용을 정리하고 회고해요",
      progress: 0,
      progressMax: 1,
      icon: questInProgressIcon,
      timeLeft: "0일 12시간 남음",
    },
    {
      title: "배움일기 작성",
      description: "학습 내용을 정리하고 회고해요",
      progress: 0,
      progressMax: 1,
      icon: questInProgressIcon,
      timeLeft: "0일 12시간 남음",
    },
    {
      title: "배움일기 작성",
      description: "학습 내용을 정리하고 회고해요",
      progress: 0,
      progressMax: 1,
      icon: questInProgressIcon,
      timeLeft: "0일 12시간 남음",
    },
  ];
}

function QuestPage() {
  const dailyQuestItems = getDailyQuestItems();
  return (
    <div>
      <h2 className={styles.questPageTitle}>퀘스트</h2>
      <div className={styles.alert}>
        오늘 하루 최대 100포인트를 모두 획득하셨어요. 고생하셨습니다!
      </div>

      <div className={[styles.cardWeekly, styles.questBox].join(" ")}>
        <h5>일일 퀘스트</h5>

        <div className={styles.weeklyReward}>
          <div className={styles.weeklyRewardLabel}>주간 리워드</div>
          <div className={styles.weeklyRewardPoints}>
            <div className={styles.current}>300</div>
            <div className={styles.total}>/ 500 포인트</div>
          </div>
          <progress
            className={styles.progressBar}
            value="60"
            max="100"
          ></progress>
        </div>

        <div className={styles.questList}>
          {dailyQuestItems.map((quest, index) => (
            <QuestItem
              key={index}
              title={quest.title}
              description={quest.description}
              progress={quest.progress}
              progressMax={quest.progressMax}
              icon={quest.icon}
              timeLeft={quest.timeLeft}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestPage;
