import React, { useState, useEffect } from 'react';
import {
  getBookmarks,
  addBookmark,
  updateBookmark,
  removeBookmark,
} from '../../api/bookmark';

function BookmarkSection() {
  const [bookmarks, setBookmarks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');

  const loadBookmarks = async () => {
    try {
      const res = await getBookmarks();
      // 2. 방어적 코드
      setBookmarks(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setBookmarks([]); // 실패해도 배열
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  const openAddModal = () => {
    setEditItem(null);
    setLink('');
    setTitle('');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setLink(item.link);
    setTitle(item.title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditItem(null);
    setLink('');
    setTitle('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await updateBookmark(editItem.id, { link, title });
      } else {
        await addBookmark({ link, title });
      }
      closeModal();
      loadBookmarks();
    } catch (e) {
      alert('저장에 실패했습니다.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('삭제할까요?')) return;
    try {
      await removeBookmark(id);
      loadBookmarks();
    } catch (e) {
      alert('삭제 실패');
    }
  };

  return (
    <section style={{ margin: '2rem 0' }}>
      <h3 style={{ marginBottom: '1rem' }}>📌 내 북마크</h3>
      <button onClick={openAddModal}>북마크 추가</button>
      <ul style={{ marginTop: '1rem' }}>
        {bookmarks.length === 0 && <li>북마크가 없습니다.</li>}
        {bookmarks.map((bm) => (
          <li key={bm.id} style={{ marginBottom: 6 }}>
            <a href={bm.link} target="_blank" rel="noopener noreferrer">{bm.title || bm.link}</a>
            <button onClick={() => openEditModal(bm)} style={{ marginLeft: 8 }}>수정</button>
            <button onClick={() => handleDelete(bm.id)} style={{ marginLeft: 4 }}>삭제</button>
          </li>
        ))}
      </ul>

      {/* 북마크 추가/수정 모달 */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h4>{editItem ? '북마크 수정' : '북마크 추가'}</h4>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  URL
                  <input
                    type="url"
                    value={link}
                    required
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com"
                  />
                </label>
              </div>
              <div>
                <label>
                  표시 텍스트
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="링크를 나타낼 텍스트를 작성해 주세요"
                  />
                </label>
              </div>
              <div style={{ marginTop: 12 }}>
                <button type="submit">{editItem ? '수정하기' : '추가하기'}</button>
                <button type="button" onClick={closeModal} style={{ marginLeft: 8 }}>
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default BookmarkSection;