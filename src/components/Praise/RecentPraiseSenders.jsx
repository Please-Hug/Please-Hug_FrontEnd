// src/components/Praise/RecentPraiseSenders.jsx

import React, { useEffect, useState } from "react";
import styles from "./RecentPraiseSenders.module.css";
import { getRecentSenders } from "../../api/praiseService";
import BASE_URL from "../../api/baseUrl";
import defaultImage from "../../assets/images/user/empty-user-profile.svg";

function RecentPraiseSenders() {
    const [senders, setSenders] = useState([]);

    useEffect(() => {
        const fetchSenders = async () => {
            try {
                const result = await getRecentSenders();
                setSenders(result);
            } catch (err) {
                console.error("최근 칭찬 보낸 유저 불러오기 실패:", err);
            }
        };
        fetchSenders();
    }, []);

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>최근 나에게 칭찬을 보낸 동료들</h4>
            {senders.map((sender, index) => (
                <div key={index} className={styles.senderItem}>
                    <img
                        src={ sender.senderProfiles[0] ? BASE_URL + sender.senderProfiles[0] : defaultImage}
                        alt="프로필"
                        className={styles.profileImage}
                    />
                    <span className={styles.senderName}>{sender.name}</span>
                </div>
            ))}
        </div>
    );
}

export default RecentPraiseSenders;
