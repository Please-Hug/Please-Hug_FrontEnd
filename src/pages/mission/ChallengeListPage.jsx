import React, { useEffect, useState } from "react";
import ChallengeDetailModal from "./ChallengeDetailModal";
import styles from "./ChallengeListPage.module.scss";
import { getChallengeList } from "../../api/missionService";
import missionStateMap from "../../utils/missionStateMap";

function ChallengeListPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChallengeList();
        // data.data가 배열인지 확인 후 세팅
        if (data && Array.isArray(data.data)) {
          setChallenges(data.data);
        } else {
          setChallenges([]);
        }
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.challengeListPage}>
      <h2 className={styles.title}>미션 제출 현황</h2>
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <table className={styles.challengeTable}>
          <thead>
            <tr>
              <th>미션그룹</th>
              <th>미션</th>
              <th>제출자</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {challenges.length === 0 ? (
              <tr className={styles.emptyRow}>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              challenges.map((item) => (
                <tr
                  key={item.id}
                  className={styles.clickableRow}
                  onClick={() => setSelectedChallengeId(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{item.mission?.missionGroup?.name || "-"}</td>
                  <td>{item.mission?.name || "-"}</td>
                  <td>{item.user?.name || item.user?.username || "-"}</td>
                  <td>
                    <span
                      className={
                        styles.status +
                        (item.progress ? " " + styles[item.progress] : "")
                      }
                    >
                      {missionStateMap[item.progress] || item.progress || "-"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      {/* 챌린지 디테일 모달 */}
      <ChallengeDetailModal
        challengeId={selectedChallengeId}
        open={!!selectedChallengeId}
        onClose={() => setSelectedChallengeId(null)}
      />
    </div>
  );
}

export default ChallengeListPage;
