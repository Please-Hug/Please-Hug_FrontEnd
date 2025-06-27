import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudyDiary } from "../../api/studyDiaryService";
import styles from "./StudyDiaryWritePage.module.scss";

function StudyDiaryWritePage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 글자 수 제한 검사 (API 명세서 기준)
    if (name === "title" && value.length > 100) {
      alert("제목은 100자를 초과할 수 없습니다.");
      return;
    }
    if (name === "content" && value.length > 5000) {
      alert("내용은 5000자를 초과할 수 없습니다.");
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const response = await createStudyDiary(formData);
      
      if (response.status === 200) {
        alert("배움일기가 성공적으로 작성되었습니다!");
        navigate("/study-diary");
      }
    } catch (error) {
      console.error("배움일기 작성 실패:", error);
      
      // 상태 코드별 에러 처리
      const status = error.response?.status;
      switch (status) {
        case 400:
          alert("제목 또는 내용이 비어있거나 유효하지 않습니다. 다시 확인해주세요.");
          break;
        case 401:
          alert("로그인이 필요합니다. 다시 로그인해주세요.");
          navigate("/login");
          break;
        default:
          alert("배움일기 작성에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>배움일기 작성</h1>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate("/study-diary")}
        >
          배움일기 목록으로
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">제목 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="오늘 무엇을 배웠나요?"
            maxLength={100}
            required
          />
          <span className={`${styles.charCount} ${
            formData.title.length > 80 ? styles.warning : ''
          } ${formData.title.length > 95 ? styles.danger : ''}`}>
            {formData.title.length}/100
          </span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">내용 *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="오늘 배운 내용을 자세히 기록해보세요.&#10;&#10;예시:&#10;- 새로 배운 개념&#10;- 해결한 문제&#10;- 느낀 점&#10;- 다음에 학습할 내용"
            rows={15}
            maxLength={5000}
            required
          />
          <span className={`${styles.charCount} ${
            formData.content.length > 4000 ? styles.warning : ''
          } ${formData.content.length > 4800 ? styles.danger : ''}`}>
            {formData.content.length}/5000자
          </span>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate("/study-diary")}
          >
            취소
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "작성 중..." : "작성 완료"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudyDiaryWritePage; 