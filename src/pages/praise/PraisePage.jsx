
import React, { useState, useEffect } from "react";
import styles from "./PraisePage.module.css";
import PraiseModal from "../../components/Praise/PraiseModal";
import DateRangePickerModal from "../../components/Praise/DateRangePickerModal";
import PraiseCard from "../../components/Praise/PraiseCard";
import { getPraises } from "../../api/praiseService";
import { getCurrentUser } from "../../api/userService";


function PraisePage() {

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isDateModalOpen, setIsDateModalOpen ] = useState(false);

    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);
    const [ selectedLabel, setSelectedLabel ] = useState("");

    const [ praises, setPraises ] = useState([]);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [isMe, setIsMe] = useState(false);

    const [ currentUser, setCurrentUser ] = useState(null);



    const handleDateRangeApply = async ({ start, end, label }) => {
        setStartDate(start);
        setEndDate(end);
        setSelectedLabel(label || `${start} ~ ${end}`);
    }

    const fetchPraises = async () => {
        try {
            const today = new Date();
            const todayStr = today.toISOString().split("T")[0];
            
            const result = await getPraises({
                keyword: searchKeyword,
                me: isMe,
                startDate: startDate || todayStr,
                endDate: endDate || todayStr,
            });
            result.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPraises(result);
        }catch(err){
            console.error("칭찬 불러오기 실패:", err);
        }
    };
    
    useEffect(() => {
        fetchPraises();
    }, [ searchKeyword, isMe, startDate, endDate]);

    
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try{
                const user = await getCurrentUser();
                setCurrentUser(user);
            }catch (err){
                console.error("유저 정보 조회 실패", err);
            }
        };
        fetchCurrentUser();
    }, []);

  return (

    <>    
        {/* 칭찬하기 생성 모달 */}
        {isModalOpen && <PraiseModal onClose={() => setIsModalOpen(false)} />}

        {/* 날짜 달력 모달 */}
        {isDateModalOpen && (
            <DateRangePickerModal
                onApply={handleDateRangeApply}
                onClose={() => setIsDateModalOpen(false)}
            />
        )}

        <div className={styles.pageWrapper}>
            {/* 왼쪽 메인 영역 */}
            <div className={styles.mainContent}>
                <h2 className={styles.pageTitle}>칭찬</h2>

                {/* 🔍 검색창 */}
                <div className={styles.searchFilterBar}>
                    <input 
                        type="text" 
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="🔍 구성원 또는 그룹 검색" 
                        className={styles.searchInput} 
                    />

                </div>

                {/* 📝 칭찬 카드 목록 */}
                <div className={styles.praiseList}>
                    {/* <PraiseCard ... /> 여러 개 들어갈 자리 */}
                    {praises.map((praise) => (
                        <PraiseCard
                            key={praise.id}
                            praiseId={praise.id}
                            senderName={praise.senderName}
                            receivers={praise.receivers}
                            content={praise.content}
                            createdAt={praise.createdAt}
                            emojis={praise.emojis}
                            commentCount={praise.commentCount}
                            type={praise.type}
                            currentUser={currentUser}
                            fetchPraises={fetchPraises}
                        />
                    ))}
                </div>
            </div>    

            {/* 오른쪽 사이드바 영역 */}
            <div className={styles.sidebar}>
                
                {/* 필터 (ME, 날짜) 칭찬하기 버튼 */}
                <div className={styles.filterGroup}>
                        <button onClick={() => setIsModalOpen(true)} className={styles.praiseButton}>칭찬하기</button>

                        <div className={styles.filterControls}>
                            <label className={styles.meToggle}>
                                <input 
                                    type="checkbox" 
                                    checked={isMe}
                                    onChange={() => setIsMe(prev => !prev)}
                                /> ME
                            </label>
                            <button 
                                className={styles.dateButton}
                                onClick={() => setIsDateModalOpen(true)}
                            >
                                {selectedLabel || "날짜 선택 📅"}
                                
                            </button>
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
