import api from "./axiosInstance";

// 오늘 출석 현황 + 연속일수
export const getAttendanceStatus = () =>
  api.get("/api/v1/attendance/status");

// 출석 체크
export const checkAttendance = () =>
  api.post("/api/v1/attendance/check");

// 출석한 전체 날짜
export const getAttendanceDates = () =>
  api.get("/api/v1/attendance/dates");