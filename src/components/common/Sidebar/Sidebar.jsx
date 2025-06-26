import React from "react";
import styles from "./Sidebar.module.scss";
import emptyUserProfile from "../../../assets/images/user/empty-user-profile.svg";
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
    { icon: <FaBook />, label: "배움일기" },
    { icon: <FaThumbsUp />, label: "칭찬" },
    { icon: <FaGraduationCap />, label: "미션", link: "/missions" },
    { icon: <FaChessBoard />, label: "퀘스트", link: "/quest" },
    { icon: <FaCartShopping />, label: "상점" },
    { icon: <FaRankingStar />, label: "랭킹" },
  ];
}

function getMissonGroupItems() {
  return [
    {
      title: "Hugton 알고리즘 미션 강좌",
      items: [{ label: "홈" }, { label: "학습계획" }],
    },
  ];
}

function Sidebar() {
  const quickMenuItems = getQuickMenuItems();
  const menuItems = getMenuItems();
  const missionGroupItems = getMissonGroupItems();
  const navigate = useNavigate();
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
          {missionGroupItems.map((groupItem, index) => (
            <div key={index} className={styles.missionGroup}>
              <ul>
                <li className={styles.missionGroupTitle}>{groupItem.title}</li>
                {groupItem.items.map((item, idx) => (
                  <li key={idx}>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userStats}>
          <div>
            Lv. <span>17</span>
          </div>
          <div>
            <span>900</span>개
          </div>
        </div>
        <div className={styles.userProfile}>
          <div>
            <img src={emptyUserProfile} alt="정휘상(백엔드 3회차)" />
          </div>
          <span>©hug Inc.</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
