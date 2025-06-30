import { useState, useCallback } from "react";
import { createBookmark } from "../api/bookmark";

export default function useBookmarkModal() {
  // 모달 오픈/클로즈 상태
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달 열기/닫기
  const openModal = useCallback(() => {
    setModalOpen(true);}, []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  // 북마크 생성 핸들러
  const handleCreate = useCallback(
    async (data) => {
      try {
        await createBookmark(data);
        closeModal();
        // 다른 컴포넌트(BookmarkList) 갱신 이벤트
        window.dispatchEvent(new Event("bookmark:refresh"));
      } catch (err) {
        alert(err.message);
      }
    },
    [closeModal]
  );

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleCreate,
  };
}