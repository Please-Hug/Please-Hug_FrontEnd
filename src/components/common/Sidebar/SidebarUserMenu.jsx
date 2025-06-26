import React from "react";
import styles from "./SidebarUserMenu.module.scss";
import { useNavigate } from "react-router-dom";

function SidebarUserMenu() {
  const navigate = useNavigate();

  return (
    <div className={styles.userMenu}>
      <ul>
        <li onClick={() => navigate("/profile")}>프로필</li>
        <li onClick={() => navigate("/settings")}>설정</li>
        <li onClick={() => navigate("/logout")}>로그아웃</li>
      </ul>
    </div>
  );
}

export default SidebarUserMenu;
