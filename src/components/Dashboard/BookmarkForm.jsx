import React, { useState, useRef, useEffect } from 'react';
import styles from './BookmarkForm.module.scss';
import {
  getBookmarks,
  addBookmark,
  updateBookmark,
  removeBookmark,
} from "../../api/bookmarkService";

function BookmarkForm({ open, onClose, onSubmit, initialData }) {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const formRef = useRef(null);

  // 초기값
  useEffect(() => {
    setLink(initialData?.link || "");
    setTitle(initialData?.title || "");
  }, [initialData]);

  // ESC/ENTER 핸들러 (open일 때만)
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Enter") {
        if (
          document.activeElement.tagName === "INPUT" &&
          formRef.current
        ) {
          formRef.current.requestSubmit();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (initialData) {
        await updateBookmark(initialData.id, { title, link });
        } else {
        await addBookmark({ title, link });
        }
        onClose();
        if (onSubmit) {
          await onSubmit();
        }
        
    } catch {
        alert("저장 실패");
    }
    };

  if (!open) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} role="dialog" aria-labelledby="bookmark-form-title">
        <h2 id="bookmark-form-title">{initialData ? '북마크 수정' : '북마크 추가'}</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="bookmark-url">URL</label>
          <input
            id="bookmark-url"
            type="url"
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder="URL"
            required
            autoFocus
          />
          <label htmlFor="bookmark-title">표시 텍스트</label>
          <input
            id="bookmark-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="표시 텍스트"
          />
          <div className={styles.modalActionRow}>
            <button type="submit">{initialData ? "수정하기" : "추가하기"}</button>
            <button type="button" onClick={onClose}>닫기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookmarkForm;