import React, { useEffect, useState } from "react";
import styles from "./PraiseRatioChart.module.css";
import { getPraiseRatio } from "../../api/praiseService";

function getTypeLabel(type) {
    switch (type) {
        case "THANKS":
            return "감사해요";
        case "RECOGNIZE":
            return "인정해요";
        case "CHEER":
            return "응원해요";
        default:
            return type;
    }
}

function PraiseRatioChart() {
    const [ratios, setRatios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPraiseRatio();
                setRatios(result);
            } catch (err) {
                console.error("비율 데이터 가져오기 실패:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.chartTitle}>
                내가 받은 칭찬 비율
            </div>

        {ratios.map(({ type, percentage }) => (
            <div key={type} className={styles.ratioRow}>
                <span className={styles.label}>{getTypeLabel(type)}</span>
                <div className={styles.barBackground}>
                    <div
                        className={styles.barFill}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <span className={styles.percent}>{percentage}%</span>
            </div>
        ))}
        </div>
    );
}

export default PraiseRatioChart;
