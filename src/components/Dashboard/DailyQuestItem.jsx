import React from "react";
import styles from "./DailyQuestItem.module.scss";
import inprogressIcon from "../../assets/images/daily-quest/quest-inprogress.png";
import completedIcon from "../../assets/images/daily-quest/quest-success.png";
import apiInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function DailyQuestItem({ title, progress, userQuestId, onCompleted }) {
    const navigate = useNavigate();

    const getStatus = (progress) => {
        switch (progress) {
            case "완료 가능":
                return { label: "완료 가능", icon: completedIcon, isClickable: true, color: "#007bff" };
            case "완료됨":
                return { label: "완료됨", icon: completedIcon, isClickable: false, color: "#007bff" };
            default:
                return { label: "진행중", icon: inprogressIcon, isClickable: false, color: "#aaa" };
        }
    };

    const { label, icon, isClickable, color } = getStatus(progress);

    const handleCompleteQuest = async (e) => {
        e.stopPropagation();

        if (!isClickable) return;

        try {
            await apiInstance.put(`/api/v1/quest/complete/${userQuestId}`);
            alert("퀘스트 완료 처리됨!");
            onCompleted();
        } catch (error) {
            console.error("퀘스트 완료 처리 중 오류 발생:", error);
            alert("퀘스트 완료 처리 중 오류가 발생했습니다.");
        }
    };

    const handleCardClick = () => {
        let url = "/quest";
        if (title.includes("출석")) url = "/dashboard";
        else if (title.includes("미션")) url = "/mission";
        else if (title.includes("일기")) url = "/diary";
        else if (title.includes("칭찬")) url = "/praise";

        navigate(url);
    };

    return (
        <li className={styles.questItem} onClick={handleCardClick}>
            <img src={icon} alt="퀘스트 상태 아이콘" className={styles.questIcon} />
            <div className={styles.questTitle}>
                <span>{title}</span>
            </div>
            <button
                onClick={handleCompleteQuest}
                disabled={!isClickable}
                className={styles.questButton}
                style={{
                    backgroundColor: color,
                    cursor: isClickable ? "pointer" : "default",
                }}
            >
                {label}
            </button>
        </li>
    );
}

export default DailyQuestItem;