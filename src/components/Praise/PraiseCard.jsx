
import React from "react";
import styles from "./PraiseCard.module.css";
import { addEmojiReaction, deleteEmojiReaction } from "../../api/praiseService";
import { jwtDecode } from "jwt-decode";

const getTypeLabel = (type) => {
    switch (type) {
        case "THANKS": return "감사해요";
        case "RECOGNIZE": return "인정해요";
        case "CHEER": return "응원해요";
        default: return type;
    }
};

const getTypeClass = (type) => {
    switch (type) {
        case "THANKS": return "thanks";
        case "RECOGNIZE": return "recognize";
        case "CHEER": return "cheer";
        default: return "";
    }
};


function PraiseCard({ 
    praiseId,
    senderName, 
    receivers = [], 
    content, 
    createdAt, 
    emojis = [], 
    commentCount,
    type,
    currentUser,
    fetchPraises,
    onClick
}) {

    const accessToken = localStorage.getItem("accessToken");
    let username = null;
    if(accessToken){
        try{
            const decoded = jwtDecode(accessToken);
            username = decoded.sub;
        } catch(error){
            console.error("토큰 디코딩 실패:", error);
        }
    }
    

    const handleEmojiClick = async (emojiChar) => {

        if(!username){
            console.log("로그인이 필요합니다.");
            return;
        }
        
        const emojiObj = emojis.find((e) => e.emoji === emojiChar);

        const matchedUserReaction = emojiObj?.reactedBy?.find(
            (user) => user?.username === username
        );


        try {
            if (matchedUserReaction?.id) {
                await deleteEmojiReaction(praiseId, matchedUserReaction.id);
                console.log(`${emojiChar} 반응 삭제`);
            } else {
                await addEmojiReaction(praiseId, emojiChar);
                console.log(`${emojiChar} 반응 등록`);
            }

            fetchPraises();
        } catch (error) {
            console.error("이모지 처리 실패:", error);
        }
    };


    return (
        <div className={styles.card} onClick={() => onClick(praiseId)}>

        <div className={styles.receiversRow}>
            {receivers.slice(0, 3).map((r, i) => (
                <div key={i} className={styles.receiverItem}>
                    <img src={r.profileImage} alt="프로필" className={styles.profileImage} />
                    <span className={styles.receiverName}>
                        {r.name}
                    </span>
                </div>
                ))}
                {receivers.length > 3 && (
                    <span className={styles.extra}>외 {receivers.length - 3}명</span>
            )}
        </div>

        <div className={styles.senderRow}>
            <div className={styles.senderInfo}>
                <div className={styles.senderText}>
                    {senderName}님이 보낸 칭찬
                    <span className={`${styles.typeBadge} ${styles[getTypeClass(type)]}`}>
                        {getTypeLabel(type)}
                    </span>
                </div>
                <div className={styles.date}>
                    {new Date(createdAt).toLocaleDateString("ko-KR")}
                </div>
            </div>
        </div>

        <div className={styles.content}>{content}</div>

        <div className={styles.footer}>
            <div className={styles.emojiList}>
            {emojis.map((emoji) => (
                <span 
                    key={emoji.emoji} 
                    className={styles.emoji}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEmojiClick(emoji.emoji)}}
                >
                    {emoji.emoji} {emoji.count}
                </span>
            ))}
            </div>
            <div className={styles.comment}>💬 {commentCount} 댓글</div>
        </div>

        <div className={styles.reactionBar}>
            {["😀", "❤️", "👍", "🔥", "👏"].map((emoji) => (
                <button
                    key={emoji}
                    className={styles.reactionButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        currentUser && handleEmojiClick(emoji)}}
                    disabled={!currentUser}
                >
                    {emoji}
                </button>
            ))}
        </div>

    </div>
    );
}

export default PraiseCard;
