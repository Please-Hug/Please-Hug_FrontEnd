import React, { useEffect, useState } from "react";
import {
  getChallengeDetail,
  getChallengeSubmissions,
  feedbackChallengeSubmission,
} from "../../api/missionService";
import missionStateMap from "../../utils/missionStateMap";
import SideModal from "../../components/common/SideModal/SideModal";
import styles from "./ChallengeDetailModal.module.scss";
import BASE_URL from "../../api/baseUrl";

function ChallengeDetailModal({ challengeId, open, onClose }) {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const fetchData = async () => {
      try {
        const data = await getChallengeDetail(challengeId);
        setChallenge(data.data || null);
        // 제출물 가져오기 시도, 실패 시 무시
        try {
          const subRes = await getChallengeSubmissions(challengeId);
          // 항상 단일 객체로 처리
          if (subRes && typeof subRes.data === "object") {
            setSubmission(subRes.data);
          } else if (subRes && typeof subRes === "object") {
            setSubmission(subRes);
          } else {
            setSubmission(null);
          }
        } catch {
          setSubmission(null);
        }
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
          {submission && submission.comment && (
            <div className={styles.infoRow}>
              <b>학생 코멘트:</b>
              <pre className={styles.desc} style={{ margin: 0 }}>
                {submission.comment}
              </pre>
            </div>
          )}
          {submission && (
            <>
              <div className={styles.infoRow}>
                <b>제출물:</b>
                <br />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("accessToken");
                      const res = await fetch(
                        BASE_URL + `/api/v1/submissions/${challengeId}/file`,
                        {
                          headers: {
                            Authorization: token ? `Bearer ${token}` : "",
                          },
                        }
                      );
                      if (!res.ok) throw new Error("다운로드 실패");
                      const blob = await res.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download =
                        submission.originalFileName ||
                        submission.fileName ||
                        "file";
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      window.URL.revokeObjectURL(url);
                    } catch {
                      alert("파일 다운로드에 실패했습니다.");
                    }
                  }}
                  style={{
                    color: "#4f46e5",
                    textDecoration: "underline",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  {submission.originalFileName ||
                    submission.fileName ||
                    "파일 다운로드"}
                </button>
              </div>
              {/* 피드백 입력/표시 */}
              {submission.feedback ? (
                <div className={styles.infoRow} style={{ marginTop: 16 }}>
                  <b>피드백:</b>
                  <pre
                    className={styles.desc}
                    style={{ margin: 0, marginTop: 8 }}
                  >
                    {submission.feedback}
                  </pre>
                </div>
              ) : (
                <div className={styles.infoRow} style={{ marginTop: 16 }}>
                  <b>피드백 입력:</b>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: 60,
                      marginTop: 8,
                      padding: 8,
                      fontSize: 14,
                      borderRadius: 4,
                      border: "1px solid #ccc",
                      resize: "vertical",
                    }}
                    placeholder="학생에게 남길 피드백을 입력하세요."
                  />
                  <button
                    type="button"
                    disabled={feedbackLoading || !feedback.trim()}
                    style={{
                      marginTop: 8,
                      background:
                        feedbackLoading || !feedback.trim()
                          ? "#ccc"
                          : "#4f46e5",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "6px 16px",
                      cursor:
                        feedbackLoading || !feedback.trim()
                          ? "not-allowed"
                          : "pointer",
                      float: "right",
                    }}
                    onClick={async () => {
                      if (!feedback.trim()) return;
                      setFeedbackLoading(true);
                      try {
                        await feedbackChallengeSubmission(
                          challengeId,
                          feedback
                        );
                        alert("피드백이 성공적으로 저장되었습니다.");
                        setFeedback("");
                        // 피드백 저장 후 제출물 정보 다시 가져오기
                        const subRes =
                          await getChallengeSubmissions(challengeId);
                        if (subRes && typeof subRes.data === "object") {
                          setSubmission(subRes.data);
                        }
                      } catch (error) {
                        alert("피드백 저장에 실패했습니다. 다시 시도해주세요.");
                        console.error("피드백 저장 오류:", error);
                      } finally {
                        setFeedbackLoading(false);
                      }
                    }}
                  >
                    {feedbackLoading ? "저장 중..." : "저장"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </SideModal>
  );
}

export default ChallengeDetailModal;
