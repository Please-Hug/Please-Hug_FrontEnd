import React, { useState, useEffect } from 'react';

function BookmarkForm({ open, onClose, onSubmit, initialData }) {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (initialData) {
      setLink(initialData.link);
      setTitle(initialData.title);
    } else {
      setLink('');
      setTitle('');
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ link, title });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={link}
          onChange={e => setLink(e.target.value)}
          placeholder="URL"
          required
        />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="표시 텍스트"
        />
        <button type="submit">{initialData ? '수정하기' : '추가하기'}</button>
        <button type="button" onClick={onClose}>닫기</button>
      </form>
    </div>
  );
}
export default BookmarkForm;