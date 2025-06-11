import React from "react";
import styles from "./Sidebar.module.scss";
import { FaBackward, FaBuilding } from "react-icons/fa";
import emptyUserProfile from "../../../assets/images/user/empty-user-profile.svg";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.sidebarHeader}>
          <div>
            <FaBuilding />
            <span>EDUCATION</span>
          </div>
          <div>
            <FaBackward />
          </div>
        </div>
        <div className={styles.sidebarTitle}>구름톤 딥다이브</div>
        <div className={styles.menuList}>
          <ul>
            <li>
              <hr />
            </li>
            <li>AI 구르미</li>
            <li>빠른 검색</li>
            <li>알림</li>
            <li>
              <hr />
            </li>
          </ul>
          <ul>
            <li>홈</li>
            <li>배움일기</li>
            <li>칭찬</li>
            <li>미션</li>
            <li>퀘스트</li>
            <li>상점</li>
            <li>랭킹</li>
            <li>
              <hr />
            </li>
            <li>
              <ul>
                <li>DeepDive 알고리즘 미션 강좌</li>
                <li>홈</li>
                <li>학습계획</li>
              </ul>
            </li>
          </ul>
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
