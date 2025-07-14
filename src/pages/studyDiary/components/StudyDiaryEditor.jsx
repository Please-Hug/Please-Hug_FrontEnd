import React, { useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "./mdeditor-override.css"; // 텍스트 색상 오버라이드
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { uploadStudyDiaryImage } from "../../../api/studyDiaryService";
import styles from "./StudyDiaryEditor.module.scss";

const StudyDiaryEditor = forwardRef(({ value, onChange, placeholder = "내용을 입력하세요..." }, ref) => {
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  
  // 컴포넌트 마운트 시 color-mode 강제 설정
  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'light');
    return () => {
      document.documentElement.removeAttribute('data-color-mode');
    };
  }, []);

  // 외부에서 호출할 수 있는 메서드들
  useImperativeHandle(ref, () => ({
    insertImage: (imageUrl, altText = "이미지") => {
      const markdown = `![${altText}](${imageUrl})`;
      insertTextAtCursor(markdown);
    },
    focus: () => {
      if (editorRef.current) {
        const textarea = editorRef.current.querySelector("textarea");
        if (textarea) textarea.focus();
      }
    }
  }));

  // 현재 커서 위치에 텍스트 삽입
  const insertTextAtCursor = (text) => {
    const textarea = editorRef.current?.querySelector("textarea");
    if (!textarea) {
      // fallback: 끝에 추가
      onChange(value + "\n" + text);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);
    
    onChange(newValue);
    
    // 커서를 삽입한 텍스트 뒤로 이동
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
      textarea.focus();
    }, 0);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadStudyDiaryImage(file);
      const imageUrl = response?.data?.imageUrl;
      const fileName = response?.data?.originalFileName || "이미지";
      
      if (imageUrl) {
        insertTextAtCursor(`![${fileName}](${imageUrl})`);
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      const status = error.response?.status;
      
      switch (status) {
        case 413:
          alert("이미지 파일이 너무 큽니다. 더 작은 파일을 선택해주세요.");
          break;
        case 415:
          alert("지원하지 않는 이미지 형식입니다. JPG, PNG, GIF 파일을 선택해주세요.");
          break;
        default:
          alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      // 동일 파일 재업로드 가능하도록 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.editorContainer} ref={editorRef} data-color-mode="light">
        <MDEditor
          value={value}
          onChange={onChange}
          preview="live"
          height={500}
          data-color-mode="light"
          textareaProps={{
            placeholder: placeholder,
            style: {
              color: '#000000',
              backgroundColor: '#ffffff',
            }
          }}
          previewOptions={{
            remarkPlugins: [remarkGfm, remarkBreaks],
          }}
          toolbarheight={40}
        />
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      
      <div className={styles.helperText}>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={styles.imageButton}
        >
          이미지 업로드
        </button>
        <span className={styles.charCount}>
          {value.length}/10000자
        </span>
      </div>
    </div>
  );
});

StudyDiaryEditor.displayName = "StudyDiaryEditor";

export default StudyDiaryEditor;