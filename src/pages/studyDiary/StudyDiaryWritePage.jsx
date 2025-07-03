import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createStudyDiary, uploadStudyDiaryImage } from "../../api/studyDiaryService";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import remarkGfm from "remark-gfm";
import styles from "./StudyDiaryWritePage.module.scss";

function StudyDiaryWritePage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const fileInputRef = useRef(null);
  const mdEditorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const navigate = useNavigate();

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 글자 수 제한 검사 (API 명세서 기준)
    if (name === "title" && value.length > 100) {
      alert("제목은 100자를 초과할 수 없습니다.");
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
      
      if (response) {
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

  const handleImageInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageUploading(true);
      const res = await uploadStudyDiaryImage(file);
      // API 명세서에 따라 markdownImageLink 를 우선 사용, 없으면 imageUrl 사용
      const markdownLink = res?.data?.markdownImageLink || `![${res?.data?.originalFileName}](${res?.data?.imageUrl})`;

      // 현재 커서 위치에 이미지 삽입
      insertImageAtCursor(markdownLink);
      
      console.log("✅ 이미지 업로드 성공:", res?.data?.originalFileName);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      
      // 상세한 에러 메시지 표시
      const status = error.response?.status;
      switch (status) {
        case 413:
          alert("이미지 파일이 너무 큽니다. 더 작은 파일을 선택해주세요.");
          break;
        case 415:
          alert("지원하지 않는 이미지 형식입니다. JPG, PNG, GIF 파일을 선택해주세요.");
          break;
        case 401:
          alert("로그인이 필요합니다. 다시 로그인해주세요.");
          break;
        default:
          alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setImageUploading(false);
      // 동일 파일 다시 업로드할 수 있도록 초기화
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 현재 커서 위치에 이미지를 삽입하는 함수
  const insertImageAtCursor = (markdownLink) => {
    const editor = mdEditorRef.current?.editor;
    
    if (!editor?.getCodeMirror) {
      // fallback - ref가 없으면 맨 끝에 추가
      setFormData(prev => ({
        ...prev,
        content: prev.content + `\n${markdownLink}\n`
      }));
      return;
    }

    const cm = editor.getCodeMirror();
    cm.replaceSelection(markdownLink);             // ① 선택 영역(커서)에 삽입
    cm.replaceSelection('\n');                     // ② 바로 새 줄 추가
    const pos = cm.getCursor('end');               // ③ '문자열 끝' 위치 가져오기
    cm.setCursor(pos);                             // ④ 커서 이동
    cm.focus();
    
    console.log("✅ 이미지가 커서 위치에 삽입되었습니다.");
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
          <MDEditor
            ref={mdEditorRef}
            value={formData.content}
            onChange={(value) =>
              setFormData(prev => ({ ...prev, content: value || "" }))
            }
            height={450}
            preview="live"
            visibleDragbar={false}
            data-color-mode="light"
            textareaProps={{
              placeholder: '오늘 배운 것들을 마크다운으로 작성해보세요...\n\n예시:\n## 오늘 배운 것\n- React Hooks 사용법\n- 상태 관리 방법\n\n### 코드 예제\n```javascript\nconst [state, setState] = useState(initialValue);\n```\n\n![이미지 설명](이미지URL)'
            }}
            previewOptions={{
              // GitHub flavored markdown 지원
              remarkPlugins: [remarkGfm],
            }}
          />
          <div className={styles.editorActions}>
            <button
              type="button"
              className={styles.imageUploadButton}
              onClick={handleImageInputClick}
              disabled={imageUploading}
            >
              {imageUploading ? "업로드 중..." : "이미지 업로드"}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <span className={`${styles.charCount} ${
              formData.content.length > 4000 ? styles.warning : ''
            } ${formData.content.length > 4800 ? styles.danger : ''}`}>
              {formData.content.length}/5000자
            </span>
          </div>
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