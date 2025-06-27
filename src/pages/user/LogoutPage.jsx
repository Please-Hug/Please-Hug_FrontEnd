import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api/axiosInstance";

function LogoutPage() {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/api/logout");
      } catch (error) {
        alert("서버 로그아웃 실패: " + error.message);
        // 실패하더라도 토큰은 클라이언트에서 삭제
      } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setShouldRedirect(true);
      }
    };

    logout();
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  return null; // 아직 redirect 안 됐으면 아무것도 렌더링하지 않음
}

export default LogoutPage;
