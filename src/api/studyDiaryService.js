import api from "./axiosInstance.jsx";

// 배움일기 목록 조회
export const getStudyDiaries = async (page = 0, size = 10, sort = "createdAt") => {
  try {
    const response = await api.get(`/api/v1/studydiaries?page=${page}&size=${size}&sort=${sort}`);
    return response.data;
  } catch (error) {
    console.error("배움일기 목록 조회 실패:", error);
    throw error;
  }
};

// 배움일기 상세 조회
export const getStudyDiary = async (id) => {
  try {
    const response = await api.get(`/api/v1/studydiaries/${id}`);
    return response.data;
  } catch (error) {
    console.error("배움일기 조회 실패:", error);
    throw error;
  }
};

// 배움일기 작성
export const createStudyDiary = async (diaryData) => {
  try {
    // API 명세서에 맞게 title, content만 전송
    const requestData = {
      title: diaryData.title,
      content: diaryData.content
    };
    const response = await api.post("/api/v1/studydiaries", requestData);
    return response.data;
  } catch (error) {
    console.error("배움일기 작성 실패:", error);
    throw error;
  }
};

// 배움일기 수정
export const updateStudyDiary = async (id, diaryData) => {
  try {
    // API 명세서에 맞게 title, content만 전송
    const requestData = {
      title: diaryData.title,
      content: diaryData.content
    };
    const response = await api.put(`/api/v1/studydiaries/${id}`, requestData);
    return response.data;
  } catch (error) {
    console.error("배움일기 수정 실패:", error);
    throw error;
  }
};

// 배움일기 삭제 (API 명세서에 없지만 필요시 구현)
export const deleteStudyDiary = async (id) => {
  try {
    const response = await api.delete(`/api/v1/studydiaries/${id}`);
    return response.data;
  } catch (error) {
    console.error("배움일기 삭제 실패:", error);
    throw error;
  }
};

// 배움일기 검색
export const searchStudyDiaries = async (keyword, page = 0, size = 10) => {
  try {
    const response = await api.get(`/api/v1/studydiaries/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error("배움일기 검색 실패:", error);
    throw error;
  }
};

// 오늘 하루 인기 배움일기 조회
export const getTodayPopularStudyDiaries = async (page = 0, size = 10, sort = "likeCount", direction = "DESC") => {
  try {
    const response = await api.get(`/api/v1/studydiaries/today/popular?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
    return response.data;
  } catch (error) {
    console.error("오늘 인기 배움일기 조회 실패:", error);
    throw error;
  }
};

// 댓글 등록
export const createComment = async (studyDiaryId, content) => {
  try {
    const response = await api.post(`/api/v1/studydiaries/${studyDiaryId}/comments`, { content });
    return response.data;
  } catch (error) {
    console.error("댓글 등록 실패:", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (studyDiaryId, commentId) => {
  try {
    const response = await api.delete(`/api/v1/studydiaries/${studyDiaryId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    throw error;
  }
};

// 좋아요 토글
export const toggleLike = async (studyDiaryId) => {
  try {
    const response = await api.post(`/api/v1/studydiaries/${studyDiaryId}/like`);
    return response.data;
  } catch (error) {
    console.error("좋아요 토글 실패:", error);
    throw error;
  }
};

// 나의 활동 조회 (API 명세서에 없지만 기존 기능 유지)
export const getMyActivity = async () => {
  try {
    const response = await api.get("/api/v1/users/activity");
    return response.data;
  } catch (error) {
    console.error("나의 활동 조회 실패:", error);
    throw error;
  }
};

// 나의 주간 활동 상황 조회
export const getMyWeeklyStatus = async () => {
  try {
    const response = await api.get("/api/v1/studydiaries/my/weeklyStatus");
    return response.data;
  } catch (error) {
    console.error("나의 주간 활동 상황 조회 실패:", error);
    throw error;
  }
};

// 나의 글 목록 조회
export const getMyStudyDiaries = async (page = 0, size = 10, sort = "createdAt", direction = "DESC") => {
  try {
    const response = await api.get(`/api/v1/studydiaries/my/studyDiaries?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
    return response.data;
  } catch (error) {
    console.error("나의 글 목록 조회 실패:", error);
    throw error;
  }
};

// 최근 한달간 나의 배움일기 조회 (홈화면 조회용)
export const getMyRecentStudyDiaries = async (page = 0, size = 20, sort = "createdAt,desc") => {
  try {
    const response = await api.get(`/api/v1/studydiaries/my/home?page=${page}&size=${size}&sort=${sort}`);
    return response.data;
  } catch (error) {
    console.error("최근 한달간 배움일기 조회 실패:", error);
    throw error;
  }
}; 