import React from "react";
import { Navigate } from "react-router-dom";

function LogoutPage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return <Navigate to="/login" replace={true} />;
}

export default LogoutPage;
