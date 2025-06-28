import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../Praise/PraiseModal.module.css";
import { searchUsers } from "../../api/userService";
import { submitPraise } from "../../api/praiseService";

function PraiseModal({ onClose }){

    const[ receiverInput, setReceiverInput ] = useState("");
    const[ userList, setUserList ] = useState([]);
    const[ receivers, setReceivers ] = useState([]);
    const[ showDropdown, setShowDropdown ] = useState(false);
    const[ praiseType, setPraiseType ] = useState("THANKS");
    const[ praiseContent, setPraiseContent ] = useState("");
    const[ emojiImage, setEmojiImage ] = useState("THANKS");
    const[ showReceiverAlert, setShowReceiverAlert ] = useState(false);
    const[ showContentAlert, setShowContentAlert ] = useState(false);

    
    // 유저 입력창 포커스 시 전체 유저 보여주기 
    const handleInputFocus = async () => {
        try {
            const result = await searchUsers("");
            setUserList(result);
            setShowDropdown(true);
        } catch (err){
            console.error("유저 전체 조회 실패 :" ,err);
        }
    };

    // 입력값 바뀔 때 필터링 
    const handleInputChange = async (e) => {
        const keyword = e.target.value;
        setReceiverInput(keyword);

        try{
            const result = await searchUsers(keyword);

            const filtered = result.filter(user => 
                user.name?.toLowerCase().includes(keyword.toLowerCase())
            );

            setUserList(filtered);
            setShowDropdown(true);
        } catch (err){
            console.error("유저 검색 실패:", err);
        }
        
    };

    // 사용자를 선택했을 때 실행되는 로직 
    const handleUserSelect = (user) => {
        if(!receivers.find((r) => r.username === user.username)){
            setReceivers([...receivers,user]);
        }
        setReceiverInput("");
        setShowDropdown(false);
    };

    // 칭찬 제출 시 백엔드로 전달
    const handleSubmit = async () => {
        if(receivers.length === 0){
            setShowReceiverAlert(true);
            setTimeout(() => setShowReceiverAlert(false), 3000);
            return;
        }
        if(praiseContent.trim() === ""){
            setShowContentAlert(true);
            setTimeout(() => setShowContentAlert(false), 3000);
            return;
        }

        try{
            await submitPraise({
                receivers,
                praiseContent,
                praiseType,
            }
        );
        onClose();
        }catch(err){
            console.error("칭찬 제출 실패:",err);
        }
    };

    const handleTypeSelect = (type) => {
        setPraiseType(type);

        switch (type){
            case "THANKS":
                setEmojiImage("/emoji-thanks.png");
                break;
            case "CHEER":
                setEmojiImage("/emoji-cheer.png");
                break;
            case "RECOGNIZE":
                setEmojiImage("/emoji-recognize.png");
                break;
            default:
                setEmojiImage("/emoji-default.png");
        }
    }

    const handleResetReceivers = () => {
        setReceivers([]);
        setReceiverInput("");
        setShowDropdown(false);
    };
    

    return(

        <>
        

            {/* 전체 화면 덮는 어두운 배경 */}
            <div className={styles.overlay}>
                {/* 모달 본체 */}
                <div className={styles.modal}>

                {showReceiverAlert && (
                    <div className={styles.alert}>
                        대상을 선택해주세요.
                    </div>
                )}
                {showContentAlert && (
                    <div className={styles.alert}>
                        전달할 메시지를 적어주세요.
                    </div>
                )}


                    {/* 상단 제목 + 닫기 버튼 */}
                    <div className={styles.header}>
                        <h3>칭찬하기</h3>
                        <button onClick={onClose} className={styles.closeBtn}>✕</button>
                    </div>

                    {/* 유저 입력 텍스트 */}
                    <p className={styles.label}>누구에게 전달할까요?</p>
                    <div className={styles.inputWrapper}>

                        {receivers.map((r) => (
                            <span key={r.username} className={styles.selectedTag}>
                                {r.name}
                                <button onClick={() => setReceivers(receivers.filter(u => u.username !== r.username))}>✕</button>
                            </span>
                        ))}

                        <input 
                            type="text" 
                            className={styles.inlineInput}
                            value={receiverInput}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={() => setTimeout(() => setShowDropdown(false),150)}
                            placeholder={receivers.length === 0? "구성원 또는 그룹 선택" : ""}
                        
                        />

                        {receivers.length > 0 && (
                            <button onClick={handleResetReceivers} className={styles.clearBtn}>⟳</button>
                        )}
                        
                        {/* 드롭다운 추천 유저 리스트 */}
                        {showDropdown && userList.length > 0 && (
                            <ul className={styles.dropdown}>
                                {userList.map((user) =>(
                                    <li key={user.username} onClick={() => handleUserSelect(user)}>
                                        <img src={user.profileImage || "/default.png"} width="24" />
                                        {user.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>


                    



                    {/* 이모지 이미지 영역 */}
                    <div className={styles.emojiBox}>
                        <img src={emojiImage} alt="칭찬 이모지" className={styles.emoji} />
                    </div>

                    {/* 칭찬 타입 선택 버튼 */}
                    <div className={styles.buttonGroup}>
                        <div className={styles.tooltipWrapper}>
                            <button 
                                className={`${styles.typeBtn} ${praiseType === "THANKS" ? styles.selected : ""}`}
                                onClick={() => handleTypeSelect("THANKS")}>
                                감사해요
                            </button>
                            <span className={styles.tooltip}>선물을 받거나 작은 도움을 받았다면 마음을 전달해봐요!</span>
                        </div>

                        <div className={styles.tooltipWrapper}>
                            <button 
                                className={`${styles.typeBtn} ${praiseType === "CHEER" ? styles.selected : ""}`}
                                onClick={() => handleTypeSelect("CHEER")}>
                                응원해요
                            </button>
                            <span className={styles.tooltip}>격려가 필요하다면 응원을 보내주세요!</span>
                        </div>

                        <div className={styles.tooltipWrapper}>    
                            <button 
                                className={`${styles.typeBtn} ${praiseType === "RECOGNIZE" ? styles.selected : ""}`}
                                onClick={() => handleTypeSelect("RECOGNIZE")}>
                                인정해요
                            </button>
                            <span className={styles.tooltip}>동료가 맡은 일을 잘 해냈다면 인정을 보내주세요!</span>
                        </div>
                    </div>

                    {/* 칭찬 내용 입력 영역 */}
                    <textarea 
                        className={styles.textarea}
                        placeholder="칭찬을 작성해 주세요"
                        value={praiseContent}
                        onChange={(e) => setPraiseContent(e.target.value)}
                    />

                    {/* 하단 버튼 영역 (닫기, 제출) */}
                    <div className={styles.footer}>
                        <button onClick={onClose} className={styles.cancelBtn}>닫기</button>
                        <button onClick={handleSubmit} className={styles.submitBtn}>제출</button>
                    </div>

                </div>
                
            </div>
        </>
    );
}

export default PraiseModal;