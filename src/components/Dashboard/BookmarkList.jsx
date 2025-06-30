import { useEffect, useState, useRef } from 'react';
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark } from "../../api/bookmark";
import BookmarkModal from './BookmarkModal';
import { vi } from 'date-fns/locale';

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([]);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    target: null, // 현재 컨텍스트 메뉴가 열려있는 북마크
  });

  const [editTarget, setEditTarget] = useState(null); // 수정 모달용
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const containerRef = useRef();

  // 1. 초기 로딩 & 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    load();
    window.addEventListener('click', hideMenu);
    return () => {window.removeEventListener('click', hideMenu);}
  }, []);

  async function load() {
    try {
      const data = await getBookmarks();
      setBookmarks(data);
    } catch (e) {
      console.error(e);
    }
  }

  function hideMenu() {
    setContextMenu((m) => ({ ...m, visible: false }));
  }

  // 2. 각 북마크 우클릭
  function onContextMenu(e, bookmark) {
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    setContextMenu({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      target: bookmark,
    });
  }

  // 3. 삭제
  async function handleDelete() {
    if (!contextMenu.target) return;
    await deleteBookmark(contextMenu.target.id);
    hideMenu();
    load();
  }

  // 4. 수정 모달 열기
  function handleEdit() {
    setEditTarget(contextMenu.target);
    setEditModalOpen(true);
    hideMenu();
  } 

  // 5. 수정 콜백
  async function onUpdate(data) {
    if (!editTarget) return;
    try {
      await updateBookmark(editTarget.id, data);
      setEditModalOpen(false);
      load();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div ref={containerRef} className="relative flex flex-wrap gap-2">
      {bookmarks.map(b => (
        <div key={b.id} onContextMenu={(e) => onContextMenu(e, b)} className="border border-gray-300 rounded px-3 py-1 flex items-center cursor-pointer hover:bg-gray-50">
          <span className="mr-1 text-base">📌</span>
          <span className="text-sm">{b.title || b.link}</span>
        </div>
      ))}

      {/*우클릭 컨텍스트 메뉴*/}
      {contextMenu.visible && (
        <ul
          className="absolute bg-white border border-gray-300 rounded shadow-lg z-50"
          style={{ 
            top: contextMenu.y,
            left: contextMenu.x,
            minWidth: 120,
          }}
          >
          <li onClick={handleEdit} className="px-4 py-2 hover:bg-gray-100">수정하기</li>
          <li onClick={handleDelete} className="px-4 py-2 hover:bg-gray-100 text-red-600">삭제하기</li>
        </ul>
      )}

      {/* 북마크 수정 모달 */}
      <BookmarkModal
        isOpen={isEditModalOpen}
        initialData={editTarget}
        onClose={() => setEditModalOpen(false)}
        onSave={onUpdate}      // 북마크 생성(onCreate)이 아닌 수정(onSave)용
      />



    </div>
  );
}