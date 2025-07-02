import React, { useState } from "react";
import styles from "./MissionFeedbackCard.module.scss";
import { submitChallengeSubmission } from "../../api/missionService";

function MissionFeedbackCard({ myMission, onFeedbackSubmitted }) {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment || comment.trim() === "") {
      alert("피드백을 입력하세요.");
      return;
    }
    if (!file) {
      alert("파일을 선택하세요.");
      return;
    }
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("file", file);
    formData.append("fileName", file.name);

    try {
      setLoading(true);
      const res = await submitChallengeSubmission(myMission.id, formData);
      alert(res.message);
      // 성공 시 UI 처리 (모달 닫기, 메시지 띄우기 등)
    } catch (err) {
      console.error(err);
      alert("제출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }

    onFeedbackSubmitted();
  };

  return (
    <form className={styles.missionFeedbackModal} onSubmit={handleSubmit}>
      <div className={styles.missionFeedbackContent}>
        <h3>미션 피드백</h3>
        <p>미션을 완료하셨습니다! 피드백을 남겨주세요.</p>
        <textarea
          className={styles.missionFeedbackTextarea}
          placeholder="피드백을 입력하세요..."
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.missionFeedbackFileInputContainer}>
        <input
          type="file"
          name="file"
          className={styles.missionFeedbackFileInput}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file && <span className={styles.fileName}>{file.name}</span>}
      </div>
      <div className={styles.missionFeedbackButtonContainer}>
        <button
          className={styles.missionFeedbackSubmitButton}
          disabled={loading}
        >
          {loading ? "제출 중..." : "피드백 제출"}
        </button>
      </div>
    </form>
  );
}

export default MissionFeedbackCard;
