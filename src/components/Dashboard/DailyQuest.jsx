import React, { useEffect, useState } from "react";
import styles from "./DailyQuest.module.scss";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import DailyQuestItem from "./DailyQuestItem";
import apiInstance from "../../api/axiosInstance";

function DailyQuest() {
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
      <div className={styles.dailyQuest}>
        <div>
          <h3>데일리 퀘스트</h3>
          <Link to="/quest">
            더보기 <FaAngleRight />
          </Link>
        </div>
        <ul>
          {questList.map((quest) => (
              <DailyQuestItem
                  key={quest.userQuestId}
                  title={quest.questName}
                  progress={quest.progress}
                  userQuestId={quest.userQuestId}
                  onCompleted={fetchQuests}
              />
          ))}
        </ul>
      </div>
  );
}

export default DailyQuest;