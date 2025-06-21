import React from "react";
import styles from "./AttendanceCheck.module.scss";

function AttendanceCheck() {
  // 출석 데이터 예시 (실제로는 props나 API에서 받아와야 함)
  const attendanceData = [
    { date: 8, isAttended: false },
    { date: 9, isAttended: true },
    { date: 10, isAttended: true },
    { date: 11, isAttended: true },
    { date: 12, isAttended: false },
    { date: 13, isAttended: false },
    { date: 14, isAttended: false },
  ];

  const consecutiveDays = 0; // 연속 출석일수 (API에서 가져오는 값)

  return (
    <div className={styles.attendanceCheck}>
      <div>
        <h3>출석체크</h3>
        <span>연속 출석 {consecutiveDays}일</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {attendanceData.map((day, index) => (
              <td key={index}>{day.date}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <button>출석체크하기</button>
    </div>
  );
}

export default AttendanceCheck;
