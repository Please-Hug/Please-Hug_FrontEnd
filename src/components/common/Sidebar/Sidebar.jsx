import React, { useState, useRef, useEffect } from "react";
import styles from "./Sidebar.module.scss";
import emptyUserProfile from "../../../assets/images/user/empty-user-profile.svg";
import api from "../../../api/axiosInstance.js";
import {
  FaLightbulb,
  FaBolt,
  FaBuilding,
  FaBell,
  FaHouse,
  FaBook,
  FaThumbsUp,
  FaGraduationCap,
  FaChessBoard,
  FaCartShopping,
  FaRankingStar,
  FaAnglesLeft,
} from "react-icons/fa6";
import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../stores/userStore";
import SidebarUserMenu from "./SidebarUserMenu";
import SidebarMissionGroup from "./SidebarMissionGroup";
import { getMyMissionGroups } from "../../../api/missionService";

function getQuickMenuItems() {
  return [
    { icon: <FaLightbulb />, label: "AI 안아줘요" },
    { icon: <FaBolt />, label: "빠른 검색" },
    { icon: <FaBell />, label: "알림" },
  ];
}

function getMenuItems() {
  return [
    { icon: <FaHouse />, label: "홈" },
    { icon: <FaBook />, label: "배움일기", link: "/study-diary" },
    { icon: <FaThumbsUp />, label: "칭찬", link: "/praises" },
    { icon: <FaGraduationCap />, label: "미션", link: "/mission" },
    { icon: <FaChessBoard />, label: "퀘스트", link: "/quest" },
    { icon: <FaCartShopping />, label: "상점", link: "/shop" },
    { icon: <FaRankingStar />, label: "랭킹" },
  ];
}

function Sidebar() {
  const quickMenuItems = getQuickMenuItems();
  const menuItems = getMenuItems();
  // const missionGroupItems = getMissonGroupItems();
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);
  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const userMenuRef = useRef(null);
  const [missionGroupItems, setMissionGroupItems] = useState([]);

  useEffect(() => {
    const fetchMissionGroups = async () => {
      try {
        const response = await getMyMissionGroups();
        setMissionGroupItems(response.data);
      } catch (error) {
        console.error("미션 그룹을 가져오는 데 실패했습니다:", error);
      }
    };
    fetchMissionGroups();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!userInfo) {
    return <div>로딩중...</div>;
  }

  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.sidebarHeader}>
          <div>
            <FaBuilding />
            <span>EDUCATION</span>
          </div>
          <div>
            <FaAnglesLeft />
          </div>
        </div>
        <div className={styles.sidebarTitle}>
          <img src={logo} alt="Logo" />
          <span>허그톤 비욘드호라이즌</span>
        </div>
        <hr />
        <div className={styles.menuList}>
          <ul>
            {quickMenuItems.map((item, index) => (
              <li key={index}>
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <hr />
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  navigate(item.link || "/");
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
            <hr />
          </ul>
          {missionGroupItems && missionGroupItems.length > 0 && (
            <SidebarMissionGroup missionGroupItems={missionGroupItems} />
          )}
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userStats}>
          <div>
            Lv. <span>{userInfo.level}</span>
          </div>
          <div>
            <span>{userInfo.point}</span>개
          </div>
        </div>
        <div className={styles.userProfile} ref={userMenuRef}>
          <div>
            <img
              src={
                userInfo?.profileImage
                  ? `${api.defaults.baseURL}${userInfo.profileImage}`
                  : emptyUserProfile
              }
              alt={userInfo?.name || "사용자 프로필"}
              onClick={() => setUserMenuToggle(!userMenuToggle)}
            />
            {userMenuToggle && <SidebarUserMenu />}
          </div>
          <span>©hug Inc.</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
