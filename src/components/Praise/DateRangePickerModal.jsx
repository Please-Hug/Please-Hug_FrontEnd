import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePickerCustom.css";
import { format } from "date-fns";
import styles from "./DateRangePickerModal.module.css";
import { ko } from "date-fns/locale";

const DateRangePickerModal = ({ onApply, onClose }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedLabel, setSelectedLabel] = useState("");

    const handleApply = () => {
        if (startDate && endDate) {
            const start = startDate.toISOString().split("T")[0];
            const end = endDate.toISOString().split("T")[0];
            onApply({ start, end, label: selectedLabel });
            onClose();
        }
    };

    const handleQuickRange = (label) => {
        const today = new Date();
        let start, end;

        if (label === "이번 주") {
            const day = today.getDay();
            start = new Date(today);
            start.setDate(today.getDate() - day + 1); // 월요일
            end = new Date(today);
            end.setDate(start.getDate() + 6); // 일요일
        } else if (label === "저번 주") {
            const day = today.getDay();
            end = new Date(today);
            end.setDate(end.getDate() - day); // 일요일 (저번 주)
            start = new Date(end);
            start.setDate(end.getDate() - 6); // 월요일 (저번 주)
        } else if (label === "이번 달") {
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        }

        setStartDate(start);
        setEndDate(end);
        setSelectedLabel(label);
    };

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>

                <div className={styles.dateInputs}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={startDate ? format(startDate, "yyyy.MM.dd") : ""}
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                if (!isNaN(date.getTime())) setStartDate(date);
                            }}
                            placeholder="YYYY.MM.DD"
                        />
                        
                    </div>
                    <span className={styles.rangeSymbol}>~</span>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={endDate ? format(endDate, "yyyy.MM.dd") : ""}
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                if (!isNaN(date.getTime())) setEndDate(date);
                            }}
                            placeholder="YYYY.MM.DD"
                        />
                        
                    </div>
                </div>

                <div className={styles.calendarBody}>
                    <div className={styles.quickMenuSection}>
                        <div className={styles.quickMenu}>
                            {["이번 주", "저번 주", "이번 달"].map((label) => (
                                <button
                                    key={label}
                                    className={`${styles.quickMenuBtn} ${selectedLabel === label ? styles.selected : ""}`}
                                    onClick={() => handleQuickRange(label)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.calendarSection}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                if (!Array.isArray(date)) return;
                                const [start, end] = date;
                                setStartDate(start);
                                setEndDate(end);
                            }}
                            locale={ko}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                            dateFormat="yyyy.MM.dd"
                        />
                    </div>
                </div>

                <div className={styles.footerDivider}></div>

                <div className={styles.footer}>
                    <button className={styles.cancelBtn} onClick={onClose}>닫기</button>
                    <button className={styles.applyBtn} onClick={handleApply}>적용</button>
                </div>
            </div>
        </div>
    );
};

export default DateRangePickerModal;
