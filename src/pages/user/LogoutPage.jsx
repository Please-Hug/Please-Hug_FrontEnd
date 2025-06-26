import React from "react";
import { Navigate } from "react-router-dom";

function LogoutPage() {
  localStorage.removeItem("userToken");
  return <Navigate to="/login" replace={true} />;
}

export default LogoutPage;
