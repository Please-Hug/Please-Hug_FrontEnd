import React, { useEffect } from "react";
import Sidebar from "../components/common/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/common/Breadcrumb/Breadcrumb";
import styles from "./MainLayout.module.scss";
import useUserStore from "../stores/userStore";
import { getUserProfile } from "../api/userService";

function MainLayout() {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserProfile();
      console.log("User data fetched:", data);
      setUserInfo(data.data);
    };
    fetchUserData();
  }, [setUserInfo]);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  }, []);
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
