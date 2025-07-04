// src/api/bookmark.js
import api from "./axiosInstance";

/**
 * 전체 북마크 목록 조회
 * GET /api/v1/bookmark
 * → ResponseEntity<Response<List<BookmarkResponse>>>
 *    { data: [ { id, title, link }, … ], message: "…" }
 */
export function getBookmarks() {
  return api
    .get("/api/v1/bookmark")
    .then((res) => res.data.data);
}

/**
 * 북마크 추가
 * POST /api/v1/bookmark
 * Body: { title: string, link: string }
 */
export function addBookmark({ title, link }) {
  return api.post("/api/v1/bookmark", { title, link });
}

/**
 * 북마크 수정
 * PUT /api/v1/bookmark/{id}
 * Body: { title: string, link: string }
 */
export function updateBookmark(id, { title, link }) {
  return api.put(`/api/v1/bookmark/${id}`, { title, link });
}

/**
 * 북마크 삭제
 * DELETE /api/v1/bookmark/{id}
 */
export function removeBookmark(id) {
  return api.delete(`/api/v1/bookmark/${id}`);
}