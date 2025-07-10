import React, { useEffect, useState } from "react";
import { getChallengeDetail } from "../../api/missionService";
import missionStateMap from "../../utils/missionStateMap";
import SideModal from "../../components/common/SideModal/SideModal";
import styles from "./ChallengeDetailModal.module.scss";

function ChallengeDetailModal({ challengeId, open, onClose }) {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    const fetchData = async () => {
      try {
        const data = await getChallengeDetail(challengeId);
        setChallenge(data.data || null);
      } catch {
        setError("챌린지 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [challengeId, open]);

  return (
    <SideModal isOpen={open} onClose={onClose} width={480}>
      {loading ? (
        <div className={styles.detailPage}>로딩 중...</div>
      ) : error ? (
        <div className={styles.detailPage} style={{ color: "red" }}>
          {error}
        </div>
      ) : !challenge ? (
        <div className={styles.detailPage}>챌린지 정보를 찾을 수 없습니다.</div>
      ) : (
        <div className={styles.detailPage}>
          <h2 className={styles.title}>{challenge.mission?.name || "-"}</h2>
          <div className={styles.infoRow}>
            <b>미션그룹:</b> {challenge.mission?.missionGroup?.name || "-"}
          </div>
          <div className={styles.infoRow}>
            <b>제출자:</b>{" "}
            {challenge.user?.name || challenge.user?.username || "-"}
          </div>
          <div className={styles.infoRow}>
            <b>상태:</b>{" "}
            <span className={styles.status + " " + styles[challenge.progress]}>
              {missionStateMap[challenge.progress] || challenge.progress || "-"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <b>설명:</b>{" "}
            <pre className={styles.desc}>
              {challenge.mission?.description || "-"}
            </pre>
          </div>
        </div>
      )}
    </SideModal>
  );
}

export default ChallengeDetailModal;
