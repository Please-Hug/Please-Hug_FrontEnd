
import React, { useState, useEffect } from "react";
import styles from "./PraisePage.module.css";
import PraiseModal from "../../components/Praise/PraiseModal";
import DateRangePickerModal from "../../components/Praise/DateRangePickerModal";
import PraiseCard from "../../components/Praise/PraiseCard";
import { getPraises } from "../../api/praiseService";
import { getCurrentUser } from "../../api/userService";
import PraiseDetailModal from "../../components/Praise/PraiseDetailModal";
import { getPopularPraises } from "../../api/praiseService";
import PopularPraiseList from "../../components/Praise/PopularPraiseList";
import PraiseRatioChart from "../../components/Praise/PraiseRatioChart";
import RecentPraiseSenders from "../../components/Praise/RecentPraiseSenders";


function PraisePage() {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(),1);
    const firstDayStr = firstDayOfMonth.toISOString().split("T")[0];

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isDateModalOpen, setIsDateModalOpen ] = useState(false);
    const [ isDetailOpen, setIsDetailOpen ] = useState(false);

    const [ startDate, setStartDate ] = useState(firstDayStr);
    const [ endDate, setEndDate ] = useState(todayStr);
    const [ selectedLabel, setSelectedLabel ] = useState("");

    const [ praises, setPraises ] = useState([]);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [isMe, setIsMe] = useState(false);

    const [ currentUser, setCurrentUser ] = useState(null);

    const [ selectedPraise, setSelectedPraise ] = useState(null);

    // 칭찬 상세조회
    const [ selectedPraiseId, setSelectedPraiseId ] = useState(null);

    const[ popularList, setPopularList ] = useState([]);

    const handlePraiseCreated = (newPraise) => {
        setPraises((prev) => [newPraise, ...prev]);    // 최신 순으로 증가
    };


    const handleCardClick = (id) => {
        setSelectedPraiseId(id);
    };


    const handleDateRangeApply = async ({ start, end, label }) => {
        setStartDate(start);
        setEndDate(end);
        setSelectedLabel(label || `${start} ~ ${end}`);
    }

    const fetchPraises = async () => {
        try {
            // const today = new Date();
            // const todayStr = today.toISOString().split("T")[0];
            
            const result = await getPraises({
                keyword: searchKeyword,
                me: isMe,
                startDate,
                endDate,
            });
            result.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPraises(result);
        }catch(err){
            console.error("칭찬 불러오기 실패:", err);
        }
    };

    const fetchPopularPraises = async () => {
        try{
            const result = await getPopularPraises(startDate,endDate);
            setPopularList(result);
        } catch(error){
            console.error("인기 칭찬 글 불러오기 실패:", error);
        }
    };

    const handleEmojiReacted = () => {
        fetchPraises();
        fetchPopularPraises();
    };

    useEffect(() => {
        fetchPraises();
        fetchPopularPraises();
    }, []);
    
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

    useEffect(() => {

        if(!startDate || !endDate) return;

        const fetchPopular = async () => {
            try {
                const result = await getPopularPraises(startDate, endDate);
                setPopularList(result);
            } catch (error) {
                console.error("인기 칭찬 글 불러오기 실패:", error);
            }
        };
        fetchPopular();
        fetchPopularPraises();
    }, [startDate, endDate]);

  return (

    <>    
        {/* 칭찬하기 생성 모달 */}
        {isModalOpen && (
            <PraiseModal 
                onClose={() => setIsModalOpen(false)} 
                onPraiseCreated={handlePraiseCreated}
            />
        )}

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
                    {praises.length === 0 ?(
                        <div className={styles.emptyContainer}>
                            <div className={styles.emptyTitle}>
                                해당 기간 동안 칭찬이 없습니다
                            </div>
                            <div className={styles.emptySubtitle}>
                                먼저 칭찬을 작성해 보세요
                            </div>
                            <button className={styles.writeBtn} onClick={() => setIsModalOpen(true)}>
                                동료 칭찬하기
                            </button>
                        </div>
                    ) : (
                        praises.map((praise) => (
                            <PraiseCard
                                key={praise.id}
                                praise={praise}
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
                                onEmojiReacted={handleEmojiReacted}
                                onClick={() => handleCardClick(praise.id)}
                            />
                        ))
                    )}

                    {selectedPraiseId && (
                        <PraiseDetailModal
                            isOpen={!!selectedPraiseId}
                            onClose={() => setSelectedPraiseId(null)}
                            praiseId={selectedPraiseId}
                            currentUser={currentUser}
                            fetchPraise={fetchPraises}
                        />
                    )}
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
                    {/* 인기 칭찬 카드 */}
                    <PopularPraiseList 
                        praises={popularList} 
                        onCardClick={(id) => setSelectedPraiseId(id)}
                    />

                </div>

                <div className={styles.sidebarSection}>
                    {/* 비율 막대 그래프 등 */}
                    <PraiseRatioChart />
                    
                </div>

                <div className={styles.sidebarSection}>
                    {/* 유저 리스트 */}
                    <RecentPraiseSenders />

                </div>
            </div>
        </div>
    </>
  );
}

export default PraisePage;
