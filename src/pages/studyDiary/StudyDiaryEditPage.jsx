import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudyDiary, updateStudyDiary, uploadStudyDiaryImage } from "../../api/studyDiaryService";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import remarkGfm from "remark-gfm";
import styles from "./StudyDiaryEditPage.module.scss";

function StudyDiaryEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const fileInputRef = useRef(null);
  const mdEditorRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  // 페이지 로드 시 기존 데이터 불러오기
  useEffect(() => {
    fetchDiaryData();
  }, [id]);

  const fetchDiaryData = async () => {
    try {
      setLoading(true);
      const response = await getStudyDiary(id);
      
      if (response && response.data) {
        const data = response.data;
        setFormData({
          title: data.title,
          content: data.content,
        });
        setOriginalData(data);
      }
    } catch (error) {
      console.error("배움일기 조회 실패:", error);
      // 임시 더미 데이터
      const dummyData = {
        id: parseInt(id),
        title: "React 컴포넌트 심화 학습",
        content: `오늘은 React의 컴포넌트 생명주기와 훅에 대해 깊이 학습했습니다.

## 배운 내용
1. **useEffect 훅의 의존성 배열**
   - 빈 배열을 전달하면 컴포넌트 마운트 시에만 실행
   - 의존성이 있으면 해당 값이 변경될 때마다 실행

2. **useState와 상태 관리**
   - 상태 업데이트는 비동기적으로 처리됨
   - 이전 상태를 기반으로 업데이트할 때는 함수형 업데이트 사용`,
        name: "김학습",
        createdAt: "2024-01-15T10:30:00"
      };
      
      setFormData({
        title: dummyData.title,
        content: dummyData.content,
      });
      setOriginalData(dummyData);
    } finally {
      setLoading(false);
    }
  };

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 글자 수 제한 검사
    if (name === "title" && value.length > 100) {
      alert("제목은 100자를 초과할 수 없습니다.");
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      const res = await uploadStudyDiaryImage(file);
      const markdownLink = res?.data?.markdownImageLink || `![${res?.data?.originalFileName}](${res?.data?.imageUrl})`;

      // 현재 커서 위치에 이미지 삽입
      insertImageAtCursor(markdownLink);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 현재 커서 위치에 이미지를 삽입하는 함수
  const insertImageAtCursor = (markdownLink) => {
    const editor = mdEditorRef.current?.editor;
    
    if (editor && editor.getCodeMirror) {
      const cm = editor.getCodeMirror();
      const cursor = cm.getCursor();
      const line = cm.getLine(cursor.line);
      
      // 현재 줄이 비어있지 않으면 새 줄에서 시작
      const isEmptyLine = !line || line.trim() === '';
      const insertText = isEmptyLine ? markdownLink : `\n${markdownLink}`;
      
      // 현재 위치에 이미지 삽입
      cm.replaceRange(insertText, cursor);
      
      // 이미지 다음 줄로 커서 이동
      const newCursor = { 
        line: cursor.line + (isEmptyLine ? 0 : 1), 
        ch: markdownLink.length 
      };
      cm.setCursor(newCursor);
      
      // 에디터에 포커스
      cm.focus();
      
      console.log("✅ 이미지가 커서 위치에 삽입되었습니다.");
    } else {
      // fallback: MDEditor ref가 없거나 CodeMirror 접근 불가능한 경우
      console.log("⚠️ 커서 위치 접근 불가, 끝에 추가합니다.");
      setFormData(prev => ({
        ...prev,
        content: prev.content ? `${prev.content}\n${markdownLink}\n` : `${markdownLink}\n`
      }));
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    // 변경사항이 있는지 확인
    if (formData.title === originalData?.title && 
        formData.content === originalData?.content) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await updateStudyDiary(id, formData);
      
      if (response) {
        alert("배움일기가 성공적으로 수정되었습니다!");
        navigate(`/study-diary/${id}`);
      }
    } catch (error) {
      console.error("배움일기 수정 실패:", error);
      
      // 상태 코드별 에러 처리
      const status = error.response?.status;
      switch (status) {
        case 400:
          alert("제목 또는 내용이 유효하지 않습니다. 다시 확인해주세요.");
          break;
        case 401:
          alert("로그인이 필요합니다. 다시 로그인해주세요.");
          navigate("/login");
          break;
        case 403:
          alert("이 배움일기를 수정할 권한이 없습니다.");
          navigate("/study-diary");
          break;
        case 404:
          alert("해당 배움일기를 찾을 수 없습니다.");
          navigate("/study-diary");
          break;
        default:
          alert("배움일기 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 변경사항 취소
  const handleCancel = () => {
    if (formData.title !== originalData?.title || 
        formData.content !== originalData?.content) {
      if (window.confirm("변경사항이 있습니다. 정말 취소하시겠습니까?")) {
        navigate(`/study-diary/${id}`);
      }
    } else {
      navigate(`/study-diary/${id}`);
    }
  };

  if (loading) {
    return <div className={styles.loading}>데이터를 불러오는 중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>배움일기 수정</h1>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(`/study-diary/${id}`)}
        >
          ← 돌아가기
        </button>
      </div>

      <div className={styles.editInfo}>
        <p>작성자: {originalData?.name}</p>
        <p>최초 작성일: {originalData?.createdAt ? new Date(originalData.createdAt).toLocaleDateString('ko-KR') : ''}</p>
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
            placeholder="수정할 제목을 입력하세요"
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
            height={500}
            previewOptions={{ remarkPlugins: [remarkGfm] }}
          />
          <div className={styles.editorActions}>
            <button
              type="button"
              className={styles.imageUploadButton}
              onClick={handleImageInputClick}
            >
              이미지 업로드
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
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting}
          >
            {submitting ? "수정 중..." : "수정 완료"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudyDiaryEditPage; 