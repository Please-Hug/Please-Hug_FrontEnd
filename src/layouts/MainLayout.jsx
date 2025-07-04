import React, { useEffect } from "react";
import Sidebar from "../components/common/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/common/Breadcrumb/Breadcrumb";
import styles from "./MainLayout.module.scss";
import useUserStore from "../stores/userStore";
import useTokenPayload from "../stores/tokenPayloadStore";
import { getUserProfile } from "../api/userService";
import { jwtDecode } from "jwt-decode";

function MainLayout() {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const setTokenPayload = useTokenPayload((state) => state.setTokenPayload);

  const token = localStorage.getItem("accessToken");
  if (token) {
    const payload = jwtDecode(token);
    setTokenPayload(payload);
    console.log("Token payload set:", payload);
  }

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        setUserInfo(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [setUserInfo]);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  return (
    <div className={styles.mainLayout}>
      <Sidebar />
      <div className={styles.content}>
        <Breadcrumb />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
