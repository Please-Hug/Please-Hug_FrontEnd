import axios from "axios";
import BASE_URL from "./baseUrl";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 인증이 필요한 경로들
const authRequiredPaths = ["/api/v1/", "/api/logout"];

// 요청 인터셉터 - accessToken 붙이기
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const requiresAuth = authRequiredPaths.some((path) =>
      config.url.startsWith(path)
    );

    if (token && requiresAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - accessToken 만료 시 자동 리프레시
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // accessToken 만료 + 한 번만 재시도
    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          BASE_URL + "/api/refresh",
          { accessToken, refreshToken },
          { withCredentials: true }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          res.data.data;

        // 로컬 스토리지 갱신
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 실패했던 요청 Authorization 갱신
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 이후 요청들을 위해 api 인스턴스 기본 헤더 갱신
        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        // 실패했던 요청 재시도
        return api(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 실패:", refreshError);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
