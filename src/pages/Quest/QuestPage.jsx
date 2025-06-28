import React, { useEffect, useState } from "react";
import styles from "./QuestPage.module.scss";
import QuestItem from "../../components/Quest/QuestItem";
import apiInstance from "../../api/axiosInstance";

function QuestPage() {
  const [questList, setQuestList] = useState([]);

  const fetchQuests = async () => {
    try {
      const response = await apiInstance.get("/api/v1/quest");
      setQuestList(response.data.data || []);
    } catch (err) {
      console.error("퀘스트 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  return (
      <div>
        <h2 className={styles.questPageTitle}>퀘스트</h2>

        <div className={[styles.cardWeekly, styles.questBox].join(" ")}>
          <h5>일일 퀘스트</h5>

          <div className={styles.questList}>
            {questList.map((quest) => (
                <QuestItem
                    key={quest.userQuestId}
                    title={quest.questName}
                    progress={quest.progress}
                    userQuestId={quest.userQuestId}
                    onCompleted={fetchQuests}
                />
            ))}
          </div>
        </div>
      </div>
  );
}

export default QuestPage;