// components/Praise/PraiseDetailModal.jsx

import React, { useEffect, useState } from "react";
import styles from "./PraiseDetailModal.module.css";
import { getPraiseDetail } from "../../api/praiseService";
import { postComment } from "../../api/praiseService";
import { addEmojiReaction, deleteEmojiReaction, addCommentEmojiReaction, deleteCommentEmojiReaction, deleteComment } from "../../api/praiseService";
import { jwtDecode } from "jwt-decode";


function PraiseDetailModal({ isOpen, onClose, praiseId, currentUser, fetchPraises }) {
    const [detail, setDetail] = useState(null);
    const [commentInput, setCommentInput] = useState("");

    const handleSubmit = async () => {
        if (!commentInput.trim()){
            alert("댓글을 입력하세요.");
            return;
        }
        try{
            const newComment = await postComment(praiseId, commentInput);
            setDetail((prev) => ({
                ...prev,
                commentCount: prev.commentCount + 1,
                comments: [...prev.comments, newComment],
            }));
            setCommentInput("");

            const updated = await getPraiseDetail(praiseId);
            setDetail(updated);
        }catch(error){
            alert("댓글 작성 중 오류가 발생했습니다.");
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case "THANKS": return "감사해요";
            case "RECOGNIZE": return "인정해요";
            case "CHEER": return "응원해요";
            default: return type;
        }
    };

    
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
        
        const emojiObj = detail.emojiReactions.find((e) => e.emoji === emojiChar);

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

            const updated = await getPraiseDetail(praiseId);
            setDetail(updated);

        } catch (error) {
            if (error.response?.status === 409) {
                console.warn("이미 등록된 반응입니다.");
            } else {
                console.error("이모지 처리 실패:", error);
            }
        }
    };

    const handleCommentEmojiClick = async (commentId, emojiChar, emojiReactionsMap) => {
        if (!username) {
            console.log("로그인 필요");
            return;
        }

        const reactedByList = emojiReactionsMap?.[emojiChar] || [];
        const matched = reactedByList.find(user => user?.username === username);


        try {
            if (matched?.id) {
                await deleteCommentEmojiReaction(praiseId, commentId, emojiChar);
                console.log(`댓글 ${commentId} - ${emojiChar} 반응 삭제`);
            } else {
                await addCommentEmojiReaction(praiseId, commentId, emojiChar);
                console.log(`댓글 ${commentId} - ${emojiChar} 반응 등록`);
            }

            const updated = await getPraiseDetail(praiseId);
            setDetail(updated);
        } catch (err) {
            console.error("댓글 이모지 처리 실패:", err);
        }
    };

    const handleDeleteComment = async (commentId) =>{
        try{
            await deleteComment(commentId);
            const updated = await getPraiseDetail(praiseId);
            setDetail(updated);
        }catch(err){
            console.error("댓글 삭제 실패:", err);
        }
    };



    useEffect(() => {
        if (isOpen && praiseId) {
            getPraiseDetail(praiseId).then(setDetail).catch(console.error);
        }
    }, [isOpen, praiseId]);

    if (!isOpen) return null;

    useEffect(() => {
        console.log(detail);
    }, [detail]);

    return (
        <>
            <div className={styles.backdrop} onClick={onClose} />
            <div className={`${styles.slideModal} ${isOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    <h2>칭찬</h2>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                {detail && (
                    <div className={styles.contentWrapper}>

                        <div className={styles.receiversRow}>
                            {detail.receivers.map((r) => (
                                <div key={r.id} className={styles.receiverItem}>
                                    <img src={r.profileImage} alt="프로필" className={styles.profileImage} />
                                    <span className={styles.receiverName}>{r.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.senderRow}>
                            <div className={styles.senderInfo}>
                                <div className={styles.senderText}>
                                    <strong>{detail.senderName}님이 보낸 칭찬</strong>
                                </div>
                                <span className={`${styles.badge} ${styles[detail.type.toLowerCase()]}`}>
                                    {getTypeLabel(detail.type)}
                                </span>
                            </div>
                        </div>


                        <div>{detail.content}</div>

                        <div className={styles.date}>
                            {new Date(detail.createdAt).toLocaleString("ko-KR")}
                        </div>

                        <div className={styles.emojiList}>
                            {detail.emojiReactions.map((emojiObj,index) => (
                                <span
                                    key={`${emojiObj.emoji}-${emojiObj.count}-${index}`}
                                    className={styles.emoji}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        currentUser && handleEmojiClick(emojiObj.emoji);
                                    }}
                                >
                                    {emojiObj.emoji} {emojiObj.count}
                                </span>
                            ))}
                        </div>

                        
                        <div className={styles.reactionBar}>
                            {["😀", "❤️", "👍", "🔥", "👏"].map((emoji) => (
                                <button
                                    key={emoji}
                                    className={styles.reactionButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        currentUser && handleEmojiClick(emoji);}}
                                    disabled={!currentUser}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>



                        <h4>댓글 {detail.commentCount}개</h4>
                        <textarea
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="댓글을 입력하세요"
                            className={styles.textarea}
                        />

                        <div className={styles.commentActions}>
                            <button onClick={() => setCommentInput("")} className={styles.resetBtn}> ⟳ 초기화</button>
                            <button onClick={handleSubmit} className={styles.submitBtn}>댓글 등록하기</button>
                        </div>

                        <div className={styles.commentList}>
                            {detail.comments.map((comment) => (
                                <div key={comment.id} className={styles.commentItem}>
                                    <div className={styles.commentLeft}>
                                        <div className={styles.commentProfileWrapper}>
                                            <img src={comment.commentProfile} alt="프로필" className={styles.profileImage} />
                                            <div className={styles.commentMeta}>
                                                <strong className={styles.commenterName}>{comment.commenterName}</strong>
                                                <small className={styles.commentDate}>
                                                    {new Date(comment.createdAt).toLocaleString("ko-KR")}
                                                </small>
                                            </div>
                                        </div>
                                        <span className={styles.commentText}>{comment.content}</span>
                                    </div>

                                    <div className={styles.commentRight}>
                                        <div className={styles.commentEmojiList}>
                                            {comment.emojiReactions &&
                                                Object.entries(comment.emojiReactions).map(([emoji, users]) => (
                                                    <span key={`${emoji}-${comment.id}`} className={styles.emoji}>
                                                        {emoji} {users.length}
                                                    </span>
                                            ))}

                                        </div>

                                        <div className={styles.commentEmojiBar}>
                                            {["😀", "❤️", "👍", "🔥", "👏"].map((emoji) => (
                                                <button
                                                    key={emoji}
                                                    className={styles.reactionButton}
                                                    onClick={() => handleCommentEmojiClick(comment.id, emoji, comment.emojiReactions)}
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                        
                                        
                                        {comment.commenterUsername === username && (
                                            <div className={styles.commentDeleteWrapper}>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )}
                                        

                                    </div>
                                </div>


                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PraiseDetailModal;
