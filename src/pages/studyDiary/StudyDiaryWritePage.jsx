import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createStudyDiary } from "../../api/studyDiaryService";
import StudyDiaryEditor from "./components/StudyDiaryEditor";
import styles from "./StudyDiaryWritePage.module.scss";

function StudyDiaryWritePage() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 제목 변경 처리
  const handleTitleChange = (e) => {
    const value = e.target.value;
    
    // 글자 수 제한 (API 명세: 1-100자)
    if (value.length > 100) {
      setErrors({ ...errors, title: "제목은 100자를 초과할 수 없습니다." });
      return;
    }
    
    setErrors({ ...errors, title: "" });
    setFormData({ ...formData, title: value });
  };

  // 내용 변경 처리
  const handleContentChange = (value) => {
    // 글자 수 제한 (API 명세: 1-10000자)
    if (value.length > 10000) {
      setErrors({ ...errors, content: "내용은 10000자를 초과할 수 없습니다." });
      return;
    }
    
    setErrors({ ...errors, content: "" });
    setFormData({ ...formData, content: value || "" });
  };


  // 유효성 검사
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    } else if (formData.title.length < 1 || formData.title.length > 100) {
      newErrors.title = "제목은 1~100자 사이여야 합니다.";
    }
    
    if (!formData.content.trim()) {
      newErrors.content = "내용을 입력해주세요.";
    } else if (formData.content.length < 1 || formData.content.length > 10000) {
      newErrors.content = "내용은 1~10000자 사이여야 합니다.";
    }
    
    console.log("Validation errors:", newErrors); // 디버깅용
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form submitted!"); // 디버깅용
    console.log("Form data:", formData); // 디버깅용
    
    if (!validateForm()) {
      console.log("Form validation failed"); // 디버깅용
      return;
    }

    try {
      setLoading(true);
      
      const requestData = {
        title: formData.title.trim(),
        content: formData.content.trim()
      };
      
      console.log("Request data:", requestData); // 디버깅용
      
      const response = await createStudyDiary(requestData);
      
      console.log("Response:", response); // 디버깅용
      
      if (response?.data) {
        alert("배움일기가 성공적으로 작성되었습니다!");
        navigate("/study-diary");
      }
    } catch (error) {
      console.error("배움일기 작성 실패:", error);
      
      const status = error.response?.status;
      const message = error.response?.data?.message;
      
      switch (status) {
        case 400:
          alert(message || "입력값이 올바르지 않습니다. 다시 확인해주세요.");
          break;
        case 401:
          alert("로그인이 필요합니다.");
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
    <div className={styles.writePage}>
      <div className={styles.header}>
        <h1 className={styles.title}>배움일기 작성</h1>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate("/study-diary")}
        >
          목록으로
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 제목 입력 */}
        <div className={styles.formGroup}>
          <label htmlFor="title">
            제목 <span className={styles.required}>*</span>
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="오늘 무엇을 배웠나요?"
            className={errors.title ? styles.error : ""}
            disabled={loading}
          />
          <div className={styles.fieldInfo}>
            <span className={styles.charCount}>
              {formData.title.length}/100
            </span>
            {errors.title && (
              <span className={styles.errorMessage}>{errors.title}</span>
            )}
          </div>
        </div>


        {/* 내용 입력 */}
        <div className={styles.formGroup}>
          <label>
            내용 <span className={styles.required}>*</span>
          </label>
          <StudyDiaryEditor
            ref={editorRef}
            value={formData.content}
            onChange={handleContentChange}
            placeholder="오늘의 배움을 기록해보세요..."
          />
          {errors.content && (
            <span className={styles.errorMessage}>{errors.content}</span>
          )}
        </div>

        {/* 버튼 그룹 */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => {
              if (formData.title || formData.content) {
                if (window.confirm("작성 중인 내용이 있습니다. 정말 나가시겠습니까?")) {
                  navigate("/study-diary");
                }
              } else {
                navigate("/study-diary");
              }
            }}
          >
            취소
          </button>
          
          <div className={styles.rightButtons}>
            <button
              type="button"
              className={styles.submitButton}
              disabled={loading}
              onClick={(e) => {
                console.log("Button clicked!"); // 디버깅용
                console.log("Loading:", loading); // 디버깅용
                console.log("Errors:", errors); // 디버깅용
                console.log("Form data:", formData); // 디버깅용
                handleSubmit(e);
              }}
            >
              {loading ? "작성 중..." : "작성 완료"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudyDiaryWritePage;