import React, { useState, useEffect, useRef } from "react";
import {
  getBookmarks,
  addBookmark,
  updateBookmark,
  removeBookmark,
} from "../../api/bookmark";

function BookmarkSection() {
  const [bookmarks, setBookmarks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, targetId: null });

  const contextMenuRef = useRef(null);

  const loadBookmarks = async () => {
    try {
      const data = await getBookmarks();
      setBookmarks(Array.isArray(data) ? data : []);
    } catch {
      setBookmarks([]);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  // 컨텍스트 메뉴 바깥 클릭/스크롤 시 닫기
  useEffect(() => {
    const handler = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    if (contextMenu.visible) {
      document.addEventListener("mousedown", handler);
      document.addEventListener("scroll", handler, true);
    }
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("scroll", handler, true);
    };
  }, [contextMenu.visible]);

  // 모달 열기
  const openAddModal = () => {
    setEditItem(null);
    setLink("");
    setTitle("");
    setModalOpen(true);
  };
  // 모달 열기(수정)
  const openEditModal = (item) => {
    setEditItem(item);
    setLink(item.link);
    setTitle(item.title);
    setModalOpen(true);
    setContextMenu({ ...contextMenu, visible: false });
  };
  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setEditItem(null);
    setLink("");
    setTitle("");
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
      await loadBookmarks();
    } catch {
      alert("저장 실패");
    }
  };

  // 삭제
  const handleDelete = async (id) => {
    if (!window.confirm("삭제할까요?")) return;
    try {
      await removeBookmark(id);
      setContextMenu({ ...contextMenu, visible: false });
      await loadBookmarks();
    } catch {
      alert("삭제 실패");
    }
  };

  // Chip 우클릭(컨텍스트 메뉴 열기)
  const handleChipRightClick = (e, id) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      targetId: id,
    });
  };

  return (
    <section style={{ margin: "2rem 0" }}>
      {/* 툴바 */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <button style={styles.addBtn} onClick={openAddModal}>
          북마크 추가
        </button>
        {/* 북마크 리스트: 한 줄, 가로 스크롤 */}
        <div style={styles.chipList}>
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              style={styles.chip}
              onContextMenu={(e) => handleChipRightClick(e, bm.id)}
              tabIndex={0}
              title={bm.link}
            >
              <a
                href={bm.link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.chipLink}
              >
                {bm.title || bm.link}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 컨텍스트 메뉴 (Chip 우클릭 시) */}
      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          style={{
            ...styles.contextMenu,
            top: contextMenu.y,
            left: contextMenu.x,
          }}
        >
          <div style={styles.menuItem} onClick={() => openEditModal(bookmarks.find(bm => bm.id === contextMenu.targetId))}>
            ✏️ 수정하기
          </div>
          <div
            style={{ ...styles.menuItem, color: "#ec5353" }}
            onClick={() => handleDelete(contextMenu.targetId)}
          >
            🗑 삭제하기
          </div>
        </div>
      )}

      {/* 북마크 추가/수정 모달 */}
      {modalOpen && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalCard}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
              {editItem ? "북마크 수정하기" : "북마크 추가하기"}
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={styles.label}>
                  URL
                  <input
                    type="url"
                    value={link}
                    required
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com"
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={styles.label}>
                  표시 텍스트 (선택)
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="링크를 나타낼 텍스트를 작성"
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.modalActionRow}>
                <button type="button" style={styles.modalCancelBtn} onClick={closeModal}>
                  닫기
                </button>
                <button type="submit" style={styles.modalOkBtn}>
                  {editItem ? "수정하기" : "추가하기"}
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

// ------------------------------------------
// 스타일 예시 (라이트모드/Chip형)
const styles = {
  addBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "7px 18px",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.11)",
  },
  chipList: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    padding: "3px 0",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    flex: 1,
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    background: "#fff",
    color: "#2563eb",
    border: "1.5px solid #d5e2fb",
    borderRadius: 20,
    padding: "6px 18px",
    minHeight: 32,
    minWidth: 40,
    maxWidth: 200,
    fontWeight: 500,
    fontSize: 15,
    boxShadow: "0 2px 10px rgba(55,109,223,0.07)",
    cursor: "pointer",
    transition: "border 0.15s, box-shadow 0.15s, background 0.14s",
    marginRight: 2,
    outline: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  chipLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: 15,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: 140,
    display: "block",
  },
  contextMenu: {
    position: "fixed",
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 10,
    boxShadow: "0 2px 16px rgba(0,0,0,0.16)",
    minWidth: 110,
    zIndex: 2000,
    padding: "4px 0",
    marginTop: 4,
  },
  menuItem: {
    padding: "10px 18px",
    cursor: "pointer",
    fontSize: 15,
    color: "#333",
    transition: "background 0.14s",
    border: "none",
    background: "none",
  },
  modalBackdrop: {
    position: "fixed",
    left: 0, top: 0, width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 9999,
  },
  modalCard: {
    background: "#fff",
    color: "#222",
    padding: 28,
    borderRadius: 16,
    minWidth: 340,
    boxShadow: "0 8px 36px rgba(0,0,0,0.14)",
  },
  label: {
    display: "block",
    color: "#22314d",
    fontWeight: 500,
    fontSize: 13,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 7,
    border: "1.3px solid #e4e8f1",
    background: "#f6f8fb",
    color: "#20262d",
    fontSize: 16,
    marginTop: 3,
    outline: "none",
    boxSizing: "border-box",
  },
  modalActionRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 18,
  },
  modalCancelBtn: {
    background: "#f1f3fa",
    color: "#222",
    border: "none",
    borderRadius: 7,
    fontWeight: 600,
    fontSize: 16,
    padding: "8px 18px",
    cursor: "pointer",
  },
  modalOkBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 7,
    fontWeight: 600,
    fontSize: 16,
    padding: "8px 18px",
    cursor: "pointer",
  },
};