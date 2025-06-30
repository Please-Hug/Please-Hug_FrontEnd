import React from "react";
import styles from "./PopularPraiseList.module.css";



const getTypeLabel = (type) => {
    switch (type) {
        case "THANKS": return "감사해요";
        case "RECOGNIZE": return "인정해요";
        case "CHEER": return "응원해요";
        default: return type;
    }
};

const formatReceivers = (receivers) => {
    if (!receivers || receivers.length === 0) return "";
    const [first, ...rest] = receivers;
    return `${first.name} 외 ${rest.length}명`;
};


const PopularPraiseList = ({ praises, onCardClick = () => {} }) => {
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>반응 좋은 칭찬 글</h3>
            <div className={styles.list}>
                {praises.map((praise) => (
                    <div 
                        key={praise.id} 
                        className={styles.card}
                        onClick={() => onCardClick?.(praise.id)}
                    >
                        <div className={`${styles.typeBadge} ${styles[praise.type.toLowerCase()]}`}>
                            {getTypeLabel(praise.type)}
                        </div>

                        <div className={styles.senderReceiver}>
                            <span className={styles.sender}>{praise.senderName}</span>
                            <span className={styles.arrow}> ➤ </span>
                            <span className={styles.receiver}>{formatReceivers(praise.receivers)}</span>
                        </div>

                        <p className={styles.content}>{praise.content}</p>

                        <div className={styles.reactionList}>
                            {praise.emojis &&
                                praise.emojis.map(({ emoji, count }) => (
                                    <span key={emoji} className={styles.reaction}>
                                        {emoji} <span className={styles.count}>{count}</span>
                                    </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default PopularPraiseList;
