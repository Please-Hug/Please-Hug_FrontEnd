import React from "react";
import styles from "./SidebarUserMenu.module.scss";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../stores/userStore";
import emptyUserProfile from "../../../assets/images/user/empty-user-profile.svg";
import { FaRightFromBracket } from "react-icons/fa6";
import api from "../../../api/axiosInstance.jsx";

function SidebarUserMenu() {
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);
  if (!userInfo) {
    return <div className={styles.userMenu}>로딩중...</div>;
  }

  return (
    <div className={styles.userMenu}>
      <ul>
        <li className={styles.userInfo}>
          <img
              src={
                userInfo?.profileImage
                    ? `${api.defaults.baseURL}${userInfo.profileImage}`
                    : emptyUserProfile
              }
            alt="User Profile"
            className={styles.userProfileImage}
          />
          <div className={styles.userDetails}>
            <span className={styles.name}>{userInfo.name}</span>
            <span className={styles.course}>
              {userInfo.course || "Hugton 알고리즘 미션 강좌"}
            </span>
          </div>
        </li>
        <li onClick={() => navigate("/profile")}>내 정보 수정</li>
        <li onClick={() => navigate("/logout")} className={styles.logoutButton}>
          <FaRightFromBracket /> &nbsp; 로그아웃
        </li>
      </ul>
    </div>
  );
}

export default SidebarUserMenu;
