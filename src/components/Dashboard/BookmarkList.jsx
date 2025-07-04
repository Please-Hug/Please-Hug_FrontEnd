import React, { useEffect, useState } from 'react';
import { getBookmarks, addBookmark, updateBookmark, removeBookmark } from '../../api/bookmarkService';
import BookmarkForm from './BookmarkForm';

function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const loadBookmarks = async () => {
    try{
      const res = await getBookmarks();
      setBookmarks(res || []); // 원래 res.data였는데 이렇게 해도 에러 안 나나
    } catch (e) {
      console.error('북마크 로드 실패: ', error);
      setBookmarks([]);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  const handleAdd = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('삭제할까요?')) {
      await removeBookmark(id);
      loadBookmarks();
    }
  };

  const handleFormSubmit = async (data) => {
    try{
      if (editItem) {
        await updateBookmark(editItem.id, data);
      } else {
        await addBookmark(data);
      }
      setModalOpen(false);
      loadBookmarks();
    } catch (e) {
      console.error('북마크 저장 실패: ', error);
      alert('저장에 실패했습니다, 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <button onClick={handleAdd}>북마크 추가</button>
      <ul>
        {bookmarks.map(bm => (
          <li key={bm.id}>
            <a href={bm.link} target="_blank" rel="noopener noreferrer">{bm.title || bm.link}</a>
            <button onClick={() => handleEdit(bm)}>수정</button>
            <button onClick={() => handleDelete(bm.id)}>삭제</button>
          </li>
        ))}
      </ul>
      <BookmarkForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editItem}
      />
    </div>
  );
}
export default BookmarkList;