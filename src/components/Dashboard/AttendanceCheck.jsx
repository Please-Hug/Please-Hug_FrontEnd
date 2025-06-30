import React, { useEffect, useState } from "react";
import { getAttendanceStatus, checkAttendance } from "../../api/attendanceService";
import { startOfWeek, addDays, format, parseISO } from "date-fns";
import styles from "./AttendanceCheck.module.scss";

export default function AttendanceCheck() {
  // [{ weekday: 0~6, date: Date, isAttended: boolean }]
  const [attendanceData, setAttendanceData] = useState([]);
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const {
          data: {
            data: { attendanceStatus, continuousDay, today: todayStr }
          }
        } = await getAttendanceStatus();

        setConsecutiveDays(continuousDay);

        // 이번 주 일요일부터 토요일까지 날짜 배열 생성
        const todayDate = parseISO(todayStr);
        const weekStart = startOfWeek(todayDate, { weekStartsOn: 0 });
        const week = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

        // 날짜와 출석 여부 결합
        const weekData = week.map((dateObj, idx) => ({
          weekday: idx,
          date: dateObj,
          isAttended: attendanceStatus[idx] || false
        }));
        setAttendanceData(weekData);
      } catch (error) {
        console.error("출석 정보 로드 실패:", error);
        alert("출석 정보 로드 중 오류가 발생했습니다.");
      }
    }
    fetchStatus();
  }, []);

  const handleCheck = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const {
        data: {
          data: { attend, exp, point }
        }
      } = await checkAttendance();

      const todayIdx = new Date().getDay(); // 0=일요일,6=토요일
      if (attend) {
        setAttendanceData(prev =>
          prev.map(item =>
            item.weekday === todayIdx
              ? { ...item, isAttended: true }
              : item
          )
        );
        setConsecutiveDays(prev => prev + 1);
      }
    } catch (error) {
      console.error("출석 체크 실패:", error);
      const status = error.response?.status;
      if (status === 409) {
        alert("이미 출석체크가 완료되었습니다.");
      } else {
        alert("출석 체크 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 오늘 index와 출석 여부
  const todayIdx = new Date().getDay();
  const hasAttendedToday = attendanceData[todayIdx]?.isAttended;

  return (
    <div className={styles.attendanceCheck}>
      <div className={styles.header}>
        <h3>출석체크</h3>
        <span>연속 출석 {consecutiveDays}일</span>
      </div>

      <table className={styles.calendar}>
        <thead>
          <tr>
            {['일','월','화','수','목','금','토'].map((d, i) => (
              <th key={i}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {attendanceData.map(({ weekday, date, isAttended }) => (
              <td key={weekday} className={isAttended ? styles.attended : ''}>
                {isAttended ? '✔︎' : format(date, 'd')}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <button
        className={styles.checkButton}
        onClick={handleCheck}
        disabled={loading || hasAttendedToday}
      >
        {hasAttendedToday ? '내일 또 만나요' : loading ? '처리중...' : '출석체크하기'}
      </button>
    </div>
  );
}
