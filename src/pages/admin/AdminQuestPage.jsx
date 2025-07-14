import React, { useState } from "react";
import apiInstance from "../../api/axiosInstance";
import styles from './AdminQuestPage.module.scss';

function AdminQuestPage() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const handleAssignQuests = async () => {
        if (!username) {
            setMessage("⚠️ username을 입력해주세요.");
            return;
        }
        try {
            await apiInstance.post(`/api/v1/admin/quest/assign/${username}`);
            setMessage(`✅ ${username}에게 퀘스트 할당 완료`);
        } catch (error) {
            console.error(error);
            setMessage("❌ 퀘스트 할당 실패");
        }
    };

    const handleResetQuests = async () => {
        try {
            await apiInstance.put("/api/v1/admin/quest/reset");
            setMessage("✅ 퀘스트 리셋 완료");
        } catch (error) {
            console.error(error);
            setMessage("❌ 퀘스트 리셋 실패");
        }
    };

  return (
    <div className={styles.AdminQuestPage}>
      <h2 className={styles.title}>퀘스트 관리</h2>
      
      <div className={styles.content}>
        <div className={styles.card}>
          <h3>퀘스트 할당</h3>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="username 입력"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleAssignQuests} className={styles.button}>
              퀘스트 할당
            </button>
          </div>
        </div>

        <div className={styles.card}>
          <h3>퀘스트 리셋</h3>
          <button onClick={handleResetQuests} className={styles.button}>
            전체 퀘스트 리셋
          </button>
        </div>

        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
}

export default AdminQuestPage;