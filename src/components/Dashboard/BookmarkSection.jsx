import React, { useState, useEffect } from 'react';
import {
  getBookmarks,
  addBookmark,
  updateBookmark,
  removeBookmark,
} from '../../api/bookmark'; // 실제 경로 맞게 수정!

function BookmarkSection() {
  const [bookmarks, setBookmarks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');

  // 북마크 불러오기
  const loadBookmarks = async () => {
    try {
      const data = await getBookmarks();
      setBookmarks(Array.isArray(data) ? data : []);
    } catch (e) {
      setBookmarks([]);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  // 모달 열기(추가)
  const openAddModal = () => {
    setEditItem(null);
    setLink('');
    setTitle('');
    setModalOpen(true);
  };

  // 모달 열기(수정)
  const openEditModal = (item) => {
    setEditItem(item);
    setLink(item.link);
    setTitle(item.title);
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setEditItem(null);
    setLink('');
    setTitle('');
  };

  // 폼 제출 (추가/수정)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await updateBookmark(editItem.id, { title, link });
      } else {
        await addBookmark({ title, link });
      }
      closeModal();
      await loadBookmarks(); // 추가/수정 후 즉시 리스트 갱신!
    } catch (e) {
      alert('저장 실패');
    }
  };

  // 삭제
  const handleDelete = async (id) => {
    if (!window.confirm('삭제할까요?')) return;
    try {
      await removeBookmark(id);
      await loadBookmarks();
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
        <div
          style={{
            position: 'fixed',
            left: 0, top: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000,
          }}>
          <div style={{
            background: '#fff', padding: 24, borderRadius: 8, minWidth: 300,
            boxShadow: '0 2px 16px rgba(0,0,0,0.18)'
          }}>
            <h4 style={{ marginBottom: 12 }}>{editItem ? '북마크 수정' : '북마크 추가'}</h4>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 10 }}>
                <input
                  type="url"
                  value={link}
                  required
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://example.com"
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="링크를 나타낼 텍스트를 작성"
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button type="submit">{editItem ? '수정하기' : '추가하기'}</button>
                <button type="button" onClick={closeModal}>
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