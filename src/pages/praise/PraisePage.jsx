// src/pages/Praise/PraisePage.jsx

import React, { useState } from "react";
import styles from "./PraisePage.module.css";
import PraiseModal from "../../components/Praise/PraiseModal";

function PraisePage() {

    const [ isModalOpen, setIsModalOpen ] = useState(false);

  return (

    <>    
        {isModalOpen && <PraiseModal onClose={() => setIsModalOpen(false)} />}

        <div className={styles.pageWrapper}>
            {/* 왼쪽 메인 영역 */}
            <div className={styles.mainContent}>
                <h2 className={styles.pageTitle}>칭찬</h2>

                {/* 🔍 검색창 */}
                <div className={styles.searchFilterBar}>
                    <input type="text" placeholder="🔍 구성원 또는 그룹 검색" className={styles.searchInput} />

                </div>

                {/* 📝 칭찬 카드 목록 */}
                <div className={styles.praiseList}>
                    {/* <PraiseCard ... /> 여러 개 들어갈 자리 */}
                </div>
            </div>    

            {/* 오른쪽 사이드바 영역 */}
            <div className={styles.sidebar}>
                
                {/* 필터 (ME, 날짜) 칭찬하기 버튼 */}
                <div className={styles.filterGroup}>
                        <button onClick={() => setIsModalOpen(true)} className={styles.praiseButton}>칭찬하기</button>

                        <div className={styles.filterControls}>
                            <label className={styles.meToggle}>
                                <input type="checkbox" /> ME
                            </label>
                            <button className={styles.dateButton}>이번 달 📅</button>
                        </div>
                </div>

                
                <div className={styles.sidebarSection}>
                    <h4>반응 좋은 칭찬 글</h4>
                    {/* 인기 칭찬 카드 */}

                </div>

                <div className={styles.sidebarSection}>
                    <h4>내가 받은 칭찬 비율</h4>
                    {/* 비율 막대 그래프 등 */}

                </div>

                <div className={styles.sidebarSection}>
                    <h4>최근 나에게 칭찬을 보낸 동료들</h4>
                    {/* 유저 리스트 */}

                </div>
            </div>
        </div>
    </>
  );
}

export default PraisePage;
